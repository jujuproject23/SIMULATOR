export type NavigationTab = 
  | 'dashboard' 
  | 'learning' 
  | 'simulator' 
  | 'examination' 
  | 'progress' 
  | 'certificate';

export type SimulatorMode = 'guided' | 'assessment';

export interface UserProgress {
  technicianName: string;
  technicianId: string;
  completedChapters: string[];
  safetyChecklistCompleted: boolean;
  toolsMatchingCompleted: boolean;
  simulatorGuidedCompleted: boolean;
  simulatorGuidedScore: number;
  simulatorAssessmentCompleted: boolean;
  simulatorAssessmentScore: number;
  simulatorAssessmentMistakes: string[];
  theoryExamPassed: boolean;
  theoryExamScore: number;
  theoryExamAttempts: number;
  theoryExamHistory: {
    date: string;
    score: number;
    passed: boolean;
  }[];
  certificateIssued: boolean;
  certificateId: string;
  certificateDate: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  description: string;
  learningObjectives: string[];
  sections: {
    title: string;
    content: string[];
    technicalTip?: string;
    safetyAlert?: string;
    diagramType?: 'battery-anatomy' | 'tools-grid' | 'safety-rules' | 'sop-steps' | 'qc-checklist';
  }[];
  quiz: QuizQuestion[];
  keyTakeaways: string[];
}

export interface RepairTool {
  id: string;
  name: string;
  indonesianName: string;
  category: 'opening' | 'precision' | 'prying' | 'safety' | 'consumable';
  icon: string;
  functionText: string;
  correctUsage: string;
  commonMistakes: string;
  safetyPrecautions: string;
}

export interface SafetyChecklistItem {
  id: string;
  ruleTitle: string;
  description: string;
  isCritical: boolean;
}

export interface SimulatorStep {
  stepNumber: number;
  id: string;
  title: string;
  shortObjective: string;
  detailedInstruction: string;
  requiredToolId: string; // which tool must be selected
  actionType: 'heat' | 'suction' | 'pry-edge' | 'unscrew' | 'disconnect-connector' | 'pull-adhesive' | 'remove-battery' | 'apply-adhesive' | 'insert-battery' | 'reconnect' | 'test-power';
  targetComponentId: string;
  targetDescription: string;
  hint: string;
  safetyAlert?: string;
  wrongToolResponses: Record<string, string>;
  successExplanation: string;
}

export interface ExamQuestion {
  id: string;
  chapterId: string;
  type: 'multiple-choice' | 'true-false' | 'multiple-select';
  question: string;
  options: string[];
  correctAnswers: number[]; // index of correct options
  explanation: string;
  category: string;
}

export interface ExamResult {
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctCount: number;
  userAnswers: Record<string, number[]>;
  timestamp: string;
  timeSpentSeconds: number;
}
