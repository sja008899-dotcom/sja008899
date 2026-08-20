import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory / serverless email mailbox buffer for Golarys official domain
let inMemoryMailbox: Array<{
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  verificationCode?: string;
}> = [
  {
    id: 'system-welcome',
    from: 'system@golarys.ir',
    to: 'info@golarys.ir',
    subject: 'خوش‌آمدگویی به صندوق ایمیل سازمانی گل آریس',
    body: 'صندوق ایمیل سازمانی رسمی info@golarys.ir فعال است. ایمیل‌ها و کدهای تایید اینماد و سایر سامانه‌ها در این بخش ثبت و نمایش داده می‌شوند.',
    date: new Date().toISOString()
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET: Fetch inbox emails
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'success',
      email: 'info@golarys.ir',
      inbox: inMemoryMailbox
    });
  }

  // POST: Receive incoming email or webhook from eNamad / Contact form
  if (req.method === 'POST') {
    const { from, to, subject, body, text, html } = req.body || {};
    const content = body || text || html || '';

    // Extract potential 4-8 digit verification code if present
    const codeMatch = content.match(/\b\d{4,8}\b/);
    const verificationCode = codeMatch ? codeMatch[0] : undefined;

    const newMail = {
      id: 'mail-' + Date.now(),
      from: from || 'support@enamad.ir',
      to: to || 'info@golarys.ir',
      subject: subject || 'پیام دریافتی برای گل آریس',
      body: content || 'متن ایمیل دریافتی',
      date: new Date().toISOString(),
      verificationCode
    };

    inMemoryMailbox.unshift(newMail);

    return res.status(200).json({
      status: 'success',
      message: 'ایمیل با موفقیت در صندوق سازمانی گل آریس دریافت شد',
      mail: newMail
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
