import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  BarChart2, 
  TrendingUp, 
  Settings, 
  MessageSquare, 
  Calendar, 
  Award, 
  Sliders, 
  User, 
  ShieldCheck, 
  Volume2, 
  CheckCircle, 
  Clock, 
  Download, 
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function ParentPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // State for Settings
  const [childName, setChildName] = useState('Aarav');
  const [ageGroup, setAgeGroup] = useState('7-9');
  const [speechRate, setSpeechRate] = useState(0.9);
  const [noiseLevel, setNoiseLevel] = useState('medium');
  const [occlusionType, setOcclusionType] = useState('beep');
  const [trialsPerSession, setTrialsPerSession] = useState(5);
  const [pin, setPin] = useState('1234');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Mock Progress Data
  const childStats = {
    name: childName,
    ageGroup: ageGroup === '7-9' ? '7 - 9.11 Years' : '10 - 12 Years',
    totalSessions: 14,
    accuracyRate: 84,
    streakDays: 5,
    minutesPracticed: 120,
  };

  const moduleProgress = [
    { name: 'Missing Phoneme', score: 90, color: 'var(--color-pastel-peach)', completed: '18/20' },
    { name: 'Missing Syllable', score: 85, color: 'var(--color-pastel-green)', completed: '17/20' },
    { name: 'Missing Word', score: 75, color: 'var(--color-pastel-blue)', completed: '15/20' },
    { name: 'Sentence Completion', score: 80, color: 'var(--color-pastel-pink)', completed: '16/20' },
    { name: 'Auditory Closure', score: 92, color: 'var(--color-pastel-yellow)', completed: '23/25' },
  ];

  const recentActivity = [
    { date: 'Today, 3:30 PM', module: 'Auditory Closure', score: '5/5 (100%)', duration: '4 mins' },
    { date: 'Yesterday, 4:15 PM', module: 'Missing Phoneme', score: '4/5 (80%)', duration: '5 mins' },
    { date: 'Sep 2, 2026', module: 'Sentence Completion', score: '4/5 (80%)', duration: '6 mins' },
    { date: 'Sep 1, 2026', module: 'Missing Syllable', score: '3/5 (60%)', duration: '5 mins' },
  ];

  const therapistNotes = [
    { 
      date: 'Sep 3, 2026', 
      therapist: 'Dr. Ananya Sharma (Speech Language Pathologist)', 
      note: 'Aarav is showing strong progress in Missing Phoneme identification under low noise. Recommend advancing to medium background noise masking for Auditory Closure exercises.' 
    },
    { 
      date: 'Aug 28, 2026', 
      therapist: 'Dr. Ananya Sharma (Speech Language Pathologist)', 
      note: 'Initial assessment completed. Keep practice sessions under 10 minutes to maintain high attention.' 
    }
  ];

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportReport = () => {
    const reportText = `AIISH AUDITORY CLOSURE TRAINING - PARENT PROGRESS REPORT
Child Name: ${childStats.name}
Age Group: ${childStats.ageGroup}
Report Date: ${new Date().toLocaleDateString()}

Overall Summary:
- Total Sessions Completed: ${childStats.totalSessions}
- Overall Accuracy Rate: ${childStats.accuracyRate}%
- Consecutive Day Streak: ${childStats.streakDays} days
- Total Practice Time: ${childStats.minutesPracticed} minutes

Module Breakdown:
${moduleProgress.map(m => `- ${m.name}: ${m.score}% (${m.completed} trials)`).join('\n')}

Therapist Notes:
${therapistNotes.map(n => `[${n.date}] ${n.therapist}:\n"${n.note}"`).join('\n\n')}
`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${childStats.name}_AIISH_Progress_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <Header title="Parent Portal" showBack onBack={() => navigate('/child/dashboard')} />

      <div style={{ padding: '0 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart2 size={18} /> },
            { id: 'reports', label: 'Reports', icon: <TrendingUp size={18} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
            { id: 'therapist', label: 'Notes', icon: <MessageSquare size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                minWidth: '90px',
                padding: '10px 12px',
                borderRadius: '16px',
                border: '3px solid #4A4036',
                backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: '#4A4036',
                boxShadow: activeTab === tab.id ? '2px 3px 0px #4A4036' : '1px 2px 0px #4A4036',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Child Profile Overview Card */}
            <Card style={{ backgroundColor: 'var(--color-pastel-peach)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: 'white', borderRadius: '50%', padding: '12px',
                border: '3px solid #4A4036', boxShadow: '2px 2px 0px #4A4036'
              }}>
                <User size={36} color="#4A4036" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '24px', margin: 0, color: '#4A4036' }}>{childStats.name}</h2>
                <p style={{ margin: '4px 0 0', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  Age: {childStats.ageGroup}
                </p>
              </div>
              <Button size="sm" variant="secondary" onClick={() => navigate('/child/dashboard')} style={{ backgroundColor: 'white' }}>
                Child Mode
              </Button>
            </Card>

            {/* Quick Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Card style={{ backgroundColor: 'var(--color-pastel-green)', textAlign: 'center', padding: '16px' }}>
                <TrendingUp size={28} color="#4A4036" style={{ marginBottom: '4px' }} />
                <h3 style={{ fontSize: '28px', margin: 0, color: '#4A4036' }}>{childStats.accuracyRate}%</h3>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#4A4036' }}>Overall Accuracy</p>
              </Card>

              <Card style={{ backgroundColor: 'var(--color-pastel-yellow)', textAlign: 'center', padding: '16px' }}>
                <Award size={28} color="#4A4036" style={{ marginBottom: '4px' }} />
                <h3 style={{ fontSize: '28px', margin: 0, color: '#4A4036' }}>{childStats.streakDays} Days</h3>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#4A4036' }}>Daily Streak</p>
              </Card>

              <Card style={{ backgroundColor: 'var(--color-pastel-blue)', textAlign: 'center', padding: '16px' }}>
                <Clock size={28} color="#4A4036" style={{ marginBottom: '4px' }} />
                <h3 style={{ fontSize: '28px', margin: 0, color: '#4A4036' }}>{childStats.minutesPracticed}m</h3>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#4A4036' }}>Practice Time</p>
              </Card>

              <Card style={{ backgroundColor: 'var(--color-pastel-pink)', textAlign: 'center', padding: '16px' }}>
                <CheckCircle size={28} color="#4A4036" style={{ marginBottom: '4px' }} />
                <h3 style={{ fontSize: '28px', margin: 0, color: '#4A4036' }}>{childStats.totalSessions}</h3>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#4A4036' }}>Sessions Done</p>
              </Card>
            </div>

            {/* Recent Activity List */}
            <Card>
              <h3 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#4A4036' }}>Recent Practice Sessions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivity.map((act, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingBottom: idx < recentActivity.length - 1 ? '12px' : '0',
                    borderBottom: idx < recentActivity.length - 1 ? '2px dashed #eee' : 'none'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{act.module}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{act.date} • {act.duration}</div>
                    </div>
                    <div style={{ 
                      backgroundColor: 'var(--color-success)', padding: '4px 10px', 
                      borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', border: '2px solid #4A4036'
                    }}>
                      {act.score}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        )}

        {/* TAB 2: REPORTS & DETAILED PROGRESS */}
        {activeTab === 'reports' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '20px', margin: 0 }}>Module Accuracy Breakdown</h3>
              <Button size="sm" variant="secondary" onClick={handleExportReport} style={{ backgroundColor: 'white' }}>
                <Download size={16} style={{ marginRight: '6px' }} /> Export
              </Button>
            </div>

            {/* Module Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {moduleProgress.map((mod, idx) => (
                <Card key={idx} style={{ backgroundColor: 'white', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold' }}>
                    <span>{mod.name}</span>
                    <span style={{ color: '#4A4036' }}>{mod.score}% ({mod.completed})</span>
                  </div>
                  {/* Progress Bar Container */}
                  <div style={{
                    width: '100%', height: '16px', backgroundColor: '#eee',
                    borderRadius: '10px', border: '2px solid #4A4036', overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${mod.score}%`, height: '100%',
                      backgroundColor: mod.color, borderRadius: '8px',
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                </Card>
              ))}
            </div>

            {/* Recommendations Card */}
            <Card style={{ backgroundColor: 'var(--color-pastel-yellow)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Sparkles size={28} color="#4A4036" />
                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>AIISH AI Clinical Insight</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    {childStats.name} excels in <strong>Auditory Closure (92%)</strong> and <strong>Missing Phonemes (90%)</strong>. Consider increasing difficulty for these modules while maintaining gentle practice on <strong>Missing Words (75%)</strong>.
                  </p>
                </div>
              </div>
            </Card>

          </div>
        )}

        {/* TAB 3: SETTINGS & PARAMETERS */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {savedSuccess && (
              <div style={{ 
                backgroundColor: 'var(--color-success)', padding: '12px 16px', borderRadius: '16px',
                border: '3px solid #4A4036', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <CheckCircle size={20} /> Settings saved successfully!
              </div>
            )}

            {/* Child Profile Settings */}
            <Card>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} /> Child Profile
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>Child's Name</label>
                  <input 
                    type="text" 
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    style={{ 
                      width: '100%', padding: '12px', borderRadius: '12px', 
                      border: '2px solid #4A4036', fontSize: '16px', outline: 'none' 
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>Age Category</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['7-9', '10-12'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setAgeGroup(cat)}
                        style={{
                          flex: 1, padding: '10px', borderRadius: '12px', border: '2px solid #4A4036',
                          backgroundColor: ageGroup === cat ? 'var(--color-pastel-peach)' : '#f5f5f5',
                          fontWeight: 'bold', cursor: 'pointer'
                        }}
                      >
                        {cat === '7-9' ? '7 - 9.11 Years' : '10 - 12 Years'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Acoustic & Training Parameters */}
            <Card>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={20} /> Acoustic Training Parameters
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Speech Speed */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Speech Playback Rate</label>
                    <span style={{ fontWeight: 'bold' }}>{speechRate}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.7" 
                    max="1.2" 
                    step="0.1" 
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-primary-dark)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    <span>0.7x (Slower)</span>
                    <span>1.0x (Normal)</span>
                    <span>1.2x (Faster)</span>
                  </div>
                </div>

                {/* Background Noise Masking */}
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>Background Noise Level</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['low', 'medium', 'high'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setNoiseLevel(lvl)}
                        style={{
                          flex: 1, padding: '8px', borderRadius: '12px', border: '2px solid #4A4036',
                          backgroundColor: noiseLevel === lvl ? 'var(--color-pastel-green)' : '#f5f5f5',
                          fontWeight: 'bold', textTransform: 'capitalize', cursor: 'pointer'
                        }}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occlusion Type */}
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>Auditory Closure Occlusion Type</label>
                  <select 
                    value={occlusionType}
                    onChange={(e) => setOcclusionType(e.target.value)}
                    style={{ 
                      width: '100%', padding: '10px', borderRadius: '12px', 
                      border: '2px solid #4A4036', fontSize: '15px', fontWeight: 'bold', outline: 'none' 
                    }}
                  >
                    <option value="beep">1 kHz Beep Masking</option>
                    <option value="noise">White Noise Burst</option>
                    <option value="silence">Temporal Gap (Silence)</option>
                  </select>
                </div>

                {/* Trials per session */}
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>Trials per Training Session</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[3, 5, 10].map(cnt => (
                      <button
                        key={cnt}
                        onClick={() => setTrialsPerSession(cnt)}
                        style={{
                          flex: 1, padding: '8px', borderRadius: '12px', border: '2px solid #4A4036',
                          backgroundColor: trialsPerSession === cnt ? 'var(--color-pastel-blue)' : '#f5f5f5',
                          fontWeight: 'bold', cursor: 'pointer'
                        }}
                      >
                        {cnt} Trials
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </Card>

            {/* Security PIN */}
            <Card>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={20} /> Security PIN
              </h3>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="password" 
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="4-digit PIN"
                  style={{ 
                    width: '120px', padding: '10px', borderRadius: '12px', 
                    border: '2px solid #4A4036', fontSize: '18px', textAlign: 'center', letterSpacing: '4px' 
                  }}
                />
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Protects parent settings from child modifications.</span>
              </div>
            </Card>

            <Button size="lg" fullWidth onClick={handleSaveSettings}>
              Save Settings
            </Button>

          </div>
        )}

        {/* TAB 4: THERAPIST NOTES */}
        {activeTab === 'therapist' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <h3 style={{ fontSize: '20px', margin: 0 }}>Audiologist & SLP Clinical Notes</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {therapistNotes.map((noteItem, idx) => (
                <Card key={idx} style={{ backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--color-primary-dark)' }}>
                      {noteItem.therapist}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{noteItem.date}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5', color: '#4A4036' }}>
                    "{noteItem.note}"
                  </p>
                </Card>
              ))}
            </div>

            <Card style={{ backgroundColor: 'var(--color-pastel-blue)', textAlign: 'center' }}>
              <MessageSquare size={32} color="#4A4036" style={{ marginBottom: '8px' }} />
              <h4 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Have questions for your therapist?</h4>
              <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                You can leave a note or response for Dr. Ananya Sharma during your next clinical appointment.
              </p>
              <Button size="md" variant="secondary" onClick={() => alert('Message sent to therapist clinic queue.')} style={{ backgroundColor: 'white' }}>
                Send Message
              </Button>
            </Card>

          </div>
        )}

      </div>
    </div>
  );
}
