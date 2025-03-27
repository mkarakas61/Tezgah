import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function SolidPrinciples() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Ana Sayfaya Dön
        </Link>
        <h1 className={styles.title}>SOLID Prensipleri - Rust ile Uygulama</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>SOLID Prensipleri Nedir?</h2>
          <p className={styles.paragraph}>
            SOLID, yazılım geliştirmede daha sürdürülebilir, anlaşılabilir ve esnek kod yazmak için kullanılan 
            beş temel prensipten oluşan bir kısaltmadır. Bu prensipler Robert C. Martin tarafından tanımlanmıştır.
          </p>
          <ul className={styles.list}>
            <li><strong>S</strong> - Single Responsibility Principle (Tek Sorumluluk Prensibi)</li>
            <li><strong>O</strong> - Open/Closed Principle (Açık/Kapalı Prensibi)</li>
            <li><strong>L</strong> - Liskov Substitution Principle (Liskov Yerine Geçme Prensibi)</li>
            <li><strong>I</strong> - Interface Segregation Principle (Arayüz Ayrımı Prensibi)</li>
            <li><strong>D</strong> - Dependency Inversion Principle (Bağımlılığın Tersine Çevrilmesi Prensibi)</li>
          </ul>
          <p className={styles.paragraph}>
            Rust, bu prensipleri uygulamanıza olanak tanıyan trait'ler, generics ve modülerlik gibi birçok özelliğe sahiptir.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Single Responsibility Principle (SRP)</h2>
          <p className={styles.paragraph}>
            "Bir sınıfın değişmek için sadece bir nedeni olmalıdır." Bu, her modülün veya sınıfın yalnızca bir işi olması gerektiği anlamına gelir.
          </p>
          <p className={styles.paragraph}>
            Rust'ta SRP örneği:
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`// Kötü Örnek - Çoklu sorumluluk
struct KullaniciIslemleri {
    fn kullanici_olustur(&self, ad: &str, email: &str) -> Result<Kullanici, String> {
        // Kullanıcı oluştur
        // E-posta doğrulama
        // Veritabanına kaydet
        // Bildirim gönder
        // ...
    }
}

// İyi Örnek - Sorumlulukları ayırmak
struct KullaniciOlusturucu {
    fn yeni_kullanici(&self, ad: &str, email: &str) -> Result<Kullanici, String> {
        // Sadece kullanıcı oluşturma işlemi
    }
}

struct EmailDogrulayici {
    fn dogrula(&self, email: &str) -> bool {
        // Sadece e-posta doğrulama işlemi
    }
}

struct VeriTabaniIslemleri {
    fn kaydet(&self, kullanici: &Kullanici) -> Result<(), DbHata> {
        // Sadece veritabanı işlemleri
    }
}

struct BildirimServisi {
    fn bildirim_gonder(&self, kullanici: &Kullanici, mesaj: &str) {
        // Sadece bildirim gönderme işlemi
    }
}`}
            </code>
          </pre>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Open/Closed Principle (OCP)</h2>
          <p className={styles.paragraph}>
            "Yazılım varlıkları (sınıflar, modüller, fonksiyonlar vb.) genişletilmeye açık, ancak değişikliğe kapalı olmalıdır."
          </p>
          <p className={styles.paragraph}>
            Rust'ta trait'ler (arayüzler) kullanarak OCP'yi uygulayabiliriz:
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`// Şekil için bir trait tanımlayalım
trait Sekil {
    fn alan(&self) -> f64;
}

// Farklı şekil uygulamaları
struct Dikdortgen {
    genislik: f64,
    yukseklik: f64,
}

impl Sekil for Dikdortgen {
    fn alan(&self) -> f64 {
        self.genislik * self.yukseklik
    }
}

struct Daire {
    yaricap: f64,
}

impl Sekil for Daire {
    fn alan(&self) -> f64 {
        std::f64::consts::PI * self.yaricap * self.yaricap
    }
}

// Yeni bir şekil eklemek istediğimizde mevcut kodu değiştirmeden yapabiliriz
struct Ucgen {
    taban: f64,
    yukseklik: f64,
}

impl Sekil for Ucgen {
    fn alan(&self) -> f64 {
        0.5 * self.taban * self.yukseklik
    }
}

// Alan hesaplama fonksiyonu, Sekil trait'ini uygulayan herhangi bir öğeyi kabul eder
fn toplam_alan_hesapla(sekiller: &[&dyn Sekil]) -> f64 {
    sekiller.iter().map(|sekil| sekil.alan()).sum()
}`}
            </code>
          </pre>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Liskov Substitution Principle (LSP)</h2>
          <p className={styles.paragraph}>
            "Bir programda, türetilen sınıf nesneleri, türetildikleri temel sınıfların nesneleriyle değiştirilebilir olmalıdır."
          </p>
          <p className={styles.paragraph}>
            Rust'ta kalıtım yerine composition ve trait implementasyonları kullanılır:
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`trait KutuAcma {
    fn ac(&self) -> String;
}

struct NormalKutu;

impl KutuAcma for NormalKutu {
    fn ac(&self) -> String {
        "Kutu açıldı ve içeriği gösterildi.".to_string()
    }
}

struct SurprizKutu;

impl KutuAcma for SurprizKutu {
    fn ac(&self) -> String {
        "Sürpriz! Kutu patladı ve konfetiler etrafa saçıldı!".to_string()
    }
}

// Herhangi bir KutuAcma trait'ini uygulayan nesne kullanılabilir
fn kutu_ac_goster<T: KutuAcma>(kutu: &T) {
    println!("{}", kutu.ac());
}

fn main() {
    let normal_kutu = NormalKutu;
    let surpriz_kutu = SurprizKutu;
    
    // Her iki kutu da KutuAcma trait'ini doğru şekilde uyguluyor,
    // bu nedenle birbirinin yerine kullanılabilirler
    kutu_ac_goster(&normal_kutu);
    kutu_ac_goster(&surpriz_kutu);
}`}
            </code>
          </pre>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Uygulama: Fatura Sistemi</h2>
          <p className={styles.paragraph}>
            Şimdi SOLID prensiplerini uygulayan bir fatura sistemi tasarlayalım:
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`// Fatura üreten ve işleyen bir sistem tasarlayalım
// 1. Tek Sorumluluk Prensibi (SRP)
// Her struct'ın yalnızca bir sorumluluğu var

// Fatura veri yapısı
struct Fatura {
    musteri_id: String,
    tutar: f64,
    aciklama: String,
}

// Fatura oluşturma sorumluluğu
struct FaturaOlusturucu {
    fn yeni_fatura(&self, musteri_id: &str, tutar: f64, aciklama: &str) -> Fatura {
        Fatura {
            musteri_id: musteri_id.to_string(),
            tutar,
            aciklama: aciklama.to_string(),
        }
    }
}

// 2. Açık/Kapalı Prensibi (OCP)
// Farklı fatura işleme davranışları için trait kullanımı

trait FaturaIsleyici {
    fn isle(&self, fatura: &Fatura);
}

struct PdfFaturaIsleyici;
impl FaturaIsleyici for PdfFaturaIsleyici {
    fn isle(&self, fatura: &Fatura) {
        println!("PDF fatura oluşturuluyor: Müşteri: {}, Tutar: {}",
            fatura.musteri_id, fatura.tutar);
    }
}

struct EmailFaturaIsleyici;
impl FaturaIsleyici for EmailFaturaIsleyici {
    fn isle(&self, fatura: &Fatura) {
        println!("E-posta faturası gönderiliyor: Müşteri: {}, Tutar: {}",
            fatura.musteri_id, fatura.tutar);
    }
}

// 3. Bağımlılığın Tersine Çevrilmesi Prensibi (DIP)
// FaturaSistemi, somut implementasyonlar yerine FaturaIsleyici trait'ine bağımlıdır

struct FaturaSistemi {
    isleyiciler: Vec<Box<dyn FaturaIsleyici>>,
}

impl FaturaSistemi {
    fn yeni() -> Self {
        FaturaSistemi {
            isleyiciler: Vec::new(),
        }
    }
    
    fn isleyici_ekle(&mut self, isleyici: Box<dyn FaturaIsleyici>) {
        self.isleyiciler.push(isleyici);
    }
    
    fn fatura_isle(&self, fatura: &Fatura) {
        for isleyici in &self.isleyiciler {
            isleyici.isle(fatura);
        }
    }
}

fn main() {
    // Sistemi kuralım
    let mut fatura_sistemi = FaturaSistemi::yeni();
    fatura_sistemi.isleyici_ekle(Box::new(PdfFaturaIsleyici));
    fatura_sistemi.isleyici_ekle(Box::new(EmailFaturaIsleyici));
    
    // Fatura oluşturalım
    let olusturucu = FaturaOlusturucu;
    let fatura = olusturucu.yeni_fatura("12345", 199.99, "Yazılım Hizmeti");
    
    // Faturayı işleyelim
    fatura_sistemi.fatura_isle(&fatura);
}`}
            </code>
          </pre>
          
          <div className={styles.exercise}>
            <h3>Egzersiz</h3>
            <p>
              Yukarıdaki fatura sistemine şu özellikleri ekleyin:
            </p>
            <ol>
              <li>Yeni bir <code>SmsIhbarIsleyici</code> oluşturun ve <code>FaturaIsleyici</code> trait'ini uygulayın.</li>
              <li>Farklı müşteri tipleri için <code>Musteri</code> trait'i ve farklı müşteri implementasyonları ekleyin 
              (örn. <code>BireyselMusteri</code>, <code>KurumsalMusteri</code>)</li>
              <li>Fatura oluşturma işleminin Interface Segregation Principle'a uygun olmasını sağlayın.</li>
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sonraki Adımlar</h2>
          <p className={styles.paragraph}>
            SOLID prensiplerini öğrendiniz! Şimdi Rust'ta OOP kavramlarını daha detaylı olarak inceleyelim.
          </p>
          <Link href="/lessons/oop" className={styles.nextLesson}>
            Sonraki Ders: Nesne Yönelimli Programlama →
          </Link>
        </section>
      </main>
    </div>
  );
} 