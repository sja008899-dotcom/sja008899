/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
import { ShaparakGatewayModal } from './components/ShaparakGatewayModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ToastContainer } from './components/ToastContainer';
import { SEOHead } from './components/SEOHead';
import { HomeFAQSection } from './components/HomeFAQSection';
import { SitemapModal } from './components/SitemapModal';

const MainContent: React.FC = () => {
  const { activeTab, selectedProduct } = useApp();

  return (
    <main className="min-h-[calc(100vh-200px)]">
      <SEOHead activeTab={activeTab} selectedProduct={selectedProduct} />
      {activeTab === 'home' && (
        <>
          <HeroSection />
          <MarketplaceView />
          <HomeFAQSection />
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
      <ShaparakGatewayModal />
      <OrderTrackingModal />
      <NotificationsDrawer />
      <ToastContainer />
      <SitemapModal isOpen={isSitemapModalOpen} onClose={() => setIsSitemapModalOpen(false)} />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#FCFCFA] text-stone-800 flex flex-col selection:bg-[#2D5A27]/20 selection:text-[#2D5A27]">
        <Header />
        <MainContent />
        <Footer />
        
        {/* Interactive Modals and Drawers */}
        <ModalsContainer />
      </div>
    </AppProvider>
  );
}
