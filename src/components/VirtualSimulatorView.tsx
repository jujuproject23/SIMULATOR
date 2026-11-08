import React, { useState, useEffect } from 'react';
import { useTraining } from '../context/TrainingContext';
import { SIMULATOR_STEPS } from '../data/simulatorSteps';
import { REPAIR_TOOLS } from '../data/courseData';
import { SimulatorMode } from '../types';
import {
  Wrench,
  HelpCircle,
  RotateCcw,
  Play,
  CheckCircle2,
  AlertTriangle,
  Flame,
  BatteryMedium,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldAlert,
  Clock,
  Volume2,
  ChevronRight,
  Check,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';

export const VirtualSimulatorView: React.FC = () => {
  const {
    progress,
    saveSimulatorResult,
    isSimulatorUnlocked,
    setActiveTab
  } = useTraining();

  const [mode, setMode] = useState<SimulatorMode>('guided');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedToolId, setSelectedToolId] = useState<string>('inspection-check');
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    text: string;
  } | null>(null);

  // Assessment tracking
  const [mistakesList, setMistakesList] = useState<string[]>([]);
  const [score, setScore] = useState<number>(100);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [simTimeSeconds, setSimTimeSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Active step
  const currentStep = SIMULATOR_STEPS[currentStepIndex];

  // Simulator tools palette
  const simulatorTools = [
    { id: 'inspection-check', name: 'Inspeksi Visual', category: 'Diagnostik', icon: 'Eye' },
    { id: 'power-button', name: 'Kontrol Daya (Power)', category: 'Sistem', icon: 'Power' },
    { id: 'sim-ejector', name: 'SIM Ejector Pin', category: 'Presisi', icon: 'Pin' },
    { id: 'heat-pad', name: 'Heat Pad (75°C)', category: 'Pemanas', icon: 'Flame' },
    { id: 'suction-cup', name: 'Suction Cup', category: 'Pembuka', icon: 'CircleDot' },
    { id: 'opening-pick', name: 'Opening Pick Plastik', category: 'Pembuka', icon: 'Layers' },
    { id: 'precision-screwdriver', name: 'Obeng Presisi PH000', category: 'Presisi', icon: 'Wrench' },
    { id: 'nylon-spudger', name: 'Spudger Plastik ESD', category: 'Prying', icon: 'Minus' },
    { id: 'curved-tweezers', name: 'Pinset Melengkung', category: 'Presisi', icon: 'Scissors' },
    { id: 'battery-adhesive', name: 'Perekat Baterai Baru', category: 'Konsumabel', icon: 'Sparkles' },
    { id: 'replacement-battery', name: 'Baterai Original Baru', category: 'Konsumabel', icon: 'Battery' },
  ];

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isCompleted) {
      interval = setInterval(() => {
        setSimTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isCompleted]);

  // Safety gate check: if user hasn't finished safety checklist
  if (!isSimulatorUnlocked) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-5 my-12">
        <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-200">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            Akses Simulator Belum Terbuka
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Demi keselamatan dan kepatuhan standar industri reparasi smartphone, Anda wajib menyelesaikan <strong className="text-slate-800">Checklist Keselamatan Kerja (K3)</strong> pada Bab 03 terlebih dahulu sebelum mengoperasikan simulator virtual ini.
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('learning');
            }}
            className="px-6 py-2.5 bg-[#FF6900] hover:bg-[#e05d00] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Buka Bab 03 & Selesaikan Checklist K3
          </button>
        </div>
      </div>
    );
  }

  const handleSelectTool = (toolId: string) => {
    sound.playClick();
    setSelectedToolId(toolId);
    setShowHint(false);
  };

  const handleInteractWithTarget = (clickedComponentId: string) => {
    // Check if target is correct
    if (clickedComponentId !== currentStep.targetComponentId) {
      sound.playWarning();
      setFeedbackMessage({
        type: 'warning',
        text: 'Area interaksi tidak tepat untuk tahapan ini. Perhatikan instruksi pada panel.'
      });
      return;
    }

    // Check if required tool matches
    if (selectedToolId === currentStep.requiredToolId) {
      // SUCCESSFUL ACTION!
      sound.playSuccess();
      setFeedbackMessage({
        type: 'success',
        text: currentStep.successExplanation
      });
      setShowHint(false);

      // Play specific action sound effect
      if (currentStep.actionType === 'unscrew' || currentStep.actionType === 'reconnect') {
        sound.playUnscrew();
      } else if (currentStep.actionType === 'suction') {
        sound.playSuctionPop();
      } else if (currentStep.actionType === 'disconnect-connector') {
        sound.playSnap();
      }

      // Check if last step
      if (currentStepIndex === SIMULATOR_STEPS.length - 1) {
        setIsCompleted(true);
        setIsTimerRunning(false);
        saveSimulatorResult(mode, score, mistakesList);
      } else {
        // Advance step after slight delay
        setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
          setFeedbackMessage(null);
        }, 1200);
      }
    } else {
      // WRONG TOOL USED!
      sound.playWarning();

      // Check for critical safety violation!
      const isCriticalSafety =
        (currentStep.id === 'step-disconnect-battery' && (selectedToolId === 'curved-tweezers' || selectedToolId === 'precision-screwdriver')) ||
        (currentStep.id === 'step-pull-adhesive' && selectedToolId === 'precision-screwdriver');

      let errorText = currentStep.wrongToolResponses[selectedToolId] ||
        `Alat yang dipilih ("${selectedToolId}") tidak sesuai untuk tahapan ini. Pilih alat yang tepat di panel bawah.`;

      if (isCriticalSafety) {
        errorText = `PELANGGARAN KESELAMATAN KRITIS: ${errorText}`;
        if (mode === 'assessment') {
          // Instant fail or massive penalty in assessment mode!
          setScore((prev) => Math.max(0, prev - 30));
        }
      } else {
        if (mode === 'assessment') {
          setScore((prev) => Math.max(0, prev - 10));
        }
      }

      setMistakesList((prev) => [
        ...prev,
        `Langkah ${currentStep.stepNumber} (${currentStep.title}): Menggunakan ${selectedToolId}.`
      ]);

      setFeedbackMessage({
        type: isCriticalSafety ? 'error' : 'warning',
        text: errorText
      });
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentStepIndex(0);
    setSelectedToolId('inspection-check');
    setFeedbackMessage(null);
    setMistakesList([]);
    setScore(100);
    setShowHint(false);
    setIsCompleted(false);
    setSimTimeSeconds(0);
    setIsTimerRunning(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header bar & Mode Selector */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6900] mb-1">
            <span>VIRTUAL SMARTPHONE REPAIR BENCH</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">SIMULASI 2D INTERAKTIF</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Simulator Penggantian Baterai Smartphone
          </h1>
        </div>

        {/* Mode Selector & Controls */}
        <div className="flex items-center gap-3">
          {/* Segmented Mode Control */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => {
                sound.playClick();
                setMode('guided');
                handleRestart();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'guided'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mode Terpandu
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMode('assessment');
                handleRestart();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'assessment'
                  ? 'bg-white text-[#FF6900] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mode Ujian Mandiri
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={handleRestart}
            title="Reset Simulasi ke Langkah 1"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Step Guide & Instructions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Step Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-[#FF6900] uppercase tracking-wider">
                Langkah {currentStep.stepNumber} dari {SIMULATOR_STEPS.length}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(simTimeSeconds)}</span>
              </div>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF6900] rounded-full transition-all duration-300"
                style={{ width: `${(currentStep.stepNumber / SIMULATOR_STEPS.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {currentStep.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentStep.detailedInstruction}
              </p>
            </div>

            {/* Target objective highlight */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Target Aksi:
              </span>
              <div className="text-xs font-medium text-slate-800">
                {currentStep.targetDescription}
              </div>
            </div>

            {/* Safety alert if any */}
            {currentStep.safetyAlert && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="text-xs text-red-800 leading-relaxed font-medium">
                  {currentStep.safetyAlert}
                </span>
              </div>
            )}

            {/* Hint control for Guided mode */}
            {mode === 'guided' && (
              <div className="pt-2">
                {!showHint ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowHint(true);
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#FF6900]" />
                    <span>Tampilkan Petunjuk (Hint)</span>
                  </button>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                    <div className="font-bold">Petunjuk Langkah Ini:</div>
                    <p>{currentStep.hint}</p>
                    <div className="text-[11px] text-amber-900 pt-1 font-semibold">
                      Alat yang wajib digunakan: <span className="underline">{currentStep.requiredToolId}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Score & mistake indicator for Assessment Mode */}
            {mode === 'assessment' && (
              <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Skor Asesmen:</span>
                  <span className="font-bold text-orange-400 tabular-nums text-sm">{score}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Jumlah Kesalahan:</span>
                  <span className="tabular-nums font-semibold">{mistakesList.length} kali</span>
                </div>
              </div>
            )}
          </div>

          {/* Feedback banner */}
          {feedbackMessage && (
            <div
              className={`p-4 rounded-xl border transition-all text-xs leading-relaxed space-y-1 ${
                feedbackMessage.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : feedbackMessage.type === 'error'
                  ? 'bg-red-50 border-red-300 text-red-900 font-medium'
                  : 'bg-amber-50 border-amber-300 text-amber-900 font-medium'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                {feedbackMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                )}
                <span>
                  {feedbackMessage.type === 'success'
                    ? 'Tindakan Berhasil!'
                    : feedbackMessage.type === 'error'
                    ? 'Peringatan Bahaya K3!'
                    : 'Perhatian Teknisi'}
                </span>
              </div>
              <p>{feedbackMessage.text}</p>
            </div>
          )}
        </div>

        {/* Right Side: Virtual Interactive Smartphone Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* The Phone Stage Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col items-center justify-center relative min-h-[500px]">
            {/* Visual Canvas Backdrop */}
            <div className="w-full flex items-center justify-between text-xs text-slate-600 mb-4 px-2">
              <span className="font-bold text-slate-700">MODEL KONSEPTUAL: SMART-PHONE GEN-5 (POUCH BATTERY)</span>
              <span>STATUS: {currentStepIndex <= 2 ? 'TERKUNCI' : currentStepIndex >= 12 ? 'SELESAI QC' : 'DIBONGKAR'}</span>
            </div>

            {/* Interactive SVG Smartphone Graphic */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[540px] flex items-center justify-center">
              <svg viewBox="0 0 320 580" className="w-full h-full drop-shadow-md select-none">
                <defs>
                  {/* Heat gradient for step 4 */}
                  <linearGradient id="heatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6900" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#EF4444" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FF6900" stopOpacity="0.7" />
                  </linearGradient>

                  {/* Brushed aluminum frame */}
                  <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="50%" stopColor="#4B5563" />
                    <stop offset="100%" stopColor="#1F2937" />
                  </linearGradient>
                </defs>

                {/* Outer Smartphone Frame */}
                <rect
                  x="20"
                  y="15"
                  width="280"
                  height="550"
                  rx="36"
                  fill="url(#frameGradient)"
                  stroke="#111827"
                  strokeWidth="3"
                />

                {/* SIM Hole on Left Frame */}
                <circle
                  cx="18"
                  cy="170"
                  r="2.5"
                  fill="#9CA3AF"
                  stroke="#1F2937"
                  strokeWidth="1"
                />
                {/* SIM Tray Target Click Area */}
                {currentStep.targetComponentId === 'target-sim-hole' && (
                  <circle
                    cx="18"
                    cy="170"
                    r="12"
                    fill="#FF6900"
                    fillOpacity="0.4"
                    className="cursor-pointer animate-pulse"
                    onClick={() => handleInteractWithTarget('target-sim-hole')}
                  />
                )}

                {/* Power Button on Right Frame */}
                <rect
                  x="300"
                  y="150"
                  width="4"
                  height="45"
                  rx="2"
                  fill="#9CA3AF"
                  stroke="#111827"
                  strokeWidth="1"
                />
                {/* Power Button Target Click Area */}
                {currentStep.targetComponentId === 'target-power-button' && (
                  <rect
                    x="290"
                    y="140"
                    width="24"
                    height="65"
                    rx="4"
                    fill="#FF6900"
                    fillOpacity="0.4"
                    className="cursor-pointer animate-pulse"
                    onClick={() => handleInteractWithTarget('target-power-button')}
                  />
                )}

                {/* Inner Device Area (Changes by Step) */}
                {/* STATE A: Assembled Back Glass (Steps 1, 2, 3, 4, 13) */}
                {(currentStepIndex <= 3 || currentStepIndex === 12) && (
                  <g
                    id="back-cover-group"
                    className="transition-opacity duration-300"
                  >
                    {/* Back Cover Glass */}
                    <rect
                      x="26"
                      y="21"
                      width="268"
                      height="538"
                      rx="30"
                      fill="#1E293B"
                      stroke="#334155"
                      strokeWidth="2"
                    />

                    {/* Camera Island */}
                    <rect x="42" y="38" width="70" height="110" rx="18" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="77" cy="65" r="18" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                    <circle cx="77" cy="65" r="9" fill="#0284C7" />
                    <circle cx="77" cy="115" r="15" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                    <circle cx="77" cy="115" r="7" fill="#0284C7" />
                    <circle cx="95" cy="48" r="3" fill="#FEF08A" />

                    {/* Logo */}
                    <text x="160" y="320" fill="#64748B" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="4">
                      SMART TECH
                    </text>

                    {/* Heat Pad Glowing Overlay for Step 4 */}
                    {currentStepIndex === 3 && (
                      <g className="animate-pulse">
                        <rect x="30" y="25" width="260" height="530" rx="28" fill="url(#heatGradient)" />
                        <text x="160" y="270" fill="#FFFFFF" fontSize="20" fontWeight="bold" textAnchor="middle">
                          75°C
                        </text>
                        <text x="160" y="295" fill="#FEF08A" fontSize="11" fontWeight="bold" textAnchor="middle">
                          PEMOROSAN LEM PEREKAT AKTIF
                        </text>
                      </g>
                    )}

                    {/* Screen On Visual for Step 13 (QC Test Success) */}
                    {currentStepIndex === 12 && (
                      <g className="transition-all duration-500">
                        <rect x="30" y="25" width="260" height="530" rx="28" fill="#0F172A" />
                        <circle cx="160" cy="220" r="40" fill="#16A34A" fillOpacity="0.2" stroke="#16A34A" strokeWidth="2" />
                        <text x="160" y="228" fill="#22C55E" fontSize="24" fontWeight="bold" textAnchor="middle">
                          100%
                        </text>
                        <text x="160" y="280" fill="#F8FAFC" fontSize="14" fontWeight="bold" textAnchor="middle">
                          BATERAI BARU TERDETEKSI
                        </text>
                        <text x="160" y="305" fill="#94A3B8" fontSize="11" textAnchor="middle">
                          Health: Normal · Tegangan: 4.35V
                        </text>
                        <text x="160" y="330" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">
                          ⚡ Fast Charging: 5V / 3A (15W)
                        </text>
                      </g>
                    )}

                    {/* Click Targets for Step 1 & 4 */}
                    {currentStep.targetComponentId === 'target-device-body' && (
                      <rect
                        x="26"
                        y="21"
                        width="268"
                        height="538"
                        rx="30"
                        fill="#FF6900"
                        fillOpacity="0.15"
                        stroke="#FF6900"
                        strokeWidth="2"
                        strokeDasharray="6,4"
                        className="cursor-pointer animate-pulse"
                        onClick={() => handleInteractWithTarget('target-device-body')}
                      />
                    )}

                    {currentStep.targetComponentId === 'target-back-cover' && (
                      <rect
                        x="26"
                        y="21"
                        width="268"
                        height="538"
                        rx="30"
                        fill="#FF6900"
                        fillOpacity="0.2"
                        className="cursor-pointer"
                        onClick={() => handleInteractWithTarget('target-back-cover')}
                      />
                    )}
                  </g>
                )}

                {/* STATE B: Back Cover Seam / Suction Cup Active (Step 5) */}
                {currentStepIndex === 4 && (
                  <g>
                    <rect x="26" y="21" width="268" height="538" rx="30" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                    {/* Suction Cup Graphic at bottom */}
                    <circle cx="160" cy="460" r="32" fill="#FF6900" stroke="#EA580C" strokeWidth="3" />
                    <circle cx="160" cy="460" r="16" fill="#374151" />
                    <circle cx="160" cy="460" r="8" fill="#F3F4F6" />

                    {/* Highlighted Bottom Seam Target */}
                    <rect
                      x="40"
                      y="420"
                      width="240"
                      height="90"
                      rx="16"
                      fill="#FF6900"
                      fillOpacity="0.3"
                      stroke="#FF6900"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      className="cursor-pointer animate-pulse"
                      onClick={() => handleInteractWithTarget('target-lower-glass')}
                    />
                    <text x="160" y="405" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                      KLIK DI SINI DENGAN SUCTION CUP
                    </text>
                  </g>
                )}

                {/* STATE C: Internal Chassis Opened (Steps 6, 7, 8, 9, 10, 11, 12) */}
                {currentStepIndex >= 5 && currentStepIndex <= 11 && (
                  <g id="internal-chassis">
                    {/* Metal Midframe Base */}
                    <rect x="26" y="21" width="268" height="538" rx="30" fill="#0F172A" stroke="#334155" strokeWidth="2" />

                    {/* Top Section: Motherboard PCB */}
                    <rect x="36" y="32" width="248" height="150" rx="8" fill="#064E3B" stroke="#047857" strokeWidth="1.5" />
                    {/* Chips & Circuits */}
                    <rect x="50" y="45" width="45" height="45" rx="4" fill="#1F2937" stroke="#374151" />
                    <rect x="110" y="45" width="80" height="40" rx="4" fill="#1F2937" stroke="#374151" />
                    <text x="150" y="68" fill="#9CA3AF" fontSize="9" textAnchor="middle">SoC CHIP</text>

                    {/* Shield Bracket covering battery connector (Visible in Step 6, removed in 7-11, reassembled in 12) */}
                    {(currentStepIndex === 5 || currentStepIndex === 11) && (
                      <g>
                        <rect x="42" y="115" width="236" height="60" rx="6" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
                        <text x="160" y="148" fill="#F1F5F9" fontSize="10" fontWeight="bold" textAnchor="middle">
                          PELAT PELINDUNG KONEKTOR (SHIELD BRACKET)
                        </text>
                        {/* Screws on Bracket */}
                        <circle cx="58" cy="130" r="4" fill="#D1D5DB" stroke="#1F2937" strokeWidth="1" />
                        <circle cx="262" cy="130" r="4" fill="#D1D5DB" stroke="#1F2937" strokeWidth="1" />
                        <circle cx="160" cy="162" r="4" fill="#D1D5DB" stroke="#1F2937" strokeWidth="1" />

                        {/* Screw target click for Step 6 & Step 12 */}
                        <rect
                          x="45"
                          y="118"
                          width="230"
                          height="54"
                          rx="6"
                          fill="#FF6900"
                          fillOpacity="0.4"
                          stroke="#FF6900"
                          strokeWidth="2"
                          strokeDasharray="4,4"
                          className="cursor-pointer animate-pulse"
                          onClick={() => handleInteractWithTarget('target-shield-screws')}
                        />
                      </g>
                    )}

                    {/* Battery Connector Socket (Visible when shield is removed, steps 6 to 10) */}
                    {currentStepIndex >= 6 && currentStepIndex <= 10 && (
                      <g>
                        <rect x="52" y="125" width="55" height="30" rx="4" fill="#CA8A04" stroke="#A16207" strokeWidth="1.5" />
                        <circle cx="65" cy="140" r="3" fill="#FEF08A" />
                        <circle cx="80" cy="140" r="3" fill="#FEF08A" />
                        <circle cx="95" cy="140" r="3" fill="#FEF08A" />
                        <text x="80" y="120" fill="#FBBF24" fontSize="9" fontWeight="bold" textAnchor="middle">
                          BATTERY SOCKET
                        </text>

                        {/* Target click for disconnecting connector (Step 7) */}
                        {currentStep.targetComponentId === 'target-battery-connector' && (
                          <rect
                            x="48"
                            y="118"
                            width="64"
                            height="44"
                            rx="6"
                            fill="#FF6900"
                            fillOpacity="0.4"
                            stroke="#FF6900"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                            className="cursor-pointer animate-pulse"
                            onClick={() => handleInteractWithTarget('target-battery-connector')}
                          />
                        )}
                      </g>
                    )}

                    {/* Middle Section: Battery Bay / Compartment */}
                    <rect x="36" y="190" width="248" height="290" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1" />

                    {/* Battery State in Compartment */}
                    {/* Old Battery present (Steps 6, 7, 8) */}
                    {currentStepIndex >= 5 && currentStepIndex <= 7 && (
                      <g>
                        <rect x="42" y="196" width="236" height="278" rx="8" fill="#292524" stroke="#44403C" strokeWidth="2" />
                        <text x="160" y="280" fill="#A8A29E" fontSize="13" fontWeight="bold" textAnchor="middle">
                          OLD BATTERY (4,000 mAh)
                        </text>
                        <text x="160" y="305" fill="#78716C" fontSize="10" textAnchor="middle">
                          DEGRADED: HEALTH 68%
                        </text>

                        {/* Pull Tabs at bottom of old battery (Step 8 target) */}
                        <g>
                          <rect x="65" y="474" width="35" height="16" rx="2" fill="#000" stroke="#78716C" />
                          <text x="82" y="486" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">PULL</text>
                          <rect x="220" y="474" width="35" height="16" rx="2" fill="#000" stroke="#78716C" />
                          <text x="237" y="486" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">PULL</text>
                        </g>

                        {currentStep.targetComponentId === 'target-pull-tabs' && (
                          <rect
                            x="50"
                            y="460"
                            width="220"
                            height="35"
                            rx="4"
                            fill="#FF6900"
                            fillOpacity="0.4"
                            stroke="#FF6900"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                            className="cursor-pointer animate-pulse"
                            onClick={() => handleInteractWithTarget('target-pull-tabs')}
                          />
                        )}
                      </g>
                    )}

                    {/* Old battery lifted (Step 9) */}
                    {currentStepIndex === 8 && (
                      <g>
                        <rect x="42" y="196" width="236" height="278" rx="8" fill="#334155" stroke="#64748B" strokeWidth="2" strokeDasharray="6,4" />
                        <text x="160" y="320" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">
                          ANGKAT BATERAI LAMA
                        </text>
                        <rect
                          x="42"
                          y="196"
                          width="236"
                          height="278"
                          rx="8"
                          fill="#FF6900"
                          fillOpacity="0.25"
                          className="cursor-pointer animate-pulse"
                          onClick={() => handleInteractWithTarget('target-battery-bay')}
                        />
                      </g>
                    )}

                    {/* Clean Empty Bay & Applying Adhesive (Step 10) */}
                    {currentStepIndex === 9 && (
                      <g>
                        <rect x="42" y="196" width="236" height="278" rx="8" fill="#1E293B" />
                        <text x="160" y="270" fill="#64748B" fontSize="11" textAnchor="middle">
                          KOMPARTEMEN BERSIH
                        </text>
                        {/* Adhesive Slots */}
                        <rect x="70" y="220" width="35" height="230" rx="4" fill="#38BDF8" fillOpacity="0.4" stroke="#0284C7" strokeDasharray="3,3" />
                        <rect x="215" y="220" width="35" height="230" rx="4" fill="#38BDF8" fillOpacity="0.4" stroke="#0284C7" strokeDasharray="3,3" />
                        <rect
                          x="50"
                          y="200"
                          width="220"
                          height="270"
                          rx="8"
                          fill="#FF6900"
                          fillOpacity="0.25"
                          className="cursor-pointer animate-pulse"
                          onClick={() => handleInteractWithTarget('target-adhesive-slots')}
                        />
                        <text x="160" y="340" fill="#38BDF8" fontSize="12" fontWeight="bold" textAnchor="middle">
                          TEMPELKAN LEM TARIK BARU
                        </text>
                      </g>
                    )}

                    {/* New Battery Inserted (Steps 11 & 12) */}
                    {(currentStepIndex === 10 || currentStepIndex === 11) && (
                      <g>
                        <rect x="42" y="196" width="236" height="278" rx="8" fill="#1E1E1E" stroke="#16A34A" strokeWidth="2.5" />
                        <text x="160" y="260" fill="#4ADE80" fontSize="13" fontWeight="bold" textAnchor="middle">
                          NEW CERTIFIED BATTERY
                        </text>
                        <text x="160" y="285" fill="#E2E8F0" fontSize="11" textAnchor="middle">
                          Original 4,500 mAh · 3.87V
                        </text>
                        <text x="160" y="310" fill="#22C55E" fontSize="10" fontWeight="bold" textAnchor="middle">
                          ✓ QC PASSED 2026
                        </text>

                        {/* Interactive click for step 11 */}
                        {currentStep.targetComponentId === 'target-battery-bay' && (
                          <rect
                            x="42"
                            y="196"
                            width="236"
                            height="278"
                            rx="8"
                            fill="#FF6900"
                            fillOpacity="0.3"
                            className="cursor-pointer animate-pulse"
                            onClick={() => handleInteractWithTarget('target-battery-bay')}
                          />
                        )}
                      </g>
                    )}

                    {/* Bottom Sub-board & Speaker */}
                    <rect x="36" y="490" width="248" height="60" rx="8" fill="#064E3B" stroke="#047857" strokeWidth="1.5" />
                    <rect x="135" y="535" width="50" height="12" rx="4" fill="#374151" />
                    <text x="160" y="544" fill="#9CA3AF" fontSize="8" textAnchor="middle">USB-C PORT</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Interactive Tool Panel Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Kotak Peralatan Teknisi (Pilih Alat Sebelum Interaksi):
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Alat Terpilih: <strong className="text-[#FF6900]">{selectedToolId}</strong>
              </span>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {simulatorTools.map((tool) => {
                const isSelected = selectedToolId === tool.id;
                const isRecommended = mode === 'guided' && currentStep.requiredToolId === tool.id;

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-[#FFF3E8] border-[#FF6900] text-[#FF6900] shadow-xs scale-102'
                        : isRecommended
                        ? 'bg-amber-50/70 border-amber-300 text-slate-800'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-[11px] font-bold leading-tight line-clamp-1">
                      {tool.name}
                    </div>
                    <div className="text-[10px] text-slate-600 font-medium">
                      {tool.category}
                    </div>

                    {isRecommended && mode === 'guided' && (
                      <span className="absolute -top-1.5 -right-1.5 px-1 py-0.2 bg-[#FF6900] text-white text-[9px] font-bold rounded">
                        ALAT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Simulasi Penggantian Baterai Berhasil!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Anda telah menyelesaikan seluruh 13 alur SOP teknis penggantian baterai smartphone dengan standar keselamatan yang berlaku.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Mode Simulasi:</span>
                <span className="font-bold text-slate-900">
                  {mode === 'guided' ? 'Mode Terpandu' : 'Mode Asesmen Mandiri'}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Skor Akhir:</span>
                <span className="font-bold text-emerald-600 tabular-nums text-base">
                  {score}%
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Waktu Pengerjaan:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {formatTime(simTimeSeconds)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Catatan Kesalahan:</span>
                <span className="font-bold text-slate-900">
                  {mistakesList.length === 0 ? 'Nol Kesalahan (Sempurna)' : `${mistakesList.length} Teguran`}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRestart}
                className="w-full sm:flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
              >
                Ulangi Simulasi
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('examination');
                }}
                className="w-full sm:flex-1 py-2.5 px-4 bg-[#FF6900] hover:bg-[#e05d00] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>MENUJU UJIAN AKHIR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
