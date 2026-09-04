import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { Play } from 'lucide-react';

const subLevels = {
  phoneme: ['Initial Omission', 'Medial Omission', 'Final Omission', 'Phoneme Blending', 'Speech in Noise'],
  syllable: ['Initial Syllable', 'Medial Syllable', 'Final Syllable'],
  // Add others as needed
};

export default function ChildLevelSelect() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  const levels = subLevels[moduleId] || ['Level 1', 'Level 2', 'Level 3'];

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Header title="Select Level" showBack />
      
      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {levels.map((level, idx) => (
          <Card 
            key={idx}
            onClick={() => navigate(`/child/training/${moduleId}/${idx}`)}
            style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: '700' }}>{level}</span>
            <div style={{ 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: '50%', padding: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Play size={20} color="white" fill="white" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
