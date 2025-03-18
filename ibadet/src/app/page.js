'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
	const [settings, setSettings] = useState({
		fontSizePreference: 'normal'
	});

	// Ayarları yükle
	useEffect(() => {
		const storedSettings = localStorage.getItem('settings');
		if (storedSettings) {
			try {
				const parsedSettings = JSON.parse(storedSettings);
				setSettings({
					fontSizePreference: parsedSettings.fontSizePreference || 'normal'
				});
			} catch (error) {
				console.error('Ayarlar yüklenirken hata oluştu:', error);
			}
		}
	}, []);

	// Font büyüklüğü sınıfını ayarla
	const fontSizeClass = settings.fontSizePreference === 'small'
		? styles.smallFont
		: settings.fontSizePreference === 'large'
			? styles.largeFont
			: '';

	return (
		<main className={`${styles.container} ${fontSizeClass}`}>
			<h1 className={styles.title}>Hoş Geldiniz</h1>
			<p className={styles.description}>
				İslami uygulamalar ve araçlar koleksiyonu
			</p>

			<div className={styles.grid}>
				<Link href="/namaz-vakitleri" className={styles.card} data-icon="🕌">
					<h2>Namaz Vakitleri</h2>
					<p>Bulunduğunuz konuma göre güncel namaz vakitlerini görüntüleyin.</p>
				</Link>

				<Link href="/zikirmatik" className={styles.card} data-icon="📿">
					<h2>Zikirmatik</h2>
					<p>Zikir çekmek için dijital sayaç.</p>
				</Link>

				<Link href="/istatistikler" className={styles.card} data-icon="📊">
					<h2>İstatistikler</h2>
					<p>İbadet istatistiklerinizi görüntüleyin.</p>
				</Link>

				<Link href="/yakinimda-camiler" className={styles.card} data-icon="🕌">
					<h2>Yakınımdaki Camiler</h2>
					<p>Konumunuza göre yakındaki camileri harita üzerinde görüntüleyin.</p>
				</Link>

				<Link href="/ayarlar" className={styles.card} data-icon="⚙️">
					<h2>Ayarlar</h2>
					<p>Uygulama ayarlarınızı özelleştirin.</p>
				</Link>
			</div>
			
			<footer className={styles.footer}>
				<p>© 2023 İslami Uygulamalar</p>
			</footer>
		</main>
	);
}
