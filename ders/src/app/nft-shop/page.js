'use client';

import { useState, useEffect } from 'react';
import ModuleLayout from '../components/Layout';
import { useTokens } from '../components/Layout';

export default function NFTShopPage() {
  const { tokens, spendTokens } = useTokens();
  const [activeCategory, setActiveCategory] = useState('all');
  const [purchasedNFTs, setPurchasedNFTs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  
  useEffect(() => {
    // Load purchased NFTs from localStorage
    const savedNFTs = localStorage.getItem('purchased_nfts');
    if (savedNFTs) {
      setPurchasedNFTs(JSON.parse(savedNFTs));
    }
  }, []);
  
  const categories = {
    all: 'Tüm NFT\'ler',
    language: 'Dil Öğrenimi',
    quran: 'Kuran Çalışmaları',
    ayah_hadith: 'Ayet ve Hadis',
    rust: 'Programlama'
  };
  
  const nfts = [
    {
      id: 1,
      title: 'İngilizce A1 Sertifikası',
      description: 'İngilizce A1 seviyesini tamamladığınızı gösteren NFT sertifika',
      image: '🇬🇧',
      price: 50,
      category: 'language',
      difficulty: 'Kolay'
    },
    {
      id: 2,
      title: 'İngilizce B1 Sertifikası',
      description: 'İngilizce B1 seviyesini tamamladığınızı gösteren NFT sertifika',
      image: '🇬🇧',
      price: 150,
      category: 'language',
      difficulty: 'Orta'
    },
    {
      id: 3,
      title: 'Arapça Başlangıç Rozeti',
      description: 'Arapça öğrenimine başladığınızı gösteren özel rozet',
      image: '🇸🇦',
      price: 30,
      category: 'language',
      difficulty: 'Kolay'
    },
    {
      id: 4,
      title: 'Hafız Adayı',
      description: 'En az 10 sure ezberlediğinizi gösteren özel NFT',
      image: '📖',
      price: 100,
      category: 'quran',
      difficulty: 'Orta'
    },
    {
      id: 5,
      title: 'Kuran Hafızı',
      description: 'Tüm sureleri ezberlediğinizi gösteren prestijli NFT',
      image: '🕋',
      price: 500,
      category: 'quran',
      difficulty: 'Zor'
    },
    {
      id: 6,
      title: 'Hadis Araştırmacısı',
      description: 'Hadis çalışmalarında ilerleme kaydettiğinizi gösteren NFT',
      image: '🔍',
      price: 120,
      category: 'ayah_hadith',
      difficulty: 'Orta'
    },
    {
      id: 7,
      title: 'Ayet Bilgini',
      description: 'Ayet çalışmalarında uzmanlaştığınızı gösteren NFT',
      image: '🌟',
      price: 150,
      category: 'ayah_hadith',
      difficulty: 'Orta'
    },
    {
      id: 8,
      title: 'Rust Çaylağı',
      description: 'Rust programlama dilinde ilk adımlarınızı attığınızı gösteren NFT',
      image: '🦀',
      price: 40,
      category: 'rust',
      difficulty: 'Kolay'
    },
    {
      id: 9,
      title: 'Rust Ustası',
      description: 'Rust programlama dilinde ustalaştığınızı gösteren prestijli NFT',
      image: '⚙️',
      price: 300,
      category: 'rust',
      difficulty: 'Zor'
    },
    {
      id: 10,
      title: 'Eğitim Şampiyonu',
      description: 'Tüm alanlarda ilerleme kaydettiğinizi gösteren özel NFT',
      image: '🏆',
      price: 400,
      category: 'all',
      difficulty: 'Zor'
    }
  ];
  
  const filteredNFTs = activeCategory === 'all' 
    ? nfts 
    : nfts.filter(nft => nft.category === activeCategory);
  
  const openNFTModal = (nft) => {
    setSelectedNFT(nft);
    setShowModal(true);
  };
  
  const purchaseNFT = () => {
    if (!selectedNFT) return;
    
    const success = spendTokens(selectedNFT.price);
    
    if (success) {
      const updatedPurchasedNFTs = [...purchasedNFTs, {
        ...selectedNFT,
        purchasedAt: new Date().toISOString()
      }];
      
      setPurchasedNFTs(updatedPurchasedNFTs);
      localStorage.setItem('purchased_nfts', JSON.stringify(updatedPurchasedNFTs));
      
      alert(`Tebrikler! "${selectedNFT.title}" başarıyla satın alındı!`);
      setShowModal(false);
    } else {
      alert('Yetersiz SAV token! Daha fazla token kazanmak için eğitimlere devam edin.');
    }
  };
  
  // Check if NFT is already purchased
  const isNFTPurchased = (nftId) => {
    return purchasedNFTs.some(nft => nft.id === nftId);
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'kolay':
        return 'bg-green-500';
      case 'orta':
        return 'bg-yellow-500';
      case 'zor':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  return (
    <ModuleLayout title="NFT Mağazası">
      <div className="mb-8">
        <div className="card bg-primary bg-opacity-10 p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">NFT Koleksiyonunuz</h3>
              <p className="text-sm">{purchasedNFTs.length} / {nfts.length} NFT'ye sahipsiniz</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-medium">Bakiye:</span>
              <span className="font-bold">{tokens} SAV</span>
            </div>
          </div>
        </div>
        
        <div className="tabs mb-6 overflow-x-auto">
          {Object.entries(categories).map(([key, value]) => (
            <div 
              key={key}
              className={`tab ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {value}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft) => {
            const isPurchased = isNFTPurchased(nft.id);
            
            return (
              <div 
                key={nft.id} 
                className={`nft-card ${isPurchased ? 'border-success' : ''}`}
                onClick={() => !isPurchased && openNFTModal(nft)}
              >
                <div className="nft-image flex items-center justify-center bg-gradient-to-br from-primary-light/20 to-primary-dark/20">
                  <div className="text-8xl">{nft.image}</div>
                  {isPurchased && (
                    <div className="absolute top-2 right-2 bg-success text-white px-2 py-1 rounded-full text-xs font-bold">
                      Sahipsiniz
                    </div>
                  )}
                </div>
                
                <div className="nft-content">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{nft.title}</h3>
                    <div className={`level-badge ${getDifficultyColor(nft.difficulty)}`}>
                      {nft.difficulty}
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">{nft.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="nft-price">
                      <span>{nft.price}</span>
                      <span className="ml-1">💰</span>
                    </div>
                    
                    {!isPurchased && (
                      <button 
                        className={`btn ${tokens < nft.price ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={tokens < nft.price}
                      >
                        Satın Al
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {purchasedNFTs.length > 0 && (
        <div className="card p-4 mb-6">
          <h3 className="text-xl font-bold mb-4">Sahip Olduğunuz NFT'ler</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {purchasedNFTs.map((nft) => (
              <div key={nft.id} className="text-center">
                <div className="text-4xl mb-2">{nft.image}</div>
                <div className="text-sm font-bold">{nft.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="card p-4">
        <h3 className="text-xl font-bold mb-2">NFT Bilgileri</h3>
        <p>Bu NFT'ler, öğrenim başarılarınızı ve platformdaki ilerlemelerinizi temsil eden dijital koleksiyon öğeleridir. Her NFT, platformumuzda tamamladığınız çeşitli eğitim modüllerindeki başarılarınızı gösterir.</p>
      </div>
      
      {/* Purchase Modal */}
      {showModal && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedNFT.title} Satın Al</h3>
            
            <div className="flex items-center justify-center text-8xl my-6">
              {selectedNFT.image}
            </div>
            
            <p className="mb-6">{selectedNFT.description}</p>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold">Fiyat:</div>
              <div className="flex items-center text-xl font-bold">
                <span>{selectedNFT.price}</span>
                <span className="ml-1">💰</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">Bakiyeniz:</div>
              <div className="flex items-center font-bold">
                <span>{tokens}</span>
                <span className="ml-1">💰</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                className="btn w-full"
                onClick={() => setShowModal(false)}
              >
                İptal
              </button>
              
              <button 
                className={`btn w-full ${tokens < selectedNFT.price ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={purchaseNFT}
                disabled={tokens < selectedNFT.price}
              >
                Satın Al
              </button>
            </div>
          </div>
        </div>
      )}
    </ModuleLayout>
  );
} 