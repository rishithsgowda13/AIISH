import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, User } from 'lucide-react';
import './components.css';

export default function Header({ title, showBack = false, onBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isParentPortal = location.pathname.startsWith('/parent');
  
  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div className="header-container">
      {showBack ? (
        <button onClick={handleBack} className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%' }}>
          <ArrowLeft size={24} />
        </button>
      ) : <div style={{ width: 40 }} />}
      
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>{title}</h2>
      
      <button 
        onClick={() => navigate(isParentPortal ? '/child/dashboard' : '/parent')}
        title={isParentPortal ? "Switch to Child Mode" : "Parent Portal"}
        className="btn"
        style={{ padding: '8px', borderRadius: '50%', backgroundColor: 'white' }}
      >
        {isParentPortal ? <User size={22} color="#4A4036" /> : <Shield size={22} color="#4A4036" />}
      </button>
    </div>
  );
}
