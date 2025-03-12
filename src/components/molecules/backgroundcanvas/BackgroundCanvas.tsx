import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const ThreeScene = () => {
	const mountRef = useRef<any>(null); // Référence pour monter le rendu dans le DOM

	useEffect(() => {
		// Créer une scène
		const scene = new THREE.Scene();

		// Créer une caméra
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		// Créer un renderer et l'ajouter au DOM
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		mountRef.current.appendChild(renderer.domElement);

		// Charger l'image HDR et l'appliquer à l'environnement
		const loader = new RGBELoader();
		loader
			.setPath("path/to/your/hdr-image/") // Le chemin de ton image HDR
			.load("image.hdr", function (texture: any) {
				// Appliquer l'image HDR à l'environnement et au fond
				texture.encoding = THREE.RGBEEncoding;
				scene.background = texture;
				scene.environment = texture;

				// Créer un objet pour voir l'effet de l'éclairage de l'environnement
				const geometry = new THREE.SphereGeometry(1, 32, 32);
				const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
				const sphere = new THREE.Mesh(geometry, material);
				scene.add(sphere);

				// Créer un éclairage de type "ambient light"
				const light = new THREE.AmbientLight(0xffffff, 1); // Lumière ambiante
				scene.add(light);

				// Fonction d'animation
				const animate = () => {
					requestAnimationFrame(animate);

					// Rotation de la sphère pour voir l'éclairage et l'effet de l'HDR
					sphere.rotation.x += 0.01;
					sphere.rotation.y += 0.01;

					renderer.render(scene, camera);
				};
				animate();
			});

		// Gérer le redimensionnement de la fenêtre
		const onResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};
		window.addEventListener("resize", onResize);

		// Nettoyer le rendu à la fin
		return () => {
			window.removeEventListener("resize", onResize);
			renderer.dispose();
		};
	}, []);

	return <div ref={mountRef} />;
};

export default ThreeScene;
