'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './yakinimda-camiler.module.css';

export default function YakinimdaCamiler() {
	const [settings, setSettings] = useState({
		fontSizePreference: 'normal'
	});
	const [location, setLocation] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [nearbyMosques, setNearbyMosques] = useState([]);
	const mapRef = useRef(null);
	const [map, setMap] = useState(null);

	// Ses nesnelerini yükle
	const [interfaceAudio] = useState(() => {
		return typeof Audio !== 'undefined' 
			? new Audio('/sounds/interface_click.mp3') 
			: null;
	});

	// Ses çal
	const playInterfaceSound = () => {
		if (interfaceAudio && settings.sound) {
			interfaceAudio.currentTime = 0;
			interfaceAudio.play().catch(e => console.error("Ses çalınamadı:", e));
		}
	};

	useEffect(() => {
		// Ayarları yükle
		const storedSettings = localStorage.getItem('settings');
		if (storedSettings) {
			try {
				const parsedSettings = JSON.parse(storedSettings);
				setSettings({
					fontSizePreference: parsedSettings.fontSizePreference || 'normal',
					sound: parsedSettings.sound || false
				});
			} catch (error) {
				console.error('Ayarlar yüklenirken hata oluştu:', error);
			}
		}

		// Google Maps API'sını yükle
		if (typeof window !== 'undefined' && !window.google) {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
			script.async = true;
			script.defer = true;
			script.onload = getLocation;
			document.head.appendChild(script);
		} else {
			getLocation();
		}
	}, []);

	// Font boyutu sınıfını ayarla
	const fontSizeClass = settings.fontSizePreference === 'small' 
		? styles.smallFont 
		: settings.fontSizePreference === 'large' 
			? styles.largeFont 
			: '';

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords;
					setLocation({ lat: latitude, lng: longitude });
					setLoading(false);
				},
				err => {
					setError(`Konum bilgisine erişilemedi: ${err.message}`);
					setLoading(false);
				},
				{ enableHighAccuracy: true }
			);
		} else {
			setError('Konumunuza erişmek için tarayıcınız geolocation desteği sağlamalıdır');
			setLoading(false);
		}
	};

	const retryGettingLocation = () => {
		setLoading(true);
		setError(null);
		getLocation();
		playInterfaceSound();
	};

	useEffect(() => {
		if (location && window.google && mapRef.current) {
			// Haritayı oluştur
			const newMap = new window.google.maps.Map(mapRef.current, {
				center: location,
				zoom: 14,
				styles: [
					{
						featureType: 'poi.business',
						elementType: 'labels',
						stylers: [{ visibility: 'off' }]
					}
				]
			});
			setMap(newMap);

			// Konum işaretleyici
			new window.google.maps.Marker({
				position: location,
				map: newMap,
				title: 'Konumunuz',
				icon: {
					path: window.google.maps.SymbolPath.CIRCLE,
					scale: 10,
					fillColor: '#4285F4',
					fillOpacity: 1,
					strokeColor: '#ffffff',
					strokeWeight: 2
				}
			});

			// Yakındaki camileri ara
			const request = {
				location: location,
				radius: 3000, // 3 km
				type: ['mosque']
			};

			const service = new window.google.maps.places.PlacesService(newMap);
			service.nearbySearch(request, (results, status) => {
				if (status === window.google.maps.places.PlacesServiceStatus.OK) {
					setNearbyMosques(results);

					results.forEach((mosque) => {
						// Cami işaretleyicileri
						const marker = new window.google.maps.Marker({
							position: mosque.geometry.location,
							map: newMap,
							title: mosque.name,
							icon: {
								url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
							}
						});

						// İşaretleyici bilgi penceresi
						const infoWindow = new window.google.maps.InfoWindow({
							content: `<div style="padding: 10px; max-width: 200px;">
								<h3 style="margin-top: 0; color: #333;">${mosque.name}</h3>
								<p style="margin-bottom: 5px;">
									${mosque.vicinity}
								</p>
								${mosque.rating ? 
									`<p style="margin-bottom: 5px;">
										Puan: ${mosque.rating}/5 
										${mosque.user_ratings_total ? `(${mosque.user_ratings_total} değerlendirme)` : ''}
									</p>` : 
									''
								}
							</div>`
						});

						marker.addListener('click', () => {
							infoWindow.open(newMap, marker);
						});
					});
				} else {
					setError(`Yakındaki camiler bulunamadı: ${status}`);
				}
			});
		}
	}, [location]);

	return (
		<div className={`${styles.container} ${fontSizeClass}`}>
			<div className={styles.navLinks}>
				<Link href="/" className={styles.backLink} onClick={playInterfaceSound}>
					← Ana Sayfa
				</Link>
			</div>

			<h1 className={styles.title}>Yakınımdaki Camiler</h1>

			{loading ? (
				<div className={styles.loading}>
					<div className={styles.spinner}></div>
					<p>Konumunuz alınıyor...</p>
				</div>
			) : error ? (
				<div className={styles.error}>
					<p>{error}</p>
					<button className={styles.retryButton} onClick={retryGettingLocation}>
						Tekrar Dene
					</button>
				</div>
			) : (
				<>
					<div className={styles.mapContainer} ref={mapRef}></div>
					{nearbyMosques.length > 0 && (
						<div className={styles.mosquesContainer}>
							<h2 className={styles.sectionTitle}>Yakınımdaki Camiler ({nearbyMosques.length})</h2>
							<div className={styles.mosquesList}>
								{nearbyMosques.map((mosque, index) => (
									<div key={index} className={styles.mosqueCard}>
										<h3 className={styles.mosqueName}>{mosque.name}</h3>
										<div className={styles.mosqueDetails}>
											<p className={styles.mosqueRating}>
												Puan: {mosque.rating ? `${mosque.rating}/5` : 'Değerlendirilmemiş'}
												{mosque.user_ratings_total && ` (${mosque.user_ratings_total} değerlendirme)`}
											</p>
											<p className={styles.mosqueAddress}>Adres: {mosque.vicinity}</p>
											<p className={styles.mosqueStatus}>
												Durum: {mosque.business_status === 'OPERATIONAL' ? 'Açık' : 'Bilgi yok'}
											</p>
										</div>
										{mosque.photos && mosque.photos[0] && (
											<div className={styles.mosqueImageContainer}>
												<img 
													src={mosque.photos[0].getUrl()} 
													alt={mosque.name} 
													className={styles.mosqueImage}
												/>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
} 