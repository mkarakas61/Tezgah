import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles.module.css';

export default function WhenToUse({ conceptId, darkMode }) {
  const examples = {
    'objects': (
      <div>
        <p className={styles.description}>Nesnelere aşağıdaki durumlarda ihtiyaç duyulur:</p>
        <div className={styles.gridContainer}>
          <div className={`${styles.card} ${darkMode ? styles.darkCard : ''}`}>
            <div className={styles.cardIcon}>🏢</div>
            <h4 className={styles.cardTitle}>Gerçek Dünya Modellemesi</h4>
            <p className={styles.cardText}>Müşteri, Ürün, Sipariş gibi gerçek dünya varlıklarını modellerken</p>
          </div>
          <div className={`${styles.card} ${darkMode ? styles.darkCard : ''}`}>
            <div className={styles.cardIcon}>🔄</div>
            <h4 className={styles.cardTitle}>Veri Gruplaması</h4>
            <p className={styles.cardText}>İlgili verileri ve davranışları bir araya getirmeniz gerektiğinde</p>
          </div>
          <div className={`${styles.card} ${darkMode ? styles.darkCard : ''}`}>
            <div className={styles.cardIcon}>📊</div>
            <h4 className={styles.cardTitle}>Durum Yönetimi</h4>
            <p className={styles.cardText}>Durum takibi ve değişimleri yönetmeniz gerektiğinde</p>
          </div>
        </div>
        <div className={`${styles.codeBlock} ${darkMode ? styles.darkCodeBlock : ''}`}>
          <SyntaxHighlighter
            language="javascript"
            style={darkMode ? vscDarkPlus : vs}
            customStyle={{
              margin: 0,
              padding: 0,
              background: 'transparent',
              fontSize: '0.875rem',
              fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
              lineHeight: '1.5'
            }}
          >
{`// E-ticaret uygulamasında alışveriş sepeti nesnesi örneği
class ShoppingCart {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }
  
  addItem(item) {
    this.items.push(item);
    this.calculateTotal();
  }
  
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.calculateTotal();
  }
  
  calculateTotal() {
    this.totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  checkout() {
    // Ödeme işlemi
  }
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.success}>
          <SuccessIcon />
          <p className={styles.successText}>ShoppingCart nesnesi sipariş sürecinin durumunu yönetir ve ilgili işlemleri gruplayarak Tek Sorumluluk İlkesine uyar.</p>
        </div>
      </div>
    )
  };
  
  return (
    <div className={styles.container}>
      {examples[conceptId] || (
        <div className={styles.loading}>
          <LoadingIcon />
          <p>Bu kavramın ne zaman kullanılacağı içeriği hazırlanıyor.</p>
        </div>
      )}
    </div>
  );
}

WhenToUse.propTypes = {
  conceptId: PropTypes.string.isRequired,
  darkMode: PropTypes.bool
};

WhenToUse.defaultProps = {
  darkMode: false
};

function SuccessIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg className={styles.loadingIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className={styles.loadingCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className={styles.loadingPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
} 