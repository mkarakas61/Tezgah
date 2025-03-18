'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ModuleLayout from '../components/Layout';
import { useTokens } from '../components/Layout';

export default function WalletPage() {
  const { tokens } = useTokens();
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    // Simulated transaction history - in a real app this would come from a database
    const mockHistory = [
      { id: 1, type: 'earn', amount: 5, source: 'İngilizce - Tanışma ve Selamlaşma', date: new Date(Date.now() - 86400000 * 7).toLocaleDateString() },
      { id: 2, type: 'earn', amount: 10, source: 'Arapça - İsim Cümleleri', date: new Date(Date.now() - 86400000 * 5).toLocaleDateString() },
      { id: 3, type: 'earn', amount: 5, source: 'Kuran - Fatiha Suresi', date: new Date(Date.now() - 86400000 * 3).toLocaleDateString() },
      { id: 4, type: 'earn', amount: 15, source: 'Rust - Sahiplik (Ownership)', date: new Date(Date.now() - 86400000 * 2).toLocaleDateString() },
      { id: 5, type: 'spend', amount: 50, source: 'NFT Satın Alma - Başlangıç Sertifikası', date: new Date(Date.now() - 86400000 * 1).toLocaleDateString() },
      { id: 6, type: 'earn', amount: 25, source: 'Ayet ve Hadis - Öğrenilen ve Ezberlenen', date: new Date().toLocaleDateString() }
    ];
    
    setHistory(mockHistory);
  }, []);
  
  // Calculate statistical data
  const stats = {
    totalEarned: history.filter(t => t.type === 'earn').reduce((sum, t) => sum + t.amount, 0),
    totalSpent: history.filter(t => t.type === 'spend').reduce((sum, t) => sum + t.amount, 0),
    topSource: [...history]
      .filter(t => t.type === 'earn')
      .sort((a, b) => b.amount - a.amount)[0]?.source || 'Henüz kazanç yok'
  };
  
  return (
    <ModuleLayout title="SAV Token Cüzdanı">
      <div className="mb-8">
        <div className="card bg-primary bg-opacity-10 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="text-gray-600 dark:text-gray-300 mb-1">Toplam Bakiye</div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">{tokens}</span>
                <span className="text-2xl">💰</span>
              </div>
            </div>
            
            <Link href="/nft-shop">
              <button className="btn">NFT Mağazasına Git</button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Toplam Kazanılan</h3>
            <div className="text-3xl font-bold text-success">{stats.totalEarned} SAV</div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Toplam Harcanan</h3>
            <div className="text-3xl font-bold text-error">{stats.totalSpent} SAV</div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-4">En Çok Kazanç</h3>
            <div className="text-lg">{stats.topSource}</div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-bold mb-6">İşlem Geçmişi</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 text-left">Tarih</th>
                  <th className="py-3 text-left">Kaynak</th>
                  <th className="py-3 text-right">Miktar</th>
                </tr>
              </thead>
              <tbody>
                {history.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.source}</td>
                    <td className={`py-3 text-right font-medium ${
                      transaction.type === 'earn' ? 'text-success' : 'text-error'
                    }`}>
                      {transaction.type === 'earn' ? '+' : '-'}
                      {transaction.amount} SAV
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="card p-4">
        <h3 className="text-xl font-bold mb-2">SAV Token Bilgileri</h3>
        <p className="mb-4">SAV tokenler, platformumuzda öğrenim başarılarınızın karşılığında kazandığınız dijital ödüllerdir. Bu tokenler ile NFT mağazasından çeşitli dijital ürünler satın alabilirsiniz.</p>
        <p>Daha fazla token kazanmak için eğitim modüllerinde ilerlemeye devam edin ve öğrendiklerinizi pekiştirin!</p>
      </div>
    </ModuleLayout>
  );
} 