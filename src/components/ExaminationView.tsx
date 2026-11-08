import React, { useState, useEffect } from 'react';
import { useTraining } from '../context/TrainingContext';
import { EXAM_QUESTION_BANK } from '../data/courseData';
import { ExamQuestion } from '../types';
import {
  FileCheck2,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Flag,
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  Wrench,
  HelpCircle
} from 'lucide-react';
import { sound } from '../utils/audio';

export const ExaminationView: React.FC = () => {
  const {
    progress,
    saveExamResult,
    isExamUnlocked,
    setActiveTab
  } = useTraining();

  const [activeTab, setActiveTabLocal] = useState<'theory' | 'practical'>('theory');

  // Exam session states
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(30 * 60); // 30 mins
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Result stats
  const [examScore, setExamScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Initialize randomized 20 questions
  const startExam = () => {
    sound.playClick();
    const shuffled = [...EXAM_QUESTION_BANK]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setTimeLeftSeconds(30 * 60);
    setExamStarted(true);
    setExamFinished(false);
  };

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examFinished && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeftSeconds]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    sound.playClick();
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleFlag = (questionId: string) => {
    sound.playClick();
    setFlaggedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const submitExam = () => {
    sound.playClick();
    setShowConfirmSubmit(false);

    let correct = 0;
    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined && q.correctAnswers.includes(ans)) {
        correct += 1;
      }
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    const passed = calculatedScore >= 80;

    setCorrectCount(correct);
    setExamScore(calculatedScore);
    setExamFinished(true);

    if (passed) {
      sound.playSuccess();
    } else {
      sound.playWarning();
    }

    saveExamResult(calculatedScore, passed);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;

  if (!isExamUnlocked) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-5 my-12">
        <div className="w-16 h-16 mx-auto bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-200">
          <FileCheck2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            Ujian Akhir Belum Terbuka
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Untuk memastikan kesiapan teknis Anda, selesaikan seluruh bab materi pembelajaran dan minimal 1 sesi latihan pada simulator perbaikan terlebih dahulu.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('learning')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
          >
            Pelajari Materi
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className="px-5 py-2.5 bg-[#FF6900] hover:bg-[#e05d00] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Buka Simulator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6900] mb-1">
            <span>EVALUASI STANDAR KOMPETENSI TEKNISI</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">STANDAR KELULUSAN 80%</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Ujian Kompetensi Reparasi Baterai
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ujian Teori 20 Butir Soal Acak (Waktu 30 Menit) & Evaluasi Praktik Simulator Mandiri.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTabLocal('theory')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'theory'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ujian Teori (20 Soal)
          </button>
          <button
            onClick={() => setActiveTabLocal('practical')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'practical'
                ? 'bg-white text-[#FF6900] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Asesmen Praktik Simulator
          </button>
        </div>
      </div>

      {activeTab === 'practical' ? (
        /* Practical Assessment Info & Launcher */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-50 text-[#FF6900] rounded-xl shrink-0">
              <Wrench className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">
                Ujian Praktik Virtual (Assessment Mode)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pada evaluasi praktis ini, Anda akan ditempatkan di Virtual Simulator tanpa bantuan petunjuk (hints) otomatis. Setiap kesalahan pemilihan alat atau urutan perbaikan akan tercatat dan mengurangi skor akhir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Indikator 01
              </span>
              <div className="text-xs font-bold text-slate-900">Ketepatan Pemilihan Alat</div>
              <p className="text-[11px] text-slate-600">
                Memilih alat non-konduktif dan obeng presisi sesuai spesifikasi tiap komponen.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Indikator 02
              </span>
              <div className="text-xs font-bold text-slate-900">Urutan SOP 13 Langkah</div>
              <p className="text-[11px] text-slate-600">
                Memutus konektor baterai sebelum komponen lain, menarik lem sudut rendah 15°.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Indikator 03 (Kritis)
              </span>
              <div className="text-xs font-bold text-red-600">Nol Pelanggaran K3</div>
              <p className="text-[11px] text-slate-600">
                Pelanggaran menusuk atau mencongkel baterai dengan logam otomatis menggugurkan ujian.
              </p>
            </div>
          </div>

          {progress.simulatorAssessmentCompleted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    Asesmen Praktik Telah Diselesaikan
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Skor Asesmen: <strong>{progress.simulatorAssessmentScore}%</strong>
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                LULUS KOMPETENSI PRAKTIK
              </span>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('simulator');
              }}
              className="px-6 py-2.5 bg-[#FF6900] hover:bg-[#e05d00] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>BUKA SIMULATOR MODE ASESMEN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : !examStarted ? (
        /* Theory Exam Welcome & Rules Card */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 space-y-6 max-w-3xl mx-auto">
          <div className="space-y-3 text-center">
            <div className="w-16 h-16 mx-auto bg-orange-50 text-[#FF6900] rounded-2xl flex items-center justify-center border border-orange-200">
              <FileCheck2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Instruksi Ujian Teori Kompetensi Teknis
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Ujian ini mengevaluasi penguasaan Anda atas teknologi baterai, toolset reparasi, standar operasional prosedur keselamatan kerja, dan kontrol kualitas pasca-perbaikan.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs text-slate-700">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Ketentuan Pelaksanaan Ujian:
            </div>
            <ul className="space-y-2 list-disc list-inside leading-relaxed text-slate-600">
              <li>Jumlah Soal: <strong>20 butir soal</strong> pilihan ganda dan benar/salah acak.</li>
              <li>Alokasi Waktu: <strong>30 menit</strong> (penghitung waktu mundur otomatis).</li>
              <li>Ambang Batas Kelulusan (Passing Grade): <strong>Minimal 80% (16 soal benar)</strong>.</li>
              <li>Anda dapat melompati, menandai (flag) soal untuk ditinjau kembali sebelum melakukan pengiriman final.</li>
              <li>Setelah tombol kirim ditekan, jawaban tidak dapat diubah lagi.</li>
            </ul>
          </div>

          {progress.theoryExamHistory.length > 0 && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">
                Riwayat Ujian Sebelumnya:
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Skor Tertinggi Anda:</span>
                <span className={`font-bold ${progress.theoryExamPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {progress.theoryExamScore}% {progress.theoryExamPassed ? '(Lulus)' : '(Belum Lulus)'}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Total Percobaan:</span>
                <span className="font-semibold">{progress.theoryExamAttempts} kali</span>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <button
              onClick={startExam}
              className="px-8 py-3 bg-[#FF6900] hover:bg-[#e05d00] text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>{progress.theoryExamAttempts > 0 ? 'MULAI ULANG UJIAN TEORI' : 'MULAI UJIAN TEORI SEKARANG'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : !examFinished ? (
        /* Active Theory Exam Session */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Card (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            {/* Top Question Info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg">
                  Soal {currentIndex + 1} dari {questions.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Kategori: {currentQuestion.category}
                </span>
              </div>

              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  flaggedQuestions.includes(currentQuestion.id)
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions.includes(currentQuestion.id) ? 'Ditandai' : 'Tandai Ragu'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((opt, optIndex) => {
                  const isSelected = userAnswers[currentQuestion.id] === optIndex;

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelectOption(currentQuestion.id, optIndex)}
                      className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[#FFF3E8] border-[#FF6900] text-[#FF6900] font-semibold shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-[#FF6900] bg-[#FF6900] text-white font-bold'
                            : 'border-slate-300 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </div>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Bottom Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex((prev) => Math.max(0, prev - 1));
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentIndex === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
                  }}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai & Kumpulkan</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Palette & Timer (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Timer card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-50 text-[#FF6900] rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Sisa Waktu
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900">
                    {formatTimer(timeLeftSeconds)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Dijawab
                </div>
                <div className="text-sm font-bold text-slate-900">
                  <span className="text-[#FF6900] tabular-nums">{answeredCount}</span> / {questions.length}
                </div>
              </div>
            </div>

            {/* Questions Jump Palette */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Navigasi Nomor Soal:
              </div>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.includes(q.id);

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        sound.playClick();
                        setCurrentIndex(idx);
                      }}
                      className={`h-9 rounded-lg text-xs font-bold transition-all relative ${
                        isCurrent
                          ? 'border-2 border-[#FF6900] bg-[#FFF3E8] text-[#FF6900]'
                          : isAnswered
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-900 rounded" />
                  <span>Dijawab</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-100 border border-slate-300 rounded" />
                  <span>Belum</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  <span>Ragu</span>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Kumpulkan Ujian Sekarang
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Examination Results View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
          {/* Result Banner */}
          <div className="text-center space-y-3">
            <div
              className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center border-2 ${
                examScore >= 80
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
                  : 'bg-red-50 text-red-600 border-red-300'
              }`}
            >
              {examScore >= 80 ? (
                <Award className="w-10 h-10" />
              ) : (
                <AlertCircle className="w-10 h-10" />
              )}
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Hasil Evaluasi Ujian Teori
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {examScore >= 80 ? 'SELAMAT! ANDA DINYATAKAN LULUS' : 'MAAF, ANDA BELUM MENCAPAI NILAI KELULUSAN'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
                {examScore >= 80
                  ? 'Pemahaman teori Anda telah memenuhi standar teknisi smartphone industri (minimal 80%).'
                  : 'Nilai Anda belum mencapai standar kelulusan 80%. Tinjau kembali penjelasan jawaban di bawah ini dan silakan ulangi ujian.'}
              </p>
            </div>
          </div>

          {/* Score breakdown metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Skor Akhir</span>
              <div className={`text-2xl font-bold tabular-nums ${examScore >= 80 ? 'text-emerald-600' : 'text-red-600'}`}>
                {examScore}%
              </div>
            </div>
            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Jawaban Benar</span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {correctCount} / {questions.length}
              </div>
            </div>
            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Passing Score</span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                80%
              </div>
            </div>
            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Status</span>
              <div className={`text-base font-bold uppercase ${examScore >= 80 ? 'text-emerald-600' : 'text-red-600'}`}>
                {examScore >= 80 ? 'LULUS' : 'REMIDI'}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={startExam}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Ujian Teori</span>
            </button>

            {examScore >= 80 && (
              <button
                onClick={() => setActiveTab('certificate')}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#FF6900] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>LIHAT SERTIFIKAT KELULUSAN</span>
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* In-depth Question Explanations Review */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Tinjauan Jawaban & Pembahasan Mendalam (20 Soal)
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Kunci Jawaban Resmi
              </span>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice !== undefined && q.correctAnswers.includes(userChoice);

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isCorrect ? 'bg-emerald-50/30 border-emerald-200' : 'bg-red-50/30 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                          }`}
                        >
                          {isCorrect ? '✓' : '✗'}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900">
                            Soal {idx + 1}. {q.question}
                          </span>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Kategori: {q.category}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isCorrect ? 'BENAR' : 'SALAH'}
                      </span>
                    </div>

                    {/* Options list showing what was picked and what was correct */}
                    <div className="space-y-1.5 pl-8">
                      {q.options.map((opt, oIdx) => {
                        const isPicked = userChoice === oIdx;
                        const isTheCorrectOne = q.correctAnswers.includes(oIdx);

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-lg text-xs flex items-center justify-between ${
                              isTheCorrectOne
                                ? 'bg-emerald-100/70 text-emerald-950 font-semibold'
                                : isPicked
                                ? 'bg-red-100/70 text-red-950 font-medium'
                                : 'bg-white text-slate-600'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                            {isTheCorrectOne && (
                              <span className="text-[10px] text-emerald-700 font-bold">Kunci Benar</span>
                            )}
                            {!isTheCorrectOne && isPicked && (
                              <span className="text-[10px] text-red-700 font-bold">Jawaban Anda</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Official Technical Explanation */}
                    <div className="ml-8 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-bold">Pembahasan Teknis: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 shadow-xl animate-fade-in">
            <h3 className="text-base font-bold text-slate-900">
              Konfirmasi Pengumpulan Ujian
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Anda telah menjawab <strong className="text-slate-900">{answeredCount}</strong> dari <strong>{questions.length}</strong> butir soal. Apakah Anda yakin ingin mengumpulkan jawaban Anda sekarang?
            </p>

            {answeredCount < questions.length && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                ⚠ Perhatian: Masih ada {questions.length - answeredCount} soal yang belum Anda jawab. Soal yang belum dijawab akan dianggap salah.
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Kembali Periksa
              </button>
              <button
                onClick={submitExam}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
