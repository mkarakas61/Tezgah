'use client';

import { useState, useEffect } from 'react';
import ModuleLayout from '../components/Layout';
import ProgressCard from '../components/ProgressCard';

export default function ArabicModule() {
  const [activeTab, setActiveTab] = useState('a1');
  
  const levels = {
    a1: {
      title: 'A1 - Başlangıç',
      lessons: [
        {
          title: 'Arap Alfabesi',
          description: 'Arap harflerini tanıma ve yazma',
          icon: 'ا',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'Temel Selamlaşma',
          description: 'Selam verme ve tanışma kalıpları',
          icon: '👋',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'Sayılar 1-10',
          description: 'Arapça temel sayılar',
          icon: '🔢',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'İsim Cümleleri',
          description: 'Arapçada basit isim cümleleri',
          icon: '📝',
          difficulty: 'Kolay',
          tokenReward: 10
        }
      ]
    },
    a2: {
      title: 'A2 - Temel',
      lessons: [
        {
          title: 'Fiil Çekimleri',
          description: 'Temel fiil kalıpları ve çekimleri',
          icon: '🔄',
          difficulty: 'Orta',
          tokenReward: 10
        },
        {
          title: 'Günlük Konuşmalar',
          description: 'Günlük hayatta kullanılan diyaloglar',
          icon: '💬',
          difficulty: 'Orta',
          tokenReward: 10
        },
        {
          title: 'Aile Üyeleri',
          description: 'Aile üyelerinin isimleri ve tanıtımı',
          icon: '👨‍👩‍👧‍👦',
          difficulty: 'Orta',
          tokenReward: 10
        }
      ]
    },
    b1: {
      title: 'B1 - Orta Seviye',
      lessons: [
        {
          title: 'Geçmiş Zaman',
          description: 'Arapçada geçmiş zaman kullanımı',
          icon: '⏮️',
          difficulty: 'Orta',
          tokenReward: 15
        },
        {
          title: 'Sıfatlar ve Zarflar',
          description: 'Arapçada sıfat ve zarf kullanımı',
          icon: '🔍',
          difficulty: 'Zor',
          tokenReward: 15
        },
        {
          title: 'Harf-i Cerler',
          description: 'Arapçada harf-i cer kullanımı',
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
          title: 'Edebiyat Metinleri',
          description: 'Klasik Arap edebiyatından metinler',
          icon: '📚',
          difficulty: 'Zor',
          tokenReward: 25
        },
        {
          title: 'İşletme Arapçası',
          description: 'İş dünyasında kullanılan Arapça terimler',
          icon: '💼',
          difficulty: 'Zor',
          tokenReward: 25
        },
        {
          title: 'Arapça Kalıp İfadeler',
          description: 'Deyimler ve kalıplaşmış ifadeler',
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
          title: 'Klasik Arap Şiiri',
          description: 'Klasik Arap şiiri ve edebi sanatlar',
          icon: '📜',
          difficulty: 'Çok Zor',
          tokenReward: 35
        },
        {
          title: 'Resmi Yazışmalar',
          description: 'Resmi mektup ve belge yazma teknikleri',
          icon: '✉️',
          difficulty: 'Çok Zor',
          tokenReward: 35
        },
        {
          title: 'Lehçeler ve Varyasyonlar',
          description: 'Farklı Arap lehçeleri ve bölgesel farklılıklar',
          icon: '🌐',
          difficulty: 'Çok Zor',
          tokenReward: 40
        }
      ]
    },
    c2: {
      title: 'C2 - Ustalık',
      lessons: [
        {
          title: 'Edebi Analiz ve Eleştiri',
          description: 'Arapça metinlerde derinlemesine edebi analiz',
          icon: '🔎',
          difficulty: 'Uzman',
          tokenReward: 45
        },
        {
          title: 'Akademik Arapça',
          description: 'Akademik metinleri anlama ve üretme',
          icon: '🎓',
          difficulty: 'Uzman',
          tokenReward: 45
        },
        {
          title: 'Çeviri Teknikleri',
          description: 'Profesyonel düzeyde çeviri yapma becerileri',
          icon: '🔄',
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
    <ModuleLayout title="Arapça Öğrenimi">
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
                completedKey="completed_arabic_lessons"
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="card p-4 bg-primary bg-opacity-10 mb-6">
        <h3 className="text-xl font-bold mb-2">İlerleme Durumu</h3>
        <p>Arapça öğrenmenin en önemli adımlarından biri düzenli pratik yapmaktır. Her gün en az 15 dakika çalışmanızı tavsiye ederiz.</p>
      </div>
      
      <div className="card p-4">
        <h3 className="text-xl font-bold mb-4">Arapça Yetkinliği</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.keys(levels).map((level) => {
            const completedItems = typeof window !== 'undefined' ? 
              JSON.parse(localStorage.getItem('completed_arabic_lessons') || '[]') : [];
            
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