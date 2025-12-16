import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Hero({ onDetectClick, onHowItWorksClick }) {
  /* ================= Cursor Motion (UI) ================= */
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf;
    const move = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setCursor({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
        raf = null;
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ================= THREE.JS ================= */
  const globeRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!globeRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    const size = Math.min(window.innerWidth * 0.36, 420);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = renderer.domElement;
    globeRef.current.appendChild(canvas);

    /* =========== Globe =========== */
    const globeGeo = new THREE.SphereGeometry(2, 48, 48);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x020617,
      metalness: 0.4,
      roughness: 0.35,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    globe.rotation.x = 0.28;
    scene.add(globe);

    /* =========== Wire Grid =========== */
    const wireGeo = new THREE.WireframeGeometry(globeGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.18,
    });
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    scene.add(wire);

    /* =========== Nodes =========== */
    const nodeCount = 120;
    const nodePos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const r = 2.03;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      nodePos.set(
        [
          r * Math.sin(p) * Math.cos(t),
          r * Math.sin(p) * Math.sin(t),
          r * Math.cos(p),
        ],
        i * 3
      );
    }

    const nodesGeo = new THREE.BufferGeometry();
    nodesGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodesMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
    });
    const nodes = new THREE.Points(nodesGeo, nodesMat);
    scene.add(nodes);

    /* =========== Threat Pulse =========== */
    const pulseGeo = new THREE.RingGeometry(0.1, 0.14, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulse);

    /* =========== Lights =========== */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 0.9);
    light.position.set(4, 3, 5);
    scene.add(light);

    /* =========== Scroll Sync =========== */
    const onScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener("scroll", onScroll);

    /* =========== Animation =========== */
    let raf;
    let t = 0;

    const animate = () => {
      t += 0.01;

      const spin = 0.002 + scrollRef.current * 0.002;
      globe.rotation.y += spin;
      wire.rotation.y += spin;
      nodes.rotation.y += spin;

      /* Threat pulse */
      if (Math.random() > 0.985) {
        const i = Math.floor(Math.random() * nodeCount) * 3;
        pulse.position.set(
          nodePos[i],
          nodePos[i + 1],
          nodePos[i + 2]
        );
        pulse.scale.set(0.01, 0.01, 0.01);
        pulse.material.opacity = 1;
      }

      pulse.scale.multiplyScalar(1.06);
      pulse.material.opacity *= 0.93;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    /* =========== Cleanup =========== */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nodesGeo.dispose();
      nodesMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  /* ================= JSX ================= */
  return (
    <section className="relative min-h-screen bg-[#05070f] text-white overflow-hidden px-6 pt-28 pb-24">
      {/* Cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            700px at ${50 + cursor.x * 6}% ${50 - cursor.y * 6}%,
            rgba(56,189,248,0.22),
            transparent 70%
          )`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            NO PHISHING,<br />
            <span className="text-blue-400">ONLY TRUST.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mb-8">
            Real-time AI-powered phishing defense securing users, data, and
            infrastructure before threats strike.
          </p>

          <div className="flex gap-4">
            <button
              onClick={onDetectClick}
              className="px-7 py-3 rounded-md bg-white text-black font-medium hover:scale-105 transition"
            >
              Detect Threat
            </button>
            <button
              onClick={onHowItWorksClick}
              className="px-7 py-3 border border-gray-600 rounded-md hover:bg-white hover:text-black transition"
            >
              How It Works
            </button>
          </div>
        </div>

        {/* Globe */}
        <div className="flex justify-center lg:justify-end">
          <div
            ref={globeRef}
            style={{
              filter: "drop-shadow(0 25px 60px rgba(56,189,248,0.35))",
            }}
          />
        </div>
      </div>

    </section>
  );
}

export default Hero;
