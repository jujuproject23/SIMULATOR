import React from 'react';
import { useTraining } from '../context/TrainingContext';
import { CHAPTERS } from '../data/courseData';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Wrench,
  FileCheck2,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { sound } from '../utils/audio';

export const ProgressView: React.FC = () => {
  const {
    progress,
    overallProgressPercent,
    isCertificateUnlocked,
    setActiveTab
  } = useTraining();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6900] mb-1">
            <span>REKAPITULASI CAPAIAN PEMBELAJARAN</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">ID: {progress.technicianId}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Progres Pelatihan Teknisi: {progress.technicianName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pantau status kelulusan modul teori, performa simulasi virtual, dan catatan ujian kompetensi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Status Akumulatif:</span>
            <div className="text-sm font-bold text-slate-900">
              <span className="text-[#FF6900] tabular-nums">{overallProgressPercent}%</span> Selesai
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6900] flex items-center justify-center font-bold text-xs text-[#FF6900] bg-[#FFF3E8]">
            {overallProgressPercent}%
          </div>
        </div>
      </div>

      {/* Progress Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Chapters Completed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-orange-50 text-[#FF6900] rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-900 tabular-nums">
              {progress.completedChapters.length} / {CHAPTERS.length} Bab
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Penguasaan Modul Teori
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {progress.completedChapters.length === CHAPTERS.length
                ? 'Semua bab materi pembelajaran telah selesai dipelajari.'
                : 'Selesaikan seluruh 5 bab teori untuk memperkuat dasar pemahaman.'}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            {CHAPTERS.map((ch) => {
              const done = progress.completedChapters.includes(ch.id);
              return (
                <div key={ch.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 truncate">
                    Bab {ch.number}: {ch.title}
                  </span>
                  {done ? (
                    <span className="text-emerald-600 font-bold shrink-0">✓ Selesai</span>
                  ) : (
                    <span className="text-slate-600 shrink-0">Belum</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 2: Simulator Performance */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Wrench className="w-6 h-6" />
            </div>
            <span
              className={`text-xs font-bold ${
                progress.simulatorGuidedCompleted ? 'text-emerald-600' : 'text-slate-600'
              }`}
            >
              {progress.simulatorGuidedCompleted ? 'Tuntas' : 'Belum Selesai'}
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Performa Virtual Simulator
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Catatan latihan hands-on penggantian baterai 13 langkah SOP.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Simulasi Mode Terpandu:</span>
              <span className="font-bold text-slate-900">
                {progress.simulatorGuidedCompleted ? `${progress.simulatorGuidedScore}% (Lulus)` : 'Belum dicoba'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Asesmen Praktik Mandiri:</span>
              <span className="font-bold text-slate-900">
                {progress.simulatorAssessmentCompleted ? `${progress.simulatorAssessmentScore}%` : 'Belum dicoba'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Checklist K3 Mandatori:</span>
              <span className={progress.safetyChecklistCompleted ? 'text-emerald-600 font-bold' : 'text-amber-600 font-semibold'}>
                {progress.safetyChecklistCompleted ? '✓ Terverifikasi' : 'Menunggu Pengisian'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Lab Pencocokan Alat:</span>
              <span className={progress.toolsMatchingCompleted ? 'text-emerald-600 font-bold' : 'text-slate-600 font-semibold'}>
                {progress.toolsMatchingCompleted ? '✓ Terverifikasi' : 'Belum Selesai'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Theory & Practical Exam Results */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <span
              className={`text-xs font-bold ${
                progress.theoryExamPassed ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {progress.theoryExamPassed ? 'LULUS (80%+)' : 'BELUM LULUS'}
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Ujian Kompetensi Akhir
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Ambang batas kelulusan teori adalah minimal 80% (16 soal benar).
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Skor Ujian Teori Terbaik:</span>
              <span className="font-bold text-slate-900">
                {progress.theoryExamScore > 0 ? `${progress.theoryExamScore}%` : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Jumlah Percobaan:</span>
              <span className="font-semibold text-slate-800">
                {progress.theoryExamAttempts} kali
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Kelayakan Sertifikat:</span>
              <span className={isCertificateUnlocked ? 'text-emerald-600 font-bold' : 'text-slate-600'}>
                {isCertificateUnlocked ? '✓ Memenuhi Syarat' : 'Belum Lengkap'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Exam History Table if any */}
      {progress.theoryExamHistory.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Riwayat Percobaan Ujian Teori
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Tanggal Pelaksanaan</th>
                  <th className="py-2.5 px-3">Skor Hasil</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {progress.theoryExamHistory.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{item.date}</td>
                    <td className="py-3 px-3 font-bold tabular-nums text-slate-900">{item.score}%</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.passed ? 'Lulus' : 'Belum Lulus'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Certificate Roadmap Notice */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isCertificateUnlocked ? 'Sertifikat Kelulusan Resmi Telah Terbit!' : 'Syarat Penerbitan Sertifikat Pelatihan'}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {isCertificateUnlocked
                ? 'Selamat! Anda telah melengkapi seluruh persyaratan dan dapat mencetak sertifikat kompetensi.'
                : 'Selesaikan 5 Bab teori, Checklist K3, Praktik Simulator, dan Ujian Akhir Teori (min. 80%).'}
            </p>
          </div>
        </div>

        {isCertificateUnlocked && (
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('certificate');
            }}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            Buka Sertifikat
          </button>
        )}
      </div>
    </div>
  );
};
