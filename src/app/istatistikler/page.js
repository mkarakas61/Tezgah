'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './istatistikler.module.css';

export default function Istatistikler() {
	const [savedCounts, setSavedCounts] = useState([]);
	const [stats, setStats] = useState({
		total: 0,
		byType: {},
		today: 0,
		week: 0,
		month: 0,
	});

	useEffect(() => {
		// Local storage'dan kayıtlı verileri yükle
		const saved = localStorage.getItem('savedCounts');
		if (saved) {
			const parsedData = JSON.parse(saved);
			setSavedCounts(parsedData);
			calculateStats(parsedData);
		}
	}, []);

	const calculateStats = (data) => {
		// Bugünün başlangıcı
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Bir hafta öncesi
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		// Bir ay öncesi
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

		let total = 0;
		let byType = {};
		let todayCount = 0;
		let weekCount = 0;
		let monthCount = 0;

		data.forEach((item) => {
			const date = new Date(item.date);

			// Toplam sayı
			total += item.count;

			// Zikir tipine göre
			byType[item.zikir] = (byType[item.zikir] || 0) + item.count;

			// Bugün
			if (date >= today) {
				todayCount += item.count;
			}

			// Bu hafta
			if (date >= oneWeekAgo) {
				weekCount += item.count;
			}

			// Bu ay
			if (date >= oneMonthAgo) {
				monthCount += item.count;
			}
		});

		setStats({
			total,
			byType,
			today: todayCount,
			week: weekCount,
			month: monthCount,
		});
	};

	const clearAllData = () => {
		if (confirm('Tüm zikir verileriniz silinecek. Onaylıyor musunuz?')) {
			localStorage.removeItem('savedCounts');
			setSavedCounts([]);
			setStats({
				total: 0,
				byType: {},
				today: 0,
				week: 0,
				month: 0,
			});
			alert('Tüm veriler silindi.');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.navLinks}>
				<Link href="/zikirmatik" className={styles.backLink}>
					← Zikirmatik
				</Link>

				<Link href="/" className={styles.homeLink}>
					Ana Sayfa
				</Link>
			</div>

			<h1 className={styles.title}>Zikir İstatistikleri</h1>

			<div className={styles.statCards}>
				<div className={styles.statCard}>
					<h3 className={styles.statTitle}>Bugün</h3>
					<div className={styles.statValue}>{stats.today}</div>
					<p className={styles.statLabel}>Zikir</p>
				</div>

				<div className={styles.statCard}>
					<h3 className={styles.statTitle}>Bu Hafta</h3>
					<div className={styles.statValue}>{stats.week}</div>
					<p className={styles.statLabel}>Zikir</p>
				</div>

				<div className={styles.statCard}>
					<h3 className={styles.statTitle}>Bu Ay</h3>
					<div className={styles.statValue}>{stats.month}</div>
					<p className={styles.statLabel}>Zikir</p>
				</div>

				<div className={styles.statCard}>
					<h3 className={styles.statTitle}>Toplam</h3>
					<div className={styles.statValue}>{stats.total}</div>
					<p className={styles.statLabel}>Zikir</p>
				</div>
			</div>

			<div className={styles.breakdownSection}>
				<h2 className={styles.sectionTitle}>Zikir Detayları</h2>

				<div className={styles.breakdown}>
					{Object.entries(stats.byType).map(([key, value]) => (
						<div key={key} className={styles.breakdownItem}>
							<div className={styles.breakdownName}>{key}</div>
							<div className={styles.breakdownBar}>
								<div
									className={styles.breakdownProgress}
									style={{
										width: `${(value / stats.total) * 100}%`,
									}}
								/>
							</div>
							<div className={styles.breakdownValue}>{value}</div>
						</div>
					))}
				</div>
			</div>

			{savedCounts.length > 0 && (
				<div className={styles.recordsSection}>
					<h2 className={styles.sectionTitle}>Kayıt Geçmişi</h2>

					<div className={styles.recordsList}>
						<div className={styles.recordsHeader}>
							<span>Zikir</span>
							<span>Sayı</span>
							<span>Tarih</span>
						</div>
						{savedCounts
							.slice()
							.reverse()
							.map((record, index) => (
								<div key={index} className={styles.recordItem}>
									<span className={styles.recordName}>{record.zikir}</span>
									<span className={styles.recordCount}>
										{record.count}
									</span>
									<span className={styles.recordDate}>{record.date}</span>
								</div>
							))}
					</div>

					<button className={styles.clearButton} onClick={clearAllData}>
						Tüm Verileri Temizle
					</button>
				</div>
			)}
		</div>
	);
}
