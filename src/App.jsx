// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BioSection from './components/BioSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectDetail from './components/ProjectDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-500 bg-opacity-90 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-1 bg-white my-8 transform -rotate-45" style={{left: `${Math.random() * 100}%`}}></div>
          ))}
        </div>
        
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <HomePage />
                <BioSection />
                <ProjectsSection />
              </>
            } />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;