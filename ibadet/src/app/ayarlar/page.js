'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ayarlar.module.css';

export default function Ayarlar() {
	const [vibration, setVibration] = useState(true);
	const [sound, setSound] = useState(false);
	const [notification, setNotification] = useState(true);
	const [resetConfirmation, setResetConfirmation] = useState(true);
	const [fontSizePreference, setFontSizePreference] = useState('normal');
	const [testAudio] = useState(() => typeof Audio !== 'undefined' ? new Audio('/sounds/interface_click.mp3') : null);

	// Font büyüklüğü sınıfını ayarla
	const fontSizeClass = fontSizePreference === 'small' 
		? styles.smallFont 
		: fontSizePreference === 'large' 
			? styles.largeFont 
			: '';

	useEffect(() => {
		// Zikirmatik ayarlarını localStorage'den yükle
		const zikirmatikSettings = localStorage.getItem('zikirmatikSettings');
		if (zikirmatikSettings) {
			const parsedSettings = JSON.parse(zikirmatikSettings);
			setVibration(parsedSettings.vibration ?? true);
			setSound(parsedSettings.sound ?? false);
			setNotification(parsedSettings.notification ?? true);
			setResetConfirmation(parsedSettings.resetConfirmation ?? true);
			setFontSizePreference(parsedSettings.fontSizePreference ?? 'normal');
		}

		// Global ayarları da kontrol et
		const globalSettings = localStorage.getItem('settings');
		if (globalSettings) {
			try {
				const parsedGlobalSettings = JSON.parse(globalSettings);
				// Global font boyutu ayarı varsa, onu kullan
				if (parsedGlobalSettings.fontSizePreference) {
					setFontSizePreference(parsedGlobalSettings.fontSizePreference);
				}
			} catch (error) {
				console.error('Global ayarlar yüklenirken hata oluştu:', error);
			}
		}
	}, []);

	const saveSettings = () => {
		// Zikirmatik ayarlarını kaydet
		const zikirmatikSettings = {
			vibration,
			sound,
			notification,
			resetConfirmation,
			fontSizePreference,
		};
		localStorage.setItem('zikirmatikSettings', JSON.stringify(zikirmatikSettings));

		// Global ayarları da güncelle
		const globalSettings = localStorage.getItem('settings');
		let parsedGlobalSettings = {};
		
		if (globalSettings) {
			try {
				parsedGlobalSettings = JSON.parse(globalSettings);
			} catch (error) {
				console.error('Global ayarlar ayrıştırılırken hata oluştu:', error);
			}
		}
		
		// Global ayarlara font boyutunu ekle
		parsedGlobalSettings.fontSizePreference = fontSizePreference;
		localStorage.setItem('settings', JSON.stringify(parsedGlobalSettings));

		alert('Ayarlar kaydedildi.');
	};

	const testSound = () => {
		if (testAudio) {
			testAudio.currentTime = 0;
			testAudio.play().catch(e => console.error("Test sesi çalınamadı:", e));
		}
	};

	const toggleSound = (checked) => {
		setSound(checked);
		if (checked) {
			testSound();
		}
	};

	return (
		<div className={`${styles.container} ${fontSizeClass}`}>
			<div className={styles.navLinks}>
				<Link href="/" className={styles.backLink}>
					← Ana Sayfa
				</Link>
			</div>

			<h1 className={styles.title}>Ayarlar</h1>

			<div className={styles.settingsContainer}>
				<div className={styles.settingSection}>
					<h2 className={styles.sectionTitle}>Bildirimler</h2>

					<div className={styles.settingItem}>
						<div className={styles.settingLabel}>
							Titreşim
							<div className={styles.settingDescription}>
								Zikir sayımı sırasında titreşim
							</div>
						</div>
						<label className={styles.toggleSwitch}>
							<input
								type="checkbox"
								checked={vibration}
								onChange={(e) => setVibration(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>

					<div className={styles.settingItem}>
						<div className={styles.settingLabel}>
							Ses
							<div className={styles.settingDescription}>
								Zikir sayımı sırasında ses
							</div>
						</div>
						<label className={styles.toggleSwitch}>
							<input
								type="checkbox"
								checked={sound}
								onChange={(e) => toggleSound(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>

					<div className={styles.settingItem}>
						<div className={styles.settingLabel}>
							Uyarı Bildirimleri
							<div className={styles.settingDescription}>
								Zikir tamamlandığında bildirim
							</div>
						</div>
						<label className={styles.toggleSwitch}>
							<input
								type="checkbox"
								checked={notification}
								onChange={(e) => setNotification(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>
				</div>

				<div className={styles.settingSection}>
					<h2 className={styles.sectionTitle}>Görünüm</h2>

					<div className={styles.settingItem}>
						<div className={styles.settingLabel}>
							Yazı Boyutu
							<div className={styles.settingDescription}>
								Uygulama yazı boyutunu ayarlayın
							</div>
						</div>
						<div className={styles.fontSizeSelector}>
							<button 
								className={styles.fontSizeButton} 
								onClick={() => setFontSizePreference('small')}
								style={fontSizePreference === 'small' ? {color: '#0d6efd', borderColor: '#0d6efd'} : {}}
							>
								Küçük
							</button>
							<button 
								className={styles.fontSizeButton} 
								onClick={() => setFontSizePreference('normal')}
								style={fontSizePreference === 'normal' ? {color: '#0d6efd', borderColor: '#0d6efd'} : {}}
							>
								Normal
							</button>
							<button 
								className={styles.fontSizeButton} 
								onClick={() => setFontSizePreference('large')}
								style={fontSizePreference === 'large' ? {color: '#0d6efd', borderColor: '#0d6efd'} : {}}
							>
								Büyük
							</button>
						</div>
					</div>
				</div>

				<div className={styles.settingSection}>
					<h2 className={styles.sectionTitle}>Genel</h2>

					<div className={styles.settingItem}>
						<div className={styles.settingLabel}>
							Sıfırlama Onayı
							<div className={styles.settingDescription}>
								Sayaç sıfırlanırken onay iste
							</div>
						</div>
						<label className={styles.toggleSwitch}>
							<input
								type="checkbox"
								checked={resetConfirmation}
								onChange={(e) => setResetConfirmation(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>
				</div>

				<button className={styles.buttonPrimary} onClick={saveSettings}>
					Ayarları Kaydet
				</button>

				<div className={styles.aboutSection}>
					<div className={styles.appVersion}>Versiyon 1.0.0</div>
					<p className={styles.aboutText}>
						Bu uygulama zikir ibadetlerini kolaylaştırmak amacıyla
						geliştirilmiştir. Herhangi bir öneri veya geri bildiriminiz olursa
						lütfen bize ulaşın.
					</p>
					<div className={styles.socialLinks}>
						<a href="#" className={styles.socialLink}>
							📧 İletişim
						</a>
						<a href="#" className={styles.socialLink}>
							⭐ Değerlendir
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
