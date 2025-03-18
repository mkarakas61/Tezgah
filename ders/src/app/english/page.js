'use client';

import { useState, useEffect } from 'react';
import ModuleLayout from '../components/Layout';
import ProgressCard from '../components/ProgressCard';

export default function EnglishModule() {
  const [activeTab, setActiveTab] = useState('a1');
  
  const levels = {
    a1: {
      title: 'A1 - Başlangıç',
      lessons: [
        {
          title: 'Tanışma ve Selamlaşma',
          description: 'İnsanlarla tanışma ve temel selamlaşma kalıpları',
          icon: '👋',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'Sayılar 1-20',
          description: 'Temel sayıları öğrenme ve kullanma',
          icon: '🔢',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'Günler ve Aylar',
          description: 'Haftanın günleri ve ayların isimleri',
          icon: '📅',
          difficulty: 'Kolay', 
          tokenReward: 5
        },
        {
          title: 'Be Fiili Kullanımı',
          description: '"I am, You are, He/She is" yapıları',
          icon: '🧠',
          difficulty: 'Kolay',
          tokenReward: 10
        }
      ]
    },
    a2: {
      title: 'A2 - Temel',
      lessons: [
        {
          title: 'Günlük Rutinler',
          description: 'Günlük aktiviteleri ve rutinleri anlatma',
          icon: '🌞',
          difficulty: 'Orta',
          tokenReward: 10
        },
        {
          title: 'Geçmiş Zaman',
          description: 'Simple Past Tense - Geçmiş zaman kullanımı',
          icon: '⏮️',
          difficulty: 'Orta',
          tokenReward: 10
        },
        {
          title: 'Alışveriş Diyalogları',
          description: 'Markette ve mağazada kullanılan ifadeler',
          icon: '🛒',
          difficulty: 'Orta',
          tokenReward: 10
        }
      ]
    },
    b1: {
      title: 'B1 - Orta Seviye',
      lessons: [
        {
          title: 'Gelecek Zaman Yapıları',
          description: 'Will, going to ve Present Continuous ile gelecek zaman anlatımı',
          icon: '⏭️',
          difficulty: 'Orta',
          tokenReward: 15
        },
        {
          title: 'İş Başvurusu',
          description: 'CV hazırlama ve mülakat teknikleri',
          icon: '👔',
          difficulty: 'Zor',
          tokenReward: 15
        },
        {
          title: 'Pasif Yapılar',
          description: 'Passive Voice - Edilgen çatı kullanımı',
          icon: '🧩',
          difficulty: 'Zor',
          tokenReward: 20
        }
      ]
    },
    b2: {
      title: 'B2 - Üst Orta',
      lessons: [
        {
          title: 'Koşul Cümleleri',
          description: 'Conditionals - Type 1, 2, 3 şart cümleleri',
          icon: '🔍',
          difficulty: 'Zor',
          tokenReward: 25
        },
        {
          title: 'Akademik Yazma',
          description: 'Akademik metin yazma teknikleri',
          icon: '📝',
          difficulty: 'Zor',
          tokenReward: 25
        },
        {
          title: 'İdiyomlar ve Deyimler',
          description: 'Günlük konuşmada sık kullanılan deyimler',
          icon: '🗣️',
          difficulty: 'Zor',
          tokenReward: 30
        }
      ]
    },
    c1: {
      title: 'C1 - İleri Seviye',
      lessons: [
        {
          title: 'Edebi Analiz',
          description: 'Edebi metinleri derinlemesine inceleme ve analiz etme',
          icon: '📚',
          difficulty: 'Çok Zor',
          tokenReward: 35
        },
        {
          title: 'İş İngilizcesi',
          description: 'Profesyonel iş ortamında kullanılan terminoloji ve iletişim stratejileri',
          icon: '💼',
          difficulty: 'Çok Zor',
          tokenReward: 35
        },
        {
          title: 'İleri Düzey Gramer',
          description: 'Karmaşık gramer yapıları ve istisnaları',
          icon: '🧮',
          difficulty: 'Çok Zor',
          tokenReward: 40
        },
        {
          title: 'Akademik Tartışma',
          description: 'Karmaşık konularda akademik tartışma yürütme teknikleri',
          icon: '🎓',
          difficulty: 'Çok Zor',
          tokenReward: 40
        }
      ]
    },
    c2: {
      title: 'C2 - Ustalık',
      lessons: [
        {
          title: 'Edebi Çeviri',
          description: 'Karmaşık metinleri çevirme ve yorumlama teknikleri',
          icon: '🔄',
          difficulty: 'Uzman',
          tokenReward: 45
        },
        {
          title: 'Retorik ve İkna',
          description: 'İkna edici konuşma ve yazma teknikleri',
          icon: '🎭',
          difficulty: 'Uzman',
          tokenReward: 45
        },
        {
          title: 'Dilbilimsel Analiz',
          description: 'Dilbilimsel yaklaşımla metin analizi yapma',
          icon: '🔬',
          difficulty: 'Uzman',
          tokenReward: 50
        },
        {
          title: 'Akademik Yayın',
          description: 'Uluslararası akademik dergilerde yayın yapma teknikleri',
          icon: '📊',
          difficulty: 'Uzman',
          tokenReward: 50
        }
      ]
    }
  };
  
  const openLesson = (lesson) => {
    alert(`"${lesson.title}" dersini açtınız. Gerçek projede burası interaktif bir ders olacak.`);
  };
  
  return (
    <ModuleLayout title="İngilizce Öğrenimi">
      <div className="mb-8">
        <div className="tabs">
          {Object.keys(levels).map(level => (
            <div 
              key={level}
              className={`tab ${activeTab === level ? 'active' : ''}`}
              onClick={() => setActiveTab(level)}
            >
              {levels[level].title}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-6">{levels[activeTab].title} Dersleri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels[activeTab].lessons.map((lesson, index) => (
              <ProgressCard
                key={index}
                title={lesson.title}
                description={lesson.description}
                icon={lesson.icon}
                progress={0}
                difficulty={lesson.difficulty}
                tokenReward={lesson.tokenReward}
                onClick={() => openLesson(lesson)}
                completedKey="completed_english_lessons"
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="card p-4 bg-primary bg-opacity-10 mb-6">
        <h3 className="text-xl font-bold mb-2">İlerleme Durumu</h3>
        <p>Her seviyeyi tamamladığınızda daha fazla SAV token kazanırsınız ve dil seviyeniz resmi olarak belgelenecektir.</p>
      </div>
      
      <div className="card p-4">
        <h3 className="text-xl font-bold mb-4">Dil Yetkinliği</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.keys(levels).map((level) => {
            const completedItems = typeof window !== 'undefined' ? 
              JSON.parse(localStorage.getItem('completed_english_lessons') || '[]') : [];
            
            const totalLessons = levels[level].lessons.length;
            const completedLessons = levels[level].lessons.filter(
              lesson => completedItems.includes(lesson.title)
            ).length;
            
            const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            
            return (
              <div key={level} className="text-center">
                <div className="text-2xl font-bold mb-1">{level.toUpperCase()}</div>
                <div className="progress-chart mb-1">
                  <div 
                    className="progress-chart-fill" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-sm">{progress}% Tamamlandı</div>
              </div>
            );
          })}
        </div>
      </div>
    </ModuleLayout>
  );
} 