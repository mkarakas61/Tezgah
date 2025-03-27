import React from 'react';
import styles from '../../page.module.css';
import { FileNode } from '../../types';

interface FileTreeProps {
  files: FileNode[];
  onSelect: (file: FileNode) => void;
  onToggle: (id: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ files, onSelect, onToggle }) => {
  return (
    <ul className={styles.fileTree}>
      {files.map((file) => (
        <FileTreeItem
          key={file.id}
          file={file}
          onSelect={onSelect}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

interface FileTreeItemProps {
  file: FileNode;
  onSelect: (file: FileNode) => void;
  onToggle: (id: string) => void;
}

export const FileTreeItem: React.FC<FileTreeItemProps> = ({
  file,
  onSelect,
  onToggle,
}) => {
  const handleClick = () => {
    if (file.type === 'folder') {
      onToggle(file.id);
    } else {
      onSelect(file);
    }
  };

  return (
    <li className={styles.fileTreeItem}>
      <div 
        className={`${styles.fileTreeItemContent} ${file.isActive ? styles.activeFile : ''}`}
        onClick={handleClick}
      >
        <span className={styles.fileIcon}>
          {file.type === 'folder' ? (
            file.isOpen ? '📂' : '📁'
          ) : (
            '📄'
          )}
        </span>
        <span className={styles.fileName}>{file.name}</span>
      </div>

      {/* Eğer bu bir klasörse ve açıksa, alt öğelerini göster */}
      {file.type === 'folder' && file.isOpen && file.children && (
        <FileTree 
          files={file.children} 
          onSelect={onSelect} 
          onToggle={onToggle} 
        />
      )}
    </li>
  );
};

export default FileTree; 