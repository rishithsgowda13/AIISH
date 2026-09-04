import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { Star } from 'lucide-react';

export default function ChildScorecard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const score = location.state?.score || 0;
  const total = location.state?.total || 3;
  const percentage = (score / total) * 100;

  return (
    <div className="animate-fade-in" style={{ 
      backgroundColor: 'var(--color-primary)', 
      minHeight: '100vh', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', padding: '24px' 
    }}>
      
      <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '8px', textAlign: 'center' }}>
        Challenge Completed!
      </h1>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[1, 2, 3].map((star) => (
          <Star 
            key={star} 
            size={48} 
            color={star <= (percentage > 80 ? 3 : percentage > 40 ? 2 : 1) ? '#ffea00' : 'rgba(255,255,255,0.3)'} 
            fill={star <= (percentage > 80 ? 3 : percentage > 40 ? 2 : 1) ? '#ffea00' : 'none'} 
            className="animate-bounce-scale"
          />
        ))}
      </div>

      <Card style={{ width: '100%', textAlign: 'center', marginBottom: '32px', padding: '32px' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '18px', marginBottom: '8px' }}>Your Score</p>
        <h2 style={{ fontSize: '48px', color: 'var(--color-primary-dark)', margin: 0 }}>{score} / {total}</h2>
      </Card>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Button size="lg" fullWidth onClick={() => navigate('/child/dashboard')} style={{ backgroundColor: 'white', color: 'var(--color-primary-dark)' }}>
          Play Again
        </Button>
        <Button size="lg" fullWidth variant="secondary" onClick={() => navigate('/parent')}>
          Go to Parent Portal
        </Button>
      </div>
      
    </div>
  );
}
