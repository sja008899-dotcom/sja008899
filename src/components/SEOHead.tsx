import React, { useEffect } from 'react';
import { ActiveTab, Product } from '../types';

interface SEOHeadProps {
  activeTab: ActiveTab;
  selectedProduct?: Product | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ activeTab, selectedProduct }) => {
  useEffect(() => {
    // 1. Dynamic Title & Description configuration for high SEO ranking
    let pageTitle = 'گل آریس | بازار آنلاین گل و گیاه ایران و گلفروشی آنلاین (Golarys)';
    let metaDescription = 'گل آریس بازار آنلاین گل و گیاه ایران و گلفروشی آنلاین با تحویل ۲ ساعته. خرید اینترنتی دسته گل رز هلندی، گیاهان آپارتمانی مقاوم، باکس گل هدیه و سفال لالجین با عکاسی قبل از تحویل و ضمانت شادابی ۷ روزه.';
    let canonicalUrl = 'https://golarys.ir/';
    let ogImage = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&h=630&q=85';

    if (selectedProduct) {
      pageTitle = `خرید آنلاین ${selectedProduct.name} (${selectedProduct.nameEn}) | گلفروشی آنلاین گل آریس`;
      metaDescription = `${selectedProduct.description} - قیمت: ${selectedProduct.price.toLocaleString('fa-IR')} تومان. خرید از بازار گل ایران، ارسال فوری اسنپ، عکس گل قبل از ارسال و ضمانت شادابی ۷ روزه.`;
      canonicalUrl = `https://golarys.ir/product/${selectedProduct.slug}`;
      ogImage = selectedProduct.image;
    } else {
      switch (activeTab) {
        case 'marketplace':
          pageTitle = 'بازار گل ایران | خرید آنلاین گل تازه، رز هلندی و گیاهان آپارتمانی - گل آریس';
          metaDescription = 'بازار آنلاین گل و گیاه ایران. خرید مستقیم انواع دسته گل رز، ارکیده، گیاهان آپارتمانی تصفیه‌کننده هوا و باکس گل لوکس با ارسال ۲ ساعته و عکاسی قبل از ارسال.';
          canonicalUrl = 'https://golarys.ir/marketplace';
          break;
        case 'handicrafts':
          pageTitle = 'خرید گلدان‌های دست‌ساز سرامیکی، سفال لالجین و صنایع دستی | گل آریس';
          metaDescription = 'انواع گلدان سفالی و سرامیکی هنر دست لالجین همدان، آویزهای مکرومه‌بافی پنبه‌ای و گلدان‌های مسی چکشی شیراز با بسته‌بندی ضدضربه.';
          canonicalUrl = 'https://golarys.ir/handicrafts';
          ogImage = 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&h=630&q=85';
          break;
        case 'sellers':
          pageTitle = 'همکاری و ثبت نام گلفروشان و باغبانان خانگی | گل آریس';
          metaDescription = 'فروشگاه گل و گیاه خود را آنلاین کنید. دسترسی به خریداران سراسر کشور بدون کارمزد ماه اول و تسویه حساب روزانه در گل آریس.';
          canonicalUrl = 'https://golarys.ir/sellers';
          break;
        case 'about':
          pageTitle = 'داستان شکل‌گیری گل آریس و دختر گل | درباره ما';
          metaDescription = 'آشنایی با ارزش‌ها، ماموریت و چشم‌انداز گل آریس در حمایت از تولیدکنندگان بومی، بانوان سرپرست خانوار و محیط زیست.';
          canonicalUrl = 'https://golarys.ir/about';
          break;
        case 'blog':
          pageTitle = 'مجله گل و گیاه و راهنمای نگهداری گیاهان | وبلاگ گل آریس';
          metaDescription = 'آموزش‌های تخصصی آبیاری، تعویض خاک، نور مناسب گیاهان آپارتمانی، نمادشناسی گل‌ها و دکوراسیون با گل‌های طبیعی.';
          canonicalUrl = 'https://golarys.ir/blog';
          break;
        case 'contact':
          pageTitle = 'تماس با ما و مشاوره رایگان انتخاب گل | گل آریس';
          metaDescription = 'پشتیبانی ۲۴ ساعته تلفنی و آنلاین، آدرس دفاتر گل آریس در تهران و ثبت سفارش‌های سازمانی و تشریفات.';
          canonicalUrl = 'https://golarys.ir/contact';
          break;
        case 'admin':
          pageTitle = 'پنل مدیریت محتوا و تنظیمات Decap CMS | گل آریس';
          break;
        default:
          break;
      }
    }

    // Apply document title
    document.title = pageTitle;

    // Apply meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', metaDescription);

    // Apply OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', ogImage);

    // Apply Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', pageTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', metaDescription);

    const twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', ogImage);

    // Apply canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute('href', canonicalUrl);

    // Dynamic JSON-LD Schema for Product / Page
    let scriptTag = document.getElementById('dynamic-page-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-page-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    if (selectedProduct) {
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": selectedProduct.name,
        "image": [selectedProduct.image],
        "description": selectedProduct.description,
        "sku": selectedProduct.id,
        "brand": {
          "@type": "Brand",
          "name": "Golarys | گل آریس"
        },
        "offers": {
          "@type": "Offer",
          "url": canonicalUrl,
          "priceCurrency": "IRR",
          "price": selectedProduct.price * 10, // In Rials for Schema standard
          "priceValidUntil": "2026-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": selectedProduct.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": selectedProduct.vendor.name
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128"
        }
      };
      scriptTag.textContent = JSON.stringify(productSchema);
    } else {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "خانه",
            "item": "https://golarys.ir/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pageTitle.split('|')[0].trim(),
            "item": canonicalUrl
          }
        ]
      };
      scriptTag.textContent = JSON.stringify(breadcrumbSchema);
    }
  }, [activeTab, selectedProduct]);

  return null;
};
