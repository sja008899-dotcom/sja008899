import { ActiveTab, Product } from '../types';

export function getPathForTab(tab: ActiveTab): string {
  switch (tab) {
    case 'home':
      return '/';
    case 'marketplace':
      return '/marketplace';
    case 'handicrafts':
      return '/handicrafts';
    case 'sellers':
      return '/sellers';
    case 'about':
      return '/about';
    case 'blog':
      return '/blog';
    case 'contact':
      return '/contact';
    case 'admin':
      return '/admin';
    default:
      return '/';
  }
}

export function getPathForProduct(slug: string): string {
  return `/product/${slug}`;
}

export function getPathForBlogArticle(slug: string): string {
  return `/blog/${slug}`;
}

export function parseRoute(pathname: string): { tab: ActiveTab; productSlug?: string; blogSlug?: string } {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { tab: 'home' };
  }
  if (cleanPath === '/marketplace') {
    return { tab: 'marketplace' };
  }
  if (cleanPath === '/handicrafts') {
    return { tab: 'handicrafts' };
  }
  if (cleanPath === '/sellers') {
    return { tab: 'sellers' };
  }
  if (cleanPath === '/about') {
    return { tab: 'about' };
  }
  if (cleanPath === '/blog') {
    return { tab: 'blog' };
  }
  if (cleanPath === '/contact') {
    return { tab: 'contact' };
  }
  if (cleanPath === '/admin' || cleanPath === '/panel') {
    return { tab: 'admin' };
  }

  // Check /blog/:slug
  const blogMatch = cleanPath.match(/^\/blog\/([^/]+)/);
  if (blogMatch) {
    return {
      tab: 'blog',
      blogSlug: decodeURIComponent(blogMatch[1])
    };
  }

  // Check /product/:slug
  const productMatch = cleanPath.match(/^\/product\/([^/]+)/);
  if (productMatch) {
    return {
      tab: 'marketplace',
      productSlug: decodeURIComponent(productMatch[1])
    };
  }

  return { tab: 'home' };
}
