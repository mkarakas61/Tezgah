'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ModuleLayout({ children, title, backLink = '/' }) {
  const [tokenCount, setTokenCount] = useState(0);
  const pathname = usePathname();
  
  useEffect(() => {
    // Load token count from localStorage
    const savedTokens = localStorage.getItem('savTokens');
    if (savedTokens) {
      setTokenCount(parseInt(savedTokens, 10));
    }
  }, []);
  
  return (
    <div className="container py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href={backLink} className="btn !bg-transparent !text-primary hover:!bg-primary-light hover:!text-white">
            ← Geri
          </Link>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/wallet" className={`flex items-center gap-2 p-2 rounded-full ${pathname === '/wallet' ? 'bg-primary-light/20' : ''}`}>
            <span className="text-xl">💰</span>
            <span className="font-bold">{tokenCount} SAV</span>
          </Link>
          
          <Link href="/" className="p-2 rounded-full">
            <span className="text-xl">🏠</span>
          </Link>
        </div>
      </header>
      
      <main>{children}</main>
    </div>
  );
}

// Token management helper functions
export function awardTokens(amount) {
  const currentTokens = parseInt(localStorage.getItem('savTokens') || '0', 10);
  const newTotal = currentTokens + amount;
  localStorage.setItem('savTokens', newTotal.toString());
  return newTotal;
}

export function useTokens() {
  const [tokens, setTokens] = useState(0);
  
  useEffect(() => {
    const savedTokens = localStorage.getItem('savTokens');
    if (savedTokens) {
      setTokens(parseInt(savedTokens, 10));
    }
  }, []);
  
  const addTokens = (amount) => {
    const newTotal = awardTokens(amount);
    setTokens(newTotal);
    
    // Show token animation
    const tokenEl = document.createElement('div');
    tokenEl.className = 'token-animation';
    tokenEl.textContent = `+${amount} SAV`;
    document.body.appendChild(tokenEl);
    
    setTimeout(() => {
      tokenEl.remove();
    }, 2000);
    
    return newTotal;
  };
  
  const spendTokens = (amount) => {
    if (tokens >= amount) {
      const newTotal = tokens - amount;
      localStorage.setItem('savTokens', newTotal.toString());
      setTokens(newTotal);
      return true;
    }
    return false;
  };
  
  return { tokens, addTokens, spendTokens };
} 