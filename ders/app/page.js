'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    // Initialize 3D background effect
    if (typeof window !== 'undefined' && window.THREE && canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Create floating particles (bubbles)
      const particles = [];
      const particleCount = 50;
      
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x20B2AA,
        transparent: true,
        opacity: 0.6
      });
      
      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(geometry, material);
        particle.position.x = Math.random() * 40 - 20;
        particle.position.y = Math.random() * 40 - 20;
        particle.position.z = Math.random() * 40 - 35;
        particle.speed = 0.01 + Math.random() * 0.03;
        scene.add(particle);
        particles.push(particle);
      }
      
      camera.position.z = 5;
      
      function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles
        particles.forEach(particle => {
          particle.position.y += particle.speed;
          if (particle.position.y > 20) {
            particle.position.y = -20;
          }
          particle.rotation.x += 0.01;
          particle.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
      }
      
      animate();
      
      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        particles.forEach(particle => {
          scene.remove(particle);
          geometry.dispose();
          material.dispose();
        });
        renderer.dispose();
      };
    }
  }, []);

  // Module categories
  const moduleCategories = [
    {
      title: "Dil Öğrenimi",
      icon: "🌍",
      modules: [
        {
          id: 'english',
          title: 'İngilizce Öğrenimi',
          description: 'A1 seviyesinden C2 seviyesine kadar kapsamlı İngilizce eğitimi',
          icon: '🇬🇧',
          path: '/english'
        },
        {
          id: 'arabic',
          title: 'Arapça Öğrenimi',
          description: 'A1 seviyesinden ileri seviyeye kadar Arapça dil eğitimi',
          icon: '🇸🇦',
          path: '/arabic'
        }
      ]
    },
    {
      title: "Dini Eğitim",
      icon: "🕌",
      modules: [
        {
          id: 'quran',
          title: 'Kuran Sureleri Ezber',
          description: '114 sureyi tecvidli okuma ve ezberleme eğitimi',
          icon: '📖',
          path: '/quran'
        },
        {
          id: 'ayah-hadith',
          title: 'Ayet ve Hadis',
          description: 'Kütübü Sitte ve Kuran-ı Kerim kaynaklarından ayet ve hadisler',
          icon: '🕌',
          path: '/ayah-hadith'
        }
      ]
    },
    {
      title: "Programlama",
      icon: "💻",
      modules: [
        {
          id: 'rust',
          title: 'Rust Öğrenimi',
          description: 'Temel seviyeden ileri seviyeye Rust programlama dili eğitimi',
          icon: '🦀',
          path: '/rust'
        }
      ]
    },
    {
      title: "Ödül Sistemi",
      icon: "🏆",
      modules: [
        {
          id: 'wallet',
          title: 'SAV Token Cüzdanı',
          description: 'Kazandığınız SAV tokenlerini görüntüleyin ve harcayın',
          icon: '💰',
          path: '/wallet'
        },
        {
          id: 'nft-shop',
          title: 'NFT Mağazası',
          description: 'SAV tokenlerinizle özel NFT\'ler satın alın',
          icon: '🎁',
          path: '/nft-shop'
        }
      ]
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      <div className="container py-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Eğitim Platformu</span>
            <div className="absolute bottom-0 left-0 w-full h-3 bg-primary opacity-20 transform -rotate-1 rounded-full"></div>
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Dil ve din eğitimi ile programlama öğrenimi için interaktif platformumuz
          </p>
        </header>

        {moduleCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">{category.icon}</span>
              <h2 className="text-2xl font-bold">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.modules.map((module) => (
                <Link href={module.path} key={module.id}>
                  <div className="card card-3d slide-up">
                    <div className="text-5xl mb-4">{module.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                    <p className="mb-4">{module.description}</p>
                    <div className="btn">Başla</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
