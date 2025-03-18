import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SolidRelation from '../SolidRelation';
import BadExamples from '../BadExamples';
import WhenToUse from '../WhenToUse';
import CodeExample from '../CodeExample';
import styles from './styles.module.css';

// ConceptDetail component
export default function ConceptDetail({ 
  concept, 
  darkMode, 
  isLearned, 
  onToggleLearned 
}) {
  if (!concept) return null;
  
  const { 
    title, 
    description, 
    image, 
    icon, 
    color, 
    id,
    difficultyLevel,
    points,
    needFulfilled,
    badUsageScenario
  } = concept;
  
  // Zorluk seviyesi göstergesi
  const getDifficultyStars = () => {
    const maxStars = 5;
    const filledStars = '★'.repeat(difficultyLevel);
    const emptyStars = '☆'.repeat(maxStars - difficultyLevel);
    return filledStars + emptyStars;
  };
  
  // Zorluk seviyesi etiketi
  const getDifficultyLabel = (level) => {
    switch(level) {
      case 1: return 'Çok Kolay';
      case 2: return 'Kolay';
      case 3: return 'Orta';
      case 4: return 'Zor';
      case 5: return 'Çok Zor';
      default: return 'Orta';
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkContainer : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleContainer}>
            <span className={styles.icon} style={{ backgroundColor: color }}>
              {icon}
            </span>
            <h2 className={styles.title}>{title}</h2>
          </div>
          
          <div className={styles.headerMeta}>
            <div className={styles.difficultyContainer}>
              <div className={styles.difficultyLabel}>
                Zorluk:
              </div>
              <div className={styles.difficultyStars} title={getDifficultyLabel(difficultyLevel)}>
                {getDifficultyStars()}
              </div>
            </div>
            
            <div className={styles.pointsContainer}>
              <span className={styles.pointsLabel}>Değeri:</span>
              <span className={styles.pointsValue}>
                <Image 
                  src="/sav.svg" 
                  alt="SAV token" 
                  width={18}
                  height={18}
                  className={styles.tokenIcon}
                />
                {points} SAV
              </span>
            </div>
          </div>
          
          <button 
            className={`${styles.learnedButton} ${isLearned ? styles.learned : ''}`}
            onClick={onToggleLearned}
          >
            {isLearned ? (
              <>
                <span className={styles.checkmark}>✓</span>
                Öğrenildi
              </>
            ) : (
              <>Öğrendim</>
            )}
          </button>
        </div>
        
        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={image}
            alt={title}
            width={600}
            height={300}
            className={styles.conceptImage}
          />
          {isLearned && (
            <div className={styles.learnedBadge}>
              <span className={styles.checkIcon}>✓</span>
              <span>Öğrenildi</span>
            </div>
          )}
        </motion.div>
      </div>
      
      <div className={styles.content}>
        <motion.div 
          className={styles.descriptionSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={styles.sectionTitle}>Tanım</h3>
          <p className={styles.description}>{description}</p>
          <p className={styles.extendedDescription}>
            {concept.id === 'objects' ? (
              <span>
                Nesne-yönelimli programlamanın (OOP) temel yapı taşı olan nesneler, veri ve bu veri üzerinde işlem yapabilen metodları bir arada tutan birimlerdir. Gerçek dünyadaki nesneleri yazılım ortamında temsil etmeye yarar.
              </span>
            ) : concept.id === 'classes' ? (
              <span>
                Sınıflar, nesnelerin şablonlarıdır ve hangi özelliklere (properties) ve davranışlara (methods) sahip olacaklarını tanımlar. Bir sınıftan birden çok nesne (instance) oluşturulabilir.
              </span>
            ) : concept.id === 'encapsulation' ? (
              <span>
                Kapsülleme, bir nesnenin içindeki verileri dış dünyadan gizlemek ve bu verilere erişimi kontrol etmek için kullanılır. Nesnelerin iç çalışma detaylarının dışarıya açılmadan, sadece gerekli arayüzlerin sunulmasını sağlar.
              </span>
            ) : concept.id === 'inheritance' ? (
              <span>
                Kalıtım, bir sınıfın (alt sınıf/child class) başka bir sınıfın (üst sınıf/parent class) özelliklerini ve metodlarını miras alabilmesidir. Bu sayede kod tekrarı önlenir ve hiyerarşik bir yapı oluşturulur.
              </span>
            ) : concept.id === 'polymorphism' ? (
              <span>
                Çok biçimlilik, farklı sınıfların aynı isimdeki metotlarının farklı davranışlar sergileyebilmesidir. Bu, kodun esnekliğini artırır ve genişletilebilirliği kolaylaştırır.
              </span>
            ) : (
              <span>
                Bu konu hakkında daha detaylı açıklama yakında eklenecektir. Şimdilik temel tanımı ve örnekleri inceleyebilirsiniz.
              </span>
            )}
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.useCasesSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>Ne Zaman Kullanılmalı?</h3>
          <WhenToUse conceptId={id} darkMode={darkMode} />
        </motion.div>
        
        <motion.div 
          className={styles.solidRelationSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className={styles.sectionTitle}>SOLID Prensipleri ile İlişkisi</h3>
          <SolidRelation conceptId={id} darkMode={darkMode} />
        </motion.div>
        
        <motion.div 
          className={styles.needFulfilledSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className={styles.sectionTitle}>Hangi İhtiyacı Karşılar?</h3>
          <div className={`${styles.card} ${darkMode ? styles.darkCard : ''}`}>
            <div className={styles.cardIcon}>🎯</div>
            <p className={styles.needText}>{needFulfilled || "Bu kavramın karşıladığı ihtiyaç bilgisi hazırlanıyor."}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.badExamplesSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h3 className={styles.sectionTitle}>Hatalı Kullanım ve Dikkat Edilmesi Gerekenler</h3>
          <div className={`${styles.card} ${darkMode ? styles.darkCard : ''}`}>
            <div className={styles.cardIcon}>⚠️</div>
            <p className={styles.badUsageText}>{badUsageScenario || "Bu kavramın hatalı kullanım senaryosu bilgisi hazırlanıyor."}</p>
          </div>
          <div className={styles.badExamplesContent}>
            <BadExamples conceptId={id} darkMode={darkMode} />
          </div>
        </motion.div>
        
        <div className={styles.examplesSection}>
          <h3 className={styles.sectionTitle}>Kod Örnekleri</h3>
          
          <div className={styles.codeExamples}>
            <div className={styles.languageSection}>
              <h4 className={styles.languageTitle}>
                <JavaScriptIcon /> JavaScript
              </h4>
              <div className={styles.difficultyExamples}>
                <div className={styles.exampleCard}>
                  <div className={styles.exampleHeader}>
                    <span className={styles.difficultyTag}>Basit</span>
                  </div>
                  <CodeExample 
                    conceptId={id} 
                    language="js" 
                    difficulty="easy" 
                    darkMode={darkMode}
                  />
                </div>
                <div className={styles.exampleCard}>
                  <div className={styles.exampleHeader}>
                    <span className={styles.difficultyTag}>Gelişmiş</span>
                  </div>
                  <CodeExample 
                    conceptId={id} 
                    language="js" 
                    difficulty="hard" 
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.languageSection}>
              <h4 className={styles.languageTitle}>
                <TypeScriptIcon /> TypeScript
              </h4>
              <div className={styles.difficultyExamples}>
                <div className={styles.exampleCard}>
                  <div className={styles.exampleHeader}>
                    <span className={styles.difficultyTag}>Basit</span>
                  </div>
                  <CodeExample 
                    conceptId={id} 
                    language="ts" 
                    difficulty="easy" 
                    darkMode={darkMode}
                  />
                </div>
                <div className={styles.exampleCard}>
                  <div className={styles.exampleHeader}>
                    <span className={styles.difficultyTag}>Gelişmiş</span>
                  </div>
                  <CodeExample 
                    conceptId={id} 
                    language="ts" 
                    difficulty="hard" 
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.languageSection}>
              <h4 className={styles.languageTitle}>
                <RustIcon /> Rust
              </h4>
              <div className={styles.difficultyExamples}>
                <div className={styles.exampleCard}>
                  <div className={styles.exampleHeader}>
                    <span className={styles.difficultyTag}>Basit</span>
                  </div>
                  <CodeExample 
                    conceptId={id} 
                    language="rust" 
                    difficulty="easy" 
                    darkMode={darkMode}
                  />
                </div>
                <div className={styles.exampleCard}>
                  <div className={styles.exampleHeader}>
                    <span className={styles.difficultyTag}>Gelişmiş</span>
                  </div>
                  <CodeExample 
                    conceptId={id} 
                    language="rust" 
                    difficulty="hard" 
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prop Types tanımlaması
ConceptDetail.propTypes = {
  concept: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    difficultyLevel: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    needFulfilled: PropTypes.string,
    badUsageScenario: PropTypes.string
  }),
  darkMode: PropTypes.bool,
  isLearned: PropTypes.bool,
  onToggleLearned: PropTypes.func
};

ConceptDetail.defaultProps = {
  darkMode: false,
  isLearned: false,
  onToggleLearned: () => {}
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