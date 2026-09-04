import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { Mic, BookOpen, MessageCircle, Headphones, Puzzle } from 'lucide-react';

const modules = [
  { id: 'phoneme', title: 'Missing Phoneme', icon: <Mic size={40} color="#4A4036" strokeWidth={3} />, color: 'var(--color-pastel-peach)' },
  { id: 'syllable', title: 'Missing Syllable', icon: <BookOpen size={40} color="#4A4036" strokeWidth={3} />, color: 'var(--color-pastel-green)' },
  { id: 'word', title: 'Missing Word', icon: <MessageCircle size={40} color="#4A4036" strokeWidth={3} />, color: 'var(--color-pastel-blue)' },
  { id: 'sentence', title: 'Sentence Completion', icon: <Puzzle size={40} color="#4A4036" strokeWidth={3} />, color: 'var(--color-pastel-pink)' },
  { id: 'closure', title: 'Auditory Closure', icon: <Headphones size={40} color="#4A4036" strokeWidth={3} />, color: 'var(--color-pastel-yellow)' },
];

export default function ChildDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Header title="Choose a Game!" />
      
      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {modules.map((mod) => (
          <Card 
            key={mod.id} 
            onClick={() => navigate(`/child/level/${mod.id}`)}
            style={{ 
              backgroundColor: mod.color,
              display: 'flex', alignItems: 'center', gap: '20px', 
              padding: '24px',
              transform: `rotate(${Math.random() * 2 - 1}deg)` // Slight random rotation for doodle feel
            }}
          >
            <div className="icon-container" style={{ 
              backgroundColor: 'white', padding: '12px', 
              borderRadius: '50%', border: '3px solid #4A4036',
              boxShadow: '2px 2px 0px #4A4036'
            }}>
              {mod.icon}
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#4A4036' }}>
              {mod.title}
            </h3>
          </Card>
        ))}
      </div>
    </div>
  );
}
