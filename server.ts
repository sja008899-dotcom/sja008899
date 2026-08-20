import express from "express";
import cors from "cors";
import path from "path";
import axios from "axios";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Zarinpal Configuration
  const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  const IS_SANDBOX = process.env.ZARINPAL_SANDBOX !== 'false';
  
  const zarinpalBaseUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/v4/payment' : 'https://api.zarinpal.com/pg/v4/payment';
  const zarinpalStartPayUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/StartPay' : 'https://www.zarinpal.com/pg/StartPay';

  // --- API Routes ---
  
  // 1. Request Payment
  app.post("/api/payment/request", async (req, res) => {
    try {
      const { amount, description, callback_url, mobile, email } = req.body;

      if (!amount || !description || !callback_url) {
        return res.status(400).json({ error: "Amount, description, and callback_url are required." });
      }

      // Calculate amount in Rial (Zarinpal V4 accepts Rials)
      // Assuming frontend sends Toman, multiply by 10
      const amountInRial = amount * 10;

      const payload = {
        merchant_id: ZARINPAL_MERCHANT_ID,
        amount: amountInRial,
        description,
        callback_url,
        metadata: {
          mobile: mobile || "",
          email: email || ""
        }
      };

      const response = await axios.post(`${zarinpalBaseUrl}/request.json`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
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
      res.status(500).json({ error: "Internal server error during payment request" });
    }
  });

  // 2. Verify Payment
  app.post("/api/payment/verify", async (req, res) => {
    try {
      const { authority, amount } = req.body;

      if (!authority || !amount) {
        return res.status(400).json({ error: "Authority and amount are required." });
      }

      const amountInRial = amount * 10;

      const payload = {
        merchant_id: ZARINPAL_MERCHANT_ID,
        authority,
        amount: amountInRial
      };

      const response = await axios.post(`${zarinpalBaseUrl}/verify.json`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
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
      res.status(500).json({ error: "Internal server error during payment verification" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
