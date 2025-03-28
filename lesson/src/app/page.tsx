import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

interface LessonCardProps {
  title: string;
  description: string;
  path: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ title, description, path }) => {
  return (
    <Link href={path} className={styles.lessonCard}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default function Home() {
  const lessons = [
    {
      title: "Rust Temelleri",
      description: "Değişkenler, veri tipleri ve temel fonksiyonlar",
      path: "/lessons/basics",
    },
    {
      title: "SOLID Prensipleri",
      description: "Rust ile SOLID prensiplerini uygulama",
      path: "/lessons/solid",
    },
    {
      title: "Nesne Yönelimli Programlama",
      description: "Rust'ta OOP kavramları ve uygulamaları",
      path: "/lessons/oop",
    },
    {
      title: "Clean Architecture",
      description: "Rust ile Clean Architecture prensipleri",
      path: "/lessons/clean-architecture",
    },
    {
      title: "Dependency Injection",
      description: "Rust'ta bağımlılık enjeksiyonu teknikleri",
      path: "/lessons/dependency-injection",
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Rust Öğrenme Platformu</h1>
        <p className={styles.subtitle}>
          Clean Architecture, OOP, SOLID ve daha fazlasını pratik yaparak öğren
        </p>
      </header>

      <main className={styles.main}>
        <section>
          <h2 className={styles.sectionTitle}>Dersler</h2>
          <div className={styles.lessonsGrid}>
            {lessons.map((lesson, index) => (
              <LessonCard key={index} {...lesson} />
            ))}
          </div>
        </section>

        <section className={styles.practiceSection}>
          <h2 className={styles.sectionTitle}>Pratik Yap</h2>
          <p className={styles.practiceDescription}>
            Öğrendiklerinizi hemen uygulayın! Kodunuzun Clean Architecture, OOP, SOLID ve diğer prensiplere uygun olup olmadığını gerçek zamanlı olarak analiz edin.
          </p>
          <Link href="/practice" className={styles.practiceButton}>
            <span>Kod Editörüne Git</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              suppressHydrationWarning
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </section>
      </main>
    </div>
  );
}
