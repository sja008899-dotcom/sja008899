import axios from 'axios';

// In-memory rate limiting map for OTP requests: IP/Mobile -> timestamps[]
const rateLimits: Record<string, number[]> = {};

export function checkRateLimit(key: string, maxRequests = 3, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = (rateLimits[key] || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }
  timestamps.push(now);
  rateLimits[key] = timestamps;
  return true;
}

export async function sendSmsNotification(
  phone: string,
  message: string,
  template?: string
): Promise<{ success: boolean; messageId?: string; simulated?: boolean }> {
  const kavenegarKey = process.env.KAVENEGAR_API_KEY;
  const cleanPhone = phone.trim().replace(/\D/g, '');

  if (kavenegarKey && kavenegarKey !== 'YOUR_KAVENEGAR_API_KEY') {
    try {
      const url = `https://api.kavenegar.com/v1/${kavenegarKey}/sms/send.json`;
      const response = await axios.post(
        url,
        null,
        {
          params: {
            receptor: cleanPhone,
            message: message,
            sender: process.env.SMS_SENDER || '10008663'
          }
        }
      );
      if (response.data && response.data.return?.status === 200) {
        return { success: true, messageId: response.data.entries?.[0]?.messageid?.toString() };
      }
    } catch (err: any) {
      console.error('Kavenegar SMS delivery failed:', err?.response?.data || err.message);
    }
  }

  // Robust Server Log for production/preview without active SMS line balance
  console.log(`[SMS DISPATCH - GOLARYS] To: ${cleanPhone} | Text: ${message}`);
  return { success: true, simulated: true };
}
