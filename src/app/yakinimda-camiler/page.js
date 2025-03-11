'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './yakinimda-camiler.module.css';

export default function YakinimdaCamiler() {
	const [settings, setSettings] = useState({
		sound: false,
		fontSizePreference: 'normal'
	});
	const [location, setLocation] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [nearbyMosques, setNearbyMosques] = useState([]);
	const mapRef = useRef(null);
	const googleMapRef = useRef(null);

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

		// Google Maps API'ını yükle
		const loadGoogleMapsScript = () => {
			const googleMapScript = document.createElement('script');
			googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
			googleMapScript.async = true;
			googleMapScript.defer = true;
			googleMapScript.onload = getUserLocation;
			window.document.body.appendChild(googleMapScript);
		};

		// Kullanıcı konumunu al
		const getUserLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const userLocation = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						};
						setLocation(userLocation);
						setLoading(false);
						initMap(userLocation);
					},
					(err) => {
						setError('Konum bilgisi alınamadı. Lütfen konum izni verin.');
						setLoading(false);
						console.error('Konum hatası:', err);
					}
				);
			} else {
				setError('Tarayıcınız konum hizmetlerini desteklemiyor.');
				setLoading(false);
			}
		};

		// Sayfada Google Maps script etiketini kontrol et, yoksa ekle
		if (!window.google) {
			loadGoogleMapsScript();
		} else {
			getUserLocation();
		}

		// Temizleme işlemi
		return () => {
			// Gerekli temizlik işlemleri buraya
		};
	}, []);

	const initMap = (userLocation) => {
		if (!userLocation || !window.google) return;

		// Harita oluştur
		const map = new window.google.maps.Map(mapRef.current, {
			center: userLocation,
			zoom: 14,
			mapTypeControl: true,
			streetViewControl: true,
			fullscreenControl: true,
		});
		googleMapRef.current = map;

		// Kullanıcı konumu için marker ekle
		const userMarker = new window.google.maps.Marker({
			position: userLocation,
			map: map,
			title: 'Konumunuz',
			icon: {
				url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
			}
		});

		// Yakındaki camileri ara
		searchNearbyMosques(userLocation, map);
	};

	const searchNearbyMosques = (location, map) => {
		const placesService = new window.google.maps.places.PlacesService(map);
		
		const request = {
			location: location,
			radius: 5000, // 5km yarıçapında ara
			type: ['mosque'] // cami türünde yerler
		};

		placesService.nearbySearch(request, (results, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				setNearbyMosques(results);
				
				// Camileri haritada işaretle
				results.forEach((place) => {
					const marker = new window.google.maps.Marker({
						position: place.geometry.location,
						map: map,
						title: place.name,
						icon: {
							url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
						}
					});

					// Cami bilgilerini gösteren info window ekle
					const infoWindow = new window.google.maps.InfoWindow({
						content: `
							<div>
								<h3>${place.name}</h3>
								<p>Puan: ${place.rating ? place.rating + '/5' : 'Değerlendirilmemiş'}</p>
								<p>Adres: ${place.vicinity}</p>
							</div>
						`
					});

					marker.addListener('click', () => {
						infoWindow.open(map, marker);
					});
				});
			} else {
				setError('Yakında cami bulunamadı veya arama sırasında bir hata oluştu.');
				console.error('Places API hatası:', status);
			}
		});
	};

	const playInterfaceSound = () => {
		if (interfaceAudio) {
			interfaceAudio.currentTime = 0;
			interfaceAudio.play().catch(e => console.error("Ses çalınamadı:", e));
		}
	};

	// Font büyüklüğü sınıfını ayarla
	const fontSizeClass = settings.fontSizePreference === 'small' 
		? styles.smallFont 
		: settings.fontSizePreference === 'large' 
			? styles.largeFont 
			: '';

	return (
		<div className={`${styles.container} ${fontSizeClass}`}>
			<div className={styles.navLinks}>
				<Link href="/" className={styles.backLink} onClick={playInterfaceSound}>
					← Ana Sayfa
				</Link>
			</div>

			<h1 className={styles.title}>Yakınımdaki Camiler</h1>
			
			{loading && (
				<div className={styles.loading}>
					<div className={styles.loadingSpinner}></div>
					<p>Konumunuz alınıyor ve camiler aranıyor...</p>
				</div>
			)}

			{error && (
				<div className={styles.error}>
					<p>{error}</p>
					<button 
						className={styles.retryButton}
						onClick={() => window.location.reload()}
					>
						Tekrar Dene
					</button>
				</div>
			)}
			
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
		</div>
	);
} 