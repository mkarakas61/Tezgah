'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ConceptCard from './components/ConceptCard';
import ConceptDetail from './components/ConceptDetail';
import ThemeToggle from './components/ThemeToggle';
import ProgressTracker from './components/ProgressTracker';
import styles from './styles.module.css';

// OOP ana sayfa bileşeni
function OopPage() {
  const [activeCard, setActiveCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [learnedConcepts, setLearnedConcepts] = useState([]);
  const [savTokens, setSavTokens] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Menü durumu için state
  
  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcının tercihine göre tema ayarla
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(userPrefersDark);
    
    // Öğrenilen konuları ve SAV token'ları localStorage'dan yükle
    const savedLearnedConcepts = localStorage.getItem('learnedConcepts');
    const savedSavTokens = localStorage.getItem('savTokens');
    
    if (savedLearnedConcepts) {
      setLearnedConcepts(JSON.parse(savedLearnedConcepts));
    }
    
    if (savedSavTokens) {
      setSavTokens(parseInt(savedSavTokens));
    }
  }, []);
  
  // Öğrenilen konuları ve SAV token'ları localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('learnedConcepts', JSON.stringify(learnedConcepts));
    localStorage.setItem('savTokens', savTokens.toString());
  }, [learnedConcepts, savTokens]);

  // Menü dışına tıklama ile menüyü kapatma işlevi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(`.${styles.sidebar}`) && !event.target.closest(`.${styles.mobileMenuToggle}`)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Hamburger menüyü açıp kapatma fonksiyonu
  const toggleMenu = () => {
    console.log("Menü durumu değişti:", !menuOpen);
    setMenuOpen(prevState => !prevState);
  };
  
  // menuOpen değiştiğinde etkisini izleyelim
  useEffect(() => {
    console.log("Menü durumu:", menuOpen);
    console.log("Sidebar elementi:", document.querySelector(`.${styles.sidebar}`));
  }, [menuOpen]);
  
  // Ekran boyutu değiştiğinde menüyü kapatmak için
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);
  
  // Öğrenilen/öğrenilmeyen kavram durumlarını değiştir
  const toggleLearnedStatus = (conceptId) => {
    if (learnedConcepts.includes(conceptId)) {
      // Kavram zaten öğrenilmiş, öğrenilmemiş olarak işaretle ve token'ları düşür
      const concept = oopConcepts.find(c => c.id === conceptId);
      setLearnedConcepts(prev => prev.filter(id => id !== conceptId));
      setSavTokens(prev => Math.max(prev - concept.points, 0));
    } else {
      // Kavramı öğrenilmiş olarak işaretle ve token'ları artır
      const concept = oopConcepts.find(c => c.id === conceptId);
      setLearnedConcepts(prev => [...prev, conceptId]);
      setSavTokens(prev => prev + concept.points);
    }
  };
  
  // Kavramları zorluk seviyesine göre sırala
  const sortConceptsByDifficulty = (a, b) => {
    if (a.difficultyLevel !== b.difficultyLevel) {
      return a.difficultyLevel - b.difficultyLevel;
    }
    
    // Eğer öğrenme durumu farklı ise, öğrenilmemiş olanları üstte göster
    const aLearned = learnedConcepts.includes(a.id);
    const bLearned = learnedConcepts.includes(b.id);
    
    if (aLearned !== bLearned) {
      return aLearned ? 1 : -1;
    }
    
    return 0;
  };

  // OOP kavramları tanımları
  const oopConcepts = [
    {
      id: 'objects',
      title: 'Objects (Nesneler)',
      icon: '🔲',
      color: '#FF6B6B',
      description: 'Veri ve davranışları bir arada tutan yapı taşları',
      image: 'https://picsum.photos/seed/objects/300/200',
      difficultyLevel: 1,
      points: 10,
      needFulfilled: 'Gerçek dünya varlıklarını yazılımda modelleyerek, ilgili veri ve davranışların bir arada tutulmasını sağlar. Bu, kodun mantıksal olarak organize edilmesine yardımcı olur.',
      badUsageScenario: 'God Object anti-pattern: Bir nesneye çok fazla sorumluluk yüklemek, kodun bakımını zorlaştırır ve Tek Sorumluluk İlkesini ihlal eder.'
    },
    {
      id: 'classes',
      title: 'Classes (Sınıflar)',
      icon: '🔲',
      color: '#4ECDC4',
      description: 'Nesnelerin şablonları veya planları',
      image: 'https://picsum.photos/seed/classes/300/200',
      difficultyLevel: 1,
      points: 10,
      needFulfilled: 'Benzer nesnelerin tek bir şablon üzerinden yaratılmasını sağlayarak kod tekrarını önler ve nesne üretimini standardize eder.',
      badUsageScenario: 'Dev Sınıflar (God Classes): Bir sınıfa çok fazla işlev ve sorumluluk yüklemek, kodun anlaşılabilirliğini ve bakımını zorlaştırır.'
    },
    {
      id: 'attributes',
      title: 'Attributes (Öznitelikler)',
      icon: '🔲',
      color: '#FFD166',
      description: 'Nesnelerin sahip olduğu veriler',
      image: 'https://picsum.photos/seed/attributes/300/200',
      difficultyLevel: 2,
      points: 15,
      needFulfilled: 'Nesnelerin durumlarını temsil eden verileri depolamak ve nesnelere özgü bilgileri saklamak için kullanılır. Bu, nesnelerin kendi durumlarını yönetmelerine olanak tanır.',
      badUsageScenario: 'Public öznitelikler: Özniteliklerin doğrudan erişilebilir olması (public) veri bütünlüğü ve kapsüllemeyi tehlikeye atar.'
    },
    {
      id: 'behaviors',
      title: 'Behaviors (Davranışlar)',
      icon: '🔲',
      color: '#06D6A0',
      description: 'Nesnelerin gerçekleştirebildiği işlemler',
      image: 'https://picsum.photos/seed/behaviors/300/200',
      difficultyLevel: 2,
      points: 15,
      needFulfilled: 'Nesnelerin kendi verileri üzerinde işlem yapmasını ve diğer nesnelerle etkileşim kurmasını sağlar. Böylece "veri ve davranış bir arada" prensibi uygulanabilir.',
      badUsageScenario: 'İşlevsel Sızıntı: Bir nesnenin davranışının başka sınıflar tarafından gerçekleştirilmesi, kapsülleme ilkesini bozar ve bağımlılıkları artırır.'
    },
    {
      id: 'methods',
      title: 'Methods (Metotlar)',
      icon: '🔲',
      color: '#118AB2',
      description: 'Nesnelerin davranışlarını tanımlayan fonksiyonlar',
      image: 'https://picsum.photos/seed/methods/300/200',
      difficultyLevel: 2,
      points: 15,
      needFulfilled: 'Nesnelerin davranışlarını uygulamak için gereken kod bloklarını sağlar, böylece nesneler belirli görevleri gerçekleştirebilir ve diğer bileşenlerle etkileşime girebilir.',
      badUsageScenario: 'Büyük/Karmaşık metotlar (God Methods): Tek bir metoda çok fazla fonksiyonellik yüklemek, kodun bakımını ve anlaşılmasını zorlaştırır.'
    },
    {
      id: 'constructor',
      title: 'Constructor (Kurucu Metotlar)',
      icon: '🔲',
      color: '#073B4C',
      description: 'Nesneleri oluşturan özel metotlar',
      image: 'https://picsum.photos/seed/constructor/300/200',
      difficultyLevel: 3,
      points: 20,
      needFulfilled: 'Nesnenin başlangıç durumunu ayarlama, gerekli kaynakları tahsis etme ve nesnenin kullanıma hazır olmasını sağlama ihtiyacını karşılar.',
      badUsageScenario: 'Aşırı yüklü kurucular: Kurucularda çok fazla iş yapmak, nesne oluşturma sürecini karmaşıklaştırır ve bağımlılıkları arttırır.'
    },
    {
      id: 'abstraction',
      title: 'Abstraction (Soyutlama)',
      icon: '🔲',
      color: '#9B5DE5',
      description: 'Karmaşık sistemleri basitleştirmek için detayları gizleme',
      image: 'https://picsum.photos/seed/abstraction/300/200',
      difficultyLevel: 3,
      points: 25,
      needFulfilled: 'Karmaşık sistemleri daha anlaşılır hale getirme ve gereksiz detayları gizleme ihtiyacını karşılar. Bu, geliştiricilerin sadece gerekli bilgilere odaklanmasını sağlar.',
      badUsageScenario: 'Yetersiz soyutlama: Uygulama detaylarının sızdığı zayıf soyutlamalar, kodun esnekliğini ve bakımını zorlaştırır.'
    },
    {
      id: 'encapsulation',
      title: 'Encapsulation (Kapsülleme)',
      icon: '🔲',
      color: '#F15BB5',
      description: 'Verileri ve işlevleri bir arada saklama ve koruma',
      image: 'https://picsum.photos/seed/encapsulation/300/200',
      difficultyLevel: 3,
      points: 25,
      needFulfilled: 'Nesnenin iç yapısını gizleme ve dış dünyayla olan etkileşimini kontrollü bir arayüz üzerinden sağlama ihtiyacını karşılar. Böylece veri bütünlüğü korunur.',
      badUsageScenario: 'Getter/Setter bağımlılığı: Sadece get/set metotları ekleyip gerçek veri doğrulama yapmamak, kapsüllemenin faydalarını ortadan kaldırır.'
    },
    {
      id: 'inheritance',
      title: 'Inheritance (Kalıtım)',
      icon: '🔲',
      color: '#00BBF9',
      description: 'Bir sınıfın başka bir sınıfın özelliklerini miras alması',
      image: 'https://picsum.photos/seed/inheritance/300/200',
      difficultyLevel: 4,
      points: 30,
      needFulfilled: 'Kod tekrarını azaltma ve ortak davranışları paylaşma ihtiyacını karşılar. Alt sınıflar, üst sınıfların özelliklerini miras alarak, genişletilmiş işlevsellik sunar.',
      badUsageScenario: 'İS-A ilişkisi olmadan kalıtım kullanma: Square sınıfını Rectangle\'dan türetmek gibi, bazı durumlarda kompozisyon daha uygun olabilir.'
    },
    {
      id: 'polymorphism',
      title: 'Polymorphism (Çok Biçimlilik)',
      icon: '🔲',
      color: '#00F5D4',
      description: 'Farklı nesnelerin aynı arayüzü paylaşabilmesi',
      image: 'https://picsum.photos/seed/polymorphism/300/200',
      difficultyLevel: 5,
      points: 40,
      needFulfilled: 'Farklı nesnelerin aynı mesaja veya çağrıya farklı şekillerde cevap verebilme ihtiyacını karşılar. Bu, kodun daha esnek ve genişletilebilir olmasını sağlar.',
      badUsageScenario: 'İf-else veya switch-case ile tip kontrolü: Çok biçimliliğin avantajları yerine tip kontrolüyle davranış değiştirmek, kodun bakımını zorlaştırır.'
    },
    {
      id: 'instance',
      title: 'Instance (Örnek/Nesne Örneği)',
      icon: '🔲',
      color: '#FB8500',
      description: 'Bir sınıftan türetilen belirli bir nesne',
      image: 'https://picsum.photos/seed/instance/300/200',
      difficultyLevel: 2,
      points: 15,
      needFulfilled: 'Sınıf şablonundan somut, çalışma zamanında kullanılabilir nesneler oluşturma ihtiyacını karşılar. Her örnek, kendi durum bilgisini tutan özel bir varlıktır.',
      badUsageScenario: 'Gereksiz örnekler: İhtiyaç olmadığında çok sayıda örnek oluşturmak, bellek israfına yol açar. Singleton veya nesneleri yeniden kullanmak daha verimli olabilir.'
    },
    {
      id: 'object-lifetime',
      title: 'Object Lifetime (Nesne Ömrü)',
      icon: '🔲',
      color: '#264653',
      description: 'Bir nesnenin oluşturulma, kullanılma ve yok edilme süreci',
      image: 'https://picsum.photos/seed/lifetime/300/200',
      difficultyLevel: 4,
      points: 30,
      needFulfilled: 'Kaynakların verimli kullanımı ve bellek yönetimi için nesnelerin yaşam döngüsünü kontrol etme ihtiyacını karşılar.',
      badUsageScenario: 'Kaynakların serbest bırakılmaması: Nesnelerin kullanımı bittiğinde kaynakları serbest bırakmamak (özellikle otomatik çöp toplama olmayan dillerde) bellek sızıntılarına neden olur.'
    }
  ];
  
  // Kavramları zorluk seviyesine göre sırala
  const sortedConcepts = [...oopConcepts].sort(sortConceptsByDifficulty);
  
  // Öğrenme durumuna göre ilerleme yüzdesi hesapla
  const progressPercentage = (learnedConcepts.length / oopConcepts.length) * 100;

  return (
    <main className={`${styles.main} ${darkMode ? styles.darkMode : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className={styles.tokenDisplay}>
        <Image 
          src="/sav.svg" 
          alt="SAV token" 
          width={24}
          height={24}
          className={styles.tokenIcon}
        />
        <span className={styles.tokenAmount}>{savTokens} SAV</span>
      </div>

      {/* Hamburger menü butonu */}
      <button 
        className={styles.mobileMenuToggle} 
        onClick={toggleMenu}
        aria-label="Öğrenme İlerlemesi Menüsü"
      >
        <div className={styles.hamburgerIcon}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      {/* Arka plan overlay */}
      <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>

      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.homeLink}>
            <span className={styles.backArrow}>←</span> Ana Sayfa
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            <span className={styles.titleText}>OOP ve SOLID Prensipleri</span>
            <div className={styles.titleUnderline}></div>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className={styles.subtitle}
          >
            Nesne yönelimli programlama konseptlerini ve SOLID prensiplerini interaktif bir şekilde öğrenin
          </motion.p>
          
          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles.tagPurple}`}>SOLID</span>
            <span className={`${styles.tag} ${styles.tagBlue}`}>OOP</span>
            <span className={`${styles.tag} ${styles.tagGreen}`}>Programlama</span>
          </div>
        </header>

        <div className={styles.contentWithSidebar}>
          <AnimatePresence mode="wait">
            {activeCard ? (
              <motion.div 
                key="detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.detailContainer}
              >
                <button 
                  onClick={() => setActiveCard(null)}
                  className={styles.backButton}
                >
                  <span className={styles.backArrow}>←</span> Kavramlara Dön
                </button>
                <ConceptDetail 
                  concept={oopConcepts.find(c => c.id === activeCard)} 
                  darkMode={darkMode}
                  isLearned={learnedConcepts.includes(activeCard)}
                  onToggleLearned={() => toggleLearnedStatus(activeCard)}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.conceptGrid}
              >
                {sortedConcepts.map((concept, index) => (
                  <ConceptCard 
                    key={concept.id}
                    concept={concept}
                    darkMode={darkMode}
                    index={index}
                    isLearned={learnedConcepts.includes(concept.id)}
                    onCardClick={() => setActiveCard(concept.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <ProgressTracker 
            concepts={oopConcepts}
            learnedConcepts={learnedConcepts}
            progressPercentage={progressPercentage}
            darkMode={darkMode}
            onToggleLearned={toggleLearnedStatus}
            menuOpen={menuOpen}
          />
        </div>
      </div>

      <div className={styles.solidPrinciples}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${styles.solidSection} ${darkMode ? styles.darkSection : ''}`}
        >
          <h2 className={styles.solidTitle}>SOLID Prensipleri Nedir?</h2>
          <p className={styles.solidDescription}>
            SOLID, nesne yönelimli programlamada kodu daha anlaşılır, esnek ve bakımı kolay hale getirmek için kullanılan beş tasarım prensibidir. 
            Bu prensipler, yazılım geliştirme sürecinde karşılaşılan yaygın sorunlara çözümler sunarak kod kalitesini artırır.
          </p>
          
          <div className={styles.solidPrinciplesList}>
            <div className={styles.solidPrinciple}>
              <span className={styles.solidLetter}>S</span>
              <div className={styles.solidPrincipleText}>
                <h3>Single Responsibility (Tek Sorumluluk)</h3>
                <p>Bir sınıf sadece bir amaca hizmet etmeli ve değişmek için yalnızca bir nedeni olmalıdır.</p>
              </div>
            </div>
            
            <div className={styles.solidPrinciple}>
              <span className={styles.solidLetter}>O</span>
              <div className={styles.solidPrincipleText}>
                <h3>Open/Closed (Açık/Kapalı)</h3>
                <p>Sınıflar genişletmeye açık, değiştirmeye kapalı olmalıdır.</p>
              </div>
            </div>
            
            <div className={styles.solidPrinciple}>
              <span className={styles.solidLetter}>L</span>
              <div className={styles.solidPrincipleText}>
                <h3>Liskov Substitution (Liskov Yerine Geçme)</h3>
                <p>Alt sınıflar, üst sınıfların yerine davranışlarını değiştirmeden kullanılabilmelidir.</p>
              </div>
            </div>
            
            <div className={styles.solidPrinciple}>
              <span className={styles.solidLetter}>I</span>
              <div className={styles.solidPrincipleText}>
                <h3>Interface Segregation (Arayüz Ayrımı)</h3>
                <p>İstemciler kullanmadıkları arayüzlere bağımlı olmamalıdır.</p>
              </div>
            </div>
            
            <div className={styles.solidPrinciple}>
              <span className={styles.solidLetter}>D</span>
              <div className={styles.solidPrincipleText}>
                <h3>Dependency Inversion (Bağımlılığın Tersine Çevrilmesi)</h3>
                <p>Üst seviye modüller alt seviye modüllere bağlı olmamalı, her ikisi de soyutlamalara bağlı olmalıdır.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default OopPage; 