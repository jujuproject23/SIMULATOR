import React, { useState } from 'react';
import { TrainingProvider, useTraining } from './context/TrainingContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LearningMaterialsView } from './components/LearningMaterialsView';
import { VirtualSimulatorView } from './components/VirtualSimulatorView';
import { ExaminationView } from './components/ExaminationView';
import { ProgressView } from './components/ProgressView';
import { CertificateView } from './components/CertificateView';
import { AdminModal } from './components/AdminModal';

const AppContent: React.FC = () => {
  const { activeTab } = useTraining();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] flex">
      {/* Sidebar navigation */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main content body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar contract compliant Navbar */}
        <Navbar
          onOpenAdmin={() => setAdminModalOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />

        {/* Viewport content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'learning' && <LearningMaterialsView />}
          {activeTab === 'simulator' && <VirtualSimulatorView />}
          {activeTab === 'examination' && <ExaminationView />}
          {activeTab === 'progress' && <ProgressView />}
          {activeTab === 'certificate' && <CertificateView />}
        </main>

        {/* Footer */}
        <footer className="no-print py-4 px-6 border-t border-slate-200/80 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">SMART TECH ACADEMY</span>
            <span aria-hidden="true">·</span>
            <span>Platform Pelatihan Teknisi Smartphone Mandiri</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Internal Competency Program · Kurikulum Standar Industri 2026
          </div>
        </footer>
      </div>

      {/* Admin / Evaluator Settings Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <TrainingProvider>
      <AppContent />
    </TrainingProvider>
  );
}
