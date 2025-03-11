'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './zikirmatik.module.css';

export default function Zikirmatik() {
	const [count, setCount] = useState(0);
	const [target, setTarget] = useState(33);
	const [savedCounts, setSavedCounts] = useState([]);
	const [currentZikir, setCurrentZikir] = useState('Sübhanallah');
	const [ozelZikirText, setOzelZikirText] = useState('Özel Zikir');
	const [settings, setSettings] = useState({
		vibration: true,
		sound: false,
		notification: true,
		resetConfirmation: true,
		fontSizePreference: 'normal'
	});

	// Ses nesneleri oluştur
	const [zikirAudio] = useState(() => {
		console.log('zikirAudio');
		return typeof Audio !== 'undefined' 
			? new Audio('/sounds/zikir_click.mp3') 
			: null;
	});
	const [interfaceAudio] = useState(() => {
		console.log('interfaceAudio');
		return typeof Audio !== 'undefined' 
			? new Audio('/sounds/interface_click.mp3') 
			: null;
	});

	// Zikir tipleri
	const zikirTipleri = [
		{ name: 'Sübhanallah', defaultTarget: 33 },
		{ name: 'Elhamdülillah', defaultTarget: 33 },
		{ name: 'Allahu Ekber', defaultTarget: 33 },
		{ name: 'La ilahe illallah', defaultTarget: 100 },
		{ name: 'Estağfirullah', defaultTarget: 100 },
		{ name: ozelZikirText, defaultTarget: 0, isOzel: true },
	];

	useEffect(() => {
		// Local storage'dan kayıtlı verileri yükle
		const saved = localStorage.getItem('savedCounts');
		if (saved) {
			setSavedCounts(JSON.parse(saved));
		}

		// Ayarları localStorage'den yükle
		const storedSettings = localStorage.getItem('zikirmatikSettings');
		if (storedSettings) {
			const parsedSettings = JSON.parse(storedSettings);
			setSettings({
				vibration: parsedSettings.vibration ?? true,
				sound: parsedSettings.sound ?? false,
				notification: parsedSettings.notification ?? true,
				resetConfirmation: parsedSettings.resetConfirmation ?? true,
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

	const playZikirSound = () => {
		console.log(zikirAudio);

		if (zikirAudio) {
			console.log('playZikirSound');

			zikirAudio.currentTime = 0;
			zikirAudio.play().catch(e => console.error("Ses çalınamadı:", e));
		}
	};

	const playInterfaceSound = () => {
		if (interfaceAudio) {
			interfaceAudio.currentTime = 0;
			interfaceAudio.play().catch(e => console.error("Ses çalınamadı:", e));
		}
	};

	const increment = () => {
		playZikirSound();
		
		setCount((prev) => {
			const newCount = prev + 1;

			// Hedef sayıya ulaşıldıysa
			if (newCount === target) {
				// Titreşim ayarı açıksa uygula
				if (settings.vibration && 'vibrate' in navigator) {
					navigator.vibrate(200);
				}

				// Bildirim ayarı açıksa göster
				if (settings.notification) {
					setTimeout(() => {
						alert(`${currentZikir} zikri tamamlandı! (${target}/${target})`);
					}, 300);
				}
			}

			return newCount;
		});
	};

	const reset = () => {
		// Onay ayarı açıksa sor
		if (settings.resetConfirmation) {
			if (!confirm('Sayaç sıfırlansın mı?')) {
				return;
			}
		}
		
		playInterfaceSound();
		setCount(0);
	};

	const saveCount = () => {
		playInterfaceSound();
		
		const newSavedCount = {
			zikir: currentZikir,
			count: count,
			date: new Date().toLocaleString('tr-TR'),
		};

		const newSavedCounts = [...savedCounts, newSavedCount];
		setSavedCounts(newSavedCounts);

		// Local storage'a kaydet
		localStorage.setItem('savedCounts', JSON.stringify(newSavedCounts));

		// Bildirim ayarı açıksa göster
		if (settings.notification) {
			alert(`${count} adet ${currentZikir} zikri kaydedildi.`);
		}
		
		reset();
	};

	const changeZikir = (zikir) => {
		playInterfaceSound();
		setCurrentZikir(zikir.name);
		setTarget(zikir.defaultTarget);
		setCount(0);
	};

	const handleOzelZikirChange = (newText) => {
		playInterfaceSound();
		setOzelZikirText(newText);
		// Zikir tiplerini güncelle
		if (currentZikir === 'Özel Zikir' || currentZikir === ozelZikirText) {
			setCurrentZikir(newText);
		}
	};

	return (
		<div className={`${styles.container} ${fontSizeClass}`}>
			<Link href="/" className={styles.backLink} onClick={playInterfaceSound}>
				← Ana Sayfa
			</Link>

			<h1 className={styles.title}>Zikirmatik</h1>

			<div className={styles.zikirSelector}>
				{zikirTipleri.map((zikir) => (
					<button
						key={zikir.name}
						className={`${styles.zikirButton} ${
							currentZikir === zikir.name ? styles.active : ''
						}`}
						onClick={() => changeZikir(zikir)}
					>
						{zikir.name}
					</button>
				))}
			</div>

			{currentZikir === ozelZikirText && (
				<div className={styles.ozelZikirContainer}>
					<label htmlFor="ozelZikir" className={styles.ozelZikirLabel}>
						Özel Zikir Metni: 
					</label>
					<input 
						id="ozelZikir"
						type="text"
						className={styles.ozelZikirInput}
						value={ozelZikirText}
						onChange={(e) => handleOzelZikirChange(e.target.value)}
						placeholder="Özel zikir metninizi buraya yazın"
					/>
				</div>
			)}

			<div className={styles.targetContainer}>
				<label htmlFor="target" className={styles.targetLabel}>
					Hedef Sayı:{' '}
				</label>
				<input
					id="target"
					type="number"
					className={styles.targetInput}
					value={target}
					onChange={(e) => setTarget(Number(e.target.value))}
					min="1"
				/>
			</div>

			<div className={styles.counterCard}>
				<h2 className={styles.currentZikir}>{currentZikir}</h2>

				{/* Büyük buton ve sayaç */}
				<button className={styles.bigCounterButton} onClick={increment}>
					<span className={styles.countNumber}>{count}</span>
					<span className={styles.buttonHint}>Tıkla</span>
				</button>

				<div className={styles.progress}>
					<div
						className={styles.progressBar}
						style={{ width: `${target > 0 ? (count / target) * 100 : 0}%` }}
					></div>
				</div>

				<div className={styles.targetInfo}>
					<span>Hedef: {target}</span>
				</div>

				<div className={styles.controls}>
					<button className={styles.controlButton} onClick={reset}>
						Sıfırla
					</button>
					<button className={styles.controlButton} onClick={saveCount}>
						Kaydet
					</button>
				</div>
			</div>

			{savedCounts.length > 0 && (
				<div className={styles.savedCountsSection}>
					<h3 className={styles.sectionTitle}>Son Kayıtlar</h3>
					<div className={styles.savedCountsList}>
						{savedCounts
							.slice(-5)
							.reverse()
							.map((saved, index) => (
								<div key={index} className={styles.savedCountItem}>
									<span className={styles.savedCountZikir}>{saved.zikir}</span>
									<span className={styles.savedCountValue}>
										{saved.count}
									</span>
									<span className={styles.savedCountDate}>{saved.date}</span>
								</div>
							))}
					</div>
					<Link href="/istatistikler" className={styles.viewAllLink} onClick={playInterfaceSound}>
						Tüm Kayıtları Görüntüle →
					</Link>
				</div>
			)}
		</div>
	);
}
