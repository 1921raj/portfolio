import { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Stars, Sparkles } from '@react-three/drei';
import { usePortfolio } from '../context/PortfolioContext';

// Procedural Blackhole Shader Material
const BlackholeMaterial = {
    uniforms: {
        time: { value: 0 },
        radius: { value: 2.0 }, // Radius of the event horizon
        distort: { value: 0.5 },
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float time;
    uniform float radius;
    varying vec2 vUv;
    varying vec3 vPos;
    
    void main() {
      // Create a circular blackhole gradient
      float dist = length(vUv - 0.5) * 2.0;
      
      // Accretion disk glow
      float glow = 0.05 / (abs(dist - 0.4) + 0.01);
      
      // Black hole center (Event Horizon)
      float hole = 1.0 - smoothstep(0.35, 0.4, dist);
      
      vec3 color = vec3(0.0, 0.8, 1.0) * glow; // Cyan glow
      color += vec3(0.5, 0.0, 1.0) * glow * 0.5; // Violet secondary glow
      
      // Darken center to pure black
      if (dist < 0.4) color = vec3(0.0);
      
      // Animated swirl
      float noise = sin(dist * 20.0 - time * 2.0) * 0.1;
      color += vec3(noise * 0.2);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function Blackhole({ position }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.005;
            // Simple uniform update if we were using the custom shader class properly
            // For now, simpler visual approach using standard materials for stability
        }
    });

    return (
        <group position={position}>
            {/* Event Horizon - Dark Center */}
            <mesh>
                <circleGeometry args={[2.8, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Accretion Disk - Glowing Ring */}
            <mesh ref={meshRef} rotation={[Math.PI / 3, 0, 0]}>
                <ringGeometry args={[3, 5, 64]} />
                <meshStandardMaterial
                    emissive="#00f0ff"
                    emissiveIntensity={2}
                    color="#000000"
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Distortion Field Particles */}
            <Sparkles count={200} scale={10} size={4} speed={0.4} opacity={0.5} color="#8800ff" />
        </group>
    );
}

export function TravelingCube() {
    const cubeRef = useRef();
    const { data } = usePortfolio();
    const { profileImage } = data.personal;

    // Animation State
    // 0: Start (Far away) -> 1: Entering Blackhole -> 2: Hidden -> 3: Emerging -> 4: Floating Idle
    const [phase, setPhase] = useState(0);

    let texture;
    try {
        texture = useLoader(THREE.TextureLoader, profileImage);
    } catch (e) { /* ignore */ }

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (!cubeRef.current) return;

        // ANIMATION SEQUENCE LOGIC
        // This is a simplified procedural sequence based on time
        // In a real production app, we might use GSAP timeline, but here we use frame updates for performance

        const cycle = t % 15; // 15 second loop for the full detailed animation (or run once)

        // 1. Approach (0-3s)
        if (cycle < 3) {
            // Move from right to center
            const progress = cycle / 3;
            cubeRef.current.position.set(15 - progress * 15, 0, 0);
            cubeRef.current.scale.set(1, 1, 1);
            cubeRef.current.rotation.y = t;
        }
        // 2. Sucked In (3-4s)
        else if (cycle < 4) {
            const progress = (cycle - 3);
            // Spiral in
            cubeRef.current.position.set(Math.cos(t * 10) * (2 - progress * 2), Math.sin(t * 10) * (2 - progress * 2), -progress * 10);
            cubeRef.current.scale.set(1 - progress, 1 - progress, 1 + progress * 2); // Stretch effect
            cubeRef.current.rotation.z += 0.2;
        }
        // 3. Hidden inside (4-5s) - Teleport
        else if (cycle < 5) {
            cubeRef.current.scale.set(0, 0, 0);
        }
        // 4. Emerge (5-6s)
        else if (cycle < 6) {
            const progress = (cycle - 5);
            cubeRef.current.position.set(0, 0, 0);
            cubeRef.current.scale.set(progress, progress, progress);
            cubeRef.current.rotation.y = t * 2;
        }
        // 5. Idle Float (6-15s)
        else {
            cubeRef.current.position.y = Math.sin(t) * 0.5;
            cubeRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
            cubeRef.current.rotation.y += 0.01;
            cubeRef.current.scale.set(1, 1, 1);
        }
    });

    return (
        <group>
            <mesh ref={cubeRef}>
                <boxGeometry args={[2.5, 2.5, 2.5]} />
                {texture ? (
                    <meshStandardMaterial map={texture} />
                ) : (
                    <meshStandardMaterial color="#00f0ff" wireframe />
                )}
                <lineSegments>
                    <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(2.5, 2.5, 2.5)]} />
                    <lineBasicMaterial attach="material" color="#00f0ff" transparent opacity={0.5} />
                </lineSegments>
            </mesh>
        </group>
    );
}

export function HeroScene3D() {
    return (
        <>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Blackhole position={[0, 0, -5]} />
            </Float>
            <TravelingCube />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00aa" />
        </>
    )
}
