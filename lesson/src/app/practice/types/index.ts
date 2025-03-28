export type ConceptId = 'solid' | 'clean_arch' | 'rust';

// Dosya tipleri için tiplemeler
export type FileType = 'folder' | 'file';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  children?: FileNode[];
  content?: string;
  language?: string;
  isOpen?: boolean;
  isActive?: boolean;
}

export type FileItem = {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  isOpen?: boolean;
};

export type FeedbackItem = {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  sourcePath?: string; // Analiz edilen kaynak dosya yolu
  sourceCode?: string; // Analiz edilen kod parçası
  codeSnippet?: string; // Analiz edilen kod parçası (alternatif)
};

export interface AnalysisReport {
  concept: ConceptId;
  title: string;
  description: string;
  feedbackItems: FeedbackItem[];
}

export interface ConceptButton {
  id: ConceptId;
  label: string;
} 