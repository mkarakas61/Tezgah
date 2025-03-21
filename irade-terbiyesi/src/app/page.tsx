"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("nefis");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>İslami Gelişim Rehberi</h1>
      </header>

      <nav className={styles.navigation}>
        <button 
          className={`${styles.navButton} ${activeTab === "nefis" ? styles.activeButton : ""}`}
          onClick={() => setActiveTab("nefis")}
        >
          Nefis Terbiyesi
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === "zaman" ? styles.activeButton : ""}`}
          onClick={() => setActiveTab("zaman")}
        >
          Zaman Bilinci
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === "manevi" ? styles.activeButton : ""}`}
          onClick={() => setActiveTab("manevi")}
        >
          Manevi Program
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === "nefis" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Nefis Terbiyesi ve İrade Kontrolü</h2>
            <p className={styles.intro}>
              Nefis terbiyesi, İslam&apos;da kişinin kendi nefsini dizginlemesi, 
              kontrol etmesi ve onu olgunlaştırmasıdır. Bu yolda ilerlemek için 
              üç temel uygulama alanı ve bazı sünnetler vardır.
            </p>

            <div className={styles.practiceArea}>
              <h3 className={styles.practiceTitle}>1. Kuran Okuma</h3>
              <div className={styles.practiceContent}>
                <p>
                  Kuran-ı Kerim okumak, Müslümanlar için en temel ibadetlerden biridir. 
                  Düzenli olarak Kuran okumak ve anlamını düşünmek:
                </p>
                <ul className={styles.bulletList}>
                  <li>Kalbi rahatlatır ve huzur verir</li>
                  <li>Doğru ile yanlışı ayırt etme yeteneğini geliştirir</li>
                  <li>Allah&apos;ın mesajını anlamaya yardımcı olur</li>
                  <li>Karakteri olgunlaştırır</li>
                </ul>
                <p>
                  <strong>Öneri:</strong> Her gün en az 10 dakika Kuran okumaya ve anlamını düşünmeye 
                  zaman ayırın. Mümkünse sabah namazından sonra veya yatmadan önce okuyun.
                </p>
              </div>
            </div>

            <div className={styles.practiceArea}>
              <h3 className={styles.practiceTitle}>2. Zikir Yapmak</h3>
              <div className={styles.practiceContent}>
                <p>
                  Zikir, Allah&apos;ı anmak ve O&apos;nu hatırlamaktır. Düzenli zikir:
                </p>
                <ul className={styles.bulletList}>
                  <li>Kalbi arındırır</li>
                  <li>Nefsi terbiye eder</li>
                  <li>İç huzur sağlar</li>
                  <li>Allah ile bağı güçlendirir</li>
                </ul>
                <p>
                  <strong>Öneri:</strong> Günde en az 100 defa &quot;Sübhanallah, Elhamdülillah, 
                  Allahu Ekber&quot; zikrini çekin. Namazlardan sonra tesbih çekmeyi alışkanlık haline getirin.
                </p>
              </div>
            </div>

            <div className={styles.practiceArea}>
              <h3 className={styles.practiceTitle}>3. İnfak Etmek</h3>
              <div className={styles.practiceContent}>
                <p>
                  İnfak, Allah rızası için sahip olunan şeylerden vermektir. İnfak etmek:
                </p>
                <ul className={styles.bulletList}>
                  <li>Cimrilik hastalığından korur</li>
                  <li>Malı bereketlendirir</li>
                  <li>Toplumsal dayanışmayı güçlendirir</li>
                  <li>Allah&apos;ın rızasını kazandırır</li>
                </ul>
                <p>
                  <strong>Öneri:</strong> Her ay düzenli olarak gelirinizin bir kısmını ihtiyaç sahiplerine ayırın.
                  Sadece maddi değil, zaman ve bilginizle de infak edin.
                </p>
              </div>
            </div>

            <div className={styles.sunnetSection}>
              <h3 className={styles.sunnetTitle}>Günlük Sünnetler</h3>
              <p>Sünnetler, Peygamber Efendimiz&apos;in (s.a.v.) hayatında uyguladığı ve bizlere tavsiye ettiği davranışlardır.</p>
              
              <div className={styles.sunnetList}>
                <div className={styles.sunnetItem}>
                  <h4>🌙 Erken Yatmak</h4>
                  <p>Peygamberimiz yatsı namazından sonra gereksiz yere oturmamayı ve erken yatmayı tavsiye etmiştir. Bu, sabah namazına kalkmayı kolaylaştırır ve vücudun dinlenmesini sağlar.</p>
                </div>
                
                <div className={styles.sunnetItem}>
                  <h4>🌅 Sabah Namazıyla Güne Başlamak</h4>
                  <p>Günü sabah namazıyla başlatmak, tüm günün bereketli ve düzenli geçmesine vesile olur. Sabah namazından sonra Kuran okumak ve zikir yapmak da günün başlangıcını güzelleştirir.</p>
                </div>
                
                <div className={styles.sunnetItem}>
                  <h4>🤫 Az Konuşmak</h4>
                  <p>&quot;Kim Allah&apos;a ve ahiret gününe inanıyorsa, ya hayır söylesin ya da sussun.&quot; (Buhari). Gereksiz, boş ve faydasız konuşmalardan uzak durmak gerekmektedir.</p>
                </div>
                
                <div className={styles.sunnetItem}>
                  <h4>😴 Az Uyumak</h4>
                  <p>İhtiyaçtan fazla uyumak, zamanı israf etmek demektir. Peygamberimiz gecenin bir kısmında uyanık kalıp ibadet etmeyi teşvik etmiştir.</p>
                </div>
                
                <div className={styles.sunnetItem}>
                  <h4>🍽️ Az Yemek</h4>
                  <p>&quot;Ademoğlu midesinden daha şerli bir kap doldurmamıştır. Oysaki kişiye belini doğrultacak birkaç lokma yeterlidir.&quot; (Tirmizi). Az yemek sağlık için de faydalıdır.</p>
                </div>
                
                <div className={styles.sunnetItem}>
                  <h4>🏃‍♂️ Spor Yapmak</h4>
                  <p>Peygamberimiz yürümeyi, yüzmeyi, ok atmayı ve güreşmeyi teşvik etmiştir. Sağlıklı bir beden, ibadetleri daha iyi yapmaya yardımcı olur.</p>
                </div>
                
                <div className={styles.sunnetItem}>
                  <h4>⏳ Sabretmek</h4>
                  <p>&quot;Şüphesiz Allah sabredenlerle beraberdir.&quot; (Bakara, 153). Zorluklara karşı sabır göstermek mümin kişinin özelliklerindendir.</p>
                </div>
                
                <div className={styles.sunnetItem}>
                  <h4>🕊️ Ölümü Hatırlamak</h4>
                  <p>&quot;Lezzetleri kesip atan ölümü çok hatırlayın.&quot; (Tirmizi). Ölümü düşünmek, insanı daha bilinçli yaşamaya sevk eder.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "zaman" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Müslüman Gencin Zaman Bilinci</h2>
            <p className={styles.intro}>
              &quot;Asra yemin olsun ki, insan gerçekten ziyan içindedir.&quot; (Asr Suresi)
              Zaman, Allah&apos;ın insana verdiği en değerli sermayedir. Vaktin kıymetini
              bilmek ve onu en verimli şekilde değerlendirmek her Müslümanın görevidir.
            </p>

            <div className={styles.infoBlock}>
              <h3>Zamanın Önemi</h3>
              <p>
                Zaman geri dönmeyen, telafisi olmayan bir nimettir. Hz. Ömer (r.a.) 
                &quot;Bugünün işini yarına bırakmayın, yoksa işler birikir ve altından 
                kalkamazsınız&quot; buyurmuştur. İslam&apos;da her anı değerlendirmek esastır.
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Zamanı Planlama</h3>
              <p>
                Günlük, haftalık ve aylık planlar yapmak, zamanı verimli kullanmanın 
                en temel yoludur. Namazlar günün doğal bölünmesini sağlar ve diğer 
                faaliyetleri planlamada yardımcı olur.
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Zamanı İsraf Etmemek</h3>
              <p>
                Boş ve faydasız işlerle zamanı harcamak israftır. Sosyal medya, gereksiz
                sohbetler ve aşırı uyku gibi alışkanlıkları kontrol altına almak gerekir.
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Bereket İçin Tavsiyeler</h3>
              <ul className={styles.bulletList}>
                <li>Erken kalkmak, sabah namazını cemaatle kılmak</li>
                <li>Günlük görevleri öncelik sırasına koymak</li>
                <li>Nafile ibadetler için özel zaman ayırmak</li>
                <li>İlim öğrenmek için düzenli okuma saatleri belirlemek</li>
                <li>Her gün Kur&apos;an-ı Kerim okumaya zaman ayırmak</li>
                <li>Yatmadan önce günü muhasebe etmek</li>
              </ul>
            </div>
          </section>
        )}

        {activeTab === "manevi" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Müslüman Gencin Manevi Programı</h2>
            <p className={styles.intro}>
              Manevi gelişim, kişinin Allah ile olan bağını güçlendirerek iç dünyasını
              zenginleştirmesi ve kalp huzuruna kavuşmasıdır. İşte bir Müslüman gencin
              manevi gelişimi için önemli noktalar:
            </p>

            <div className={styles.infoBlock}>
              <h3>Günlük Manevi Alışkanlıklar</h3>
              <ul className={styles.bulletList}>
                <li><strong>Sabah Rutini:</strong> Sabah namazı, Kuran tilaveti, sabah zikirleri</li>
                <li><strong>Öğle Molası:</strong> Öğle namazı ve kısa tefekkür</li>
                <li><strong>İkindi Vakti:</strong> İkindi namazı ve istiğfar</li>
                <li><strong>Akşam Programı:</strong> Akşam namazı, günlük muhasebe</li>
                <li><strong>Yatsı Sonrası:</strong> Teheccüd namazı için erken yatmak</li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <h3>Haftalık Manevi Program</h3>
              <ul className={styles.bulletList}>
                <li><strong>Pazartesi-Perşembe:</strong> Nafile oruç tutmak</li>
                <li><strong>Cuma:</strong> Cuma namazına erken gitmek, Kehf Suresi&apos;ni okumak</li>
                <li><strong>Hafta Sonu:</strong> İlim meclislerine katılmak</li>
                <li><strong>Haftada bir gün:</strong> Muhasebe günü belirlemek</li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <h3>Kalbî Hastalıklar ve Tedavileri</h3>
              <div className={styles.twoColumnList}>
                <div>
                  <p><strong>Kibir:</strong> Tevazu ile tedavi</p>
                  <p><strong>Haset:</strong> Başkalarına dua etmek</p>
                  <p><strong>Cimrilik:</strong> İnfak etmek</p>
                </div>
                <div>
                  <p><strong>Öfke:</strong> Sabır ve affetmek</p>
                  <p><strong>Gaflet:</strong> Zikir ve tefekkür</p>
                  <p><strong>Dünya Sevgisi:</strong> Zühd ve kanaat</p>
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h3>Manevi Gelişim İçin Önerilen Kaynaklar</h3>
              <p>
                İmam Gazali&apos;nin &quot;İhya-u Ulumu&apos;d-Din&quot;, İbn Kayyım el-Cevziyye&apos;nin &quot;Medaricu&apos;s-Salikin&quot;
                ve Said Nursi&apos;nin &quot;Risale-i Nur Külliyatı&quot; gibi eserler manevi gelişim için okunabilir.
              </p>
        </div>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} İslami Gelişim Rehberi | Her Hakkı Saklıdır</p>
      </footer>
    </div>
  );
}
