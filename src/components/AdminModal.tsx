import React, { useState } from 'react';
import { useTraining } from '../context/TrainingContext';
import {
  Settings,
  X,
  RotateCcw,
  Unlock,
  CheckCircle2,
  User,
  ShieldAlert,
  Save
} from 'lucide-react';
import { sound } from '../utils/audio';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    progress,
    updateTechnicianProfile,
    resetAllProgress,
    unlockAllForEvaluation
  } = useTraining();

  const [name, setName] = useState(progress.technicianName);
  const [techId, setTechId] = useState(progress.technicianId);
  const [passingGrade, setPassingGrade] = useState('80');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    updateTechnicianProfile(name, techId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 1500);
  };

  const handleUnlockAll = () => {
    sound.playSuccess();
    unlockAllForEvaluation();
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh progres belajar ke kondisi awal?')) {
      sound.playClick();
      resetAllProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-6 shadow-xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 text-slate-800 rounded-lg">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pengaturan Pelatihan & Panel Evaluator
              </h3>
              <p className="text-[11px] text-slate-500">
                Konfigurasi profil demo dan pintasan peninjauan kurikulum.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form: Technician Profile */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Nama Teknisi:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF6900]"
              placeholder="Masukkan nama teknisi"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Nomor Registrasi ID:
              </label>
              <input
                type="text"
                value={techId}
                onChange={(e) => setTechId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF6900] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Passing Score Ujian (%):
              </label>
              <input
                type="number"
                value={passingGrade}
                onChange={(e) => setPassingGrade(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF6900] font-mono"
                min="50"
                max="100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Data Tersimpan!' : 'Simpan Profil'}</span>
          </button>
        </form>

        {/* Evaluator Quick Actions */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Aksi Pintasan Evaluator:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleUnlockAll}
              className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-left text-xs transition-colors flex items-start gap-2.5"
            >
              <Unlock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Buka Semua Akses</div>
                <div className="text-[10px] text-emerald-600">
                  Buka bab, simulator, ujian & sertifikat instan.
                </div>
              </div>
            </button>

            <button
              onClick={handleReset}
              className="p-3 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 rounded-xl text-left text-xs transition-colors flex items-start gap-2.5"
            >
              <RotateCcw className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Reset Progres</div>
                <div className="text-[10px] text-red-600">
                  Kembalikan ke status awal belum belajar.
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-2 text-[10px] text-slate-600 leading-relaxed text-center">
          Mode demo lokal (localStorage). Data disimpan di browser Anda.
        </div>
      </div>
    </div>
  );
};
