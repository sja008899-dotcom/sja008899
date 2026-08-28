import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, description, callback_url, mobile, email, orderId } = req.body;

  // Validate amount: must be positive integer and at least 1,000 Tomans
  const parsedAmount = Number(amount);
  if (!parsedAmount || isNaN(parsedAmount) || parsedAmount < 1000 || !Number.isInteger(parsedAmount)) {
    return res.status(400).json({ error: "مبلغ ارسالی نامعتبر است. حداقل مبلغ مجاز ۱،۰۰۰ تومان می‌باشد." });
  }

  if (!description || !callback_url) {
    return res.status(400).json({ error: "توضیحات و آدرس بازگشت (callback_url) الزامی است." });
  }

  const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  const IS_SANDBOX = process.env.ZARINPAL_SANDBOX !== 'false';
  
  const zarinpalBaseUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/v4/payment' : 'https://api.zarinpal.com/pg/v4/payment';
  const zarinpalStartPayUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/StartPay' : 'https://www.zarinpal.com/pg/StartPay';

  try {
    const amountInRial = parsedAmount * 10;
    const payload = {
      merchant_id: ZARINPAL_MERCHANT_ID,
      amount: amountInRial,
      description: description || (orderId ? `پرداخت سفارش ${orderId}` : 'خرید از گل آریس'),
      callback_url,
      metadata: { mobile: mobile || "", email: email || "" }
    };

    const response = await axios.post(`${zarinpalBaseUrl}/request.json`, payload, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    if (response.data.data && response.data.data.code === 100) {
      const authority = response.data.data.authority;
      const paymentUrl = `${zarinpalStartPayUrl}/${authority}`;
      res.json({ authority, paymentUrl, orderId });
    } else {
      res.status(400).json({ error: "Failed to create payment token", details: response.data.errors });
    }
  } catch (error: any) {
    console.error("Payment request error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
