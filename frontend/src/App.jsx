import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      backgroundColor: '#f1f5f9', 
      margin: 0, 
      padding: 0, 
      display: 'flex', 
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      
      {/* 1. FIGMA TOP NAVBAR */}
      <header style={{ 
        height: '80px', 
        backgroundColor: '#ffffff', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 40px', 
        borderBottom: '1px solid #e2e8f0',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            backgroundColor: '#4f46e5', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <span style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>EcomDash</span>
        </div>

        {/* Navigation Menu Matching Figma Links */}
        <nav style={{ display: 'block' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '24px', margin: 0, padding: 0, alignItems: 'center' }}>
            <li style={{ fontSize: '16px', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>Général</li>
            <li style={{ fontSize: '16px', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>Produits</li>
            <li style={{ fontSize: '16px', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>Clients</li>
            <li style={{ 
              fontSize: '16px', 
              color: '#4f46e5', 
              fontWeight: '700', 
              cursor: 'pointer', 
              padding: '10px 24px', 
              borderRadius: '24px', 
              backgroundColor: '#eef2ff' 
            }}>Paiements</li>
          </ul>
        </nav>
      </header>

      {/* 2. MAIN CONTAINER AREA */}
      <div style={{ 
        flex: 1, 
        padding: '40px 60px', 
        width: '100%', 
        boxSizing: 'border-box', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start' 
      }}>
        
        {/* Left Aligned Page Titles */}
        <div style={{ textAlign: 'left', width: '100%', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.8px' }}>Tableau de bord</h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', fontWeight: '600', margin: 0 }}>Vue d'ensemble — Exercice 2024</p>
        </div>

        {/* Clean, open workspace grid canvas for Personne 1's elements */}
        <div style={{ width: '100%', flex: 1 }}></div>

      </div>
    </div>
  );
}

export default App;