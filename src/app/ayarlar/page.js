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

	useEffect(() => {
		// Ayarları localStorage'den yükle
		const settings = localStorage.getItem('zikirmatikSettings');
		if (settings) {
			const parsedSettings = JSON.parse(settings);
			setVibration(parsedSettings.vibration ?? true);
			setSound(parsedSettings.sound ?? false);
			setNotification(parsedSettings.notification ?? true);
			setResetConfirmation(parsedSettings.resetConfirmation ?? true);
			setFontSizePreference(parsedSettings.fontSizePreference ?? 'normal');
		}
	}, []);

	const saveSettings = () => {
		const settings = {
			vibration,
			sound,
			notification,
			resetConfirmation,
			fontSizePreference,
		};

		localStorage.setItem('zikirmatikSettings', JSON.stringify(settings));
		alert('Ayarlar kaydedildi.');
	};

	return (
		<div className={styles.container}>
			<Link href="/" className={styles.backLink}>
				← Ana Sayfa
			</Link>

			<h1 className={styles.title}>Ayarlar</h1>

			<div className={styles.settingsContainer}>
				<div className={styles.settingGroup}>
					<h2 className={styles.groupTitle}>Bildirimler</h2>

					<div className={styles.settingItem}>
						<div className={styles.settingInfo}>
							<span className={styles.settingName}>Titreşim</span>
							<span className={styles.settingDescription}>
								Zikir sayımı sırasında titreşim
							</span>
						</div>
						<label className={styles.toggle}>
							<input
								type="checkbox"
								checked={vibration}
								onChange={(e) => setVibration(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>

					<div className={styles.settingItem}>
						<div className={styles.settingInfo}>
							<span className={styles.settingName}>Ses</span>
							<span className={styles.settingDescription}>
								Zikir sayımı sırasında ses
							</span>
						</div>
						<label className={styles.toggle}>
							<input
								type="checkbox"
								checked={sound}
								onChange={(e) => setSound(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>

					<div className={styles.settingItem}>
						<div className={styles.settingInfo}>
							<span className={styles.settingName}>Uyarı Bildirimleri</span>
							<span className={styles.settingDescription}>
								Zikir tamamlandığında bildirim
							</span>
						</div>
						<label className={styles.toggle}>
							<input
								type="checkbox"
								checked={notification}
								onChange={(e) => setNotification(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>
				</div>

				<div className={styles.settingGroup}>
					<h2 className={styles.groupTitle}>Görünüm</h2>

					<div className={styles.settingItem}>
						<div className={styles.settingInfo}>
							<span className={styles.settingName}>Yazı Boyutu</span>
							<span className={styles.settingDescription}>
								Uygulama yazı boyutunu ayarlayın
							</span>
						</div>
						<select
							className={styles.select}
							value={fontSizePreference}
							onChange={(e) => setFontSizePreference(e.target.value)}
						>
							<option value="small">Küçük</option>
							<option value="normal">Normal</option>
							<option value="large">Büyük</option>
						</select>
					</div>
				</div>

				<div className={styles.settingGroup}>
					<h2 className={styles.groupTitle}>Genel</h2>

					<div className={styles.settingItem}>
						<div className={styles.settingInfo}>
							<span className={styles.settingName}>Sıfırlama Onayı</span>
							<span className={styles.settingDescription}>
								Sayaç sıfırlanırken onay iste
							</span>
						</div>
						<label className={styles.toggle}>
							<input
								type="checkbox"
								checked={resetConfirmation}
								onChange={(e) => setResetConfirmation(e.target.checked)}
							/>
							<span className={styles.slider}></span>
						</label>
					</div>
				</div>

				<button className={styles.saveButton} onClick={saveSettings}>
					Ayarları Kaydet
				</button>

				<div className={styles.aboutSection}>
					<h2 className={styles.groupTitle}>Hakkında</h2>
					<p className={styles.aboutText}>
						Bu uygulama zikir ibadetlerini kolaylaştırmak amacıyla
						geliştirilmiştir. Herhangi bir öneri veya geri bildiriminiz olursa
						lütfen bize ulaşın.
					</p>
					<p className={styles.version}>Versiyon 1.0.0</p>
				</div>
			</div>
		</div>
	);
}
