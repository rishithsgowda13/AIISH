import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import { Volume2, CheckCircle, XCircle } from 'lucide-react';

import { playSfx, speakWord } from '../utils/audio';

// Mock data for a session
const mockTrials = [
  { id: 1, word: 'MILK', occludedWord: 'Mil__', isCorrect: true, occlusionType: 'beep' },
  { id: 2, word: 'APPLE', occludedWord: 'A__LE', isCorrect: true, occlusionType: 'noise' },
  { id: 3, word: 'CAT', occludedWord: 'C_T', isCorrect: true, occlusionType: 'beep' },
];

export default function ChildTraining() {
  const { moduleId, levelId } = useParams();
  const navigate = useNavigate();
  
  const [currentTrial, setCurrentTrial] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const trial = mockTrials[currentTrial];

  // Auto play audio when new trial is shown
  useEffect(() => {
    speakWord(trial.word, { occlusionType: trial.occlusionType });
  }, [currentTrial]);

  const handlePlayAudio = (type) => {
    speakWord(trial.word, { occlusionType: trial.occlusionType });
  };

  const handleAnswer = (answer) => {
    const correct = answer === 'YES';
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      playSfx('success');
    } else {
      playSfx('error');
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    playSfx('click');
    setShowFeedback(false);
    if (currentTrial < mockTrials.length - 1) {
      setCurrentTrial(c => c + 1);
    } else {
      navigate('/child/scorecard', { state: { score, total: mockTrials.length } });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title={`Trial ${currentTrial + 1} of ${mockTrials.length}`} showBack />

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Mascot / Visual Cue */}
        <div style={{ marginBottom: '32px', position: 'relative' }}>
          <img src="/mascot.png" alt="Mascot thinking" style={{ width: 120, height: 120, objectFit: 'contain' }} />
          {!showFeedback && (
            <div style={{ 
              position: 'absolute', top: -20, right: -40, 
              backgroundColor: 'white', padding: '8px 12px', borderRadius: '16px',
              boxShadow: 'var(--shadow-sm)', fontWeight: 'bold'
            }}>
              Listen!
            </div>
          )}
        </div>

        {/* Audio Button */}
        <button 
          onClick={() => handlePlayAudio('training')}
          className="animate-bounce-scale"
          style={{
            backgroundColor: 'var(--color-secondary)',
            border: 'none', borderRadius: '50%', width: 80, height: 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-md)', marginBottom: '32px', cursor: 'pointer'
          }}
        >
          <Volume2 size={40} color="white" />
        </button>

        {/* Word Display (Visual Support) */}
        <Card style={{ width: '100%', textAlign: 'center', marginBottom: '32px', padding: '32px 16px' }}>
          <h2 style={{ fontSize: '32px', letterSpacing: '4px', margin: 0 }}>
            {showFeedback ? trial.word : trial.occludedWord}
          </h2>
        </Card>

        {/* Interaction Area */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          {!showFeedback ? (
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button size="lg" variant="secondary" fullWidth onClick={() => handleAnswer('NO')} style={{ backgroundColor: '#f43f5e' }}>
                NO
              </Button>
              <Button size="lg" variant="primary" fullWidth onClick={() => handleAnswer('YES')} style={{ backgroundColor: 'var(--color-success)' }}>
                YES
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px', color: isCorrect ? 'var(--color-success)' : 'var(--color-error)' }}>
                {isCorrect ? <CheckCircle size={32} /> : <XCircle size={32} />}
                <h3 style={{ fontSize: '24px', margin: 0 }}>{isCorrect ? 'Awesome!' : 'Try Again!'}</h3>
              </div>
              <Button size="lg" fullWidth onClick={handleNext}>
                {currentTrial < mockTrials.length - 1 ? 'Next Word' : 'See Results!'}
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
