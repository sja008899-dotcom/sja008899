export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  image: string;
  alt: string;
  count?: number;
  icon?: string;
}

export interface Vendor {
  id: string;
  name: string;
  city: string;
  type: 'local_florist' | 'home_grower' | 'artisan'; // گلفروشی محلی، پرورش‌دهنده خانگی یا هنرمند صنایع دستی
  rating: number;
  reviewsCount: number;
  avatar: string;
  badge: string;
  bio: string;
  deliveryMethods: ('snap' | 'tipax')[];
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  categorySlug: string;
  price: number; // in Tomans
  originalPrice?: number;
  image: string;
  gallery?: string[];
  description: string;
  careInstructions?: string;
  freshnessGuaranteeDays: number;
  vendor: Vendor;
  inStock: boolean;
  isBestseller?: boolean;
  isSeasonal?: boolean;
  tags: string[];
  size?: 'کوچک' | 'متوسط' | 'بزرگ' | 'لوکس';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  image: string;
  productName?: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftCardMessage?: string;
  giftCardRecipient?: string;
  giftCardTheme?: 'classic_gold' | 'emerald_luxury' | 'romantic_rose' | 'minimal_white';
  selectedVase?: boolean;
}

export interface SiteBrand {
  name_en: string;
  name_fa: string;
  tagline: string;
  email: string;
  phone: string;
  address?: string;
  social: {
    instagram: string;
    telegram: string;
    whatsapp?: string;
  };
}

export interface SiteHero {
  headline: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
  image: string;
  alt: string;
}

export interface SiteValue {
  icon: string;
  title: string;
  text: string;
}

export interface SiteAbout {
  story: string;
  mission: string;
  vision: string;
  values: string[];
}

export interface SiteSellers {
  commission: string;
  settlement: string;
  delivery: string;
  steps: string[];
}

export interface SiteContent {
  site: {
    brand: SiteBrand;
    hero: SiteHero;
    values: SiteValue[];
    categories: {
      slug: string;
      name: string;
      image: string;
      alt: string;
    }[];
    testimonials: {
      name: string;
      rating: number;
      text: string;
      image: string;
    }[];
    about: SiteAbout;
    sellers: SiteSellers;
    seo: {
      meta_description: string;
      keywords: string;
    };
  };
}

export type ActiveTab = 'home' | 'marketplace' | 'handicrafts' | 'sellers' | 'about' | 'blog' | 'contact' | 'admin';

export interface User {
  id: string;
  phone: string;
  email?: string;
  fullName: string;
  city: string;
  address?: string;
  postalCode?: string;
  isLoggedIn: boolean;
  createdAt: string;
}

export type OrderStatus = 'paid' | 'preparing' | 'gift_wrapping' | 'delivering' | 'delivered' | 'cancelled';
export type PaymentMethod = 'shaparak' | 'card_to_card' | 'cod';

export interface Order {
  id: string;
  trackingCode: string;
  rrn?: string; // Reference Retrieval Number for Shaparak
  items: CartItem[];
  totalAmount: number;
  shippingCost: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryDate: string;
  deliveryTimeSlot: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  giftCardMessage?: string;
  giftCardRecipient?: string;
  notes?: string;
  // Pre-dispatch photo inspection option
  sendPreDispatchPhoto?: boolean;
  preDispatchPhotoUrl?: string;
  preDispatchPhotoApproved?: boolean;
  preDispatchPhotoFeedback?: string;
  createdAt: string;
  paidAt?: string;
}

export interface DispatchedNotification {
  id: string;
  type: 'sms' | 'email' | 'bank_otp';
  title: string;
  message: string;
  recipient: string;
  timestamp: string;
  status: 'delivered' | 'sent';
}

export interface VendorApplication {
  fullName: string;
  shopName: string;
  type: 'local_florist' | 'home_grower' | 'artisan';
  city: string;
  phone: string;
  email: string;
  experienceYears: number;
  instagramHandle?: string;
  note: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied?: boolean;
}

