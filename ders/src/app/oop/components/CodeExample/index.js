import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles.module.css';

export default function CodeExample({ conceptId, language, difficulty, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [codeOutput, setCodeOutput] = useState({ text: '', type: 'success' });
  
  const title = difficulty === 'easy' ? 'Basit Örnek' : 'Gelişmiş Örnek';
  
  const codeExamples = {
    'objects': {
      'ts': {
        'easy': `// TypeScript'te basit bir nesne örneği
class Product {
  id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getFormattedPrice(): string {
    return \`₺\${this.price.toFixed(2)}\`;
  }
}

// Kullanım
const laptop = new Product(1, "Laptop", 5999.99);
console.log(\`\${laptop.name} fiyatı: \${laptop.getFormattedPrice()}\`);
// Çıktı: "Laptop fiyatı: ₺5999.99"`,
        'hard': `// TypeScript'te gelişmiş bir nesne örneği
interface Taxable {
  calculateTax(): number;
}

class Product {
  private _id: number;
  private _name: string;
  private _price: number;
  
  constructor(id: number, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
  }
  
  get id(): number { return this._id; }
  get name(): string { return this._name; }
  get price(): number { return this._price; }
  
  set price(newPrice: number) {
    if (newPrice < 0) throw new Error("Fiyat negatif olamaz");
    this._price = newPrice;
  }
}

class ElectronicProduct extends Product implements Taxable {
  private _warrantyMonths: number;
  
  constructor(id: number, name: string, price: number, warrantyMonths: number) {
    super(id, name, price);
    this._warrantyMonths = warrantyMonths;
  }
  
  get warrantyMonths(): number { return this._warrantyMonths; }
  
  calculateTax(): number {
    return this.price * 0.18; // %18 KDV
  }
  
  getFullPrice(): number {
    return this.price + this.calculateTax();
  }
}

// Kullanım
const smartphone = new ElectronicProduct(2, "Akıllı Telefon", 8499.90, 24);
console.log(\`\${smartphone.name} tam fiyatı: ₺\${smartphone.getFullPrice().toFixed(2)}\`);
// Çıktı: "Akıllı Telefon tam fiyatı: ₺10029.88"`
      },
      'js': {
        'easy': `// JavaScript'te basit bir nesne örneği
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getFormattedPrice() {
    return \`₺\${this.price.toFixed(2)}\`;
  }
}

// Kullanım
const laptop = new Product(1, "Laptop", 5999.99);
console.log(\`\${laptop.name} fiyatı: \${laptop.getFormattedPrice()}\`);
// Çıktı: "Laptop fiyatı: ₺5999.99"`,
        'hard': `// JavaScript'te gelişmiş bir nesne örneği
class Product {
  #id;
  #name;
  #price;
  
  constructor(id, name, price) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
  }
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get price() { return this.#price; }
  
  set price(newPrice) {
    if (newPrice < 0) throw new Error("Fiyat negatif olamaz");
    this.#price = newPrice;
  }
}

class ElectronicProduct extends Product {
  #warrantyMonths;
  
  constructor(id, name, price, warrantyMonths) {
    super(id, name, price);
    this.#warrantyMonths = warrantyMonths;
  }
  
  get warrantyMonths() { return this.#warrantyMonths; }
  
  calculateTax() {
    return this.price * 0.18; // %18 KDV
  }
  
  getFullPrice() {
    return this.price + this.calculateTax();
  }
}

// Kullanım
const smartphone = new ElectronicProduct(2, "Akıllı Telefon", 8499.90, 24);
console.log(\`\${smartphone.name} tam fiyatı: ₺\${smartphone.getFullPrice().toFixed(2)}\`);
// Çıktı: "Akıllı Telefon tam fiyatı: ₺10029.88"`
      },
      'rust': {
        'easy': `// Rust'ta basit bir nesne (struct) örneği
struct Product {
    id: u32,
    name: String,
    price: f64,
}

impl Product {
    fn new(id: u32, name: &str, price: f64) -> Self {
        Product {
            id,
            name: name.to_string(),
            price,
        }
    }
    
    fn formatted_price(&self) -> String {
        format!("₺{:.2}", self.price)
    }
}

fn main() {
    let laptop = Product::new(1, "Laptop", 5999.99);
    println!("{} fiyatı: {}", laptop.name, laptop.formatted_price());
    // Çıktı: "Laptop fiyatı: ₺5999.99"
}`,
        'hard': `// Rust'ta gelişmiş bir nesne örneği
trait Taxable {
    fn calculate_tax(&self) -> f64;
}

struct Product {
    id: u32,
    name: String,
    price: f64,
}

impl Product {
    fn new(id: u32, name: &str, price: f64) -> Self {
        if price < 0.0 {
            panic!("Fiyat negatif olamaz");
        }
        Product {
            id,
            name: name.to_string(),
            price,
        }
    }
    
    fn formatted_price(&self) -> String {
        format!("₺{:.2}", self.price)
    }
}

struct ElectronicProduct {
    product: Product,
    warranty_months: u32,
}

impl ElectronicProduct {
    fn new(id: u32, name: &str, price: f64, warranty_months: u32) -> Self {
        ElectronicProduct {
            product: Product::new(id, name, price),
            warranty_months,
        }
    }
    
    fn full_price(&self) -> f64 {
        self.product.price + self.calculate_tax()
    }
    
    fn formatted_full_price(&self) -> String {
        format!("₺{:.2}", self.full_price())
    }
}

impl Taxable for ElectronicProduct {
    fn calculate_tax(&self) -> f64 {
        self.product.price * 0.18 // %18 KDV
    }
}

fn main() {
    let smartphone = ElectronicProduct::new(2, "Akıllı Telefon", 8499.90, 24);
    println!("{} tam fiyatı: {}", 
             smartphone.product.name, 
             smartphone.formatted_full_price());
    // Çıktı: "Akıllı Telefon tam fiyatı: ₺10029.88"
}`
      }
    }
  };

  // Örnek çıktıları içeren obje
  const codeOutputs = {
    'objects': {
      'ts': {
        'easy': 'Laptop fiyatı: ₺5999.99',
        'hard': 'Akıllı Telefon tam fiyatı: ₺10029.88'
      },
      'js': {
        'easy': 'Laptop fiyatı: ₺5999.99',
        'hard': 'Akıllı Telefon tam fiyatı: ₺10029.88'
      },
      'rust': {
        'easy': 'Laptop fiyatı: ₺5999.99',
        'hard': 'Akıllı Telefon tam fiyatı: ₺10029.88'
      }
    }
  };
  
  // Dil mapping tablosu
  const languageMapping = {
    'ts': 'typescript',
    'js': 'javascript',
    'rust': 'rust'
  };
  
  // Renk ve dil simgesi belirleme
  let langColor = '';
  let langIcon = null;
  
  switch(language) {
    case 'ts':
      langColor = 'blue';
      langIcon = <TypeScriptIcon />;
      break;
    case 'js':
      langColor = 'yellow';
      langIcon = <JavaScriptIcon />;
      break;
    case 'rust':
      langColor = 'orange';
      langIcon = <RustIcon />;
      break;
    default:
      break;
  }
  
  const code = codeExamples[conceptId]?.[language]?.[difficulty] || 
    `// ${conceptId} için ${language} ${difficulty} örneği\n// Bu kısma gerçek kod örneği gelecek`;

  // Kodu çalıştır fonksiyonu
  const runCode = useCallback(() => {
    try {
      const output = codeOutputs[conceptId]?.[language]?.[difficulty] || 
        '// Çalıştırma sonucu burada gösterilecek';
      
      setCodeOutput({
        text: output,
        type: 'success'
      });
      
      setShowPopup(true);
    } catch (error) {
      setCodeOutput({
        text: `Hata: ${error.message}`,
        type: 'error'
      });
      setShowPopup(true);
    }
  }, [conceptId, language, difficulty]);

  // Kodu kopyalama fonksiyonu
  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Kod panoya kopyalandı!');
    }).catch(err => {
      console.error('Kopyalama hatası:', err);
      alert('Kod kopyalanamadı.');
    });
  }, [code]);
  
  return (
    <div className={`${styles.container} ${darkMode ? styles.darkContainer : ''}`}>
      <div 
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className={styles.title}>
          <span className={styles.colorDot} style={{backgroundColor: `var(--${langColor}-color)`}}></span>
          {langIcon}
          <span>{title}</span>
        </h5>
        <button className={styles.arrow} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </button>
      </div>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={styles.content}
      >
        <div className={styles.codeBlock}>
          <SyntaxHighlighter
            language={languageMapping[language] || 'javascript'}
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
            {code}
          </SyntaxHighlighter>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.runButton} onClick={runCode}>
            Çalıştır
          </button>
          <button className={styles.copyButton} onClick={copyCode}>
            Kopyala
          </button>
        </div>
      </motion.div>

      {/* Çıktı Popup'ı */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className={styles.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div 
              className={`${styles.popup} ${darkMode ? styles.darkPopup : ''}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.popupHeader}>
                <h3 className={styles.popupTitle}>
                  {langIcon}
                  <span>Kod Çıktısı - {language.toUpperCase()}</span>
                </h3>
                <button 
                  className={styles.popupClose}
                  onClick={() => setShowPopup(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.popupContent}>
                <div className={styles.outputTitle}>
                  Çalıştırma sonucu:
                </div>
                <div className={styles.outputWindow}>
                  <span className={codeOutput.type === 'success' ? styles.success : styles.error}>
                    {codeOutput.text}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Prop Types tanımlaması
CodeExample.propTypes = {
  conceptId: PropTypes.string.isRequired,
  language: PropTypes.oneOf(['ts', 'js', 'rust']).isRequired,
  difficulty: PropTypes.oneOf(['easy', 'hard']).isRequired,
  darkMode: PropTypes.bool
};

CodeExample.defaultProps = {
  darkMode: false
};

function TypeScriptIcon() {
  return (
    <svg className={styles.langIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={styles.langIconPath} d="M3 16L7 20L14 13" />
      <path className={styles.langIconPath} d="M21 7L7 20" />
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg className={styles.langIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={styles.langIconPath} d="M12 19L19 12L22 15L15 22L12 19Z" />
      <path className={styles.langIconPath} d="M18 13L13 8L15 6L20 11L18 13Z" />
      <path className={styles.langIconPath} d="M8 7L3 12L2 9L7 4L8 7Z" />
      <path className={styles.langIconPath} d="M3 13L10 20L8 22L1 15L3 13Z" />
    </svg>
  );
}

function RustIcon() {
  return (
    <svg className={styles.langIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={styles.langIconPath} d="M14 7L17 10L14 13" />
      <path className={styles.langIconPath} d="M10 17L7 14L10 11" />
      <circle className={styles.langIconPath} cx="12" cy="12" r="9" />
    </svg>
  );
} 