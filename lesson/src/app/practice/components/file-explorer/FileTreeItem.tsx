import React from 'react';
import styles from '../../page.module.css';
import { FileNode } from '../../types';
import FileTree from './FileTree';

interface FileTreeItemProps {
  item: FileNode;
  onSelect: (file: FileNode) => void;
  onToggle: (id: string) => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ item, onSelect, onToggle }) => {
  const isFolder = item.type === 'folder';
  
  return (
    <li className={styles.fileTreeItem}>
      <div 
        className={`${styles.fileTreeItemContent} ${item.isActive ? styles.activeFile : ''}`}
        onClick={() => isFolder ? onToggle(item.id) : onSelect(item)}
      >
        {/* Dosya/klasör ikonu */}
        {isFolder ? (
          <span className={`${styles.folderIcon}`} suppressHydrationWarning>
            {item.isOpen ? '📂' : '📁'}
          </span>
        ) : (
          <span className={styles.fileIcon} suppressHydrationWarning>
            📄
          </span>
        )}
        
        <span className={styles.fileName}>{item.name}</span>
      </div>
      
      {/* Alt dosyalar/klasörler */}
      {isFolder && item.isOpen && item.children && item.children.length > 0 && (
        <FileTree 
          files={item.children} 
          onSelect={onSelect} 
          onToggle={onToggle}
        />
      )}
    </li>
  );
};

export default FileTreeItem; 