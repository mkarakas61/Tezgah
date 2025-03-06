import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Zikirmatik</h1>
			<p className={styles.description}>
				Günlük ibadetlerinizi takip etmenin en kolay yolu
			</p>

			<div className={styles.cardGrid}>
				<Link href="/zikirmatik" className={styles.cardLink}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>📿</div>
						<h2>Zikirmatik</h2>
						<p>
							Zikirlerinizi saymak ve takip etmek için dijital zikirmatik
							kullanın.
						</p>
					</div>
				</Link>

				<Link href="/dualar" className={styles.cardLink}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>📖</div>
						<h2>Dualar</h2>
						<p>
							Günlük okunan dua ve zikirler için hazır listeler ve anlamları.
						</p>
					</div>
				</Link>

				<Link href="/istatistikler" className={styles.cardLink}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>📊</div>
						<h2>İstatistikler</h2>
						<p>
							Zikir ibadetlerinizin günlük, haftalık ve aylık istatistikleri.
						</p>
					</div>
				</Link>

				<Link href="/ayarlar" className={styles.cardLink}>
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
