import { FileNode } from '../types';
import { INITIAL_FILE_STRUCTURE } from '../data/file-structure';

export class FileService {
  /**
   * Dosya yapısını döndürür
   */
  static getFileStructure(): FileNode[] {
    return INITIAL_FILE_STRUCTURE.map(node => {
      if (node.type === 'file' && !node.name) {
        return {
          ...node,
          name: node.id.includes('.') ? node.id : `${node.id}.rs`
        };
      }
      return node;
    });
  }
  
  /**
   * ID'ye göre dosya bulur
   */
  static findFileById(id: string, files: FileNode[]): FileNode | null {
    for (const file of files) {
      if (file.id === id) {
        return file;
      }

      if (file.type === 'folder' && file.children && file.children.length > 0) {
        const foundFile = this.findFileById(id, file.children);
        if (foundFile) {
          return foundFile;
        }
      }
    }

    return null;
  }
  
  /**
   * Dosya içeriğini günceller
   */
  static updateFileContent(files: FileNode[], id: string, content: string): FileNode[] {
    return files.map(file => {
      if (file.id === id) {
        return { ...file, content };
      }

      if (file.type === 'folder' && file.children && file.children.length > 0) {
        return {
          ...file,
          children: this.updateFileContent(file.children, id, content)
        };
      }

      return file;
    });
  }
  
  /**
   * Klasörün açık/kapalı durumunu değiştirir
   */
  static toggleFolder(files: FileNode[], id: string): FileNode[] {
    return files.map(file => {
      if (file.id === id && file.type === 'folder') {
        return { ...file, isOpen: !file.isOpen };
      }

      if (file.type === 'folder' && file.children && file.children.length > 0) {
        return {
          ...file,
          children: this.toggleFolder(file.children, id)
        };
      }

      return file;
    });
  }
  
  /**
   * Seçilen dosyanın aktif durumunu günceller
   */
  static updateActiveState(files: FileNode[], activeId: string): FileNode[] {
    return files.map(file => {
      const isActive = file.id === activeId;
      
      if (file.type === 'folder' && file.children && file.children.length > 0) {
        return {
          ...file,
          isActive,
          children: this.updateActiveState(file.children, activeId)
        };
      }

      return { ...file, isActive };
    });
  }
} 