import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './styles.module.css';

export default function BadExamples({ conceptId, darkMode }) {
  const examples = {
    'objects': (
      <div>
        <p className={styles.description}>Nesnelerin hatalı kullanımı genellikle aşırı sorumluluk yüklenmesiyle gerçekleşir:</p>
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
{`// Hatalı - Bu User nesnesi çok fazla sorumluluk üstlenmiş
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  
  validateEmail() { /* email doğrulama */ }
  saveToDatabase() { /* veritabanına kaydetme */ }
  sendWelcomeEmail() { /* hoşgeldin e-postası gönderme */ }
  generateReport() { /* kullanıcı raporu oluşturma */ }
  processPayment(amount) { /* ödeme işleme */ }
  updateUserInterface() { /* kullanıcı arayüzü güncellemesi */ }
  // ... daha birçok sorumluluğa sahip
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Bu yaklaşım SOLID prensiplerinden "Tek Sorumluluk İlkesi"ni ihlal eder ve "God Object" olarak bilinen anti-pattern'e örnek oluşturur.</p>
        </div>
        
        <p className={styles.description}>Neden bu yaklaşım sorunludur?</p>
        <ul className={styles.bulletList}>
          <li>Kod sürdürülebilirliği düşük olur</li>
          <li>Test edilmesi zorlaşır</li>
          <li>Farklı sorumluluklar için kod değişiklikleri yapılması gerektiğinde riskler artar</li>
          <li>Ekip çalışmasında çakışmalar (conflicts) daha sık görülür</li>
        </ul>
      </div>
    ),
    'classes': (
      <div>
        <p className={styles.description}>Sınıfların hatalı kullanımı genellikle aşırı genişletme ve gevşek uyumdan kaynaklanır:</p>
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
{`// Hatalı - Dev bir sınıf (God Class) örneği
class SystemManager {
  constructor() {
    // ... onlarca özellik
  }
  
  handleUserRegistration() { /* ... */ }
  processPayment() { /* ... */ }
  generateReports() { /* ... */ }
  manageInventory() { /* ... */ }
  setupEmailNotifications() { /* ... */ }
  // ... onlarca metot
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Bu tür "God Class" yapıları, SOLID prensiplerini birçok açıdan ihlal eder ve uygulamanın ölçeklenebilirliğini engeller.</p>
        </div>
        
        <p className={styles.description}>Ayrıca kalıtımın hatalı kullanımı:</p>
        <div className={`${styles.codeBlock} ${darkMode ? styles.darkCodeBlock : ''}`}>
          <SyntaxHighlighter
            language="typescript"
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
{`// Hatalı kalıtım örneği - Liskov İlkesini İhlal Eder
class Rectangle {
  constructor(public width: number, public height: number) {}
  
  setWidth(width: number) {
    this.width = width;
  }
  
  setHeight(height: number) {
    this.height = height;
  }
  
  getArea(): number {
    return this.width * this.height;
  }
}

// Hatalı: Kare, dikdörtgenin özel bir durumudur ama davranışları farklıdır
class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }
  
  // Bu metot, üst sınıfın davranışını değiştiriyor - Liskov İlkesi ihlal ediliyor
  setWidth(width: number) {
    this.width = width;
    this.height = width; // Kare olduğu için yükseklik de değişmeli
  }
  
  setHeight(height: number) {
    this.height = height;
    this.width = height; // Kare olduğu için genişlik de değişmeli
  }
}`}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
    'attributes': (
      <div>
        <p className={styles.description}>Özniteliklerin hatalı kullanımı genellikle yetersiz kapsülleme ve bağımlılıklardan kaynaklanır:</p>
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
{`// Hatalı - Tüm özellikler public ve diğer sınıflar doğrudan erişiyor
class BankAccount {
  accountNumber = "12345";
  balance = 1000;
  transactionHistory = [];
  
  // Diğer sınıflar şöyle kullanıyor:
  // const account = new BankAccount();
  // account.balance -= 500; // Doğrudan erişim sorunlu
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Kapsülleme eksikliği, kodun bakımını zorlaştırır ve hatalara yol açabilir. Öznitelikler private/protected olmalı ve getter/setter metotlarıyla kontrollü erişim sağlanmalıdır.</p>
        </div>
        
        <p className={styles.description}>Gerçek dünya problemi:</p>
        <div className={styles.scenario}>
          <p>Bir e-ticaret uygulamasında bakiyeye doğrudan erişim, bir kullanıcının hesap bakiyesini negatife düşürmesine veya sahte işlemler eklemesine izin verebilir. Doğrulama olmadan özniteliklere doğrudan erişim, veri bütünlüğünü tehlikeye atar.</p>
        </div>
      </div>
    ),
    'encapsulation': (
      <div>
        <p className={styles.description}>Kapsülleme eksikliği, nesnenin iç detaylarının gereksiz yere açığa çıkmasına neden olur:</p>
        <div className={`${styles.codeBlock} ${darkMode ? styles.darkCodeBlock : ''}`}>
          <SyntaxHighlighter
            language="typescript"
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
{`// Kapsülleme olmadan - Kötü Uygulama
class Employee {
  public name: string;
  public salary: number;
  public taxRate: number;
  public bonusRate: number;
  
  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
    this.taxRate = 0.2;
    this.bonusRate = 0.1;
  }
}

// Kullanım:
const employee = new Employee("Ahmet", 5000);
// Herhangi bir doğrulama olmadan değiştirilebilir:
employee.salary = -1000; // Negatif maaş?
employee.taxRate = 2.5;  // %250 vergi?

// Daha iyi uygulama:
class BetterEmployee {
  private _name: string;
  private _salary: number;
  private _taxRate: number;
  private _bonusRate: number;
  
  constructor(name: string, salary: number) {
    this._name = name;
    this.setSalary(salary);
    this._taxRate = 0.2;
    this._bonusRate = 0.1;
  }
  
  public setSalary(salary: number): void {
    if (salary < 0) {
      throw new Error("Maaş negatif olamaz");
    }
    this._salary = salary;
  }
  
  public getSalary(): number {
    return this._salary;
  }
  
  public getNetSalary(): number {
    return this._salary * (1 - this._taxRate) + (this._salary * this._bonusRate);
  }
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Kapsülleme eksikliği, nesnelerin iç durumlarının kontrolsüz değiştirilmesine izin vererek hatalara açık kapı bırakır.</p>
        </div>
      </div>
    ),
    'inheritance': (
      <div>
        <p className={styles.description}>Kalıtımın hatalı kullanımında en yaygın sorun, "is-a" ilişkisi yerine "has-a" ilişkisi olduğunda kalıtım kullanmaktır:</p>
        <div className={`${styles.codeBlock} ${darkMode ? styles.darkCodeBlock : ''}`}>
          <SyntaxHighlighter
            language="typescript"
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
{`// Hatalı kalıtım örneği
class Engine {
  start() { console.log("Motor çalıştı"); }
  stop() { console.log("Motor durdu"); }
}

// Kötü tasarım: Araba bir motor değildir!
class Car extends Engine {
  drive() { console.log("Araba hareket ediyor"); }
}

// Doğru Tasarım: Kompozisyon kullanımı
class BetterCar {
  private engine: Engine;
  
  constructor() {
    this.engine = new Engine();
  }
  
  startEngine() {
    this.engine.start();
  }
  
  stopEngine() {
    this.engine.stop();
  }
  
  drive() {
    console.log("Araba hareket ediyor");
  }
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Bu tür hatalı kalıtım, "Composition over Inheritance" (Kalıtım yerine kompozisyon) prensibini ihlal eder ve kod bakımını zorlaştırır.</p>
        </div>
        
        <p className={styles.description}>Hatalı kalıtım kullanımı neden sorunludur?</p>
        <ul className={styles.bulletList}>
          <li>Sınıf hiyerarşisinde değişiklik yapmak zorlaşır</li>
          <li>Alt sınıflar, üst sınıfın tüm metodlarını miras alır, ancak hepsine ihtiyaç duymayabilir</li>
          <li>Çoklu kalıtım desteklenmeyen dillerde (Java, C#) tasarım kısıtlamaları oluşur</li>
          <li>Testleri karmaşıklaştırır ve bağımlılıkları arttırır</li>
        </ul>
      </div>
    ),
    'polymorphism': (
      <div>
        <p className={styles.description}>Çok biçimliliğin hatalı kullanımı genellikle tip kontrolü ve downcasting ile gerçekleşir:</p>
        <div className={`${styles.codeBlock} ${darkMode ? styles.darkCodeBlock : ''}`}>
          <SyntaxHighlighter
            language="typescript"
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
{`// Çok biçimliliğin hatalı kullanımı
abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Hav hav!");
  }
  
  fetch(): void {
    console.log("Top getiriyor!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Miyav!");
  }
  
  scratch(): void {
    console.log("Tırmalıyor!");
  }
}

// Hatalı kullanım - Tip kontrolü ve downcasting
function handleAnimal(animal: Animal): void {
  animal.makeSound();
  
  // Tip kontrolü ve downcasting ile çok biçimliliğin avantajlarını kaybediyoruz
  if (animal instanceof Dog) {
    const dog = animal as Dog;
    dog.fetch();
  } else if (animal instanceof Cat) {
    const cat = animal as Cat;
    cat.scratch();
  }
  
  // Her yeni hayvan türü için bu metodu değiştirmek gerekecek
  // Açık/Kapalı prensibini ihlal ediyor
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Bu yaklaşım, çok biçimliliğin sağladığı esnekliği ortadan kaldırır ve Açık/Kapalı prensibi ihlal eder. Her yeni alt sınıf eklendiğinde mevcut kodu değiştirmek gerekir.</p>
        </div>
        
        <p className={styles.description}>Daha iyi bir tasarım:</p>
        <div className={`${styles.codeBlock} ${darkMode ? styles.darkCodeBlock : ''}`}>
          <SyntaxHighlighter
            language="typescript"
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
{`// Çok biçimliliğin doğru kullanımı
interface Animal {
  makeSound(): void;
  act(): void;  // Her hayvan kendi davranışını uygular
}

class Dog implements Animal {
  makeSound(): void {
    console.log("Hav hav!");
  }
  
  act(): void {
    console.log("Top getiriyor!");
  }
}

class Cat implements Animal {
  makeSound(): void {
    console.log("Miyav!");
  }
  
  act(): void {
    console.log("Tırmalıyor!");
  }
}

// Doğru kullanım - Çok biçimlilik
function handleAnimal(animal: Animal): void {
  animal.makeSound();
  animal.act();  // Her hayvan kendi davranışını sergiler
  
  // Yeni hayvan türleri eklendiğinde bu fonksiyonu değiştirmeye gerek yok
}`}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
    'methods': (
      <div>
        <p className={styles.description}>Metotların hatalı kullanımına örnek - çok fazla parametre ve yan etki:</p>
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
{`// Hatalı metot kullanımı - çok fazla parametre ve sorumluluğu var
class OrderProcessor {
  processOrder(
    orderId, 
    customer, 
    items, 
    paymentMethod, 
    couponCode, 
    shippingAddress, 
    billingAddress, 
    isGift, 
    giftMessage, 
    trackingPreference,
    shouldSendEmail
  ) {
    // Sipariş doğrulama
    // Stok kontrolü
    // Ödeme işleme
    // E-posta gönderme
    // Fatura oluşturma
    // Kargo ayarlama
    // Veritabanı güncelleme
    // ... 100+ satır kod
  }
}

// Bu metot hem Tek Sorumluluk İlkesini ihlal eder
// hem de anlaşılması, test edilmesi ve bakımı zordur`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Bu tür "dev metotlar" (monster methods), anlaşılması, test edilmesi ve sürdürülmesi zor kodlara yol açar.</p>
        </div>
        
        <p className={styles.description}>İyi bir metot tasarımı şunları sağlar:</p>
        <ul className={styles.bulletList}>
          <li>Tek bir sorumluluk (tek bir iş yapar)</li>
          <li>Az sayıda parametre (ideal olarak 3 veya daha az)</li>
          <li>Kısa ve anlaşılır (20-30 satırdan fazla değil)</li>
          <li>Tahmin edilebilir yan etkiler (ya da hiç yan etki olmaması)</li>
          <li>İyi bir isimlendirme (ne yaptığı ismine bakarak anlaşılır)</li>
        </ul>
      </div>
    ),
    'instance': (
      <div>
        <p className={styles.description}>Nesne örneklerinin hatalı kullanımına örnek - nesne havuzu (object pool) sorunu:</p>
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
{`// Problematik singleton/nesne havuzu kullanımı
class DatabaseConnection {
  constructor() {
    // Bağlantı kurulumu
  }
  
  static instance = null;
  
  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  executeQuery(query) {
    // Sorgu çalıştırma
    console.log(\`Sorgu çalıştırılıyor: \${query}\`);
    // Bu tek örnek (singleton) birden çok istemci tarafından kullanıldığında,
    // durum (state) sorunları ve eşzamanlılık (concurrency) problemleri ortaya çıkabilir
  }
}

// Kullanım:
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

// db1 ve db2 aynı nesneyi referans eder, bu durum çoklu thread veya 
// istemci senaryolarında sorunlara yol açabilir`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.error}>
          <ErrorIcon />
          <p className={styles.errorText}>Singleton gibi desenler dikkatli kullanılmalıdır. Özellikle test edilebilirliği zorlaştırır ve bağımlılık enjeksiyonu prensiplerine aykırıdır.</p>
        </div>
      </div>
    )
  };
  
  return (
    <div className={styles.container}>
      {examples[conceptId] || (
        <div className={styles.loading}>
          <LoadingIcon />
          <p>Bu kavramın hatalı kullanım örnekleri içeriği hazırlanıyor.</p>
        </div>
      )}
    </div>
  );
}

BadExamples.propTypes = {
  conceptId: PropTypes.string.isRequired,
  darkMode: PropTypes.bool
};

BadExamples.defaultProps = {
  darkMode: false
};

function ErrorIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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