/**
 * scripts/generate-sitemap.js
 * Golarys (گل آریس) Automated Sitemap Generator
 * 
 * Features:
 * 1. Crawls internal routes, categories, products, and blog posts.
 * 2. Filters out query parameters (?query=...), duplicate routes, and non-SEO pages (checkout, admin, auth, tracking, api).
 * 3. Assigns strict SEO priority & change frequency:
 *    - Home (1.0, daily)
 *    - Main Categories & Products (0.9, daily/weekly)
 *    - Blog Posts (0.8, weekly)
 *    - Informational Pages (0.6, monthly)
 * 4. Outputs a standard, W3C compliant sitemap.xml with image extensions to /public/sitemap.xml and /sitemap.xml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'https://www.golarys.ir';
const TODAY = new Date().toISOString().split('T')[0];

// Blacklisted keywords / paths to exclude from indexing
const EXCLUDED_PATTERNS = [
  /^\/admin/i,
  /^\/checkout/i,
  /^\/cart/i,
  /^\/api/i,
  /^\/login/i,
  /^\/register/i,
  /^\/auth/i,
  /^\/tracking/i,
  /^\/receipt/i,
  /^\/user-profile/i,
  /\?.*$/, // Remove query parameters
  /#.*$/   // Remove hash fragments
];

// Core static pages with explicit priority
const STATIC_ROUTES = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    title: 'گل آریس | بازار آنلاین گل و گیاه و گلفروشی آنلاین ایران',
    caption: 'خرید آنلاین گل شاخه بریده، باکس گل رز هلندی، گیاهان آپارتمانی و گلدان‌های سرامیکی لالجین',
    image: 'https://www.golarys.ir/logo-gold.png'
  },
  {
    path: '/marketplace',
    priority: '0.9',
    changefreq: 'daily',
    title: 'بازار گل و محصولات گل آریس',
    caption: 'فهرست کامل گل‌ها، سبدها و باکس‌های گل تازه روز'
  },
  {
    path: '/handicrafts',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'گلدان‌ها و سفال لالجین همدان',
    caption: 'خرید انواع گلدان‌های سرامیکی لعاب‌دار دست‌ساز لالجین'
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'وبلاگ تخصصی نگهداری و پرورش گل و گیاه',
    caption: 'آموزش‌های تخصصی نگهداری گل رز، ارکیده و گیاهان آپارتمانی'
  },
  {
    path: '/seller-registration',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'ثبت‌نام فروشندگان و باغبانان در بازار گل آریس',
    caption: 'فروش مستقیم گل و گیاه بدون واسطه در گل آریس'
  },
  {
    path: '/about',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'درباره گل آریس | داستان برند و تعهد کیفیت',
    caption: 'آشنایی با تاریخچه و تیم تخصصی گل آریس'
  },
  {
    path: '/contact',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'تماس با پشتیبانی گل آریس',
    caption: 'اطلاعات تماس، نشانی دفتر مرکزی و پشتیبانی سفارشات'
  }
];

/**
 * Clean & normalize URL paths
 */
function cleanPath(rawUrl) {
  if (!rawUrl) return null;
  
  // Strip protocol and domain if full URL was provided
  let clean = rawUrl.replace(/^https?:\/\/(www\.)?golarys\.ir/i, '');
  
  // Strip queries and hash
  clean = clean.split('?')[0].split('#')[0];
  
  // Ensure leading slash
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  
  // Remove trailing slash unless root
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }

  // Check exclusion list
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(clean)) {
      return null;
    }
  }

  return clean;
}

/**
 * Load dynamic data (categories, products, blog posts) from code files
 */
async function loadDynamicRoutes() {
  const dynamicRoutes = [];

  try {
    const dataFilePath = path.join(ROOT_DIR, 'src', 'data', 'initialContent.ts');
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

      // 1. Extract Categories (Priority: 0.9)
      const categoryMatches = [...fileContent.matchAll(/slug:\s*["']([^"']+)["']/g)];
      const seenCategories = new Set();
      for (const match of categoryMatches) {
        const slug = match[1];
        if (slug && !seenCategories.has(slug) && slug !== 'all') {
          seenCategories.add(slug);
          dynamicRoutes.push({
            path: `/category/${slug}`,
            priority: '0.9',
            changefreq: 'weekly',
            title: `خرید آنلاین ${slug} - گل آریس`
          });
        }
      }

      // 2. Extract Products (Priority: 0.9)
      const productIdMatches = [...fileContent.matchAll(/id:\s*["'](prod_[^"']+|p\d+|prod-[^"']+)["']/g)];
      const seenProducts = new Set();
      for (const match of productIdMatches) {
        const prodId = match[1];
        if (prodId && !seenProducts.has(prodId)) {
          seenProducts.add(prodId);
          dynamicRoutes.push({
            path: `/product/${prodId}`,
            priority: '0.9',
            changefreq: 'daily',
            title: `مشاهده و خرید محصول ${prodId}`
          });
        }
      }

      // 3. Extract Blog Posts (Priority: 0.8)
      const blogMatches = [...fileContent.matchAll(/id:\s*["'](post_[^"']+|blog_[^"']+|b\d+)["']/g)];
      const seenBlogPosts = new Set();
      for (const match of blogMatches) {
        const postId = match[1];
        if (postId && !seenBlogPosts.has(postId)) {
          seenBlogPosts.add(postId);
          dynamicRoutes.push({
            path: `/blog/${postId}`,
            priority: '0.8',
            changefreq: 'weekly',
            title: `مقاله آموزشی ${postId}`
          });
        }
      }
    }
  } catch (err) {
    console.warn('⚠️ Warning: Could not dynamically extract all models from file:', err.message);
  }

  return dynamicRoutes;
}

/**
 * Generate XML string
 */
function buildSitemapXml(urlList) {
  const xmlEntries = urlList.map(item => {
    let entry = `  <url>\n    <loc>${BASE_URL}${item.path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${item.changefreq || 'weekly'}</changefreq>\n    <priority>${item.priority || '0.5'}</priority>`;
    
    if (item.image) {
      entry += `\n    <image:image>\n      <image:loc>${item.image}</image:loc>`;
      if (item.title) entry += `\n      <image:title>${escapeXml(item.title)}</image:title>`;
      if (item.caption) entry += `\n      <image:caption>${escapeXml(item.caption)}</image:caption>`;
      entry += `\n    </image:image>`;
    }

    entry += `\n  </url>`;
    return entry;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
<!-- Generated automatically by Golarys Sitemap Generator on ${new Date().toISOString()} -->
${xmlEntries}
</urlset>\n`;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Main execution
 */
async function run() {
  console.log('🚀 Starting Golarys sitemap generation...');

  const allUrlsMap = new Map();

  // 1. Add static verified routes
  for (const item of STATIC_ROUTES) {
    const cleaned = cleanPath(item.path);
    if (cleaned !== null) {
      allUrlsMap.set(cleaned, { ...item, path: cleaned });
    }
  }

  // 2. Add dynamic routes
  const dynamicRoutes = await loadDynamicRoutes();
  for (const item of dynamicRoutes) {
    const cleaned = cleanPath(item.path);
    if (cleaned !== null && !allUrlsMap.has(cleaned)) {
      allUrlsMap.set(cleaned, { ...item, path: cleaned });
    }
  }

  const sortedUrlList = Array.from(allUrlsMap.values()).sort((a, b) => {
    return parseFloat(b.priority) - parseFloat(a.priority);
  });

  const sitemapXml = buildSitemapXml(sortedUrlList);

  // Write to /public/sitemap.xml (for Vite build)
  const publicDir = path.join(ROOT_DIR, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
  console.log(`✅ Successfully generated: ${publicSitemapPath}`);

  // Also write to root /sitemap.xml (if required by direct crawlers)
  const rootSitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(rootSitemapPath, sitemapXml, 'utf-8');
  console.log(`✅ Successfully generated: ${rootSitemapPath}`);

  console.log(`🎉 Total indexed URLs: ${sortedUrlList.length}`);
}

run().catch(err => {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
});
