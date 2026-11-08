import React from 'react';
import { useTraining } from '../context/TrainingContext';
import {
  BookOpen,
  Wrench,
  FileCheck2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  AlertCircle,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export const DashboardView: React.FC = () => {
  const {
    progress,
    setActiveTab,
    overallProgressPercent,
    isSimulatorUnlocked,
    isExamUnlocked,
    isCertificateUnlocked
  } = useTraining();

  // Determine status for the 3 main cards
  // Card 1: Learn
  const learnStatus =
    progress.completedChapters.length === 5 && progress.safetyChecklistCompleted
      ? 'Completed'
      : progress.completedChapters.length > 0 || progress.safetyChecklistCompleted
      ? 'In Progress'
      : 'Not Started';

  // Card 2: Practice
  const practiceStatus =
    progress.simulatorGuidedCompleted && progress.simulatorAssessmentCompleted
      ? 'Completed'
      : progress.simulatorGuidedCompleted
      ? 'In Progress'
      : 'Not Started';

  // Card 3: Exam
  const examStatus =
    progress.theoryExamPassed
      ? 'Completed'
      : progress.theoryExamAttempts > 0
      ? 'In Progress'
      : 'Not Started';

  const handleStartLearn = () => {
    sound.playClick();
    setActiveTab('learning');
  };

  const handleStartSimulator = () => {
    sound.playClick();
    setActiveTab('simulator');
  };

  const handleStartExam = () => {
    sound.playClick();
    setActiveTab('examination');
  };

  const handleOpenCertificate = () => {
    sound.playClick();
    setActiveTab('certificate');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* A. Welcome Banner Section */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6900]">
                <span>MODUL SERTIFIKASI TEKNISI RESMI</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500">KODE: STA-BAT-001</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
                Selamat Datang, Teknisi {progress.technicianName}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Anda terdaftar pada program pelatihan <strong className="text-slate-800">COURSE 001 — Smartphone Battery Replacement</strong>. Pelajari anatomi sel baterai, kuasai keselamatan kerja elektrokimia, dan latih teknik pembongkaran mandiri melalui simulator interaktif.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-800">ID Teknisi:</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  {progress.technicianId}
                </span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Estimasi Durasi: 90 Menit</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Standar K3 Industri</span>
              </div>
            </div>
          </div>

          {/* Workbench Hero Visual */}
          <div className="lg:col-span-5 relative bg-slate-900 min-h-[220px] lg:min-h-full">
            <img
              src="/src/assets/images/workbench_hero_1794149576802.jpg"
              alt="Meja Kerja Teknisi Smartphone Modern"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:via-transparent lg:to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[11px] font-semibold text-orange-400 tracking-wide">
                VIRTUAL WORKSPACE
              </span>
              <p className="text-xs text-slate-200">
                Peralatan presisi & standar penanganan baterai berlisensi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* B. Learning Progress Cards Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Total Progres Kursus</div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {overallProgressPercent}%
            </span>
            <span className="text-xs text-slate-500">Selesai</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF6900] rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Materi & Teori</div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {progress.completedChapters.length}/5
            </span>
            <span className="text-xs text-slate-500">Bab Tuntas</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {progress.safetyChecklistCompleted ? '✓ Checklist K3 Selesai' : 'Checklist K3 Menunggu'}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Status Simulator</div>
          <div className="flex items-baseline gap-2 mb-2">
            <span
              className={`text-2xl font-bold ${
                progress.simulatorGuidedCompleted ? 'text-emerald-600' : 'text-slate-900'
              }`}
            >
              {progress.simulatorGuidedCompleted ? 'Lulus' : isSimulatorUnlocked ? 'Siap' : 'Terkunci'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {progress.simulatorGuidedCompleted
              ? `Skor Terpandu: ${progress.simulatorGuidedScore}%`
              : isSimulatorUnlocked
              ? 'Siap untuk simulasi virtual'
              : 'Selesaikan Bab 3 & Checklist K3'}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Ujian Kompetensi</div>
          <div className="flex items-baseline gap-2 mb-2">
            <span
              className={`text-2xl font-bold ${
                progress.theoryExamPassed ? 'text-emerald-600' : 'text-slate-900'
              }`}
            >
              {progress.theoryExamPassed ? `${progress.theoryExamScore}%` : 'Belum Ujian'}
            </span>
            {progress.theoryExamPassed && (
              <span className="text-xs text-emerald-600 font-semibold">Lulus</span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Passing Score: 80% (20 Soal Pilihan)
          </p>
        </div>
      </div>

      {/* C. Learning Journey: 3 Large Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Alur Pembelajaran Teknis</h2>
            <p className="text-xs text-slate-500">
              Selesaikan 3 pilar pelatihan secara berurutan untuk memperoleh sertifikat kompetensi
            </p>
          </div>
          {isCertificateUnlocked && (
            <button
              onClick={handleOpenCertificate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Lihat Sertifikat Kelulusan</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 — LEARN */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between hover:border-slate-300 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-orange-50 text-[#FF6900] rounded-xl group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  {learnStatus === 'Completed' ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesai (5/5)
                    </span>
                  ) : learnStatus === 'In Progress' ? (
                    <span className="text-amber-600 font-bold">Sedang Dipelajari</span>
                  ) : (
                    <span>Belum Dimulai</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-[#FF6900] uppercase tracking-wider mb-1">
                  Tahap 01 — Dasar Teori
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6900] transition-colors">
                  Pelajari Dasar-Dasar Penggantian Baterai
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Pahami teknologi baterai smartphone, pengenalan toolset lengkap, prosedur keselamatan kerja K3, dan 16 SOP penggantian baterai terstandar.
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-500 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Modul Teori:</span>
                  <span className="font-semibold text-slate-800">5 Bab Lengkap</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Checklist Keselamatan:</span>
                  <span className={progress.safetyChecklistCompleted ? 'text-emerald-600 font-semibold' : 'text-slate-500'}>
                    {progress.safetyChecklistCompleted ? 'Terverifikasi' : 'Wajib Diisi'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                onClick={handleStartLearn}
                className="w-full py-2.5 px-4 bg-[#FF6900] hover:bg-[#e05d00] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{learnStatus === 'Completed' ? 'TINJAU MATERI' : 'MULAI BELAJAR'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 2 — PRACTICE */}
          <div
            className={`bg-white rounded-2xl border shadow-xs p-6 flex flex-col justify-between transition-all group ${
              !isSimulatorUnlocked
                ? 'border-slate-200/60 opacity-90'
                : 'border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  {practiceStatus === 'Completed' ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : practiceStatus === 'In Progress' ? (
                    <span className="text-amber-600 font-bold">Sedang Berlatih</span>
                  ) : (
                    <span>Belum Dimulai</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                  Tahap 02 — Praktik Virtual
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Virtual Battery Replacement Simulator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Latih seluruh urutan perbaikan baterai pada kanvas visual smartphone interaktif. Tersedia Mode Terpandu dengan petunjuk dan Mode Asesmen Mandiri.
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-500 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Status Akses:</span>
                  <span className={isSimulatorUnlocked ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>
                    {isSimulatorUnlocked ? 'Terbuka' : 'Perlu Checklist K3'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Skor Terbaik:</span>
                  <span className="font-semibold text-slate-800">
                    {progress.simulatorGuidedScore > 0 ? `${progress.simulatorGuidedScore}%` : '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                onClick={handleStartSimulator}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>MULAI SIMULATOR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 3 — EXAM */}
          <div
            className={`bg-white rounded-2xl border shadow-xs p-6 flex flex-col justify-between transition-all group ${
              !isExamUnlocked
                ? 'border-slate-200/60 opacity-90'
                : 'border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-105 transition-transform">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  {examStatus === 'Completed' ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Lulus ({progress.theoryExamScore}%)
                    </span>
                  ) : examStatus === 'In Progress' ? (
                    <span className="text-amber-600 font-bold">Pernah Mencoba</span>
                  ) : (
                    <span>Belum Dimulai</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider mb-1">
                  Tahap 03 — Ujian Akhir
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Final Competency Examination
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Uji pemahaman komprehensif Anda melalui 20 butir soal teori berbatas waktu 30 menit dan evaluasi praktis simulator untuk meraih kelulusan.
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-500 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Passing Score:</span>
                  <span className="font-semibold text-slate-800">80% (Min. 16 Soal Benar)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Jumlah Percobaan:</span>
                  <span className="font-semibold text-slate-800">{progress.theoryExamAttempts} kali</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                onClick={handleStartExam}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{progress.theoryExamPassed ? 'ULANGI UJIAN' : 'MULAI UJIAN'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Gate Warning & Industrial Advice Banner */}
      <div className="p-5 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-amber-900">
              Standar K3 Wajib: Jangan Lewatkan Checklist Keselamatan
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Simulator virtual menerapkan aturan keselamatan ketat. Teknisi wajib membaca Bab 03 dan menyelesaikan Checklist Keselamatan Kerja sebelum dapat mengoperasikan simulator virtual.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('learning');
          }}
          className="shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Buka Checklist K3
        </button>
      </div>
    </div>
  );
};
