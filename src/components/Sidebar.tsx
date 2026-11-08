import React from 'react';
import { useTraining } from '../context/TrainingContext';
import { NavigationTab } from '../types';
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  FileCheck2,
  TrendingUp,
  Award,
  Lock,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const {
    activeTab,
    setActiveTab,
    progress,
    overallProgressPercent,
    isSimulatorUnlocked,
    isExamUnlocked,
    isCertificateUnlocked
  } = useTraining();

  const handleTabClick = (tab: NavigationTab) => {
    sound.playClick();
    setActiveTab(tab);
    onCloseMobile();
  };

  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Dashboard',
      sublabel: 'Ringkasan & Jalur Pelatihan',
      icon: LayoutDashboard,
      isLocked: false,
      badge: null,
    },
    {
      id: 'learning' as NavigationTab,
      label: 'Materi Pembelajaran',
      sublabel: '5 Bab & Checklist K3',
      icon: BookOpen,
      isLocked: false,
      badge: `${progress.completedChapters.length}/5 Bab`,
      isDone: progress.completedChapters.length === 5 && progress.safetyChecklistCompleted,
    },
    {
      id: 'simulator' as NavigationTab,
      label: 'Simulator Reparasi',
      sublabel: 'Hands-on Virtual Repair',
      icon: Wrench,
      isLocked: !isSimulatorUnlocked,
      badge: isSimulatorUnlocked ? (progress.simulatorGuidedCompleted ? 'Selesai' : 'Aktif') : 'K3 Diperlukan',
      isDone: progress.simulatorGuidedCompleted,
    },
    {
      id: 'examination' as NavigationTab,
      label: 'Ujian Kompetensi',
      sublabel: 'Teori 20 Soal & Praktik',
      icon: FileCheck2,
      isLocked: !isExamUnlocked,
      badge: progress.theoryExamPassed ? `${progress.theoryExamScore}%` : 'Belum Lulus',
      isDone: progress.theoryExamPassed && progress.simulatorAssessmentCompleted,
    },
    {
      id: 'progress' as NavigationTab,
      label: 'Progres Belajar',
      sublabel: 'Riwayat & Skor Detail',
      icon: TrendingUp,
      isLocked: false,
      badge: `${overallProgressPercent}%`,
    },
    {
      id: 'certificate' as NavigationTab,
      label: 'Sertifikat',
      sublabel: 'Sertifikat Kelulusan Teknis',
      icon: Award,
      isLocked: !isCertificateUnlocked,
      badge: isCertificateUnlocked ? 'Tersedia' : 'Terkunci',
      isDone: isCertificateUnlocked,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 md:z-20 w-72 h-screen bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header in Sidebar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6900] text-white flex items-center justify-center font-bold text-sm">
              ST
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">SMART TECH</h2>
              <p className="text-[11px] text-slate-500 font-medium">Technical Training System</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            Menu Utama
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                  isActive
                    ? 'bg-[#FFF3E8] text-[#FF6900] font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#FF6900] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-medium leading-snug truncate">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal truncate">
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 pl-2">
                  {item.isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : item.isLocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  ) : item.badge ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                        isActive
                          ? 'bg-[#FF6900]/10 text-[#FF6900]'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Technician Profile Card at bottom of sidebar */}
        <div className="p-4 border-t border-slate-200 bg-[#FBFBFC]">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Profil Teknisi
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Aktif Pelatihan
              </span>
            </div>

            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FF6900]/10 text-[#FF6900] font-bold text-sm flex items-center justify-center border border-[#FF6900]/20">
                {progress.technicianName.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {progress.technicianName}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {progress.technicianId}
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-1.5 border-t border-slate-100 text-[11px]">
              <div className="flex justify-between text-slate-500">
                <span>Kursus:</span>
                <span className="font-semibold text-slate-700">COURSE 001</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Status Kelulusan:</span>
                <span
                  className={`font-semibold ${
                    progress.theoryExamPassed && progress.simulatorAssessmentCompleted
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}
                >
                  {progress.theoryExamPassed && progress.simulatorAssessmentCompleted
                    ? 'Lulus Kompetensi'
                    : 'Dalam Pelatihan'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
