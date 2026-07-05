import React, { useState } from 'react';

export default function Navbar() {
  const [showMessages, setShowMessages] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <nav className="navbar navbar-expand bg-white border-bottom sticky-top py-3">
      <div className="container-xl d-flex justify-content-between align-items-center">
        
        {/* Left Side: Brand Logo & Title */}
        <div className="d-flex align-items-center">
          <div 
            className="d-flex align-items-center justify-content-center text-white rounded-3 me-2 shadow-sm"
            style={{ backgroundColor: '#4F46E5', width: '36px', height: '36px', fontSize: '18px' }}
          >
            📦
          </div>
          <span className="fw-bold text-dark fs-5">EcomDash</span>
        </div>

        {/* Right Side: Navigation Badges + Comment Icon */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Navigation Tabs */}
          <div className="d-flex gap-2">
            <button 
              className="btn rounded-pill border-0 fw-semibold px-4 py-2"
              style={{ backgroundColor: '#EEF2FF', color: '#4F46E5' }}
            >
              Général
            </button>
            <button className="btn rounded-pill border-0 text-secondary fw-medium px-4 py-2">
              Produits
            </button>
            <button className="btn rounded-pill border-0 text-secondary fw-medium px-4 py-2">
              Clients
            </button>
            <button className="btn rounded-pill border-0 text-secondary fw-medium px-4 py-2">
              Paiements
            </button>
          </div>

          {/* Vertical Divider line */}
          <div className="border-start h-100 mx-1" style={{ height: '24px', width: '1px', backgroundColor: '#E5E7EB' }}></div>

          {/* Comment Icon Button */}
          <button 
            onClick={() => setShowMessages(!showMessages)}
            className="btn border-0 p-0 d-flex align-items-center justify-content-center"
            style={{ 
              background: 'none',
              width: '24px', 
              height: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Commentaires"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#999' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>

          {/* Settings Icon Button */}
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="btn border-0 p-0 d-flex align-items-center justify-content-center"
            style={{ 
              background: 'none',
              width: '24px', 
              height: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Paramètres"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#999' }}>
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6"></path>
              <path d="M4.22 4.22l4.24 4.24"></path>
              <path d="M15.54 15.54l4.24 4.24"></path>
              <path d="M1 12h6"></path>
              <path d="M17 12h6"></path>
              <path d="M4.22 19.78l4.24-4.24"></path>
              <path d="M15.54 8.46l4.24-4.24"></path>
            </svg>
          </button>

          {/* Share Button */}
          <button 
            onClick={() => setShowShare(!showShare)}
            className="btn fw-semibold px-4 py-2 border-0 rounded-2 position-relative"
            style={{ 
              backgroundColor: '#4F46E5', 
              color: 'white',
              transition: 'all 0.2s' 
            }}
            title="Partager le tableau de bord"
          >
            Share
          </button>

          {/* Share Dropdown Modal */}
          {showShare && (
            <div 
              className="position-absolute bg-white border rounded-3 shadow-lg p-4 text-start"
              style={{ width: '350px', zIndex: 1050, top: '60px', right: '20px' }}
            >
              <h6 className="fw-bold mb-3 text-dark">Partager le tableau de bord</h6>
              <hr className="my-2" />
              <div className="small mb-3">
                <p className="text-muted mb-2">📊 <strong>EcomDash Dashboard</strong></p>
                <p className="text-muted small mb-3">Tableau de bord d'analyse ecommerce en temps réel avec KPIs, produits top vendus, analyse client et gestion des paiements.</p>
              </div>
              <hr className="my-2" />
              <div className="mb-2">
                <label className="small fw-semibold text-muted">Partager avec:</label>
                <div className="input-group input-group-sm mt-2">
                  <input type="email" className="form-control rounded-2" placeholder="email@example.com" />
                  <button className="btn btn-primary btn-sm rounded-2" style={{ backgroundColor: '#4F46E5' }}>Envoyer</button>
                </div>
              </div>
              <div className="mt-3">
                <p className="small text-muted mb-2">Options de partage:</p>
                <div className="d-flex gap-2 flex-wrap">
                  <button className="btn btn-sm btn-outline-secondary rounded-pill">📋 Copier lien</button>
                  <button className="btn btn-sm btn-outline-secondary rounded-pill">🔗 Public</button>
                  <button className="btn btn-sm btn-outline-secondary rounded-pill">🔒 Privé</button>
                </div>
              </div>
              <div className="text-end mt-3">
                <button className="btn btn-sm btn-link text-decoration-none p-0 text-primary" onClick={() => setShowShare(false)}>Fermer</button>
              </div>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}
