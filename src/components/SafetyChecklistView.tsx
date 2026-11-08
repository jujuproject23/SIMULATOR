import React, { useState } from 'react';
import { useTraining } from '../context/TrainingContext';
import { SAFETY_CHECKLIST_ITEMS } from '../data/courseData';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export const SafetyChecklistView: React.FC = () => {
  const { progress, setSafetyChecklistCompleted, setActiveTab } = useTraining();

  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    return progress.safetyChecklistCompleted
      ? SAFETY_CHECKLIST_ITEMS.map((item) => item.id)
      : [];
  });

  const toggleCheck = (id: string) => {
    sound.playClick();
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      return next;
    });
  };

  const allChecked = checkedIds.length === SAFETY_CHECKLIST_ITEMS.length;

  const handleConfirmChecklist = () => {
    if (!allChecked) return;
    sound.playSuccess();
    setSafetyChecklistCompleted(true);
  };

  const handleGoToSimulator = () => {
    sound.playClick();
    setActiveTab('simulator');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 mb-1">
              <span>GERBANG KESELAMATAN WAJIB (MANDATORY SAFETY GATE)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Checklist K3 & Protokol Darurat Baterai Lithium
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Teknisi wajib membaca, memahami, dan mencentang seluruh 8 komitmen keselamatan kerja di bawah ini sebelum sistem membuka akses ke Virtual Repair Simulator.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Status Komitmen</div>
            <div className="text-sm font-bold text-slate-900">
              <span className="tabular-nums text-[#FF6900]">{checkedIds.length}</span> / {SAFETY_CHECKLIST_ITEMS.length} Aturan
            </div>
          </div>
        </div>
      </div>

      {/* Critical Rules Notice Banner */}
      <div className="p-4 bg-red-50/70 border border-red-200/80 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-red-900">
          <Flame className="w-4 h-4 text-red-600" />
          <span>PERATURAN MUTLAK BENGKEL: TINDAKAN TERLARANG</span>
        </div>
        <p className="text-xs text-red-800 leading-relaxed">
          Jangan pernah menusuk, melipat, membengkokkan, memanaskan secara berlebihan, atau mencongkel baterai lithium dengan alat logam tajam. Pada baterai yang telah menggelembung (swollen) atau bocor, perbaikan harus DIHENTIKAN seketika dan dialihkan ke protokol isolasi darurat limbah B3.
        </p>
      </div>

      {/* Checklist list */}
      <div className="space-y-3">
        {SAFETY_CHECKLIST_ITEMS.map((item, index) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // handled by parent onClick
                  className="w-4 h-4 text-[#FF6900] rounded border-slate-300 focus:ring-[#FF6900]"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {index + 1}. {item.ruleTitle}
                  </span>
                  {item.isCritical && (
                    <span className="text-[10px] px-1.5 py-0.2 bg-red-100 text-red-700 rounded font-semibold uppercase">
                      Kritis
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Confirmation & Simulator Unlock Action */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          {progress.safetyChecklistCompleted ? (
            <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Checklist keselamatan telah terverifikasi secara resmi.
            </span>
          ) : allChecked ? (
            <span className="text-slate-700 font-medium">
              Semua poin telah dicentang. Silakan tekan konfirmasi untuk membuka simulator.
            </span>
          ) : (
            <span>Centang seluruh aturan di atas untuk mengaktifkan tombol konfirmasi.</span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!progress.safetyChecklistCompleted ? (
            <button
              disabled={!allChecked}
              onClick={handleConfirmChecklist}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                allChecked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              KONFIRMASI STANDAR K3
            </button>
          ) : (
            <button
              onClick={handleGoToSimulator}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#FF6900] hover:bg-[#e05d00] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>BUKA VIRTUAL SIMULATOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
