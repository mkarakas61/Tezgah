'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ModuleLayout from '../components/Layout';

export default function AyahHadithModule() {
  const [activeTab, setActiveTab] = useState('ayah');
  
  // Count completed items
  const getCompletedCount = (type, trackType) => {
    if (typeof window === 'undefined') return 0;
    const storageKey = `${type}_${trackType}`;
    const completedItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return completedItems.length;
  };
  
  const StatCard = ({ title, icon, count, total, path }) => (
    <Link href={path}>
      <div className="card card-3d">
        <div className="flex items-center justify-between mb-3">
          <div className="text-4xl">{icon}</div>
          <div className="text-2xl font-bold">{count}/{total}</div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="progress-chart mb-4">
          <div 
            className="progress-chart-fill" 
            style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
          />
        </div>
        <button className="btn w-full">Görüntüle</button>
      </div>
    </Link>
  );
  
  return (
    <ModuleLayout title="Ayet ve Hadis Öğrenimi">
      <div className="tabs mb-8">
        <div 
          className={`tab ${activeTab === 'ayah' ? 'active' : ''}`}
          onClick={() => setActiveTab('ayah')}
        >
          Ayet Öğrenimi
        </div>
        <div 
          className={`tab ${activeTab === 'hadith' ? 'active' : ''}`}
          onClick={() => setActiveTab('hadith')}
        >
          Hadis Öğrenimi
        </div>
      </div>
      
      {activeTab === 'ayah' ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Kuran-ı Kerim Ayetleri</h2>
          
          <div className="card p-4 bg-primary bg-opacity-10 mb-6">
            <p>Kuran-ı Kerim'den ayetleri hem ezberleyebilir hem de anlamlarını öğrenebilirsiniz. Her ikisini de başardığınızda daha fazla SAV token kazanırsınız.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Ezberlenen Ayetler" 
              icon="📖" 
              count={getCompletedCount('ayah', 'memorized')} 
              total={30}
              path="/ayah-hadith/ayah-memorized"
            />
            <StatCard 
              title="Anlaşılan Ayetler" 
              icon="🧠" 
              count={getCompletedCount('ayah', 'understood')} 
              total={30}
              path="/ayah-hadith/ayah-understood"
            />
            <StatCard 
              title="Hem Ezberlenip Hem Anlaşılan" 
              icon="⭐" 
              count={getCompletedCount('ayah', 'both')} 
              total={30}
              path="/ayah-hadith/ayah-both"
            />
          </div>
          
          <h3 className="text-xl font-bold mb-4">Zorluk Seviyesini Seçin</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ayah-hadith/ayah-easy">
              <div className="card card-3d">
                <div className="text-3xl mb-2">🟢</div>
                <h4 className="text-lg font-bold mb-1">Kolay Ayetler</h4>
                <p className="text-sm mb-4">Kısa ve kolay anlaşılır ayetler</p>
                <button className="btn w-full">Başla</button>
              </div>
            </Link>
            <Link href="/ayah-hadith/ayah-medium">
              <div className="card card-3d">
                <div className="text-3xl mb-2">🟡</div>
                <h4 className="text-lg font-bold mb-1">Orta Seviye Ayetler</h4>
                <p className="text-sm mb-4">Orta uzunlukta, daha fazla kavram içeren ayetler</p>
                <button className="btn w-full">Başla</button>
              </div>
            </Link>
            <Link href="/ayah-hadith/ayah-hard">
              <div className="card card-3d">
                <div className="text-3xl mb-2">🔴</div>
                <h4 className="text-lg font-bold mb-1">Zor Ayetler</h4>
                <p className="text-sm mb-4">Daha uzun ve derin anlam içeren ayetler</p>
                <button className="btn w-full">Başla</button>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Hadis-i Şerifler</h2>
          
          <div className="card p-4 bg-primary bg-opacity-10 mb-6">
            <p>Kütübü Sitte kaynaklarından hadisleri ezberleyebilir ve anlamlarını öğrenebilirsiniz. Hadisler, Peygamber Efendimiz'in (s.a.v.) sözleri ve uygulamalarını içerir.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Ezberlenen Hadisler" 
              icon="📖" 
              count={getCompletedCount('hadith', 'memorized')} 
              total={40}
              path="/ayah-hadith/hadith-memorized"
            />
            <StatCard 
              title="Anlaşılan Hadisler" 
              icon="🧠" 
              count={getCompletedCount('hadith', 'understood')} 
              total={40}
              path="/ayah-hadith/hadith-understood"
            />
            <StatCard 
              title="Hem Ezberlenip Hem Anlaşılan" 
              icon="⭐" 
              count={getCompletedCount('hadith', 'both')} 
              total={40}
              path="/ayah-hadith/hadith-both"
            />
          </div>
          
          <h3 className="text-xl font-bold mb-4">Hadis Kaynakları</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ayah-hadith/bukhari">
              <div className="card card-3d">
                <h4 className="text-lg font-bold mb-1">Sahih-i Buhari</h4>
                <p className="text-sm mb-4">İmam Buhari'nin derlediği hadisler</p>
                <button className="btn w-full">Görüntüle</button>
              </div>
            </Link>
            <Link href="/ayah-hadith/muslim">
              <div className="card card-3d">
                <h4 className="text-lg font-bold mb-1">Sahih-i Müslim</h4>
                <p className="text-sm mb-4">İmam Müslim'in derlediği hadisler</p>
                <button className="btn w-full">Görüntüle</button>
              </div>
            </Link>
            <Link href="/ayah-hadith/other-sources">
              <div className="card card-3d">
                <h4 className="text-lg font-bold mb-1">Diğer Kaynaklar</h4>
                <p className="text-sm mb-4">Sünen-i Ebu Davud, Tirmizi, Nesai, İbn Mace</p>
                <button className="btn w-full">Görüntüle</button>
              </div>
            </Link>
          </div>
        </div>
      )}
      
      <div className="card p-4">
        <h3 className="text-xl font-bold mb-2">Öğrenim İpuçları</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Her gün düzenli olarak belirli bir süre çalışmak, başarının anahtarıdır.</li>
          <li>Önce anlamı üzerinde düşünün, sonra ezberlemeye çalışın.</li>
          <li>Ezberlediğiniz ayetleri ve hadisleri günlük yaşamınıza uygulamaya çalışın.</li>
          <li>Hem ezberleyip hem de anladığınız ayetler ve hadisler için daha fazla SAV token kazanırsınız.</li>
        </ul>
      </div>
    </ModuleLayout>
  );
} 