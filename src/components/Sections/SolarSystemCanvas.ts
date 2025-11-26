import * as THREE from 'three';

export function initSolarSystemCanvas(container: HTMLElement) {
  const width = container.clientWidth;
  const height = container.clientHeight || 500;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 10, 35);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  const point = new THREE.PointLight(0xffdd88, 2.2, 200);
  scene.add(point);

  // Sun
  const sunGeo = new THREE.SphereGeometry(3.2, 48, 48);
  const sunMat = new THREE.MeshStandardMaterial({
    emissive: new THREE.Color(0xffcc55),
    emissiveIntensity: 1.5,
    color: 0x222222,
    roughness: 0.5,
    metalness: 0.1,
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sun);

  // Planets config
  const planetsConfig = [
    { radius: 0.6, dist: 6, speed: 0.02, color: 0xb1b1b1 }, // Mercury
    { radius: 0.9, dist: 8, speed: 0.016, color: 0xe1c16e }, // Venus
    { radius: 1.0, dist: 10, speed: 0.014, color: 0x6ba3ff }, // Earth
    { radius: 0.7, dist: 12, speed: 0.012, color: 0xff6b6b }, // Mars
    { radius: 2.0, dist: 16, speed: 0.010, color: 0xffd27f }, // Jupiter
    { radius: 1.8, dist: 20, speed: 0.009, color: 0xd9c8a3 }, // Saturn
    { radius: 1.3, dist: 24, speed: 0.008, color: 0x93c6d6 }, // Uranus
    { radius: 1.2, dist: 28, speed: 0.007, color: 0x4ea1d3 }, // Neptune
  ];

  const planetGroups: THREE.Object3D[] = [];

  planetsConfig.forEach((cfg) => {
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const planetGeo = new THREE.SphereGeometry(cfg.radius, 36, 36);
    const planetMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.8, metalness: 0 });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(cfg.dist, 0, 0);

    // Orbit ring
    const ringGeo = new THREE.RingGeometry(cfg.dist - 0.03, cfg.dist + 0.03, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;

    orbitGroup.add(planet);
    scene.add(ring);

    // Saturn rings
    if (cfg.radius > 1.7) {
      const satRingGeo = new THREE.RingGeometry(cfg.radius + 0.3, cfg.radius + 0.9, 64);
      const satRingMat = new THREE.MeshStandardMaterial({ color: 0xd9c8a3, side: THREE.DoubleSide, transparent: true, opacity: 0.65 });
      const satRing = new THREE.Mesh(satRingGeo, satRingMat);
      satRing.rotation.x = Math.PI / 3;
      planet.add(satRing);
    }

    planetGroups.push(new THREE.Group());
    planetGroups[planetGroups.length - 1].add(planet);
    orbitGroup.add(planetGroups[planetGroups.length - 1]);

    // Tiny moons
    if (cfg.radius >= 1.0) {
      const moonGeo = new THREE.SphereGeometry(0.2, 24, 24);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const moon = new THREE.Mesh(moonGeo, moonMat);
      moon.position.set(cfg.radius + 0.8, 0, 0);
      const moonOrbit = new THREE.Group();
      moonOrbit.add(moon);
      planet.add(moonOrbit);
      (moonOrbit as any).moonSpeed = cfg.speed * 2.5;
    }

    (orbitGroup as any).speed = cfg.speed;
  });

  const clock = new THREE.Clock();

  function animate() {
    const t = clock.getElapsedTime();

    // Sun subtle pulse
    sun.rotation.y += 0.002;
    const emissiveIntensity = 1.35 + Math.sin(t * 0.8) * 0.15;
    (sun.material as THREE.MeshStandardMaterial).emissiveIntensity = emissiveIntensity;

    scene.traverse((obj) => {
      if (obj instanceof THREE.Group && (obj as any).speed) {
        const speed = (obj as any).speed as number;
        obj.rotation.y += speed; // orbit
      }
      // Moon orbits
      if (obj instanceof THREE.Group && (obj as any).moonSpeed) {
        obj.rotation.y += (obj as any).moonSpeed;
      }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight || 500;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);

  // Return cleanup
  return () => {
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    scene.clear();
    container.innerHTML = '';
  };
}
