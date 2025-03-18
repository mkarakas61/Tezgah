'use client';

import { useState, useEffect } from 'react';
import ModuleLayout from '../components/Layout';
import ProgressCard from '../components/ProgressCard';

export default function RustModule() {
  const [activeTab, setActiveTab] = useState('beginner');
  const [completionStats, setCompletionStats] = useState({ total: 0, completed: 0 });
  
  useEffect(() => {
    // Calculate stats on client side only
    if (typeof window !== 'undefined') {
      let total = 0;
      let completed = 0;
      
      Object.values(levels).forEach(level => {
        level.lessons.forEach(lesson => {
          total++;
          const completedItems = JSON.parse(localStorage.getItem('completed_rust_lessons') || '[]');
          if (completedItems.includes(lesson.title)) {
            completed++;
          }
        });
      });
      
      setCompletionStats({ total, completed });
    }
  }, []);
  
  const levels = {
    beginner: {
      title: 'Başlangıç Seviyesi',
      description: 'Rust temellerini öğrenin',
      lessons: [
        {
          title: 'Rust\'a Giriş',
          description: 'Rust programlama dilinin temelleri ve felsefesi',
          icon: '📘',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'Kurulum ve İlk Program',
          description: 'Rust kurulumu ve ilk "Merhaba Dünya" programı',
          icon: '🚀',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'Değişkenler ve Veri Tipleri',
          description: 'Değişkenler, temel veri tipleri ve tür dönüşümleri',
          icon: '🔢',
          difficulty: 'Kolay',
          tokenReward: 5
        },
        {
          title: 'Akış Kontrolü',
          description: 'if, else, döngüler ve match ifadeleri',
          icon: '🔄',
          difficulty: 'Kolay',
          tokenReward: 5
        }
      ]
    },
    intermediate: {
      title: 'Orta Seviye',
      description: 'Sahiplik sistemi ve temel kavramlar',
      lessons: [
        {
          title: 'Sahiplik (Ownership)',
          description: 'Rust\'un sahiplik sistemi ve bellek yönetimi',
          icon: '🔐',
          difficulty: 'Orta',
          tokenReward: 10
        },
        {
          title: 'Ödünç Alma (Borrowing)',
          description: 'Referanslar ve ödünç alma konsepti',
          icon: '🤲',
          difficulty: 'Orta',
          tokenReward: 10
        },
        {
          title: 'Struct ve Enum',
          description: 'Özel veri tipleri oluşturma',
          icon: '🏗️',
          difficulty: 'Orta',
          tokenReward: 10
        },
        {
          title: 'Modüller ve Paketler',
          description: 'Kodun organizasyonu ve namespacing',
          icon: '📦',
          difficulty: 'Orta',
          tokenReward: 15
        }
      ]
    },
    advanced: {
      title: 'İleri Seviye',
      description: 'Rust\'un güçlü özellikleri',
      lessons: [
        {
          title: 'Trait\'ler',
          description: 'Trait\'ler ve çokbiçimlilik (polymorphism)',
          icon: '🧬',
          difficulty: 'Zor',
          tokenReward: 15
        },
        {
          title: 'Hata Yönetimi',
          description: 'Result, Option ve hata propagasyonu',
          icon: '⚠️',
          difficulty: 'Zor',
          tokenReward: 15
        },
        {
          title: 'Lifetime',
          description: 'Lifetime belirteçleri ve borrow checker',
          icon: '⏳',
          difficulty: 'Zor',
          tokenReward: 20
        },
        {
          title: 'Generic Tipler',
          description: 'Generic veri tipleri ve fonksiyonlar',
          icon: '🧪',
          difficulty: 'Zor',
          tokenReward: 20
        }
      ]
    },
    expert: {
      title: 'Uzman Seviyesi',
      description: 'Üst düzey Rust teknikleri',
      lessons: [
        {
          title: 'Concurrency',
          description: 'Thread\'ler ve eşzamanlı programlama',
          icon: '🧵',
          difficulty: 'Zor',
          tokenReward: 25
        },
        {
          title: 'Unsafe Rust',
          description: 'Unsafe kod blokları ve FFI',
          icon: '☢️',
          difficulty: 'Zor',
          tokenReward: 25
        },
        {
          title: 'Makrolar',
          description: 'Makro sistemi ve DSL oluşturma',
          icon: '🔧',
          difficulty: 'Zor',
          tokenReward: 30
        },
        {
          title: 'Asenkron Programlama',
          description: 'Async/await ile asenkron kod yazma',
          icon: '⚡',
          difficulty: 'Zor',
          tokenReward: 30
        }
      ]
    }
  };
  
  // Chart data for progress visualization
  const chartData = Object.keys(levels).map(levelKey => {
    const level = levels[levelKey];
    if (typeof window === 'undefined') return { name: level.title, progress: 0 };
    
    const completedItems = JSON.parse(localStorage.getItem('completed_rust_lessons') || '[]');
    const totalLessons = level.lessons.length;
    const completedLessons = level.lessons.filter(
      lesson => completedItems.includes(lesson.title)
    ).length;
    
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    return {
      name: level.title,
      progress
    };
  });
  
  const openLesson = (lesson) => {
    alert(`"${lesson.title}" dersini açtınız. Gerçek projede burada interaktif bir ders olacak.`);
  };
  
  return (
    <ModuleLayout title="Rust Programlama Öğrenimi">
      <div className="mb-8">
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Genel İlerleme</h3>
              <p className="text-sm">{completionStats.completed} / {completionStats.total} ders tamamlandı</p>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="progress-chart">
                <div 
                  className="progress-chart-fill" 
                  style={{ 
                    width: `${completionStats.total > 0 ? 
                      (completionStats.completed / completionStats.total) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="tabs mb-6">
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
        
        <div className="card p-4 bg-primary bg-opacity-10 mb-6">
          <p>{levels[activeTab].description}. Her seviyeyi tamamladığınızda, bir sonraki seviye için gerekli temellere sahip olacaksınız.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              completedKey="completed_rust_lessons"
            />
          ))}
        </div>
      </div>
      
      <div className="card p-4 mb-8">
        <h3 className="text-xl font-bold mb-4">Seviye İlerlemesi</h3>
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{item.name}</span>
                <span>{item.progress}%</span>
              </div>
              <div className="progress-chart">
                <div 
                  className="progress-chart-fill" 
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card p-4">
        <h3 className="text-xl font-bold mb-2">Öğrenim İpuçları</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Rust öğrenmek, farklı bir düşünme biçimi gerektirir. Özellikle sahiplik konseptini anlamak önemlidir.</li>
          <li>Compiler hatalarını dikkatlice okuyun, Rust derleyicisi oldukça yardımcıdır.</li>
          <li>Küçük projeler yaparak pratik yapın.</li>
          <li>Rust community'si çok yardımcıdır, sorularınızı sormaktan çekinmeyin.</li>
        </ul>
      </div>
    </ModuleLayout>
  );
} 