/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MarketplaceView } from './components/MarketplaceView';
import { ForSellersView } from './components/ForSellersView';
import { AboutView } from './components/AboutView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { HandicraftsView } from './components/HandicraftsView';
import { AdminPanel } from './components/AdminPanel';
import { ProductModal } from './components/ProductModal';
import { GiftMessageModal } from './components/GiftMessageModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ToastContainer } from './components/ToastContainer';
import { SEOHead } from './components/SEOHead';
import { HomeFAQSection } from './components/HomeFAQSection';
import { HomeSeoContent } from './components/HomeSeoContent';
import { SitemapModal } from './components/SitemapModal';
import { BottomNavBar } from './components/BottomNavBar';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FCFCFA] flex items-center justify-center p-4 text-center">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl max-w-md w-full space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-stone-900 font-heading">
              با پوزش، خطایی در بارگذاری بخش رخ داد
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              لطفاً صفحه را بازنشانی فرمایید. اطلاعات سبد خرید و حساب شما امن است.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>بارگذاری مجدد صفحه</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const MainContent: React.FC = () => {
  const { activeTab, selectedProduct, selectedBlogArticle } = useApp();

  return (
    <main className="min-h-[calc(100vh-200px)] pb-16 md:pb-0">
      <SEOHead activeTab={activeTab} selectedProduct={selectedProduct} selectedBlogArticle={selectedBlogArticle} />
      {activeTab === 'home' && (
        <>
          <HeroSection />
          <MarketplaceView />
          <HomeFAQSection />
          <HomeSeoContent />
        </>
      )}

      {activeTab === 'marketplace' && <MarketplaceView />}
      {activeTab === 'handicrafts' && <HandicraftsView />}
      {activeTab === 'sellers' && <ForSellersView />}
      {activeTab === 'about' && <AboutView />}
      {activeTab === 'blog' && <BlogView />}
      {activeTab === 'contact' && <ContactView />}
      {activeTab === 'admin' && <AdminPanel />}
    </main>
  );
};

const ModalsContainer: React.FC = () => {
  const { isSitemapModalOpen, setIsSitemapModalOpen } = useApp();

  return (
    <>
      <ProductModal />
      <GiftMessageModal />
      <CartDrawer />
      <AuthModal />
      <CheckoutModal />
      <OrderTrackingModal />
      <NotificationsDrawer />
      <ToastContainer />
      <SitemapModal isOpen={isSitemapModalOpen} onClose={() => setIsSitemapModalOpen(false)} />
    </>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen bg-[#FCFCFA] text-stone-800 flex flex-col selection:bg-[#2D5A27]/20 selection:text-[#2D5A27]">
          <Header />
          <MainContent />
          <Footer />
          
          {/* Interactive Modals and Drawers */}
          <ModalsContainer />

          {/* Mobile Native Bottom Navigation */}
          <BottomNavBar />
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}
