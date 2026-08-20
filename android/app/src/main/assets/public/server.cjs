var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_path = __toESM(require("path"), 1);
var import_axios = __toESM(require("axios"), 1);
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use((0, import_cors.default)());
  app.use(import_express.default.json());
  const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const IS_SANDBOX = process.env.ZARINPAL_SANDBOX !== "false";
  const zarinpalBaseUrl = IS_SANDBOX ? "https://sandbox.zarinpal.com/pg/v4/payment" : "https://api.zarinpal.com/pg/v4/payment";
  const zarinpalStartPayUrl = IS_SANDBOX ? "https://sandbox.zarinpal.com/pg/StartPay" : "https://www.zarinpal.com/pg/StartPay";
  app.post("/api/payment/request", async (req, res) => {
    try {
      const { amount, description, callback_url, mobile, email } = req.body;
      if (!amount || !description || !callback_url) {
        return res.status(400).json({ error: "Amount, description, and callback_url are required." });
      }
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
      const response = await import_axios.default.post(`${zarinpalBaseUrl}/request.json`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      if (response.data.data && response.data.data.code === 100) {
        const authority = response.data.data.authority;
        const paymentUrl = `${zarinpalStartPayUrl}/${authority}`;
        res.json({ authority, paymentUrl });
      } else {
        res.status(400).json({ error: "Failed to create payment token", details: response.data.errors });
      }
    } catch (error) {
      console.error("Payment request error:", error?.response?.data || error.message);
      res.status(500).json({ error: "Internal server error during payment request" });
    }
  });
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
      const response = await import_axios.default.post(`${zarinpalBaseUrl}/verify.json`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      if (response.data.data && (response.data.data.code === 100 || response.data.data.code === 101)) {
        res.json({
          success: true,
          ref_id: response.data.data.ref_id,
          code: response.data.data.code,
          message: response.data.data.code === 100 ? "Payment verified successfully." : "Payment already verified."
        });
      } else {
        res.status(400).json({
          success: false,
          code: response.data.errors?.code,
          message: response.data.errors?.message || "Payment verification failed."
        });
      }
    } catch (error) {
      console.error("Payment verify error:", error?.response?.data || error.message);
      res.status(500).json({ error: "Internal server error during payment verification" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
