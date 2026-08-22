import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { db, verifyPassword } from './db';

const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET || 'golarys_super_secret_key_2026_persian_flowers';

export interface AuthUserPayload {
  userId: string;
  phone: string;
  fullName: string;
  role: 'user' | 'admin';
}

export function createToken(payload: AuthUserPayload, expiresInMs = 30 * 24 * 60 * 60 * 1000): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Date.now() + expiresInMs;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): AuthUserPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (signature !== expectedSig) return null;

    const decoded = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (decoded.exp && Date.now() > decoded.exp) {
      return null;
    }
    return {
      userId: decoded.userId,
      phone: decoded.phone,
      fullName: decoded.fullName,
      role: decoded.role
    };
  } catch (err) {
    return null;
  }
}

// Middleware: Admin Authentication
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : authHeader.trim();

  if (!token) {
    return res.status(401).json({ error: 'دسترسی غیرمجاز: لطفاً وارد پنل مدیریت شوید.' });
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    return res.status(403).json({ error: 'اعتبار نشست مدیریت منقضی شده یا نامعتبر است.' });
  }

  (req as any).admin = payload;
  next();
}

// Middleware: User Authentication (Optional or Required)
export function requireUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : authHeader.trim();

  if (!token) {
    return res.status(401).json({ error: 'لطفاً ابتدا وارد حساب کاربری خود شوید.' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'نشست کاربری شما منقضی شده است.' });
  }

  (req as any).user = payload;
  next();
}

export function optionalUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : authHeader.trim();

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      (req as any).user = payload;
    }
  }
  next();
}
