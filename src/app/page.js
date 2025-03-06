'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
	const [settings, setSettings] = useState({
		sound: false,
		fontSizePreference: 'normal'
	});

	// Ses nesnesi oluştur
	const [interfaceAudio] = useState(() => typeof Audio !== 'undefined' ? new Audio('/sounds/interface_click.mp3') : null);

	useEffect(() => {
		// Ayarları localStorage'den yükle
		const storedSettings = localStorage.getItem('zikirmatikSettings');
		if (storedSettings) {
			const parsedSettings = JSON.parse(storedSettings);
			setSettings({
				sound: parsedSettings.sound ?? false,
				fontSizePreference: parsedSettings.fontSizePreference ?? 'normal'
			});
		}
	}, []);

	// Font büyüklüğü sınıfını ayarla
	const fontSizeClass = settings.fontSizePreference === 'small' 
		? styles.smallFont 
		: settings.fontSizePreference === 'large' 
			? styles.largeFont 
			: '';

	const playInterfaceSound = () => {
		if (settings.sound && interfaceAudio) {
			interfaceAudio.currentTime = 0;
			interfaceAudio.play().catch(e => console.error("Ses çalınamadı:", e));
		}
	};

	return (
		<div className={`${styles.container} ${fontSizeClass}`}>
			<h1 className={styles.title}>Zikirmatik</h1>
			<p className={styles.description}>
				Günlük ibadetlerinizi takip etmenin en kolay yolu
			</p>

			<div className={styles.cardGrid}>
				<Link href="/zikirmatik" className={styles.cardLink} onClick={playInterfaceSound}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>📿</div>
						<h2>Zikirmatik</h2>
						<p>
							Zikirlerinizi saymak ve takip etmek için dijital zikirmatik
							kullanın.
						</p>
					</div>
				</Link>

				<Link href="/dualar" className={styles.cardLink} onClick={playInterfaceSound}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>📖</div>
						<h2>Dualar</h2>
						<p>
							Günlük okunan dua ve zikirler için hazır listeler ve anlamları.
						</p>
					</div>
				</Link>

				<Link href="/istatistikler" className={styles.cardLink} onClick={playInterfaceSound}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>📊</div>
						<h2>İstatistikler</h2>
						<p>
							Zikir ibadetlerinizin günlük, haftalık ve aylık istatistikleri.
						</p>
					</div>
				</Link>

				<Link href="/ayarlar" className={styles.cardLink} onClick={playInterfaceSound}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>⚙️</div>
						<h2>Ayarlar</h2>
						<p>
							Uygulama ayarlarını değiştirin ve özelleştirme seçeneklerini
							keşfedin.
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
