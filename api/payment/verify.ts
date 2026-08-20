import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { authority, amount } = req.body;

  if (!authority || !amount) {
    return res.status(400).json({ error: "Authority and amount are required." });
  }

  const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  const IS_SANDBOX = process.env.ZARINPAL_SANDBOX !== 'false';
  const zarinpalBaseUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/v4/payment' : 'https://api.zarinpal.com/pg/v4/payment';

  try {
    const amountInRial = amount * 10;
    const payload = {
      merchant_id: ZARINPAL_MERCHANT_ID,
      authority,
      amount: amountInRial
    };

    const response = await axios.post(`${zarinpalBaseUrl}/verify.json`, payload, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    if (response.data.data && (response.data.data.code === 100 || response.data.data.code === 101)) {
      res.json({
        success: true,
        ref_id: response.data.data.ref_id,
        code: response.data.data.code,
        message: response.data.data.code === 100 ? 'Payment verified successfully.' : 'Payment already verified.'
      });
    } else {
      res.status(400).json({
        success: false,
        code: response.data.errors?.code,
        message: response.data.errors?.message || 'Payment verification failed.'
      });
    }
  } catch (error: any) {
    console.error("Payment verify error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
