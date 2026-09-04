import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Child Portal Pages
import ChildOnboarding from './pages/ChildOnboarding';
import ChildDashboard from './pages/ChildDashboard';
import ChildLevelSelect from './pages/ChildLevelSelect';
import ChildTraining from './pages/ChildTraining';
import ChildScorecard from './pages/ChildScorecard';

// Stubs for now
const ParentPortal = () => <div className="p-4">Parent Portal</div>;
const TherapistPortal = () => <div className="p-4">Therapist Portal</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/child" replace />} />
          <Route path="/child" element={<ChildOnboarding />} />
          <Route path="/child/dashboard" element={<ChildDashboard />} />
          <Route path="/child/level/:moduleId" element={<ChildLevelSelect />} />
          <Route path="/child/training/:moduleId/:levelId" element={<ChildTraining />} />
          <Route path="/child/scorecard" element={<ChildScorecard />} />
          <Route path="/parent/*" element={<ParentPortal />} />
          <Route path="/therapist/*" element={<TherapistPortal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
