import React, { useState } from 'react';
import { useTraining } from '../context/TrainingContext';
import { CHAPTERS, REPAIR_TOOLS } from '../data/courseData';
import { ToolsMatchingGame } from './ToolsMatchingGame';
import { SafetyChecklistView } from './SafetyChecklistView';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  Layers,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export const LearningMaterialsView: React.FC = () => {
  const { progress, markChapterCompleted } = useTraining();
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch1');
  const [selectedSubTab, setSelectedSubTab] = useState<'content' | 'matching-game' | 'safety-gate'>('content');

  // Quiz state per chapter
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const activeChapter = CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0];
  const isChapterCompleted = progress.completedChapters.includes(activeChapter.id);

  const handleSelectChapter = (chId: string) => {
    sound.playClick();
    setSelectedChapterId(chId);
    setSelectedSubTab('content');
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted[questionId]) return;
    sound.playClick();
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckQuiz = (questionId: string, correctIndex: number) => {
    sound.playClick();
    setQuizSubmitted((prev) => ({ ...prev, [questionId]: true }));
    const selected = quizAnswers[questionId];
    if (selected === correctIndex) {
      sound.playSuccess();
    } else {
      sound.playWarning();
    }
  };

  const handleMarkComplete = (chapterId: string) => {
    sound.playSuccess();
    markChapterCompleted(chapterId);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6900] mb-1">
            <span>PUSAT MATERI PELATIHAN RESMI</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">KURIKULUM TEKNISI 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Materi Pembelajaran & Prosedur Reparasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            5 Bab terstruktur mulai dari teknologi sel baterai hingga SOP pembongkaran dan verifikasi QC.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Bab Diselesaikan:</span>
            <div className="text-sm font-bold text-slate-900">
              <span className="text-[#FF6900] tabular-nums">{progress.completedChapters.length}</span> / {CHAPTERS.length} Bab
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6900] flex items-center justify-center font-bold text-xs text-[#FF6900] bg-[#FFF3E8]">
            {Math.round((progress.completedChapters.length / CHAPTERS.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Main Grid: Chapter selector sidebar & Chapter Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chapter Navigation Tabs (3 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Daftar Modul Pembelajaran
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-2 space-y-1.5">
            {CHAPTERS.map((chapter) => {
              const isSelected = selectedChapterId === chapter.id;
              const isDone = progress.completedChapters.includes(chapter.id);

              return (
                <button
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#FFF3E8] border border-[#FF6900]/40 text-[#FF6900] shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent text-slate-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : isSelected
                        ? 'bg-[#FF6900] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : chapter.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate">
                        Bab {chapter.number}
                      </span>
                      <span className="text-[10px] text-slate-600 shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {chapter.durationMinutes}m
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 mt-0.5 leading-snug line-clamp-1">
                      {chapter.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Special Interactive Labs Links */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Laboratorium Praktik Terkait
            </span>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedChapterId('ch2');
                setSelectedSubTab('matching-game');
              }}
              className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-colors ${
                selectedSubTab === 'matching-game'
                  ? 'bg-orange-50 border-[#FF6900] text-[#FF6900]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#FF6900]" />
                <span>Lab Alat: Game Pencocokan</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedChapterId('ch3');
                setSelectedSubTab('safety-gate');
              }}
              className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-colors ${
                selectedSubTab === 'safety-gate'
                  ? 'bg-red-50 border-red-500 text-red-600'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>Lab K3: Checklist Keselamatan</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Chapter Content Main Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sub Tab switcher if in Chapter 2 or 3 */}
          {activeChapter.id === 'ch2' && (
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setSelectedSubTab('content')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedSubTab === 'content'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Materi Teks & Spesifikasi Alat
              </button>
              <button
                onClick={() => setSelectedSubTab('matching-game')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedSubTab === 'matching-game'
                    ? 'bg-white text-[#FF6900] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tantangan Interaktif Pencocokan Alat
              </button>
            </div>
          )}

          {activeChapter.id === 'ch3' && (
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setSelectedSubTab('content')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedSubTab === 'content'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Materi K3 & Mitigasi Risiko
              </button>
              <button
                onClick={() => setSelectedSubTab('safety-gate')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  selectedSubTab === 'safety-gate'
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Checklist Wajib Pembuka Simulator
              </button>
            </div>
          )}

          {/* Conditional Sub-views */}
          {selectedSubTab === 'matching-game' ? (
            <ToolsMatchingGame />
          ) : selectedSubTab === 'safety-gate' ? (
            <SafetyChecklistView />
          ) : (
            /* Regular Chapter Content */
            <div className="space-y-6">
              {/* Chapter Header Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#FF6900] uppercase tracking-wider">
                      BAB {activeChapter.number}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">
                      {activeChapter.title}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {activeChapter.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isChapterCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Bab Selesai
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">
                        Belum Selesai
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeChapter.description}
                </p>

                {/* Learning Objectives box */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6900]" />
                    <span>Tujuan Pembelajaran:</span>
                  </div>
                  <ul className="space-y-1.5">
                    {activeChapter.learningObjectives.map((obj, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-[#FF6900] font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {activeChapter.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
                  >
                    <h3 className="text-base font-bold text-slate-900">
                      {sec.title}
                    </h3>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {sec.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Interactive Diagram / Visual Callouts if any */}
                    {sec.diagramType === 'battery-anatomy' && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>DIAGRAM TEKNIS: ANATOMI SEL LITHIUM-POLYMER (POUCH CELL)</span>
                          <span className="text-[10px] text-slate-500">Skema Standar Industri</span>
                        </div>
                        {/* Interactive SVG Diagram for Battery Anatomy */}
                        <div className="w-full bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col items-center">
                          <svg viewBox="0 0 600 240" className="w-full max-w-lg h-auto">
                            {/* Battery Pouch Outer Foil */}
                            <rect x="120" y="40" width="360" height="160" rx="12" fill="#202124" stroke="#4B5563" strokeWidth="2" />
                            {/* Battery Labeling / Brand area */}
                            <rect x="140" y="60" width="320" height="120" rx="6" fill="#2D3748" />
                            <text x="300" y="100" fill="#E2E8F0" fontSize="13" fontWeight="bold" textAnchor="middle">
                              LITHIUM-POLYMER RECHARGEABLE BATTERY
                            </text>
                            <text x="300" y="125" fill="#CBD5E1" fontSize="11" textAnchor="middle">
                              Rating: 3.87V / 4,500 mAh / 17.41 Wh
                            </text>
                            <text x="300" y="145" fill="#EF4444" fontSize="10" textAnchor="middle" fontWeight="bold">
                              ⚠ PERINGATAN: JANGAN DITUSUK, DILIPAT, ATAU DIPANASKAN &gt;80°C
                            </text>

                            {/* BMS PCB Board & Flex Cable */}
                            <path d="M 60 120 L 120 120" stroke="#FF6900" strokeWidth="12" strokeLinecap="round" />
                            <rect x="40" y="105" width="30" height="30" rx="4" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
                            <text x="55" y="124" fill="#000" fontSize="9" fontWeight="bold" textAnchor="middle">FPC</text>

                            {/* Gold-plated Connector */}
                            <rect x="15" y="108" width="25" height="24" rx="3" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
                            <circle cx="27" cy="116" r="2" fill="#FEF08A" />
                            <circle cx="27" cy="124" r="2" fill="#FEF08A" />

                            {/* Pull-Tabs at bottom */}
                            <rect x="440" y="200" width="28" height="25" rx="3" fill="#000000" stroke="#6B7280" />
                            <rect x="150" y="200" width="28" height="25" rx="3" fill="#000000" stroke="#6B7280" />
                            <text x="164" y="217" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">PULL</text>
                            <text x="454" y="217" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">PULL</text>

                            {/* Callouts */}
                            <line x1="27" y1="108" x2="27" y2="20" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3,3" />
                            <text x="27" y="15" fill="#0284C7" fontSize="10" fontWeight="bold" textAnchor="middle">Konektor Daya (Soket Emas)</text>

                            <line x1="90" y1="114" x2="90" y2="215" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="3,3" />
                            <text x="90" y="230" fill="#16A34A" fontSize="10" fontWeight="bold" textAnchor="middle">Sirkuit Proteksi BMS</text>

                            <line x1="454" y1="225" x2="520" y2="225" stroke="#E11D48" strokeWidth="1.5" />
                            <text x="525" y="228" fill="#E11D48" fontSize="10" fontWeight="bold">Lidah Lem Tarik (Pull-Tabs)</text>
                          </svg>
                        </div>
                      </div>
                    )}

                    {sec.diagramType === 'tools-grid' && (
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Daftar Spesifikasi Peralatan Wajib:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {REPAIR_TOOLS.slice(0, 6).map((tool) => (
                            <div
                              key={tool.id}
                              className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">
                                  {tool.indonesianName}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {tool.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {tool.functionText}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {sec.diagramType === 'sop-steps' && (
                      <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200 space-y-2">
                        <div className="text-xs font-bold text-orange-900">
                          PRINSIP UTAMA: HINDARI LONG SCREW DAMAGE
                        </div>
                        <p className="text-xs text-orange-800 leading-relaxed">
                          Sekrup penahan bracket pelindung memiliki panjang bervariasi antara 1.1 mm hingga 2.2 mm. Selalu petakan posisi sekrup pada matras magnetik sesuai lubang aslinya. Memasang sekrup panjang pada lubang sekrup pendek akan merusak jalur lapisan sirkuit motherboard!
                        </p>
                      </div>
                    )}

                    {/* Technical Tip if present */}
                    {sec.technicalTip && (
                      <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3">
                        <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-800 leading-relaxed">
                          <strong className="text-blue-900">Catatan Teknis Teknisi: </strong>
                          {sec.technicalTip}
                        </div>
                      </div>
                    )}

                    {/* Safety Alert if present */}
                    {sec.safetyAlert && (
                      <div className="p-3.5 bg-red-50/80 border border-red-200 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-red-800 leading-relaxed font-medium">
                          {sec.safetyAlert}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* End of Chapter Knowledge Check */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                  <HelpCircle className="w-4 h-4 text-[#FF6900]" />
                  <span>Uji Pemahaman Singkat (Knowledge Check)</span>
                </div>

                <div className="space-y-6">
                  {activeChapter.quiz.map((q, qIndex) => {
                    const selected = quizAnswers[q.id];
                    const isSubmitted = !!quizSubmitted[q.id];
                    const isCorrect = selected === q.correctIndex;

                    return (
                      <div key={q.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-3">
                        <div className="text-xs font-bold text-slate-900">
                          {qIndex + 1}. {q.question}
                        </div>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isThisSelected = selected === optIdx;

                            return (
                              <button
                                key={optIdx}
                                disabled={isSubmitted}
                                onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border ${
                                  isSubmitted
                                    ? optIdx === q.correctIndex
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                                      : isThisSelected
                                      ? 'bg-red-50 border-red-300 text-red-800'
                                      : 'bg-white border-slate-200 opacity-60 text-slate-700'
                                    : isThisSelected
                                    ? 'bg-[#FFF3E8] border-[#FF6900] text-[#FF6900] font-semibold'
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <div className="pt-1">
                            <button
                              disabled={selected === undefined}
                              onClick={() => handleCheckQuiz(q.id, q.correctIndex)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow-xs transition-all ${
                                selected !== undefined
                                  ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer'
                                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              Periksa Jawaban
                            </button>
                          </div>
                        ) : (
                          <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                            isCorrect ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
                          }`}>
                            <div className="font-bold mb-1">
                              {isCorrect ? '✓ Tepat Sekali!' : '✗ Jawaban Belum Tepat'}
                            </div>
                            <div>{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Takeaways & Completion Button */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Rangkuman Penting Bab Ini:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  {activeChapter.keyTakeaways.map((takeaway, tIdx) => (
                    <div key={tIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    {isChapterCompleted
                      ? 'Bab ini telah ditandai selesai.'
                      : 'Pastikan Anda telah memahami seluruh konsep sebelum menandai selesai.'}
                  </div>

                  {!isChapterCompleted ? (
                    <button
                      onClick={() => handleMarkComplete(activeChapter.id)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>TANDAI BAB {activeChapter.number} SELESAI</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Modul Telah Selesai
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
