import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, description, callback_url, mobile, email } = req.body;

  if (!amount || !description || !callback_url) {
    return res.status(400).json({ error: "Amount, description, and callback_url are required." });
  }

  const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  const IS_SANDBOX = process.env.ZARINPAL_SANDBOX !== 'false';
  
  const zarinpalBaseUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/v4/payment' : 'https://api.zarinpal.com/pg/v4/payment';
  const zarinpalStartPayUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/StartPay' : 'https://www.zarinpal.com/pg/StartPay';

  try {
    const amountInRial = amount * 10;
    const payload = {
      merchant_id: ZARINPAL_MERCHANT_ID,
      amount: amountInRial,
      description,
      callback_url,
      metadata: { mobile: mobile || "", email: email || "" }
    };

    const response = await axios.post(`${zarinpalBaseUrl}/request.json`, payload, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    if (response.data.data && response.data.data.code === 100) {
      const authority = response.data.data.authority;
      const paymentUrl = `${zarinpalStartPayUrl}/${authority}`;
      res.json({ authority, paymentUrl });
    } else {
      res.status(400).json({ error: "Failed to create payment token", details: response.data.errors });
    }
  } catch (error: any) {
    console.error("Payment request error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
