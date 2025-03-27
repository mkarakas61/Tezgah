import React from 'react';
import styles from '../../page.module.css';
import { FileNode } from '../../types';

interface FileTabsProps {
  openFiles: FileNode[];
  activeFileId: string | null;
  onSelect: (file: FileNode) => void;
  onClose: (id: string) => void;
}

const FileTabs: React.FC<FileTabsProps> = ({
  openFiles,
  activeFileId,
  onSelect,
  onClose,
}) => {
  // Dosya adının son bölümünü al (klasör yapısı olmadan)
  const getFileName = (path: string): string => {
    return path.split('/').pop() || path;
  };

  // Dosya tipine göre ikon belirle
  const getFileIcon = (file: FileNode): string => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    switch (extension) {
      case 'rs':
        return '🦀'; // Rust
      case 'ts':
      case 'tsx':
        return 'TS'; // TypeScript
      case 'js':
      case 'jsx':
        return 'JS'; // JavaScript
      case 'json':
        return '{}'; // JSON
      case 'css':
        return '🎨'; // CSS
      case 'md':
        return '📝'; // Markdown
      case 'toml':
        return '⚙️'; // Config
      default:
        return '📄'; // Default file icon
    }
  };

  return (
    <div className={styles.fileTabs}>
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={`${styles.fileTab} ${
            file.id === activeFileId ? styles.activeTab : ''
          }`}
          onClick={() => onSelect(file)}
        >
          <span className={styles.fileTabIcon}>{getFileIcon(file)}</span>
          <span className={styles.fileTabName}>{file.name}</span>
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onClose(file.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileTabs; 