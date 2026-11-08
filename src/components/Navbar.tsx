import React from 'react';
import { useTraining } from '../context/TrainingContext';
import { Settings, Volume2, VolumeX, Menu, ShieldCheck, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenAdmin: () => void;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onToggleMobileMenu }) => {
  const { progress, overallProgressPercent, isCertificateUnlocked } = useTraining();
  const [soundEnabled, setSoundEnabled] = React.useState(sound.enabled);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundEnabled(sound.enabled);
    if (sound.enabled) {
      sound.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 md:gap-8 px-4 md:px-8 py-3.5 bg-white border-b border-slate-200">
      {/* Zone 1: Mobile toggle & Brand Title */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#FF6900] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            ST
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              SMART TECH ACADEMY
            </span>
            <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
              Platform Pelatihan Teknisi Smartphone
            </span>
          </div>
        </div>
      </div>

      {/* Zone 2: Course Progress & Status indicator */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">COURSE 001</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Penggantian Baterai Smartphone</span>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <span className="text-slate-500 font-medium">Progres Pelatihan:</span>
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF6900] rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
          <span className="font-bold text-slate-900 tabular-nums">{overallProgressPercent}%</span>
        </div>
      </div>

      {/* Zone 3: Technician Badge & Control Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Certificate Ready Badge */}
        {isCertificateUnlocked && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sertifikat Siap</span>
          </div>
        )}

        {/* Audio feedback toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Matikan Suara Audio' : 'Aktifkan Suara Audio'}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Audio"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-slate-700" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Admin / Evaluator Settings */}
        <button
          onClick={onOpenAdmin}
          title="Pengaturan Demo & Evaluator"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Pengaturan"
        >
          <Settings className="w-4 h-4 text-slate-700" />
        </button>

        {/* Technician profile mini tag */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
            {progress.technicianName.charAt(0)}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 leading-tight">
              {progress.technicianName}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {progress.technicianId}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
