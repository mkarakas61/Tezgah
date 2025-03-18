import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function SolidRelation({ conceptId, darkMode }) {
  const contents = {
    'objects': (
      <div>
        <p>
          Nesneler, SOLID prensiplerinden özellikle <span className={styles.strong}>Tek Sorumluluk (Single Responsibility)</span> ve <span className={styles.strong}>Açık/Kapalı (Open/Closed)</span> 
          prensipleriyle yakından ilişkilidir. İyi tasarlanmış nesneler, tek bir sorumluluğa sahip olmalı ve 
          değişiklik yapmadan genişletilebilir olmalıdır.
        </p>
        <p>
          <span className={styles.strong}>SOLID Prensipleri ile Uyum:</span> Nesnelerin sorumluluklarını düzgün belirlemediğinizde, kodunuz sürdürülemez hale gelecek ve "God Object" (Her şeyi bilen ve yapan dev nesneler) problemi ortaya çıkacaktır.
        </p>
        
        <div className={styles.solidList}>
          <div className={styles.solidItem}>
            <span className={styles.solidLetter}>S</span>
            <div className={styles.solidItemContent}>
              <span className={styles.solidItemTitle}>Tek Sorumluluk Prensibi:</span> Bir nesne sadece bir amaca hizmet etmeli ve değişmek için yalnızca bir nedeni olmalıdır.
            </div>
          </div>
          
          <div className={styles.solidItem}>
            <span className={styles.solidLetter}>O</span>
            <div className={styles.solidItemContent}>
              <span className={styles.solidItemTitle}>Açık/Kapalı Prensibi:</span> Nesneler genişletmeye açık, değiştirmeye kapalı olmalıdır.
            </div>
          </div>
        </div>
      </div>
    ),
    'classes': (
      <div>
        <p>
          Sınıflar, SOLID prensiplerinin tamamının uygulanması için temel yapı taşlarıdır. 
          Özellikle <span className={styles.strong}>Liskov Yerine Geçme (Liskov Substitution)</span> ve <span className={styles.strong}>Bağımlılığın Tersine Çevrilmesi (Dependency Inversion)</span> 
          prensipleri, sınıf hiyerarşileri ve sınıflar arası ilişkileri doğrudan etkiler.
        </p>
        <p>
          <span className={styles.strong}>SOLID İlişkisi:</span> Sınıflar soyutlama düzeyine göre düzgün tasarlanmazsa, Liskov prensibi ihlal edilir ve alt sınıflar üst sınıfların yerine güvenli bir şekilde kullanılamaz. Bu da kodunuzun esnekliğini ve genişletilebilirliğini ciddi şekilde kısıtlar.
        </p>
      </div>
    ),
    'attributes': (
      <div>
        <p>
          Öznitelikler, <span className={styles.strong}>Tek Sorumluluk (Single Responsibility)</span> ve <span className={styles.strong}>Arayüz Ayrımı (Interface Segregation)</span> prensipleriyle ilişkilidir. 
          Bir sınıfta yalnızca ilgili öznitelikler bulunmalı ve gereksiz veri alanlarından kaçınılmalıdır.
        </p>
        <p>
          <span className={styles.strong}>Hatalı Kullanım:</span> Bir sınıfa çok fazla ve alakasız öznitelik eklemek, o sınıfın çok fazla sorumluluk üstlenmesine neden olur ve bu da Tek Sorumluluk prensibini ihlal eder.
        </p>
      </div>
    ),
    'behaviors': (
      <div>
        <p>
          Davranışlar, <span className={styles.strong}>Açık/Kapalı (Open/Closed)</span> ve <span className={styles.strong}>Arayüz Ayrımı (Interface Segregation)</span> prensipleriyle yakından ilişkilidir. 
          Davranışlar, kodda değişiklik yapmadan genişletilebilir olmalı ve istemcilerin kullanmadığı davranışlara 
          bağımlı olmaları engellenmelidir.
        </p>
        <p>
          <span className={styles.strong}>Doğru Uygulama:</span> İyi tasarlanmış davranışlar, davranışı değiştirmek için mevcut kodu düzenlemek yerine, yeni davranışlar ekleyerek genişletmeye izin verir (Açık/Kapalı Prensibi).
        </p>
      </div>
    ),
    'methods': (
      <div>
        <p>
          Metotlar, <span className={styles.strong}>Tek Sorumluluk (Single Responsibility)</span> prensibiyle doğrudan ilişkilidir. 
          Her metot yalnızca bir işi yapmalı ve bu işi iyi yapmalıdır. Ayrıca metotlar, <span className={styles.strong}>Açık/Kapalı</span> prensibiyle 
          uyumlu şekilde tasarlanarak, davranışları değiştirmeden genişletmeye izin vermelidir.
        </p>
        <p>
          <span className={styles.strong}>İyi Uygulama Örneği:</span> Metotlar, diğer metotlara devredebileceği alt görevleri tanımlayarak ve sınıf içi sorumlulukları bölüştürerek daha yönetilebilir kod yapısı sağlar.
        </p>
      </div>
    ),
    'constructor': (
      <div>
        <p>
          Kurucu metotlar, <span className={styles.strong}>Bağımlılığın Tersine Çevrilmesi (Dependency Inversion)</span> prensibiyle yakından ilişkilidir. 
          Bağımlılıkların kurucu metot aracılığıyla enjekte edilmesi, sınıfların somut uygulamalar yerine 
          soyutlamalara bağlı olmasını sağlar.
        </p>
        <p>
          <span className={styles.strong}>Bağımlılık Enjeksiyonu:</span> Kurucu metotlar aracılığıyla bağımlılıkların enjekte edilmesi, sınıfların düşük bağlaşım (loose coupling) ilkesine uymasını sağlar ve test edilebilirliği artırır.
        </p>
      </div>
    ),
    'abstraction': (
      <div>
        <p>
          Soyutlama, SOLID prensiplerinin temelinde yer alır. Özellikle <span className={styles.strong}>Bağımlılığın Tersine Çevrilmesi (Dependency Inversion)</span> 
          prensibi, soyutlamaların kullanımına dayanır: <em>"Soyutlamalar detaylara bağlı olmamalı, detaylar soyutlamalara bağlı olmalıdır."</em>
        </p>
        <p>
          <span className={styles.strong}>Mimari Önemi:</span> Soyutlama, bir sistemin farklı bileşenleri arasındaki bağımlılıkları yönetmenin ve karmaşıklığı azaltmanın anahtarıdır. İyi soyutlamalar olmadan, kodunuz değişikliğe dirençli ve bakımı zor hale gelir.
        </p>
      </div>
    ),
    'encapsulation': (
      <div>
        <p>
          Kapsülleme, <span className={styles.strong}>Tek Sorumluluk (Single Responsibility)</span> prensibiyle yakından ilgilidir. Veriler ve bu verileri işleyen 
          metodları bir arada tutarak, değişiklik için tek bir neden sağlar ve bilgi gizlemeyi mümkün kılar.
        </p>
        <p>
          <span className={styles.strong}>Hatalı Kullanım Senaryosu:</span> Kapsülleme yapılmadığında, nesnenin iç durumu dışarıdan kolayca değiştirilebilir; bu da veri bütünlüğünü bozar ve hatalara yol açar. Örneğin, bir BankAccount sınıfında balance özelliği public olursa, herhangi bir doğrulama olmadan değiştirilebilir.
        </p>
      </div>
    ),
    'inheritance': (
      <div>
        <p>
          Kalıtım, <span className={styles.strong}>Liskov Yerine Geçme (Liskov Substitution)</span> prensibiyle doğrudan ilişkilidir. Alt sınıflar, 
          üst sınıfların yerine geçebilmeli ve beklenmedik davranışlara neden olmamalıdır.
        </p>
        <p>
          <span className={styles.strong}>Hatalı Kullanım Senaryosu:</span> Kalıtım bazen "kompozisyon yerine kalıtım" şeklinde yanlış kullanılır. Bir Square sınıfını Rectangle sınıfından türetmek Liskov İlkesini ihlal eder, çünkü kare her zaman özel bir dikdörtgendir ama davranışı farklıdır (genişliği değiştirdiğinizde yüksekliği de değişmelidir).
        </p>
      </div>
    ),
    'polymorphism': (
      <div>
        <p>
          Çok biçimlilik, <span className={styles.strong}>Açık/Kapalı (Open/Closed)</span> prensibiyle yakından ilişkilidir. Çok biçimlilik sayesinde, 
          mevcut kodu değiştirmeden yeni davranışlar ekleyebiliriz. Ayrıca <span className={styles.strong}>Bağımlılığın Tersine Çevrilmesi</span> prensibiyle de 
          ilişkilidir, çünkü soyut tiplere dayalı programlama çok biçimlilik gerektirir.
        </p>
        <p>
          <span className={styles.strong}>Uygulama İhtiyacı:</span> Çok biçimlilik, bir sistemin gelecekte nasıl değişeceğini önceden bilmediğiniz durumlarda esneklik sağlar. Örneğin, ödeme sisteminde yeni ödeme yöntemleri eklemek istediğinizde, mevcut ödeme işleme kodunu değiştirmeden yeni yöntemler eklenebilir.
        </p>
      </div>
    ),
    'instance': (
      <div>
        <p>
          Nesneler, SOLID prensiplerinin uygulanmasının sonuçlarını gösterir. İyi tasarlanmış sınıf hiyerarşilerinden 
          oluşturulan nesneler, <span className={styles.strong}>Liskov Yerine Geçme</span> prensibine uygun olarak birbirlerinin yerine kullanılabilir ve 
          sistemde esneklik sağlar.
        </p>
        <p>
          <span className={styles.strong}>İhtiyaç Senaryosu:</span> Bir şirketin muhasebe sisteminde farklı türde çalışanlar (tam zamanlı, yarı zamanlı, sözleşmeli) için maaş hesaplama yaparken, Employee sınıfından türetilen farklı alt sınıflar, maaş hesaplama arayüzünü uygulayarak tüm çalışanlar için tutarlı bir işlem yapılmasını sağlar.
        </p>
      </div>
    ),
    'object-lifetime': (
      <div>
        <p>
          Nesne ömrü, <span className={styles.strong}>Tek Sorumluluk (Single Responsibility)</span> ve <span className={styles.strong}>Bağımlılığın Tersine Çevrilmesi (Dependency Inversion)</span> 
          prensipleriyle ilişkilidir. Nesnelerin oluşturulması ve yok edilmesi, genellikle bu sorumluluğu üstlenen 
          fabrika veya bağımlılık enjeksiyonu konteynerleri gibi özel bileşenlere devredilir.
        </p>
        <p>
          <span className={styles.strong}>Yaşam Döngüsü Yönetimi:</span> Özellikle büyük uygulamalarda, nesnelerin oluşturulması ve yok edilmesi karmaşık olabilir. Bu sorumluluğu özelleşmiş fabrikalara veya IoC (Inversion of Control) konteynerlere devretmek, kodunuzun SOLID prensiplerine daha iyi uymasını sağlar.
        </p>
      </div>
    )
  };
  
  return (
    <div className={`${styles.container} ${darkMode ? styles.darkContainer : ''}`}>
      {contents[conceptId] || <p>Bu kavramın SOLID prensipleriyle ilişkisi içeriği hazırlanıyor.</p>}
    </div>
  );
}

SolidRelation.propTypes = {
  conceptId: PropTypes.string.isRequired,
  darkMode: PropTypes.bool
};

SolidRelation.defaultProps = {
  darkMode: false
}; 