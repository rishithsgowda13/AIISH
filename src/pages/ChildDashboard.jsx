import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { Mic, BookOpen, MessageCircle, Headphones, Puzzle } from 'lucide-react';

const modules = [
  { id: 'phoneme', title: 'Missing Phoneme', icon: <Mic size={32} color="#ff7f50" />, color: '#fff0eb' },
  { id: 'syllable', title: 'Missing Syllable', icon: <BookOpen size={32} color="#4ade80" />, color: '#ecfdf5' },
  { id: 'word', title: 'Missing Word', icon: <MessageCircle size={32} color="#60a5fa" />, color: '#eff6ff' },
  { id: 'sentence', title: 'Sentence Completion', icon: <Puzzle size={32} color="#c084fc" />, color: '#faf5ff' },
  { id: 'closure', title: 'Auditory Closure', icon: <Headphones size={32} color="#fbbf24" />, color: '#fffbeb' },
];

export default function ChildDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Header title="Choose a Game!" />
      
      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {modules.map((mod) => (
          <Card 
            key={mod.id} 
            onClick={() => navigate(`/child/level/${mod.id}`)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '20px', 
              backgroundColor: mod.color, border: '2px solid white' 
            }}
          >
            <div style={{ 
              backgroundColor: 'white', padding: '12px', 
              borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
            }}>
              {mod.icon}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#333' }}>
              {mod.title}
            </h3>
          </Card>
        ))}
      </div>
    </div>
  );
}
