'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './istatistikler.module.css';

export default function Istatistikler() {
	const [savedCounts, setSavedCounts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('gunluk');
	const [settings, setSettings] = useState({
		fontSizePreference: 'normal'
	});
	const [audioFiles, setAudioFiles] = useState({
		interfaceClick: null,
	});

	// Ses nesnelerini yükle
	useEffect(() => {
		if (typeof Audio !== 'undefined') {
			setAudioFiles({
				interfaceClick: new Audio('/sounds/interface_click.mp3')
			});
		}
	}, []);

	// Ses çal
	const playInterfaceSound = () => {
		if (audioFiles.interfaceClick && settings.sound) {
			audioFiles.interfaceClick.currentTime = 0;
			audioFiles.interfaceClick.play().catch(e => console.error("Ses çalınamadı:", e));
		}
	};

	useEffect(() => {
		// Kayıtlı zikirleri yükle
		const saved = localStorage.getItem('savedCounts');
		
		if (saved) {
			try {
				setSavedCounts(JSON.parse(saved));
			} catch(error) {
				console.error("Kayıtlı zikir verileri yüklenirken hata oluştu:", error);
				setSavedCounts([]);
			}
		}
		
		// Global ayarları yükle
		const storedSettings = localStorage.getItem('settings');
		if (storedSettings) {
			try {
				const parsedSettings = JSON.parse(storedSettings);
				setSettings(prevSettings => ({
					...prevSettings,
					fontSizePreference: parsedSettings.fontSizePreference || 'normal',
					sound: parsedSettings.sound || false
				}));
			} catch (error) {
				console.error('Ayarlar yüklenirken hata oluştu:', error);
			}
		}
		
		setLoading(false);
	}, []);

	// Font büyüklüğü sınıfını ayarla
	const fontSizeClass = settings.fontSizePreference === 'small' 
		? styles.smallFont 
		: settings.fontSizePreference === 'large' 
			? styles.largeFont 
			: '';

	// Zikirleri günlere göre grupla
	const groupByDate = (data) => {
		const groups = {};
		data.forEach(item => {
			const date = item.date.split(',')[0]; // Sadece tarih kısmını al
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(item);
		});
		return groups;
	};

	// Zikirleri tiplere göre grupla
	const groupByType = (data) => {
		const groups = {};
		data.forEach(item => {
			if (!groups[item.zikir]) {
				groups[item.zikir] = {
					total: 0,
					items: []
				};
			}
			groups[item.zikir].total += item.count;
			groups[item.zikir].items.push(item);
		});
		return groups;
	};

	// Günlük istatistikler
	const renderDailyStats = () => {
		const groupedData = groupByDate(savedCounts);
		const dates = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

		if (dates.length === 0) {
			return (
				<div className={styles.emptyState}>
					<span className={styles.emptyIcon}>📊</span>
					<p className={styles.emptyText}>Henüz kaydedilmiş zikir verisi bulunmuyor.</p>
					<Link href="/zikirmatik" className={styles.emptyLink} onClick={playInterfaceSound}>
						Zikirmatik'e Git
					</Link>
				</div>
			);
		}

		return (
			<div className={styles.dailyStats}>
				{dates.map(date => (
					<div key={date} className={styles.dayCard}>
						<h3 className={styles.dayTitle}>{date}</h3>
						<div className={styles.dayStats}>
							{groupedData[date].map((item, idx) => (
								<div key={idx} className={styles.statItem}>
									<span className={styles.statZikir}>{item.zikir}</span>
									<span className={styles.statCount}>{item.count}</span>
									<span className={styles.statTime}>{item.date.split(',')[1]}</span>
								</div>
							))}
						</div>
						<div className={styles.daySummary}>
							<p className={styles.summaryText}>
								Toplam: <strong>{groupedData[date].reduce((sum, item) => sum + item.count, 0)}</strong> zikir
							</p>
						</div>
					</div>
				))}
			</div>
		);
	};

	// Zikir tipine göre istatistikler
	const renderTypeStats = () => {
		const groupedData = groupByType(savedCounts);
		const types = Object.keys(groupedData);

		if (types.length === 0) {
			return (
				<div className={styles.emptyState}>
					<span className={styles.emptyIcon}>📊</span>
					<p className={styles.emptyText}>Henüz kaydedilmiş zikir verisi bulunmuyor.</p>
					<Link href="/zikirmatik" className={styles.emptyLink} onClick={playInterfaceSound}>
						Zikirmatik'e Git
					</Link>
				</div>
			);
		}

		return (
			<div className={styles.typeStats}>
				{types.map(type => (
					<div key={type} className={styles.typeCard}>
						<h3 className={styles.typeTitle}>{type}</h3>
						<p className={styles.typeCount}>
							Toplam: <strong>{groupedData[type].total}</strong> kez
						</p>
						<div className={styles.typeChart}>
							<div
								className={styles.typeChartBar}
								style={{
									width: `${
										Math.min(
											100,
											(groupedData[type].total /
												Math.max(...Object.values(groupedData).map(g => g.total))) *
												100
										)
									}%`
								}}
							></div>
						</div>
						<div className={styles.typeHistory}>
							<h4 className={styles.historyTitle}>Geçmiş Kayıtlar</h4>
							<div className={styles.historyList}>
								{groupedData[type].items
									.sort((a, b) => new Date(b.date) - new Date(a.date))
									.slice(0, 5)
									.map((item, idx) => (
										<div key={idx} className={styles.historyItem}>
											<span className={styles.historyDate}>
												{item.date}
											</span>
											<span className={styles.historyCount}>
												{item.count} kez
											</span>
										</div>
									))}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	// Toplu istatistikler
	const renderSummaryStats = () => {
		if (savedCounts.length === 0) {
			return (
				<div className={styles.emptyState}>
					<span className={styles.emptyIcon}>📊</span>
					<p className={styles.emptyText}>Henüz kaydedilmiş zikir verisi bulunmuyor.</p>
					<Link href="/zikirmatik" className={styles.emptyLink} onClick={playInterfaceSound}>
						Zikirmatik'e Git
					</Link>
				</div>
			);
		}

		const totalZikir = savedCounts.reduce((sum, item) => sum + item.count, 0);
		const typesCount = Object.keys(groupByType(savedCounts)).length;
		const daysCount = Object.keys(groupByDate(savedCounts)).length;
		const mostCommonZikir = Object.entries(groupByType(savedCounts))
			.sort((a, b) => b[1].total - a[1].total)
			.map(([name, data]) => ({ name, count: data.total }))[0];

		return (
			<div className={styles.summaryStats}>
				<div className={styles.summaryRow}>
					<div className={styles.summaryCard}>
						<h3 className={styles.summaryTitle}>Toplam Zikir</h3>
						<p className={styles.summaryValue}>{totalZikir}</p>
					</div>
					<div className={styles.summaryCard}>
						<h3 className={styles.summaryTitle}>Farklı Zikir</h3>
						<p className={styles.summaryValue}>{typesCount}</p>
					</div>
				</div>
				<div className={styles.summaryRow}>
					<div className={styles.summaryCard}>
						<h3 className={styles.summaryTitle}>Aktif Gün</h3>
						<p className={styles.summaryValue}>{daysCount}</p>
					</div>
					<div className={styles.summaryCard}>
						<h3 className={styles.summaryTitle}>En Çok Okunan</h3>
						<p className={styles.summaryValue}>
							{mostCommonZikir?.name}
							<span className={styles.summarySubtext}>
								{mostCommonZikir?.count} kez
							</span>
						</p>
					</div>
				</div>
				<div className={styles.allTimeStats}>
					<h3 className={styles.allTimeTitle}>Tüm Zamanlar</h3>
					<div className={styles.allTimeData}>
						<div className={styles.statRow}>
							<span className={styles.statLabel}>İlk Kayıt:</span>
							<span className={styles.statValue}>
								{savedCounts
									.sort((a, b) => new Date(a.date) - new Date(b.date))
									.map(item => item.date)[0] || 'Veri yok'}
							</span>
						</div>
						<div className={styles.statRow}>
							<span className={styles.statLabel}>Son Kayıt:</span>
							<span className={styles.statValue}>
								{savedCounts
									.sort((a, b) => new Date(b.date) - new Date(a.date))
									.map(item => item.date)[0] || 'Veri yok'}
							</span>
						</div>
						<div className={styles.statRow}>
							<span className={styles.statLabel}>Günlük Ortalama:</span>
							<span className={styles.statValue}>
								{daysCount > 0
									? Math.round(totalZikir / daysCount)
									: 0}{' '}
								zikir
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={`${styles.container} ${fontSizeClass}`}>
			<div className={styles.navLinks}>
				<Link href="/" className={styles.backLink} onClick={playInterfaceSound}>
					← Ana Sayfa
				</Link>
			</div>

			<h1 className={styles.title}>İstatistikler</h1>

			{loading ? (
				<div className={styles.loading}>
					<div className={styles.spinner}></div>
					<p>Veriler yükleniyor...</p>
				</div>
			) : (
				<>
					<div className={styles.tabContainer}>
						<button
							className={`${styles.tabButton} ${
								activeTab === 'gunluk' ? styles.activeTab : ''
							}`}
							onClick={() => {
								setActiveTab('gunluk');
								playInterfaceSound();
							}}
						>
							Günlük
						</button>
						<button
							className={`${styles.tabButton} ${
								activeTab === 'zikir' ? styles.activeTab : ''
							}`}
							onClick={() => {
								setActiveTab('zikir');
								playInterfaceSound();
							}}
						>
							Zikir Türleri
						</button>
						<button
							className={`${styles.tabButton} ${
								activeTab === 'ozet' ? styles.activeTab : ''
							}`}
							onClick={() => {
								setActiveTab('ozet');
								playInterfaceSound();
							}}
						>
							Genel Özet
						</button>
					</div>

					<div className={styles.tabContent}>
						{activeTab === 'gunluk' && renderDailyStats()}
						{activeTab === 'zikir' && renderTypeStats()}
						{activeTab === 'ozet' && renderSummaryStats()}
					</div>
				</>
			)}
		</div>
	);
}
