import React, { useState } from 'react';
import { useTraining } from '../context/TrainingContext';
import { REPAIR_TOOLS } from '../data/courseData';
import { CheckCircle2, XCircle, RotateCcw, Sparkles, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/audio';

export const ToolsMatchingGame: React.FC = () => {
  const { setToolsMatchingCompleted, progress } = useTraining();

  // Pick 5 tools for interactive matching challenge
  const challengeTools = [
    REPAIR_TOOLS[0], // Heat pad
    REPAIR_TOOLS[2], // Opening pick
    REPAIR_TOOLS[4], // Nylon spudger
    REPAIR_TOOLS[5], // Curved tweezers
    REPAIR_TOOLS[6], // Battery adhesive
  ];

  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // toolId -> functionId
  const [errorPair, setErrorPair] = useState<{ toolId: string; funcId: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(progress.toolsMatchingCompleted);

  // Scramble functions
  const [shuffledFunctions] = useState(() => {
    return [...challengeTools]
      .map(t => ({
        id: t.id,
        functionText: t.functionText,
      }))
      .sort(() => Math.random() - 0.5);
  });

  const handleSelectTool = (id: string) => {
    if (matchedPairs[id]) return;
    sound.playClick();
    setSelectedToolId(id);
    setErrorPair(null);
  };

  const handleSelectFunction = (funcId: string) => {
    if (!selectedToolId) return;

    if (selectedToolId === funcId) {
      // Correct match!
      sound.playSnap();
      const newMatches = { ...matchedPairs, [selectedToolId]: funcId };
      setMatchedPairs(newMatches);
      setSelectedToolId(null);
      setErrorPair(null);

      if (Object.keys(newMatches).length === challengeTools.length) {
        sound.playSuccess();
        setIsCompleted(true);
        setToolsMatchingCompleted(true);
      }
    } else {
      // Incorrect match
      sound.playWarning();
      setErrorPair({ toolId: selectedToolId, funcId });
      setTimeout(() => setErrorPair(null), 1200);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setMatchedPairs({});
    setSelectedToolId(null);
    setErrorPair(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6900] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AKTIVITAS PRAKTIK INTERAKTIF</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Pencocokan Alat & Fungsi Reparasi Smartphone
          </h3>
          <p className="text-xs text-slate-500">
            Klik alat di kolom kiri, kemudian klik fungsi kerja yang tepat di kolom kanan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600">
            Cocok: <strong className="text-[#FF6900] tabular-nums">{Object.keys(matchedPairs).length}</strong> / {challengeTools.length}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Ulangi Tantangan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isCompleted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-bold text-emerald-900">
                Luar Biasa! Semua Alat Teridentifikasi dengan Benar
              </div>
              <p className="text-[11px] text-emerald-700">
                Anda telah memahami karakteristik dan peruntukan masing-masing perlengkapan reparasi baterai.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-600 text-white rounded-lg shrink-0">
            Tuntas 100%
          </span>
        </div>
      )}

      {/* Matching columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Tools */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Kolom 1: Nama Perlengkapan
          </div>
          {challengeTools.map((tool) => {
            const isMatched = !!matchedPairs[tool.id];
            const isSelected = selectedToolId === tool.id;
            const isError = errorPair?.toolId === tool.id;

            return (
              <button
                key={tool.id}
                disabled={isMatched}
                onClick={() => handleSelectTool(tool.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 opacity-80 cursor-default'
                    : isError
                    ? 'bg-red-50 border-red-300 text-red-800 animate-shake'
                    : isSelected
                    ? 'bg-[#FFF3E8] border-[#FF6900] text-[#FF6900] shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{tool.indonesianName}</div>
                  <div className="text-[10px] text-slate-400 font-medium">({tool.name})</div>
                </div>

                <div>
                  {isMatched ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isSelected ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#FF6900] text-white rounded-md">
                      PILIH FUNGSI
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Functions */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Kolom 2: Fungsi Teknis
          </div>
          {shuffledFunctions.map((item) => {
            const isMatched = Object.values(matchedPairs).includes(item.id);
            const isError = errorPair?.funcId === item.id;

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleSelectFunction(item.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  isMatched
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 opacity-80 cursor-default'
                    : isError
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : selectedToolId
                    ? 'bg-white border-slate-200 hover:border-[#FF6900] hover:bg-orange-50/30 text-slate-700 cursor-pointer'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-[11px] leading-relaxed flex-1">
                    {item.functionText}
                  </span>
                  {isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
