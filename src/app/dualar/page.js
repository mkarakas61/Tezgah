import Link from 'next/link';
import styles from './dualar.module.css';

export default function Dualar() {
	return (
		<div className={styles.container}>
			<Link href="/" className={styles.backLink}>
				← Ana Sayfa
			</Link>

			<h1 className={styles.title}>Dualar ve Zikirler</h1>
			<p className={styles.description}>
				Günlük zikirler, anlamları ve okunuşları
			</p>

			<div className={styles.searchBox}>
				<input type="text" placeholder="Dua veya zikir ara..." disabled />
				<button className={styles.searchButton} disabled>
					Ara
				</button>
			</div>

			<div className={styles.categoriesWrapper}>
				<div className={styles.categories}>
					<button className={`${styles.categoryButton} ${styles.active}`}>
						Tümü
					</button>
					<button className={styles.categoryButton}>Sabah Zikirleri</button>
					<button className={styles.categoryButton}>Akşam Zikirleri</button>
					<button className={styles.categoryButton}>Tesbihatlar</button>
					<button className={styles.categoryButton}>Özel Dualar</button>
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
						>
							Zikirmatik ile Say
						</Link>
					</div>
				</div>
			</div>

			<div className={styles.paginationContainer}>
				<button className={`${styles.paginationButton} ${styles.active}`}>
					1
				</button>
				<button className={styles.paginationButton} disabled>
					2
				</button>
				<button className={styles.paginationButton} disabled>
					3
				</button>
			</div>
		</div>
	);
}
