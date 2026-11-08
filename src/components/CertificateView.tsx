import React, { useEffect, useRef } from 'react';
import { useTraining } from '../context/TrainingContext';
import {
  Award,
  Printer,
  Download,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Calendar,
  Sparkles,
  QrCode,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const CertificateView: React.FC = () => {
  const {
    progress,
    isCertificateUnlocked,
    setActiveTab
  } = useTraining();

  const confettiTriggered = useRef(false);

  useEffect(() => {
    if (isCertificateUnlocked && !confettiTriggered.current) {
      confettiTriggered.current = true;
      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [isCertificateUnlocked]);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  if (!isCertificateUnlocked) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-6 my-12">
        <div className="w-16 h-16 mx-auto bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-200">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            Sertifikat Kelulusan Masih Terkunci
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Untuk menerbitkan Sertifikat Kompetensi Resmi SMART TECH ACADEMY, Anda harus menyelesaikan seluruh persyaratan pelatihan berikut:
          </p>
        </div>

        {/* Requirements checklist card */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-left max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">1. Selesaikan 5 Bab Materi Teori</span>
            <span className={progress.completedChapters.length === 5 ? 'text-emerald-600 font-bold' : 'text-slate-600 font-semibold'}>
              {progress.completedChapters.length === 5 ? '✓ Selesai' : `${progress.completedChapters.length}/5 Bab`}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">2. Verifikasi Checklist Keselamatan (K3)</span>
            <span className={progress.safetyChecklistCompleted ? 'text-emerald-600 font-bold' : 'text-slate-600 font-semibold'}>
              {progress.safetyChecklistCompleted ? '✓ Selesai' : 'Belum'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">3. Selesaikan Virtual Simulator (Mode Terpandu)</span>
            <span className={progress.simulatorGuidedCompleted ? 'text-emerald-600 font-bold' : 'text-slate-600 font-semibold'}>
              {progress.simulatorGuidedCompleted ? '✓ Lulus' : 'Belum'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">4. Asesmen Praktik Mandiri Simulator</span>
            <span className={progress.simulatorAssessmentCompleted ? 'text-emerald-600 font-bold' : 'text-slate-600 font-semibold'}>
              {progress.simulatorAssessmentCompleted ? '✓ Lulus' : 'Belum'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">5. Lulus Ujian Teori (Nilai Min. 80%)</span>
            <span className={progress.theoryExamPassed ? 'text-emerald-600 font-bold' : 'text-slate-600 font-semibold'}>
              {progress.theoryExamPassed ? `✓ Lulus (${progress.theoryExamScore}%)` : 'Belum Lulus'}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('learning')}
            className="px-5 py-2.5 bg-[#FF6900] hover:bg-[#e05d00] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Lanjutkan Pelatihan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top action header (hidden during printing via CSS) */}
      <div className="no-print bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SERTIFIKAT KELULUSAN RESMI DITERBITKAN</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Sertifikat Kompetensi Penggantian Baterai Smartphone
          </h1>
          <p className="text-xs text-slate-500">
            Diterbitkan oleh SMART TECH ACADEMY Technical Evaluation Board.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Certificate Container */}
      <div
        id="printable-certificate"
        className="bg-white p-8 sm:p-14 rounded-2xl border-8 border-double border-[#FF6900]/30 shadow-lg relative overflow-hidden text-center space-y-6"
      >
        {/* Subtle decorative security background patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Certificate Brand Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#FF6900] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              ST
            </div>
            <span className="text-xl font-black tracking-wider text-slate-900">
              SMART TECH ACADEMY
            </span>
          </div>

          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
            INTERNAL TECHNICAL TRAINING PROGRAM · JAKARTA
          </div>
        </div>

        {/* Certificate Title */}
        <div className="py-2 space-y-1 border-t border-b border-slate-200">
          <div className="text-xs font-semibold text-[#FF6900] uppercase tracking-widest">
            SERTIFIKAT KELULUSAN KOMPETENSI TEKNIS
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CERTIFICATE OF TECHNICAL COMPETENCY
          </div>
        </div>

        {/* Recipient info */}
        <div className="space-y-3 pt-2">
          <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider">
            Diberikan secara resmi kepada teknisi:
          </p>
          <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-wide underline decoration-[#FF6900] decoration-2 underline-offset-8">
            {progress.technicianName}
          </div>
          <div className="text-xs text-slate-600 font-mono pt-1">
            Nomor Registrasi Teknisi: <strong className="text-slate-800">{progress.technicianId}</strong>
          </div>
        </div>

        {/* Course details statement */}
        <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 pt-2">
          <p>
            Atas keberhasilan menyelesaikan seluruh modul pelatihan teori, checklist keselamatan kerja (K3), simulasi virtual 13 tahapan SOP, dan lulus Ujian Kompetensi Akhir pada program:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-900 text-sm sm:text-base">
            COURSE 001 — Smartphone Battery Replacement
          </div>
          <p className="text-[11px] text-slate-500">
            Mencakup: Pengenalan Sel Lithium, Alat Presisi ESD, Mitigasi Thermal Runaway, Penarikan Lem Tarik (Pull-Tabs), dan 7 Titik Verifikasi Quality Control (QC).
          </p>
        </div>

        {/* Verification & Signatures Footer */}
        <div className="pt-8 mt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-left">
          {/* Certificate metadata & QR */}
          <div className="space-y-1.5 text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">No. Sertifikat: </span>
              <span className="font-mono text-slate-900 font-bold">{progress.certificateId || 'STA-CERT-884210'}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700">Tanggal Terbit: </span>
              <span className="text-slate-900">{progress.certificateDate || '8 November 2026'}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700">Skor Teori: </span>
              <span className="text-emerald-600 font-bold">{progress.theoryExamScore}% (Lulus)</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700">Skor Praktik: </span>
              <span className="text-emerald-600 font-bold">{progress.simulatorAssessmentScore || 95}% (Lulus)</span>
            </div>
          </div>

          {/* Gold Academy Seal Badge */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-amber-400 bg-amber-50 flex flex-col items-center justify-center text-amber-700 shadow-xs">
              <Award className="w-8 h-8 text-amber-500" />
              <span className="text-[8px] font-black tracking-widest uppercase mt-0.5">VERIFIED</span>
            </div>
            <span className="text-[9px] text-slate-500 font-bold mt-1">OFFICIAL SEAL</span>
          </div>

          {/* Instructor Signature Mock */}
          <div className="space-y-1 text-right">
            <div className="h-10 flex items-end justify-end">
              <span className="font-serif italic text-lg text-slate-800">
                Ir. Hendra Gunawan, S.T.
              </span>
            </div>
            <div className="border-t border-slate-300 pt-1">
              <div className="text-xs font-bold text-slate-900">
                Ir. Hendra Gunawan, S.T.
              </div>
              <div className="text-[10px] text-slate-500">
                Kepala Dewan Instruktur Teknik
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="pt-4 text-[10px] text-slate-600 border-t border-slate-100 leading-normal text-center">
          <strong>DISCLAIMER RESMI: </strong>
          Sertifikat ini merupakan dokumen bukti penyelesaian pelatihan internal kompetensi teknis SMART TECH ACADEMY, bukan lisensi profesional perbaikan komersial atau sertifikasi resmi prinsipal merek smartphone.
        </div>
      </div>
    </div>
  );
};
