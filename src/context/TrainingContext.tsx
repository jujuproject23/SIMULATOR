import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, NavigationTab } from '../types';
import { CHAPTERS } from '../data/courseData';

const DEFAULT_PROGRESS: UserProgress = {
  technicianName: 'Budi Santoso',
  technicianId: 'STA-2026-0842',
  completedChapters: [],
  safetyChecklistCompleted: false,
  toolsMatchingCompleted: false,
  simulatorGuidedCompleted: false,
  simulatorGuidedScore: 0,
  simulatorAssessmentCompleted: false,
  simulatorAssessmentScore: 0,
  simulatorAssessmentMistakes: [],
  theoryExamPassed: false,
  theoryExamScore: 0,
  theoryExamAttempts: 0,
  theoryExamHistory: [],
  certificateIssued: false,
  certificateId: '',
  certificateDate: '',
};

interface TrainingContextType {
  progress: UserProgress;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  markChapterCompleted: (chapterId: string) => void;
  setSafetyChecklistCompleted: (completed: boolean) => void;
  setToolsMatchingCompleted: (completed: boolean) => void;
  saveSimulatorResult: (mode: 'guided' | 'assessment', score: number, mistakes?: string[]) => void;
  saveExamResult: (score: number, passed: boolean) => void;
  updateTechnicianProfile: (name: string, id: string) => void;
  resetAllProgress: () => void;
  unlockAllForEvaluation: () => void;
  isSimulatorUnlocked: boolean;
  isExamUnlocked: boolean;
  isCertificateUnlocked: boolean;
  overallProgressPercent: number;
}

const TrainingContext = createContext<TrainingContextType | null>(null);

const STORAGE_KEY = 'smart_tech_academy_progress_v1';

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Overall calculation
  // Weighted: Chapters (30%), Safety & Tools (10%), Guided Simulator (20%), Practical Assessment (20%), Theory Exam (20%)
  const chapterWeight = (progress.completedChapters.length / CHAPTERS.length) * 30;
  const safetyWeight = (progress.safetyChecklistCompleted ? 5 : 0) + (progress.toolsMatchingCompleted ? 5 : 0);
  const guidedWeight = progress.simulatorGuidedCompleted ? 20 : 0;
  const assessmentWeight = progress.simulatorAssessmentCompleted ? 20 : 0;
  const examWeight = progress.theoryExamPassed ? 20 : (progress.theoryExamScore > 0 ? (progress.theoryExamScore / 100) * 15 : 0);

  const overallProgressPercent = Math.min(
    100,
    Math.round(chapterWeight + safetyWeight + guidedWeight + assessmentWeight + examWeight)
  );

  // Unlocking gates
  // Simulator requires: At least Bab 3 completed AND Safety Checklist completed
  const isSimulatorUnlocked = 
    progress.safetyChecklistCompleted || 
    (progress.completedChapters.includes('ch3') && progress.safetyChecklistCompleted);

  // Exam requires: At least guided simulator completed
  const isExamUnlocked = progress.simulatorGuidedCompleted || progress.completedChapters.length >= 3;

  // Certificate requires: all 5 chapters, safety checklist, guided simulator, assessment simulator, theory exam passed (>=80%)
  const isCertificateUnlocked = 
    progress.completedChapters.length === CHAPTERS.length &&
    progress.safetyChecklistCompleted &&
    progress.simulatorGuidedCompleted &&
    progress.simulatorAssessmentCompleted &&
    progress.theoryExamPassed;

  // Auto issue certificate if unlocked and not issued yet
  useEffect(() => {
    if (isCertificateUnlocked && !progress.certificateIssued) {
      const certId = `STA-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
      const certDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setProgress(prev => ({
        ...prev,
        certificateIssued: true,
        certificateId: certId,
        certificateDate: certDate,
      }));
    }
  }, [isCertificateUnlocked, progress.certificateIssued]);

  const markChapterCompleted = (chapterId: string) => {
    setProgress(prev => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      return {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId]
      };
    });
  };

  const setSafetyChecklistCompleted = (completed: boolean) => {
    setProgress(prev => ({
      ...prev,
      safetyChecklistCompleted: completed
    }));
  };

  const setToolsMatchingCompleted = (completed: boolean) => {
    setProgress(prev => ({
      ...prev,
      toolsMatchingCompleted: completed
    }));
  };

  const saveSimulatorResult = (mode: 'guided' | 'assessment', score: number, mistakes: string[] = []) => {
    setProgress(prev => {
      if (mode === 'guided') {
        return {
          ...prev,
          simulatorGuidedCompleted: true,
          simulatorGuidedScore: Math.max(prev.simulatorGuidedScore, score)
        };
      } else {
        return {
          ...prev,
          simulatorAssessmentCompleted: true,
          simulatorAssessmentScore: Math.max(prev.simulatorAssessmentScore, score),
          simulatorAssessmentMistakes: mistakes
        };
      }
    });
  };

  const saveExamResult = (score: number, passed: boolean) => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setProgress(prev => ({
      ...prev,
      theoryExamPassed: prev.theoryExamPassed || passed,
      theoryExamScore: Math.max(prev.theoryExamScore, score),
      theoryExamAttempts: prev.theoryExamAttempts + 1,
      theoryExamHistory: [
        { date: today, score, passed },
        ...prev.theoryExamHistory.slice(0, 9)
      ]
    }));
  };

  const updateTechnicianProfile = (name: string, id: string) => {
    setProgress(prev => ({
      ...prev,
      technicianName: name.trim() || prev.technicianName,
      technicianId: id.trim() || prev.technicianId
    }));
  };

  const resetAllProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const unlockAllForEvaluation = () => {
    const certId = `STA-CERT-884210`;
    const certDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    setProgress({
      technicianName: 'Budi Santoso',
      technicianId: 'STA-2026-0842',
      completedChapters: CHAPTERS.map(c => c.id),
      safetyChecklistCompleted: true,
      toolsMatchingCompleted: true,
      simulatorGuidedCompleted: true,
      simulatorGuidedScore: 100,
      simulatorAssessmentCompleted: true,
      simulatorAssessmentScore: 95,
      simulatorAssessmentMistakes: [],
      theoryExamPassed: true,
      theoryExamScore: 90,
      theoryExamAttempts: 1,
      theoryExamHistory: [
        {
          date: certDate,
          score: 90,
          passed: true
        }
      ],
      certificateIssued: true,
      certificateId: certId,
      certificateDate: certDate,
    });
  };

  return (
    <TrainingContext.Provider
      value={{
        progress,
        activeTab,
        setActiveTab,
        markChapterCompleted,
        setSafetyChecklistCompleted,
        setToolsMatchingCompleted,
        saveSimulatorResult,
        saveExamResult,
        updateTechnicianProfile,
        resetAllProgress,
        unlockAllForEvaluation,
        isSimulatorUnlocked,
        isExamUnlocked,
        isCertificateUnlocked,
        overallProgressPercent,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within TrainingProvider');
  }
  return context;
};
