import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TeamSection from './components/TeamSection';
import ArchitectureSection from './components/ArchitectureSection';
import CodeExplorerSection from './components/CodeExplorerSection';
import SimulatorSection from './components/SimulatorSection';
import TeacherQuestionsSection from './components/TeacherQuestionsSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedCodeFileId, setSelectedCodeFileId] = useState('CajaFuerte');

  const scrollToCode = () => {
    const el = document.getElementById('codigo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSim = () => {
    const el = document.getElementById('simulador');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectClassFromTeam = (classStr) => {
    let target = 'CajaFuerte';
    if (classStr.includes('Main')) target = 'Main';
    else if (classStr.includes('CajaFuerte')) target = 'CajaFuerte';
    else if (classStr.includes('Estadistica')) target = 'Estadistica';
    else if (classStr.includes('UtilidadesConsola')) target = 'UtilidadesConsola';

    setSelectedCodeFileId(target);
    scrollToCode();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar />

      {/* Hero / Presentation Cover */}
      <HeroSection
        onScrollToCode={scrollToCode}
        onScrollToSim={scrollToSim}
      />

      {/* Team Distribution (Juan, Miguel, Alejandra) */}
      <TeamSection onSelectClass={handleSelectClassFromTeam} />

      {/* Structural Architecture & Interactive UML */}
      <ArchitectureSection />

      {/* Code Explorer with Java Line-by-Line Pedagogy */}
      <CodeExplorerSection
        selectedFileId={selectedCodeFileId}
        onSelectFile={(id) => setSelectedCodeFileId(id)}
      />

      {/* Interactive Vault Emulator & Terminal */}
      <SimulatorSection />

      {/* Exam & Defense Questions Bank for Programación 2 */}
      <TeacherQuestionsSection />

      {/* Footer with Project & Authors Info */}
      <Footer />
    </div>
  );
}
