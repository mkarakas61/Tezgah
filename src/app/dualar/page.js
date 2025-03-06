'use client';

import Link from 'next/link';
import styles from './dualar.module.css';
import { useState, useEffect } from 'react';

export default function Dualar() {
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
			<Link href="/" className={styles.backLink} onClick={playInterfaceSound}>
				← Ana Sayfa
			</Link>

			<h1 className={styles.title}>Dualar ve Zikirler</h1>
			<p className={styles.description}>
				Günlük zikirler, anlamları ve okunuşları
			</p>

			<div className={styles.searchBox}>
				<input type="text" placeholder="Dua veya zikir ara..." disabled />
				<button className={styles.searchButton} disabled onClick={playInterfaceSound}>
					Ara
				</button>
			</div>

			<div className={styles.categoriesWrapper}>
				<div className={styles.categories}>
					<button className={`${styles.categoryButton} ${styles.active}`} onClick={playInterfaceSound}>
						Tümü
					</button>
					<button className={styles.categoryButton} onClick={playInterfaceSound}>Sabah Zikirleri</button>
					<button className={styles.categoryButton} onClick={playInterfaceSound}>Akşam Zikirleri</button>
					<button className={styles.categoryButton} onClick={playInterfaceSound}>Tesbihatlar</button>
					<button className={styles.categoryButton} onClick={playInterfaceSound}>Özel Dualar</button>
				</div>
			</div>

			<div className={styles.duaList}>
				<div className={styles.duaCard}>
					<h2 className={styles.duaTitle}>Sübhanallah</h2>
					<div className={styles.duaContent}>
						<p className={styles.duaArabic}>سُبْحَانَ اللهِ</p>
						<p className={styles.duaOkunus}>Okunuşu: Subhânallah</p>
						<p className={styles.duaAnlam}>
							Anlamı: Allah'ı tüm eksikliklerden tenzih ederim
						</p>
						<p className={styles.duaAciklama}>
							Bu zikir Allah'ın kusursuzluğunu ve mükemmelliğini ifade etmek
							için kullanılır. Sabah ve akşam 33 defa okunması tavsiye edilir.
						</p>
						<div className={styles.duaInfo}>
							<span className={styles.duaTag}>Tesbih</span>
							<span className={styles.duaCount}>33 defa</span>
						</div>
						<Link
							href="/zikirmatik?zikir=Sübhanallah&target=33"
							className={styles.duaButton}
							onClick={playInterfaceSound}
						>
							Zikirmatik ile Say
						</Link>
					</div>
				</div>

				<div className={styles.duaCard}>
					<h2 className={styles.duaTitle}>Elhamdülillah</h2>
					<div className={styles.duaContent}>
						<p className={styles.duaArabic}>اَلْحَمْدُ لِلّٰهِ</p>
						<p className={styles.duaOkunus}>Okunuşu: Elhamdulillâh</p>
						<p className={styles.duaAnlam}>Anlamı: Hamd Allah'a mahsustur</p>
						<p className={styles.duaAciklama}>
							Bu zikir Allah'a şükretmek ve O'na hamd etmek için kullanılır.
							Sabah ve akşam 33 defa okunması tavsiye edilir.
						</p>
						<div className={styles.duaInfo}>
							<span className={styles.duaTag}>Tesbih</span>
							<span className={styles.duaCount}>33 defa</span>
						</div>
						<Link
							href="/zikirmatik?zikir=Elhamdülillah&target=33"
							className={styles.duaButton}
							onClick={playInterfaceSound}
						>
							Zikirmatik ile Say
						</Link>
					</div>
				</div>

				<div className={styles.duaCard}>
					<h2 className={styles.duaTitle}>Allahu Ekber</h2>
					<div className={styles.duaContent}>
						<p className={styles.duaArabic}>اَللّٰهُ اَكْبَرُ</p>
						<p className={styles.duaOkunus}>Okunuşu: Allâhu ekber</p>
						<p className={styles.duaAnlam}>Anlamı: Allah en büyüktür</p>
						<p className={styles.duaAciklama}>
							Bu zikir Allah'ın büyüklüğünü ve yüceliğini ifade etmek için
							kullanılır. Sabah ve akşam 33 defa okunması tavsiye edilir.
						</p>
						<div className={styles.duaInfo}>
							<span className={styles.duaTag}>Tesbih</span>
							<span className={styles.duaCount}>33 defa</span>
						</div>
						<Link
							href="/zikirmatik?zikir=Allahu Ekber&target=33"
							className={styles.duaButton}
							onClick={playInterfaceSound}
						>
							Zikirmatik ile Say
						</Link>
					</div>
				</div>

				<div className={styles.duaCard}>
					<h2 className={styles.duaTitle}>Kelime-i Tevhid</h2>
					<div className={styles.duaContent}>
						<p className={styles.duaArabic}>
							لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ
						</p>
						<p className={styles.duaOkunus}>
							Okunuşu: Lâ ilâhe illallâh Muhammedün Rasûlullâh
						</p>
						<p className={styles.duaAnlam}>
							Anlamı: Allah'tan başka ilah yoktur, Muhammed (s.a.v.) Allah'ın
							elçisidir
						</p>
						<p className={styles.duaAciklama}>
							İslam'ın temel iman esasını ifade eden bu cümle, imanın en özlü
							ifadesidir. Gün içinde düzenli olarak tekrarlanması tavsiye
							edilir.
						</p>
						<div className={styles.duaInfo}>
							<span className={styles.duaTag}>Zikir</span>
							<span className={styles.duaCount}>100 defa</span>
						</div>
						<Link
							href="/zikirmatik?zikir=La ilahe illallah&target=100"
							className={styles.duaButton}
							onClick={playInterfaceSound}
						>
							Zikirmatik ile Say
						</Link>
					</div>
				</div>

				<div className={styles.duaCard}>
					<h2 className={styles.duaTitle}>İstiğfar</h2>
					<div className={styles.duaContent}>
						<p className={styles.duaArabic}>أَسْتَغْفِرُ اللهَ</p>
						<p className={styles.duaOkunus}>Okunuşu: Estağfirullâh</p>
						<p className={styles.duaAnlam}>
							Anlamı: Allah'tan bağışlanma dilerim
						</p>
						<p className={styles.duaAciklama}>
							Bu dua Allah'tan af ve mağfiret dilemek için kullanılır. Peygamber
							Efendimiz (s.a.v.) günde en az 70 kere istiğfar etmeyi tavsiye
							etmiştir.
						</p>
						<div className={styles.duaInfo}>
							<span className={styles.duaTag}>Zikir</span>
							<span className={styles.duaCount}>100 defa</span>
						</div>
						<Link
							href="/zikirmatik?zikir=Estağfirullah&target=100"
							className={styles.duaButton}
							onClick={playInterfaceSound}
						>
							Zikirmatik ile Say
						</Link>
					</div>
				</div>
			</div>

			<div className={styles.paginationContainer}>
				<button className={`${styles.paginationButton} ${styles.active}`} onClick={playInterfaceSound}>
					1
				</button>
				<button className={styles.paginationButton} disabled onClick={playInterfaceSound}>
					2
				</button>
				<button className={styles.paginationButton} disabled onClick={playInterfaceSound}>
					3
				</button>
			</div>
		</div>
	);
}
