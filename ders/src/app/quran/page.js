'use client';

import { useState, useEffect } from 'react';
import ModuleLayout from '../components/Layout';
import ProgressCard from '../components/ProgressCard';

export default function QuranModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('short');
  
  // Surah categories
  const categories = {
    short: { title: 'Kısa Sureler', description: 'En kısa ve kolay ezberlenen sureler' },
    medium: { title: 'Orta Uzunlukta Sureler', description: 'Orta uzunlukta, orta zorlukta sureler' },
    long: { title: 'Uzun Sureler', description: 'Daha uzun ve detaylı sureler' },
    popular: { title: 'Sık Okunan Sureler', description: 'Namazlarda ve günlük hayatta en sık okunan sureler' }
  };
  
  // Surah list
  const surahs = [
    {
      number: 1,
      name: 'Fatiha',
      arabicName: 'الفاتحة',
      verses: 7,
      category: ['short', 'popular'],
      difficulty: 'Kolay',
      tokenReward: 5
    },
    {
      number: 112,
      name: 'İhlas',
      arabicName: 'الإخلاص',
      verses: 4,
      category: ['short', 'popular'],
      difficulty: 'Kolay',
      tokenReward: 5
    },
    {
      number: 113,
      name: 'Felak',
      arabicName: 'الفلق',
      verses: 5,
      category: ['short', 'popular'],
      difficulty: 'Kolay',
      tokenReward: 5
    },
    {
      number: 114,
      name: 'Nas',
      arabicName: 'الناس',
      verses: 6,
      category: ['short', 'popular'],
      difficulty: 'Kolay',
      tokenReward: 5
    },
    {
      number: 108,
      name: 'Kevser',
      arabicName: 'الكوثر',
      verses: 3,
      category: ['short', 'popular'],
      difficulty: 'Kolay',
      tokenReward: 5
    },
    {
      number: 103,
      name: 'Asr',
      arabicName: 'العصر',
      verses: 3,
      category: ['short', 'popular'],
      difficulty: 'Kolay',
      tokenReward: 5
    },
    {
      number: 36,
      name: 'Yasin',
      arabicName: 'يس',
      verses: 83,
      category: ['medium', 'popular'],
      difficulty: 'Orta',
      tokenReward: 20
    },
    {
      number: 67,
      name: 'Mülk',
      arabicName: 'الملك',
      verses: 30,
      category: ['medium', 'popular'],
      difficulty: 'Orta',
      tokenReward: 15
    },
    {
      number: 55,
      name: 'Rahman',
      arabicName: 'الرحمن',
      verses: 78,
      category: ['medium', 'popular'],
      difficulty: 'Orta',
      tokenReward: 20
    },
    {
      number: 18,
      name: 'Kehf',
      arabicName: 'الكهف',
      verses: 110,
      category: ['long', 'popular'],
      difficulty: 'Zor',
      tokenReward: 30
    },
    {
      number: 2,
      name: 'Bakara',
      arabicName: 'البقرة',
      verses: 286,
      category: ['long'],
      difficulty: 'Zor',
      tokenReward: 50
    },
    {
      number: 3,
      name: 'Al-i İmran',
      arabicName: 'آل عمران',
      verses: 200,
      category: ['long'],
      difficulty: 'Zor',
      tokenReward: 40
    }
  ];
  
  // Filter surahs based on active tab and search term
  const filteredSurahs = surahs
    .filter(surah => activeTab === 'all' || surah.category.includes(activeTab))
    .filter(surah => 
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.arabicName.includes(searchTerm) ||
      surah.number.toString().includes(searchTerm)
    );
  
  const openSurah = (surah) => {
    alert(`"${surah.name}" suresini açtınız. Tecvidli okuma sayfasına yönlendiriliyorsunuz.`);
  };
  
  // Get completed count
  const getCompletedCount = () => {
    if (typeof window === 'undefined') return 0;
    const completedItems = JSON.parse(localStorage.getItem('completed_quran_surahs') || '[]');
    return completedItems.length;
  };
  
  return (
    <ModuleLayout title="Kuran Sureleri Ezber">
      <div className="mb-6">
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Ezber İlerlemesi</h3>
              <p className="text-sm">{getCompletedCount()} / {surahs.length} sure ezberlenmiş</p>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="progress-chart">
                <div 
                  className="progress-chart-fill" 
                  style={{ width: `${(getCompletedCount() / surahs.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      
        <div className="mb-6">
          <input
            type="text"
            placeholder="Sure ara..."
            className="w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="tabs mb-6">
          <div 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            Tüm Sureler
          </div>
          {Object.keys(categories).map(category => (
            <div 
              key={category}
              className={`tab ${activeTab === category ? 'active' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {categories[category].title}
            </div>
          ))}
        </div>
        
        {activeTab !== 'all' && categories[activeTab] && (
          <p className="mb-6 text-gray-600 dark:text-gray-300">{categories[activeTab].description}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurahs.map((surah) => (
            <ProgressCard
              key={surah.number}
              title={`${surah.number}. ${surah.name}`}
              description={`${surah.verses} ayet - ${surah.arabicName}`}
              icon="📖"
              difficulty={surah.difficulty}
              tokenReward={surah.tokenReward}
              onClick={() => openSurah(surah)}
              completedKey="completed_quran_surahs"
            />
          ))}
        </div>
      </div>
      
      <div className="card p-4">
        <h3 className="text-xl font-bold mb-2">Ezber Önerileri</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Her gün düzenli olarak tekrar etmek, ezberi kalıcı hale getirir.</li>
          <li>Küçük parçalar halinde ezberlemek daha etkilidir.</li>
          <li>Tecvid kurallarına dikkat ederek ezberleyin.</li>
          <li>Anlamını öğrenmek, ezberlemeyi kolaylaştırır.</li>
          <li>Sabah saatleri ezber için en verimli zamanlardır.</li>
        </ul>
      </div>
    </ModuleLayout>
  );
} 