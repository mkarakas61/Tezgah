import React, { useEffect, useRef } from 'react';
import styles from '../../page.module.css';
import { FeedbackItem as FeedbackItemType } from '../../types';
import hljs from 'highlight.js/lib/core';
import rust from 'highlight.js/lib/languages/rust';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
// Özel VS2015 temasını içe aktarıyoruz
import '../../styles/vs2015.css';

// Dilleri kaydet
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

// Dil sınıfını belirle
const getLanguage = (sourcePath: string): string => {
  if (sourcePath.endsWith('.rs')) return 'rust';
  if (sourcePath.endsWith('.js')) return 'javascript';
  if (sourcePath.endsWith('.ts') || sourcePath.endsWith('.tsx')) return 'typescript';
  return 'typescript'; // Varsayılan olarak typescript
};

interface FeedbackItemProps {
  item: FeedbackItemType;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ item }) => {
  const codeRef = useRef<HTMLElement>(null);

  // Kod vurgulaması için useEffect
  useEffect(() => {
    if (codeRef.current && (item.sourceCode || item.codeSnippet)) {
      const language = getLanguage(item.sourcePath || '');
      codeRef.current.className = language;
      hljs.highlightElement(codeRef.current);
    }
  }, [item.sourceCode, item.codeSnippet, item.sourcePath]);

  // İkon ve renk seçimi
  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`${styles.feedbackItem} ${styles[`type${item.type}`]}`}>
      <div className={styles.feedbackHeader}>
        <span className={styles.feedbackIcon}>{getTypeIcon(item.type)}</span>
        <h4 className={styles.feedbackTitle}>{item.title}</h4>
      </div>
      
      <p className={styles.feedbackMessage}>{item.message}</p>
      
      {item.sourcePath && (
        <div className={styles.sourceInfo}>
          <div className={styles.sourcePath}>📁 {item.sourcePath}</div>
          
          {(item.sourceCode || item.codeSnippet) && (
            <pre className={styles.codeSnippet}>
              <code ref={codeRef}>
                {item.codeSnippet || item.sourceCode}
              </code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;
