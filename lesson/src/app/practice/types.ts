// Kavram Türleri
export type ConceptId = "solid" | "clean_arch" | "rust";

// Dosya Yapısı Türleri
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  isOpen?: boolean;
  isActive?: boolean;
  language?: string;
  content?: string;
  children?: FileNode[];
}

// Geri Bildirim Türleri
export interface FeedbackItem {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  sourcePath?: string;
  sourceCode?: string;
  codeSnippet?: string;
}

// Analiz Raporu Türleri
export interface AnalysisReport {
  concept: ConceptId;
  title: string;
  description: string;
  feedbackItems: FeedbackItem[];
} 