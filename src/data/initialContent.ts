import { SiteContent, Product, Vendor, Category, BlogPost, Testimonial } from '../types';

export const initialSiteContent: SiteContent = {
  site: {
    brand: {
      name_en: "Golarys",
      name_fa: "گل آریس",
      tagline: "FLOWERS & PLANTS MARKETPLACE",
      email: "info@golarys.ir",
      phone: "021-12345678",
      address: "تهران، خیابان ولیعصر، تقاطع بهشتی، مجتمع نیلوفر، واحد ۱۰۴",
      social: {
        instagram: "https://instagram.com/golarys",
        telegram: "https://t.me/golarys",
        whatsapp: "https://wa.me/989123456789"
      }
    },
    hero: {
      headline: "گل تازه، با عشق تحویل داده می‌شود",
      subheadline: "از صدها گلفروش محلی و پرورش‌دهنده خانگی خرید کنید. هدیه‌ای همراه با پیام شخصی و بسته‌بندی لوکس ارسال کنید.",
      cta_primary: "همین حالا خرید کنید",
      cta_secondary: "درباره ما",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80",
      alt: "دسته گل زیبا و لوکس گل آریس"
    },
    values: [
      {
        icon: "🌸",
        title: "تنوع گسترده و گل تازه روز",
        text: "گل و گیاه دست‌چین شده از بهترین گلفروشان حرفه‌ای و پرورش‌دهندگان با تجربه خانگی با ضمانت شادابی ۷ روزه."
      },
      {
        icon: "🔒",
        title: "پرداخت امن و تضمین اصالت",
        text: "پرداخت آنلاین امن با درگاه‌های معتبر شاپرک همراه با ضمانت بازگشت وجه در صورت عدم رضایت."
      },
      {
        icon: "🚚",
        title: "تحویل فوری و ارسال مطمئن",
        text: "ارسال اکسپرس ۲ ساعته با اسنپ در تهران و کلان‌شهرها و ارسال استاندارد ویژه با تیپاکس به سراسر ایران."
      },
      {
        icon: "💌",
        title: "کارت هدیه با پیام شخصی",
        text: "امکان طراحی آنلاین کارت پستال دست‌نویس با مهر و موم اختصاصی و بسته‌بندی هدیه برای عزیزان شما."
      }
    ],
    categories: [
      {
        slug: "roses",
        name: "رزها و باکس گل",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        alt: "دسته گل رز هلندی و مینیاتوری"
      },
      {
        slug: "orchids",
        name: "ارکیده‌های خاص",
        image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80",
        alt: "گلدان ارکیده فالانوپسیس سفید و بنفش"
      },
      {
        slug: "sunflowers",
        name: "آفتابگردان و گل‌های آفتابی",
        image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
        alt: "دسته گل آفتابگردان پر انرژی"
      },
      {
        slug: "houseplants",
        name: "گیاهان آپارتمانی و تصفیه‌کننده",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
        alt: "گیاهان گلدانی آپارتمانی مقاوم"
      },
      {
        slug: "handicrafts",
        name: "صنایع دستی و گلدان‌های هنری",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
        alt: "گلدان سرامیکی و صنایع دستی دست‌ساز"
      },
      {
        slug: "gift-baskets",
        name: "سبد و پکیج‌های هدیه لوکس",
        image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
        alt: "سبد گل و شکلات هدیه"
      },
      {
        slug: "seasonal",
        name: "گل‌های فصلی و معطر",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80",
        alt: "شکوفه‌ها و گل‌های بهاری و فصلی"
      }
    ],
    testimonials: [
      {
        name: "سارا محمدی",
        rating: 5,
        text: "سفارش من برای تولد دوستم دقیقاً مثل عکس سایت بود و سر ساعت ۲ بعدازظهر با بسته‌بندی عالی و کارت دست‌نویس رسید. دوستم حسابی ذوق کرد!",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "مهدی رستگار",
        rating: 5,
        text: "کیفیت گل‌های رز هلندی بی‌نظیر بود و بیش از ۸ روز شاداب ماندند. از پشتیبانی عالی و پیگیری وضعیت ارسال تیم گل آریس تشکر می‌کنم.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "الناز افشار",
        rating: 5,
        text: "از اینکه تونستم مستقیماً از یک خانم پرورش‌دهنده خانگی گل بونسای تهیه کنم خیلی حس خوبی داشت. قیمت‌ها بسیار منصفانه و گیاه فوق‌العاده سرحال بود.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
      }
    ],
    about: {
      story: "گل آریس از قصهٔ «دختر گل» الهام گرفت؛ دختری که با عشق گل می‌فروخت و در کوچه‌پس‌کوچه‌های شهر لبخند هدیه می‌داد. ما در گل آریس بازاری امن و شفاف خلق کرده‌ایم تا بیش از ۵۰۰ گلفروش محلی مستقل و صدها پرورش‌دهنده خانگی با ذوق، بتوانند دسترنج طبیعی و دست‌چین خود را بدون واسطه به دست عاشقان طبیعت در سراسر ایران برسانند.",
      mission: "تسهیل دسترسی سریع به گل و گیاه طبیعی با بالاترین کیفیت، توانمندسازی کسب‌وکارهای کوچک و محلی و خلق تجربهٔ به یادماندنی از ارسال مهر و هدیه به عزیزان.",
      vision: "تبدیل شدن به اولین و معتبرترین پلتفرم بازار گل و گیاه در خاورمیانه با رعایت اصول پایداری زیست‌محیطی و بسته‌بندی دوستدار طبیعت.",
      values: [
        "اصالت و شادابی تضمین‌شده گل‌ها",
        "حمایت از گلفروشان محلی و زنان پرورش‌دهنده خانگی",
        "شفافیت، صداقت و احترام به مشتری",
        "نوآوری در بسته‌بندی هدیه و خدمات اکسپرس"
      ]
    },
    sellers: {
      commission: "۵٪",
      settlement: "تسویه حساب خودکار ظرف ۴۸ ساعت پس از تایید تحویل",
      delivery: "همکاری با ناوگان سریع اسنپ (اکسپرس درون‌شهری) و تیپاکس (ارسال هوایی و زمینی کشوری)",
      steps: [
        "ثبت‌نام آنلاین و تکمیل فرم مدارک فروشنده در کمتر از ۵ دقیقه",
        "عکاسی و بارگذاری محصولات همراه با قیمت‌گذاری دلخواه",
        "دریافت پیامک سفارشات و آماده‌سازی گل با بسته‌بندی استاندارد",
        "تحویل به سفیر اسنپ/تیپاکس و واریز وجه ۴۸ ساعت بعد به حساب بانکی"
      ]
    },
    seo: {
      meta_description: "خرید آنلاین گل و گیاه از گلفروشان محلی و پرورش‌دهندگان خانگی در سراسر ایران. ارسال هدیه با پیام شخصی.",
      keywords: "گل, گیاه, خرید گل آنلاین, ارسال هدیه, گل فروشی, رز هلندی, گیاه آپارتمانی"
    }
  }
};

export const sampleVendors: Vendor[] = [
  {
    id: "v-1",
    name: "گلفروشی باغ ارغوان",
    city: "تهران (نیاوران)",
    type: "local_florist",
    rating: 4.9,
    reviewsCount: 342,
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
    badge: "فروشنده برگزیده ماه",
    bio: "تخصص در دیزاین دسته گل‌های ژورنالی، رزهای دست‌چین هلندی و باکس‌های تشریفاتی با ۱۵ سال سابقه در منطقه شمیرانات.",
    deliveryMethods: ['snap', 'tipax']
  },
  {
    id: "v-2",
    name: "گلخانه سبز خانگی ترنج (مریم رحیمی)",
    city: "کرج (مهرشهر)",
    type: "home_grower",
    rating: 5.0,
    reviewsCount: 188,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    badge: "پرورش‌دهنده برتر خانگی",
    bio: "پرورش تخصصی ارکیده‌های کمیاب و بونسای‌های ریشه‌دار در گلخانه خانگی با نور و رطوبت طبیعی بدون سموم شیمیایی.",
    deliveryMethods: ['snap', 'tipax']
  },
  {
    id: "v-3",
    name: "استودیو گل باران",
    city: "اصفهان (چهارباغ)",
    type: "local_florist",
    rating: 4.8,
    reviewsCount: 215,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    badge: "طراح گل‌های مینیمال",
    bio: "خلق ترکیب‌های هنری مدرن با گل‌های فصلی، آفتابگردان و داوودی در بسته‌بندی‌های کاغذی کرافت و اکوفرندلی.",
    deliveryMethods: ['snap', 'tipax']
  },
  {
    id: "v-4",
    name: "گلستان فردوس (علی اکبری)",
    city: "محلات (شهر گل)",
    type: "home_grower",
    rating: 4.9,
    reviewsCount: 512,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    badge: "تولیدکننده مستقیم از مهد گل",
    bio: "ارسال مستقیم و تازه از مزارع گل محلات به سراسر کشور با بسته‌بندی ویژه حفظ رطوبت و اکسیژن.",
    deliveryMethods: ['tipax']
  },
  {
    id: "v-5",
    name: "استودیو سرامیک خاک و خورشید (استاد کاوه)",
    city: "همدان (لالجین)",
    type: "artisan",
    rating: 5.0,
    reviewsCount: 280,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    badge: "استادکار سفال و سرامیک دست‌ساز",
    bio: "ساخت ظروف و گلدان‌های سرامیکی لعاب‌خورده دست‌ساز با الهام از معماری کهن ایرانی و فرم‌های مینیمال معاصر.",
    deliveryMethods: ['tipax', 'snap']
  },
  {
    id: "v-6",
    name: "کارگاه هنر مکرومه تار و پود (فرزانه نوری)",
    city: "تهران (یوسف‌آباد)",
    type: "artisan",
    rating: 4.9,
    reviewsCount: 164,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    badge: "هنرمند دست‌بافت‌های گیاهی",
    bio: "بافت آویزهای گلدانی و دیواری مکرومه با نخ ۱۰۰٪ پنبه طبیعی با گره‌های مقاوم و حلقه‌های چوب طبیعی گردو.",
    deliveryMethods: ['snap', 'tipax']
  },
  {
    id: "v-7",
    name: "آتلیه قلم‌زنی و مس نقش جهان (استاد اصفهانی)",
    city: "اصفهان (میدان نقش جهان)",
    type: "artisan",
    rating: 4.9,
    reviewsCount: 195,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    badge: "استاد قلم‌زنی و فیروزه‌کوبی",
    bio: "تولید گلدان‌های مسی قلم‌زنی برجسته و فیروزه‌کوبی با پوشش محافظ پلی‌استر نانو ضدتیرگی جهت ماندگاری مادام‌العمر.",
    deliveryMethods: ['tipax']
  }
];

export const sampleProducts: Product[] = [
  {
    id: "p-1",
    name: "باکس گل رز سرخ سلطنتی «آریس»",
    nameEn: "Royal Red Rose Velvet Box",
    slug: "royal-red-rose-box",
    categorySlug: "roses",
    price: 1450000,
    originalPrice: 1680000,
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"
    ],
    description: "ترکیبی خیره‌کننده از ۲۰ شاخه رز هلندی سوپر ممتاز با ماندگاری طولانی، چینش هنرمندانه در باکس مخمل مشکی و طلایی با روبان ابریشمی و اسفنج آبکش تخصصی اوآسیس.",
    careInstructions: "روزانه نصف فنجان آب خنک به اسفنج مرکزی اضافه کنید. دور از تابش مستقیم آفتاب و باد مستقیم کولر نگهداری شود.",
    freshnessGuaranteeDays: 7,
    vendor: sampleVendors[0],
    inStock: true,
    isBestseller: true,
    tags: ["رز هلندی", "هدیه عاشقانه", "باکس لوکس", "ارسال ۲ ساعته"],
    size: "لوکس"
  },
  {
    id: "p-2",
    name: "گلدان سرامیکی ارکیده دوقلو فالانوپسیس سفید",
    nameEn: "White Phalaenopsis Double Stem Orchid",
    slug: "white-phalaenopsis-orchid",
    categorySlug: "orchids",
    price: 1890000,
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566977776052-6e61e358dd24?auto=format&fit=crop&w=800&q=80"
    ],
    description: "ارکیده اصیل و دو شاخه پر از غنچه‌های سفید برفی در گلدان سرامیکی دست‌ساز طلایی مات. نماد شکوه، صلح و آرامش با طول عمر گلدهی بیش از ۲ ماه.",
    careInstructions: "هفته‌ای یک‌بار آبیاری با آب تصفیه شده (یا ۲ قالب یخ کوچک روی خاک). نیازمند نور فیلتر شده پشت پنجره.",
    freshnessGuaranteeDays: 45,
    vendor: sampleVendors[1],
    inStock: true,
    isBestseller: true,
    tags: ["ارکیده خانگی", "هدیه اداری", "گیاه لوکس", "ماندگاری بالا"],
    size: "متوسط"
  },
  {
    id: "p-3",
    name: "دسته گل درخشان آفتابگردان و ژیپسوفیلا",
    nameEn: "Sunshine Meadow Bouquet",
    slug: "sunshine-meadow-bouquet",
    categorySlug: "sunflowers",
    price: 890000,
    originalPrice: 990000,
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
    description: "دسته گل پرانرژی متشکل از ۷ شاخه آفتابگردان تازه چیده شده مزرعه، گل عروس (ژیپسوفیلا) و برگ‌های اکالیپتوس معطر در کاغذپیچی کرافت طبیعی و بند کنفی.",
    careInstructions: "انتهای ساقه‌ها را با زاویه ۴۵ درجه در آب ولرم با غذای گل برش دهید. هر ۲ روز آب گلدان را تعویض کنید.",
    freshnessGuaranteeDays: 6,
    vendor: sampleVendors[2],
    inStock: true,
    isSeasonal: true,
    tags: ["آفتابگردان", "انرژی بخش", "بسته‌بندی کرافت", "تبریک تولد"],
    size: "متوسط"
  },
  {
    id: "p-4",
    name: "گیاه آپارتمانی مونسترا (برگ انجیری) غول‌پیکر",
    nameEn: "Monstera Deliciosa Indoor Plant",
    slug: "monstera-deliciosa-pot",
    categorySlug: "houseplants",
    price: 1120000,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    description: "برگ انجیری درشت با برگ‌های شیاردار طبیعی و سلامت کامل در گلدان سفالی مینیمال. تصفیه‌کننده هوای قوی و جلوه‌بخش دکوراسیون منازل و دفاتر مدرن.",
    careInstructions: "هر زمان سطح خاک تا ۲ بند انگشت خشک شد آبیاری کنید. غبارپاشی برگ‌ها در هوای خشک توصیه می‌شود.",
    freshnessGuaranteeDays: 30,
    vendor: sampleVendors[1],
    inStock: true,
    tags: ["گیاه مقاوم", "تصفیه هوا", "برگ انجیری", "سبزینگی"],
    size: "بزرگ"
  },
  {
    id: "p-5",
    name: "پکیج هدیه لوکس «گل و شکلات آرتس»",
    nameEn: "Deluxe Blossom & Artisan Sweets Gift Box",
    slug: "deluxe-blossom-gift-box",
    categorySlug: "gift-baskets",
    price: 2350000,
    originalPrice: 2600000,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
    description: "باکس دو طبقه شامل گل‌های رز پاستلی، پیونی، شمع معطر موم عسل دست‌ساز، جعبه شکلات بلژیکی دست‌ساز و کارت پستال با نگارش اختصاصی شما.",
    careInstructions: "گل‌ها در اسفنج مرطوب تعبیه شده‌اند. روزانه کمی آب خنک اضافه شود.",
    freshnessGuaranteeDays: 7,
    vendor: sampleVendors[0],
    inStock: true,
    isBestseller: true,
    tags: ["پکیج هدیه", "شکلات دست‌ساز", "شمع معطر", "بسته‌بندی VIP"],
    size: "لوکس"
  },
  {
    id: "p-6",
    name: "دسته گل بهاری پیونی و لاله پاستلی",
    nameEn: "Pastel Peony & Tulip Dream",
    slug: "pastel-peony-tulip-dream",
    categorySlug: "seasonal",
    price: 1650000,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    description: "ترکیبی رویایی از پیونی‌های باز نشده صورتی، لاله‌های هلندی بنفش ملایم و آلسترومریا با عطر دلنشین بهار در کاغذ هندی ضدآب.",
    careInstructions: "در جای خنک و دور از گرما قرار دهید. روزانه آب شفاف و تازه اضافه کنید.",
    freshnessGuaranteeDays: 6,
    vendor: sampleVendors[3],
    inStock: true,
    isSeasonal: true,
    tags: ["پیونی صورتی", "لاله هلندی", "گل بهاری", "عطر ملایم"],
    size: "بزرگ"
  },
  {
    id: "p-7",
    name: "گلدان زاموفیلیا بلک (Zamioculcas Black)",
    nameEn: "ZZ Plant Black Raven",
    slug: "zz-plant-black",
    categorySlug: "houseplants",
    price: 980000,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    description: "زاموفیلیا بلک فوق‌العاده زیبا با برگ‌های تیره واکسی و مقاوم به کم‌نوری و بی‌آبی. بهترین گزینه برای آپارتمان‌های کم‌نور و افراد پرمشغله.",
    careInstructions: "ماهی یک الی دو بار آبیاری در صورت خشکی کامل خاک. بسیار مقاوم در برابر آفات.",
    freshnessGuaranteeDays: 60,
    vendor: sampleVendors[1],
    inStock: true,
    tags: ["زاموفیلیا", "مقاوم به بی‌آبی", "کم نور", "لوکس"],
    size: "متوسط"
  },
  {
    id: "p-8",
    name: "دسته گل ژورنالی لیلیوم و رز مینیاتوری گلبهی",
    nameEn: "Peach Lily & Miniature Rose Cluster",
    slug: "peach-lily-rose-cluster",
    categorySlug: "roses",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    description: "دیزاین مدرن سبک فرانسوی با ترکیب لیلیوم اورینتال معطر، رزهای مینیاتوری گلبهی و برگ‌های زینتی با تزیین روبان کرپ حریر.",
    careInstructions: "گرده‌های زرد رنگ پرچم لیلیوم را با احتیاط جدا کنید تا روی گلبرگ‌ها ننشیند و طول عمر گل افزایش یابد.",
    freshnessGuaranteeDays: 8,
    vendor: sampleVendors[2],
    inStock: true,
    tags: ["لیلیوم اورینتال", "رز مینیاتوری", "سبک فرانسوی", "خوش‌بو"],
    size: "متوسط"
  },
  {
    id: "p-9",
    name: "گلدان سرامیکی دست‌ساز لالجین لعاب فیروزه‌ای مات",
    nameEn: "Handmade Turquoise Matte Ceramic Vase",
    slug: "handmade-turquoise-ceramic-vase",
    categorySlug: "handicrafts",
    price: 580000,
    originalPrice: 690000,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    description: "ساخته شده از گل رس مرغوب لالجین با پخت دو مرحله‌ای در کوره ۱۱۰۰ درجه. لعاب فیروزه‌ای دست‌ساز ضدآب و مقاوم در برابر تغییر دما مناسب گل‌های شاخه بریده و گلدانی.",
    careInstructions: "با اسفنج نرم و آب ولرم شستشو دهید. لعاب این محصول کاملاً ضدخش و ضدجذب آب است.",
    freshnessGuaranteeDays: 365,
    vendor: sampleVendors[4],
    inStock: true,
    isBestseller: true,
    tags: ["سرامیک دست‌ساز", "لعاب فیروزه‌ای", "لالجین", "صنایع دستی", "گلدان هنری"],
    size: "متوسط"
  },
  {
    id: "p-10",
    name: "آویز مکرومه‌بافی دوبل گیاه با حلقه چوب طبیعی گردو",
    nameEn: "Double Macrame Plant Hanger with Walnut Ring",
    slug: "double-macrame-plant-hanger",
    categorySlug: "handicrafts",
    price: 390000,
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    description: "دست‌بافت ظریف با نخ ۴ میلی‌متری پنبه‌ای ۱۰۰٪ خالص شیری رنگ. قابلیت تحمل وزن گلدان‌های تا ۶ کیلوگرم همراه با حلقه نگهدارنده چوب گردوی اعلا روغن‌خورده.",
    careInstructions: "در صورت نشستن غبار، با تکان دادن آرام یا برس نرم تمیز شود. قابل شستشوی ملایم با دست در آب سرد.",
    freshnessGuaranteeDays: 365,
    vendor: sampleVendors[5],
    inStock: true,
    isSeasonal: false,
    tags: ["مکرومه", "دست‌بافت", "آویز گلدان", "پنبه طبیعی", "دکوراسیون بوهو"],
    size: "بزرگ"
  },
  {
    id: "p-11",
    name: "گلدان مسی قلم‌زنی سنتی اصفهان با پوشش نانو ضدتیرگی",
    nameEn: "Hand-Engraved Persian Copper Floral Urn",
    slug: "hand-engraved-copper-urn",
    categorySlug: "handicrafts",
    price: 1850000,
    originalPrice: 2200000,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    description: "اثر دست استادکاران اصفهان با طرح اسلیمی و ختایی برجسته. پوشش نانو شفاف حرارتی مانع از کدر شدن و سیاهی مس در برابر هوا و آب می‌شود.",
    careInstructions: "از شوینده‌های اسیدی قوی استفاده نکنید. دستمال نخی نمدار برای تمیزکاری کافی است.",
    freshnessGuaranteeDays: 365,
    vendor: sampleVendors[6],
    inStock: true,
    isBestseller: true,
    tags: ["مس قلم‌زنی", "صنایع دستی اصفهان", "نقش جهان", "گلدان لوکس", "هنر اصیل"],
    size: "بزرگ"
  },
  {
    id: "p-12",
    name: "سبد حصیری کپوبافی دست‌بافت نخل جنوب (کاور گلدان)",
    nameEn: "Handwoven Southern Palm Fiber Planter Basket",
    slug: "palm-fiber-kapu-planter-basket",
    categorySlug: "handicrafts",
    price: 460000,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "بافته شده توسط بانوان هنرمند جنوب با الیاف نخل طبیعی و مغز کرتک. مقاوم در برابر رطوبت و گرما، بهترین کاور طبیعی برای گلدان‌های سانسوریا و زاموفیلیا.",
    careInstructions: "زیرگلدانی پلاستیکی داخل سبد قرار گیرد تا آب اضافی با الیاف تماس مداوم نداشته باشد.",
    freshnessGuaranteeDays: 365,
    vendor: sampleVendors[5],
    inStock: true,
    tags: ["کپوبافی", "حصیر دست‌بافت", "صنایع دستی جنوب", "کاور گلدان", "ارگانیک"],
    size: "متوسط"
  },
  {
    id: "p-13",
    name: "تابلو رزین دکوراتیو با گل‌های طبیعی خشک‌شده آریس",
    nameEn: "Botanical Pressed Flower Epoxy Resin Art Frame",
    slug: "botanical-pressed-flower-resin-art",
    categorySlug: "handicrafts",
    price: 740000,
    originalPrice: 890000,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    description: "ترکیب خیره‌کننده گل‌های طبیعی ارکیده، رز مینیاتوری و گل آریس با رزین اپوکسی فوق شفاف آلمانی مقاوم در برابر اشعه UV با قاب چوب روسی سندبلاست شده.",
    careInstructions: "دور از تابش مستقیم آفتاب طولانی‌مدت نصب شود. با دستمال عینک یا میکروفایبر غبارروبی شود.",
    freshnessGuaranteeDays: 365,
    vendor: sampleVendors[4],
    inStock: true,
    tags: ["رزین دست‌ساز", "گل خشک طبیعی", "تابلو دکوراتیو", "هنر رزین", "هدیه ماندگار"],
    size: "کوچک"
  },
  {
    id: "p-14",
    name: "گلدان سفالی مینیمال مدرن با تکنیک دست‌پینچ خاکی",
    nameEn: "Modern Minimalist Hand-Pinched Terracotta Pot",
    slug: "modern-hand-pinched-terracotta-pot",
    categorySlug: "handicrafts",
    price: 320000,
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=800&q=80",
    description: "گلدان بافت‌دار با خاک رس قرمز ارگانیک با تنفس‌پذیری بسیار بالا، ایده‌آل برای رشد سالم ریشه کاکتوس‌ها و ساکولنت‌ها.",
    careInstructions: "دارای سوراخ زهکش استاندارد کف گلدان. قبل از کاشت اولیه ۳۰ دقیقه در آب غوطه‌ور شود.",
    freshnessGuaranteeDays: 365,
    vendor: sampleVendors[4],
    inStock: true,
    tags: ["سفال دست‌ساز", "مینیمال", "تراکوتا", "تنفس خاک", "دست‌ساز"],
    size: "کوچک"
  }
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: "b-1",
    slug: "how-to-keep-flowers-fresh",
    title: "چگونه گل‌های شاخه بریده را تا ۲ هفته شاداب و باطراوت نگه داریم؟",
    titleEn: "How to Keep Cut Flowers Fresh for 2 Weeks",
    date: "۱۴۰۳/۰۵/۲۶",
    readTime: "۴ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    excerpt: "راهنمای تخصصی گلفروشان برای افزایش ماندگاری گل‌های رز، پیونی و آفتابگردان با روش‌های طبیعی برش ساقه، تنظیم دمای آب و تغذیه خانگی.",
    content: `## رازهای افزایش طول عمر گل‌های تازه در خانه

همه ما عاشق دریافت یک دسته گل زیبا هستیم، اما دیدن پژمرده شدن سریع آن حس ناخوشایندی ایجاد می‌کند. با رعایت این ۵ نکته اساسی که گلفروشان حرفه‌ای رعایت می‌کنند، می‌توانید طراوت گل‌های خود را حداقل تا ۲ هفته حفظ کنید:

### ۱. برش ساقه‌ها با زاویه ۴۵ درجه در زیر آب
هرگز ساقه گل را به صورت افقی یا با قیچی کند نبرید! همیشه با یک چاقوی تیز با زاویه ۴۵ درجه حدود ۲ سانتی‌متر از انتهای ساقه را داخل ظرف آب برش دهید تا حباب هوا وارد آوندهای ساقه نشود.

### ۲. حذف تمام برگ‌های زیر خط آب
برگ‌هایی که در آب غوطه‌ور بمانند خیلی سریع شروع به پوسیدگی و تولید باکتری می‌کنند. ایجاد بوی نامطبوع و کدر شدن آب به دلیل همین برگ‌های غرق شده است.

### ۳. فرمول معجزه‌آسای غذای گل خانگی
اگر غذای گل پودری همراه دسته گل نبود، خودتان این معجون ساده را بسازید:
- ۱ لیتر آب خنک
- ۱ قاشق چای‌خوری شکر (برای تغذیه گلبرگ‌ها)
- ۱ قاشق چای‌خوری سرکه سفید یا آبلیمو (برای اسیدی کردن آب و مبارزه با باکتری)
- ۳ قطره وایتکس رقیق (برای ضدعفونی آب)

### ۴. دوری از میوه‌ها و نور مستقیم خورشید
آیا می‌دانستید میوه‌هایی مثل سیب و موز گاز اتیلن آزاد می‌کنند؟ این گاز روند پیری و ریختن گلبرگ‌ها را ۳ برابر سریع‌تر می‌کند! پس گلدان را کنار ظرف میوه نگذارید.

### ۵. تعویض آب گلدان هر ۲ روز یک‌بار
آب تازه و خنک جریان زندگی گل‌هاست. هر دو روز یک‌بار آب را عوض کرده و دیواره‌های گلدان را بشویید.`,
    author: "تیم باغبانی گل آریس",
    tags: ["نگهداری گل", "ترفندهای باغبانی", "رز هلندی", "آموزش"]
  },
  {
    id: "b-2",
    slug: "best-low-light-houseplants",
    title: "بهترین گیاهان آپارتمانی برای خانه‌های کم‌نور و آپارتمان‌های مدرن",
    titleEn: "Best Houseplants for Low Light Apartments",
    date: "۱۴۰۳/۰۵/۲۰",
    readTime: "۵ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    excerpt: "حتی اگر پنجره جنوبی با نور سرشار ندارید، این ۴ گیاه تصفیه‌کننده هوا در تاریک‌ترین گوشه‌های خانه هم با سرسبزی رشد می‌کنند.",
    content: `## گیاهان مقاومی که عاشق سایه هستند!

خیلی از افراد فکر می‌کنند برای نگهداری گیاه حتماً به بالکن آفتاب‌گیر نیاز دارند، اما طبیعت گیاهانی فوق‌العاده خلق کرده که در جنگل‌های انبوه زیر سایه درختان رشد می‌کنند و در خانه‌های بدون نور مستقیم هم سرحال می‌مانند:

### ۱. زاموفیلیا (ZZ Plant) - پادشاه مقاومت
زاموفیلیا با ساقه‌های گوشتی و غده‌های ذخیره آب زیرزمینی، می‌تواند هفته‌ها بدون آب و در نور ملایم اتاق به راحتی دوام بیاورد.

### ۲. سانسوریا (شمشیری) - تصفیه‌کننده خواب شبانه
سانسوریا در شب اکسیژن آزاد می‌کند و آلاینده‌هایی مثل فرمالدئید را جذب می‌نماید. حتی زیر نور مهتابی یا لامپ‌های اداری هم رشد می‌کند.

### ۳. پتوس طلایی و ابلق (Pothos)
پتوس با برگ‌های قلبی رونده، حس طراوت و جنگلی به دیوارها یا شلف‌ها می‌دهد و نسبت به خشکی و کم‌نوری بسیار صبور است.

### ۴. آگلونما (نخل چینی)
با برگ‌های خوش‌رنگ ابلق یا صورتی، زیبایی خاصی به میز کار و گوشه‌های سالن می‌بخشد و رطوبت ملایم را دوست دارد.`,
    author: "مهندس مریم رحیمی (پرورش‌دهنده)",
    tags: ["گیاهان آپارتمانی", "تصفیه هوا", "زاموفیلیا", "دکوراسیون سبز"]
  },
  {
    id: "b-3",
    slug: "flower-color-meanings",
    title: "زبان رمزآلود گل‌ها: هر رنگ گل چه پیامی را در دل خود دارد؟",
    titleEn: "The Secret Language and Meaning of Flower Colors",
    date: "۱۴۰۳/۰۵/۱۰",
    readTime: "۳ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    excerpt: "قبل از خرید گل هدیه، با مفاهیم رنگ‌ها آشنا شوید؛ از قرمز آتشین عشق تا زرد انرژی‌بخش و سفید نماد خلوص و احترام.",
    content: `## گل‌ها بی‌صدا اما پرمعنا سخن می‌گویند

ارسال گل فقط یک هدیه نیست، بلکه انتقال یک احساس عمیق قلبی است. شناخت رنگ گل‌ها به شما کمک می‌کند مناسب‌ترین هدیه را برای مناسبت خود انتخاب کنید:

- **قرمز:** عشق آتشین، احترام عمیق و شجاعت.
- **سفید:** خلوص، معصومیت، آغازهای نو و آرامش درونی.
- **صورتی:** قدردانی، ظرافت، مهربانی و ستایش زیبایی.
- **زرد:** دوستی پایدار، نشاط و شروع یک فصل جدید با انگیزه.
- **بنفش:** وقار، سلطنت، رمز و راز و ستایش اصالت.
- **نارنجی:** شور و اشتیاق، هیجان و تبریک موفقیت‌های بزرگ.`,
    author: "الهام صادقی (طراح گل آریس)",
    tags: ["روانشناسی رنگ", "هدیه گل", "مناسبت‌ها"]
  }
];

export const sampleFaqs = [
  {
    q: "سفارش‌ها چگونه ارسال می‌شوند و چقدر زمان می‌برد؟",
    a: "در شهرهای تحت پوشش (مانند تهران، کرج، اصفهان)، سفارشات با ناوگان اکسپرس اسنپ ظرف حداکثر ۲ ساعت یا در ساعت انتخابی شما در همان روز تحویل داده می‌شوند. برای سفارشات شهرهای دیگر، با بسته‌بندی عایق رطوبتی تیپاکس طی ۲۴ الی ۴۸ ساعت ارسال صورت می‌گیرد."
  },
  {
    q: "آیا گل تحویل داده شده دقیقاً مانند تصویر خواهد بود؟",
    a: "بله، تمام گلفروشان و پرورش‌دهندگان موظف هستند طبق استانداردهای عکاسی و تعداد شاخه‌های قید شده سفارش را آماده کنند. همچنین پیش از ارسال، عکس نهایی آماده شده برای شما از طریق پیامک یا واتساپ ارسال می‌گردد."
  },
  {
    q: "چگونه می‌توانم متن کارت هدیه اختصاصی اضافه کنم؟",
    a: "در مرحله خرید یا کلیک بر روی دکمه «طراحی کارت هدیه»، می‌توانید متن دلخواه، نام گیرنده و طرح کارت پستال (مخمل، طلایی، کلاسیک) را به صورت رایگان انتخاب و طراحی کنید."
  },
  {
    q: "اگر از کیفیت گل رضایت نداشتم چه کار کنم؟",
    a: "گل آریس ضمانت ۱۰۰٪ شادابی دارد. اگر گل آسیب‌دیده یا غیرمنطبق با سفارش باشد، ظرف ۴ ساعت پس از تحویل با پشتیبانی تماس بگیرید تا تعویض فوری یا عودت کامل وجه انجام شود."
  },
  {
    q: "چگونه می‌توانم به عنوان گلفروش یا پرورش‌دهنده خانگی در گل آریس ثبت‌نام کنم؟",
    a: "از بخش «برای فروشندگان» فرم ۵ دقیقه‌ای را پر کنید. کارشناسان ما مدارک و کیفیت شما را بررسی کرده و ظرف ۲۴ ساعت پنل فروش شما فعال می‌شود. کمیسیون فقط ۵٪ است و تسویه حساب هر ۴۸ ساعت انجام می‌گیرد."
  }
];
