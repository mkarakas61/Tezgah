import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function RustBasics() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Ana Sayfaya Dön
        </Link>
        <h1 className={styles.title}>Rust Temelleri</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Rust Nedir?</h2>
          <p className={styles.paragraph}>
            Rust, performans, güvenlik ve eşzamanlılık konularında öne çıkan modern bir programlama dilidir. 
            Mozilla tarafından geliştirilen Rust, bellek güvenliği garantileri sağlarken C/C++ ile karşılaştırılabilir 
            performans sunar.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>İlk Rust Programı</h2>
          <p className={styles.paragraph}>
            Gelin ilk Rust programımızı yazalım. Aşağıdaki kodu çalıştırmak için:
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`fn main() {
    println!("Merhaba, Rust!");
}`}
            </code>
          </pre>
          <p className={styles.paragraph}>
            Bu kod <code>main</code> fonksiyonu adı verilen Rust'taki giriş noktasını tanımlar. 
            <code>println!</code> bir makrodur (! işaretiyle bunu anlayabilirsiniz) ve 
            konsola metin basmak için kullanılır.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Değişkenler ve Veri Tipleri</h2>
          <p className={styles.paragraph}>
            Rust'ta değişkenler varsayılan olarak değiştirilemezdir (immutable). Bir değişken tanımlamak için:
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`let x = 5; // değiştirilemez
let mut y = 10; // değiştirilebilir (mutable)`}
            </code>
          </pre>
          
          <p className={styles.paragraph}>
            Temel veri tipleri:
          </p>
          <ul className={styles.list}>
            <li><code>i32, i64</code> - Tam sayılar</li>
            <li><code>f32, f64</code> - Ondalıklı sayılar</li>
            <li><code>bool</code> - Boolean (true/false)</li>
            <li><code>char</code> - Unicode karakter</li>
            <li><code>String</code> - UTF-8 kodlu metin</li>
            <li><code>&str</code> - String dilimi (slice)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Uygulama: Basit Hesap Makinesi</h2>
          <p className={styles.paragraph}>
            Şimdi öğrendiklerimizi uygulayalım. Aşağıdaki kodu kendi bilgisayarınızda deneyebilirsiniz:
          </p>
          <pre className={styles.codeBlock}>
            <code>
              {`fn main() {
    // Değişkenleri tanımlayalım
    let sayi1 = 15;
    let sayi2 = 5;
    
    // Temel matematiksel işlemler
    let toplam = sayi1 + sayi2;
    let fark = sayi1 - sayi2;
    let carpim = sayi1 * sayi2;
    let bolum = sayi1 / sayi2;
    
    // Sonuçları yazdıralım
    println!("{} + {} = {}", sayi1, sayi2, toplam);
    println!("{} - {} = {}", sayi1, sayi2, fark);
    println!("{} * {} = {}", sayi1, sayi2, carpim);
    println!("{} / {} = {}", sayi1, sayi2, bolum);
}`}
            </code>
          </pre>
          
          <div className={styles.exercise}>
            <h3>Egzersiz</h3>
            <p>
              Yukarıdaki hesap makinesine modulo (%) operatörünü ekleyin ve sonucu yazdırın.
              Ardından, <code>sayi1</code> ve <code>sayi2</code> değişkenlerini <code>mut</code> olarak tanımlayıp,
              kullanıcıdan değerleri alan bir hesap makinesi yapın.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sonraki Adımlar</h2>
          <p className={styles.paragraph}>
            Rust'ın temellerini öğrendiniz! Şimdi SOLID prensiplerine ve nesne yönelimli konseptlere
            geçiş yapabiliriz.
          </p>
          <Link href="/lessons/solid" className={styles.nextLesson}>
            Sonraki Ders: SOLID Prensipleri →
          </Link>
        </section>
      </main>
    </div>
  );
} 