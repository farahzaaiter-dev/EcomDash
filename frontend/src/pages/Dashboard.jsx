import { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';

import DashboardCards from '../components/DashboardCards/DashboardCards';
import TopProductsTable from '../components/TopProductsTable/TopProductsTable';

const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;

const INITIAL_VISIBLE_PRODUCTS = 4;
const PRODUCTS_PER_SCROLL = 3;
const MAX_TOP_PRODUCTS = 10;

const Dashboard = () => {
  const [itemsLimit, setItemsLimit] = useState(INITIAL_VISIBLE_PRODUCTS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const loadMoreProducts = () => {
      if (isLoadingMore || itemsLimit >= MAX_TOP_PRODUCTS) return;

      setIsLoadingMore(true);

      setTimeout(() => {
        setItemsLimit((prev) =>
          Math.min(prev + PRODUCTS_PER_SCROLL, MAX_TOP_PRODUCTS)
        );
        setIsLoadingMore(false);
      }, 500);
    };

    const handleWindowScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const isNearBottom = pageHeight - scrollPosition <= 90;

      if (isNearBottom) {
        loadMoreProducts();
      }
    };

    const handleWindowWheel = (event) => {
      const pageHeight = document.documentElement.scrollHeight;
      const pageCanScroll = pageHeight > window.innerHeight;

      if (event.deltaY > 0 && !pageCanScroll) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleWindowScroll);
    window.addEventListener('wheel', handleWindowWheel);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, [isLoadingMore, itemsLimit]);

  return (
    <>
      <style>{scrollbarStyles}</style>
      <MainLayout>
      <div className="mb-4 px-2" style={{ fontFamily: 'Inter, sans-serif' }}>
        <h1
          className="fw-bold text-dark m-0"
          style={{ fontSize: '2.1rem', letterSpacing: '-0.5px' }}
        >
          Tableau de bord
        </h1>
        <p className="text-secondary small mt-1">
          Vue d'ensemble - Exercice 2024
        </p>
      </div>

      <div className="d-flex flex-column gap-4">
        <DashboardCards />
        <TopProductsTable limit={itemsLimit} />
      </div>

      <div
        className="w-100 text-center py-4 text-secondary small"
        style={{ minHeight: '60px' }}
        aria-live="polite"
      >
        {isLoadingMore && (
          <div className="d-inline-flex align-items-center gap-2">
            <div
              className="spinner-border spinner-border-sm"
              style={{ color: '#6366F1' }}
              role="status"
            >
              <span className="visually-hidden">Chargement...</span>
            </div>
            <span style={{ color: '#4F46E5', fontWeight: 500 }}>
              Chargement progressif...
            </span>
          </div>
        )}

        {!isLoadingMore && itemsLimit >= MAX_TOP_PRODUCTS && (
          <span className="text-muted opacity-50">
            Fin des elements charges
          </span>
        )}
      </div>
    </MainLayout>
    </>
  );
};

export default Dashboard;
