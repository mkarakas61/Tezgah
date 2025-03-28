"use client"; // Tamamen client-side rendering kullan

import React, { useRef, useEffect, useState } from 'react';
import styles from '../../page.module.css';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/vs2015.css'; // VS Code benzeri koyu tema
import '../../styles/vs2015.css';

// Highlight.js için dilleri manuel olarak yükleyelim
import rust from 'highlight.js/lib/languages/rust';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

// Dilleri kaydedelim
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);

// VS Code benzeri kod editörü
interface CodeEditorProps {
  code: string;
  fileName: string;
  onCodeChange: (newCode: string) => void;
}

// Dile göre dil sınıfını belirleme yardımcı fonksiyonu
const getLanguage = (fileName: string): string => {
  if (fileName.endsWith('.rs')) return 'rust';
  if (fileName.endsWith('.js')) return 'javascript';
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return 'typescript';
  if (fileName.endsWith('.html')) return 'html';
  if (fileName.endsWith('.css')) return 'css';
  return 'typescript'; // Varsayılan olarak typescript
};

const CodeEditor: React.FC<CodeEditorProps> = ({ code, fileName, onCodeChange }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [highlighted, setHighlighted] = useState('');
  const language = getLanguage(fileName || '');

  // Daha güvenilir kod vurgulama ve senkronizasyon
  useEffect(() => {
    // Editör içeriği değiştiğinde scroll'u resetleme
    if (editorRef.current) {
      editorRef.current.scrollTop = 0;
    }
    
    if (code) {
      try {
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
          
        const highlighted = hljs.highlight(escapedCode, { language }).value;
        setHighlighted(highlighted);
        
        // Scroll senkronizasyonu
        if (editorRef.current && preRef.current) {
          preRef.current.scrollTop = editorRef.current.scrollTop;
          preRef.current.scrollLeft = editorRef.current.scrollLeft;
        }
      } catch (error) {
        console.error('Highlighting error:', error);
        setHighlighted(code.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      }
    } else {
      setHighlighted('');
    }
  }, [code, language]);

  // Tab tuşunu yönet
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab tuşuna basıldığında
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      // İki boşluk ekle (daha yaygın bir standarttır)
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onCodeChange(newCode);
      
      // Sonraki render'da imleci doğru konuma getir
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = start + 2;
          editorRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Scroll işlemini manuel olarak senkronize et
  const handleScroll = () => {
    if (editorRef.current && preRef.current) {
      preRef.current.scrollTop = editorRef.current.scrollTop;
      preRef.current.scrollLeft = editorRef.current.scrollLeft;
    }
  };

  return (
    <div className={styles.vsCodeEditor}>
      {/* Textarea - kullanıcı girişi için */}
      <textarea
        ref={editorRef}
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        className={styles.codeInput}
        spellCheck="false"
        data-gramm="false"
        placeholder="Kod buraya yazın..."
      />
      
      {/* Sözdizimi vurgulaması için özel <pre> elementi */}
      <pre ref={preRef} className={styles.codeOutput} aria-hidden="true">
        <code
          className={`hljs ${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
};

export default CodeEditor; 