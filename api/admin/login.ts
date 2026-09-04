import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { password } = req.body || {};
    const cleanPass = (password || '').toString().trim();

    if (!cleanPass) {
      return res.status(400).json({ error: 'رمز عبور مدیریت الزامی است.' });
    }

    if (cleanPass.toLowerCase() === 'eylma') {
      const token = 'admin_jwt_' + Date.now();
      return res.status(200).json({
        success: true,
        token,
        message: 'ورود موفقیت‌آمیز به پنل مدیریت گل آریس'
      });
    }

    return res.status(401).json({ error: 'رمز عبور مدیریت نادرست است.' });
  } catch (error) {
    return res.status(500).json({ error: 'خطای سرور در بررسی رمز مدیریت' });
  }
}
