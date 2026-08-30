export function formatToman(amount: number): string {
  return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
}

export function toPersianDigits(n: number | string): string {
  const persianMap = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/\d/g, (d) => persianMap[parseInt(d, 10)]);
}

/**
 * Converts Persian (۰-۹) and Arabic (٠-٩) digits to standard Latin digits (0-9)
 */
export function toEnglishDigits(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/[۰٠]/g, '0')
    .replace(/[۱١]/g, '1')
    .replace(/[۲٢]/g, '2')
    .replace(/[۳٣]/g, '3')
    .replace(/[۴٤]/g, '4')
    .replace(/[۵٥]/g, '5')
    .replace(/[۶٦]/g, '6')
    .replace(/[۷٧]/g, '7')
    .replace(/[۸٨]/g, '8')
    .replace(/[۹٩]/g, '9');
}

/**
 * Sanitizes and normalizes a Persian phone number into standard 09xxxxxxxxx format
 */
export function sanitizePersianPhone(phone: string): string {
  if (!phone) return '';
  let cleaned = toEnglishDigits(phone).replace(/[^\d+]/g, '').trim();
  
  // Convert +989... to 09...
  if (cleaned.startsWith('+98')) {
    cleaned = '0' + cleaned.substring(3);
  } else if (cleaned.startsWith('0098')) {
    cleaned = '0' + cleaned.substring(4);
  } else if (cleaned.startsWith('98') && cleaned.length === 12) {
    cleaned = '0' + cleaned.substring(2);
  } else if (cleaned.startsWith('9') && cleaned.length === 10) {
    cleaned = '0' + cleaned;
  }
  
  return cleaned;
}

/**
 * Escapes HTML characters to prevent XSS in user generated text
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Normalizes Persian and Arabic text for seamless search and indexing:
 * - Unifies Persian and Arabic Yeh (ي -> ی, ئ -> ی, ى -> ی)
 * - Unifies Persian and Arabic Kaf (ك -> ک)
 * - Normalizes Heh with Ye / Hamza (ۀ -> ه, ة -> ه)
 * - Normalizes Alef variations (آ, أ, إ -> ا)
 * - Removes Zero-Width Non-Joiners (نیم‌فاصله) & replaces with space for matching
 * - Converts Arabic/Persian numbers to Latin for comparison
 * - Removes Arabic diacritics (harakat / tanwin / tashdid)
 */
export function normalizePersianText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // Remove Arabic diacritics (َ ِ ُ ً ٍ ٌ ّ ْ)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alef variations
    .replace(/[آأإٱ]/g, 'ا')
    // Normalize Yeh variations
    .replace(/[يىئ]/g, 'ی')
    // Normalize Kaf
    .replace(/[ك]/g, 'ک')
    // Normalize Heh & Teh Marbuta
    .replace(/[ةۀ]/g, 'ه')
    // Normalize Vav with Hamza
    .replace(/[ؤ]/g, 'و')
    // Convert Persian & Arabic digits to standard digits
    .replace(/[۰٠]/g, '0')
    .replace(/[۱١]/g, '1')
    .replace(/[۲٢]/g, '2')
    .replace(/[۳٣]/g, '3')
    .replace(/[۴٤]/g, '4')
    .replace(/[۵٥]/g, '5')
    .replace(/[۶٦]/g, '6')
    .replace(/[۷٧]/g, '7')
    .replace(/[۸٨]/g, '8')
    .replace(/[۹٩]/g, '9')
    // Replace ZWNJ (Zero-Width Non-Joiner) and multiple spaces with a single space
    .replace(/[\u200C\u200B\u200D\uFEFF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Searches if search query exists within target text (ignoring half-space, diacritics, and Arabic/Persian letter variations)
 */
export function matchPersianSearch(target: string, query: string): boolean {
  if (!query || !query.trim()) return true;
  if (!target) return false;
  
  const normTarget = normalizePersianText(target);
  const normQuery = normalizePersianText(query);
  
  // Direct match
  if (normTarget.includes(normQuery)) return true;

  // Match without any spaces (e.g. "دسته‌گل" vs "دسته گل" vs "دستهگل")
  const compactTarget = normTarget.replace(/\s+/g, '');
  const compactQuery = normQuery.replace(/\s+/g, '');
  if (compactTarget.includes(compactQuery)) return true;

  // Word by word matching for multi-word queries (e.g. "رز هلندی قرمز")
  const queryWords = normQuery.split(' ').filter(Boolean);
  if (queryWords.length > 1) {
    return queryWords.every((word) => normTarget.includes(word));
  }

  return false;
}

