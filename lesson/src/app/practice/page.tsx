"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

// Veri ve hizmetler
import { CONCEPTS } from "./data/analysis-reports";
import { EXAMPLE_CODES } from "./data/example-codes";
import { ConceptId, FileNode, FeedbackItem as FeedbackItemType } from "./types";
import { CodeAnalyzer } from "./services/code-analyzer";
import { FileService } from "./services/file-service";

// Bileşenler
import FileTree from "./components/file-explorer/FileTree";
import FileTabs from "./components/editor/FileTabs";
import CodeEditor from "./components/editor/CodeEditor";
import FeedbackItemComponent from "./components/analysis/FeedbackItem";

export default function PracticeEditor() {
  const [code, setCode] = useState<string>("");
  const [concept, setConcept] = useState<ConceptId>("solid");
  const [feedback, setFeedback] = useState<FeedbackItemType[]>([]);
  const [fileStructure, setFileStructure] = useState<FileNode[]>(FileService.getFileStructure());
  const [openFiles, setOpenFiles] = useState<FileNode[]>([]);
  const [activeFile, setActiveFile] = useState<FileNode | null>(null);
  
  // Sayfa yüklendiğinde başlangıç kodunu ayarla
  useEffect(() => {
    setCode(EXAMPLE_CODES[concept]);
    analyzeCode(EXAMPLE_CODES[concept]);
    
    // Ana.rs dosyasını açık olarak başlat
    const mainFile = FileService.findFileById('13', fileStructure);
    if (mainFile) {
      setOpenFiles([mainFile]);
      setActiveFile(mainFile);
    }

    // Sayfa yüklendiğinde scroll pozisyonunu en başa ayarla
    window.scrollTo(0, 0);
  }, []);
  
  // Kaynak değiştiğinde kodu ve geri bildirimi güncelle
  useEffect(() => {
    setCode(EXAMPLE_CODES[concept]);
    analyzeCode(EXAMPLE_CODES[concept]);
  }, [concept]);
  
  // Kod değiştiğinde analiz et
  useEffect(() => {
    if (code && code.trim() !== '') {
      const timeoutId = setTimeout(() => {
        analyzeCode(code);
      }, 300); // 300ms sonra analizi çalıştır, böylece her tuş vuruşunda değil, küçük bir bekleme sonrasında çalışır
      
      return () => clearTimeout(timeoutId); // Temizleme fonksiyonu
    }
  }, [code]);
  
  // Dosya ağacında klasör açma/kapama
  const toggleFolder = (id: string) => {
    setFileStructure(FileService.toggleFolder(fileStructure, id));
  };
  
  // Dosyayı seç (editör paneli için)
  const selectFile = (file: FileNode) => {
    if (file.type === 'file') {
      // Dosya zaten açık mı kontrol et
      const isAlreadyOpen = openFiles.some(f => f.id === file.id);
      
      // Tüm dosyalardaki aktif durumları temizle
      setFileStructure(FileService.updateActiveState(fileStructure, file.id));
      
      // Eğer dosya zaten açık değilse, açık dosyalara ekle
      if (!isAlreadyOpen) {
        setOpenFiles([...openFiles, file]);
      }
      
      setActiveFile(file);
      
      // Dosya içeriğini kod editörüne ayarla
      if (file.content) {
        setCode(file.content);
        analyzeCode(file.content);
      }
    }
  };
  
  // Sekmeyi kapat
  const closeTab = (id: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== id);
    setOpenFiles(newOpenFiles);
    
    // Eğer aktif dosya kapatılıyorsa, başka bir dosyayı aktif yap
    if (activeFile && activeFile.id === id) {
      if (newOpenFiles.length > 0) {
        const lastFile = newOpenFiles[newOpenFiles.length - 1];
        setActiveFile(lastFile);
        if (lastFile.content) {
          setCode(lastFile.content);
          analyzeCode(lastFile.content);
        }
      } else {
        setActiveFile(null);
        setCode("");
        setFeedback([]);
      }
    }
  };
  
  // Kodu analiz et
  const analyzeCode = (code: string) => {
    // Gerçek zamanlı analiz kullan
    setFeedback(CodeAnalyzer.analyzeCodeRealTime(code, concept));
  };
  
  // Kod değişikliğini işle
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    
    // Açık dosya içeriğini güncelle
    if (activeFile) {
      setFileStructure(FileService.updateFileContent(fileStructure, activeFile.id, newCode));
      
      // Açık dosya listesini de güncelle
      setOpenFiles(openFiles.map(file => 
        file.id === activeFile.id 
          ? { ...file, content: newCode } 
          : file
      ));
      
      // Aktif dosyayı güncelle
      setActiveFile({ ...activeFile, content: newCode });
    }
  };

  return (
    <div className={styles.container} style={{ overflow: 'hidden' }}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          &larr; Ana Sayfaya Dön
        </Link>
        <h1 className={styles.title}>Kod Pratik Alanı</h1>
        <p className={styles.subtitle}>
          Rust, Clean Architecture, SOLID ve daha fazlasını pratik yapın
        </p>
      </header>

      <div className={styles.conceptButtons}>
        {CONCEPTS.map((conceptItem) => (
          <button
            key={conceptItem.id}
            className={`${styles.conceptButton} ${
              concept === conceptItem.id ? styles.activeButton : ""
            }`}
            onClick={() => setConcept(conceptItem.id)}
          >
            {conceptItem.label}
          </button>
        ))}
      </div>

      <div className={styles.mainContent}>
        {/* Sol taraf - Kod Editörü Bölümü */}
        <div className={styles.editorContainer}>
          {/* Dosya ağacı */}
          <div className={styles.fileStructure}>
            <h3 className={styles.sectionTitle}>Dosya Yapısı</h3>
            <FileTree 
              files={fileStructure} 
              onSelect={selectFile}
              onToggle={toggleFolder}
            />
          </div>
          
          {/* Kod editörü */}
          <div className={styles.editorPanel}>
            {/* Dosya sekmeleri */}
            {openFiles.length > 0 && (
              <FileTabs 
                openFiles={openFiles} 
                activeFileId={activeFile?.id || null}
                onSelect={selectFile}
                onClose={closeTab}
              />
            )}
            
            {/* Kod editörü */}
            <div className={styles.editor}>
              <CodeEditor 
                code={code} 
                fileName={activeFile?.name || 'main.rs'} 
                onCodeChange={handleCodeChange} 
              />
            </div>
          </div>
        </div>

        {/* Sağ taraf - Analiz Bölümü */}
        <div className={styles.feedbackContainer}>
          <h3 className={styles.sectionTitle}>Kod Analizi</h3>
          <div className={styles.feedbackItems}>
            {feedback.map((item, index) => (
              <FeedbackItemComponent key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 