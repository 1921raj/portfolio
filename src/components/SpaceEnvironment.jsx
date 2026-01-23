import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
    ProfileCube,
    TechCubes,
    SkillCategoryCubes,
    GalleryCubes,
    DataStreams
} from './3DCubes';

// Export the cube components so they can be used in App.jsx
export { ProfileCube, TechCubes, SkillCategoryCubes, GalleryCubes, DataStreams };


// Particle Field Component
export function ParticleField({ count = 5000, mousePosition }) {
    const points = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const colorPalette = [
            new THREE.Color(0x00f0ff), // Cyan
            new THREE.Color(0x0066ff), // Blue
            new THREE.Color(0x8800ff), // Violet
            new THREE.Color(0xff00aa), // Pink
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Distribute particles in a large sphere
            const radius = Math.random() * 150 + 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes
            sizes[i] = Math.random() * 2 + 0.5;
        }

        return { positions, colors, sizes };
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            const time = state.clock.getElapsedTime();

            // Slow rotation
            points.current.rotation.y = time * 0.02;
            points.current.rotation.x = Math.sin(time * 0.01) * 0.1;

            // React to mouse position
            if (mousePosition) {
                points.current.rotation.x += mousePosition.y * 0.0001;
                points.current.rotation.y += mousePosition.x * 0.0001;
            }
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particles.sizes.length}
                    array={particles.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.5}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// 3D Grid Component
export function Grid3D({ size = 200, divisions = 50, mousePosition }) {
    const gridRef = useRef();

    useFrame((state) => {
        if (gridRef.current) {
            const time = state.clock.getElapsedTime();

            // Subtle wave effect
            gridRef.current.position.y = Math.sin(time * 0.5) * 2;

            // React to mouse
            if (mousePosition) {
                gridRef.current.rotation.x = -Math.PI / 2 + mousePosition.y * 0.0002;
                gridRef.current.rotation.z = mousePosition.x * 0.0001;
            }
        }
    });

    return (
        <group ref={gridRef} position={[0, -30, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <gridHelper
                args={[size, divisions, 0x00f0ff, 0x0066ff]}
                material-opacity={0.2}
                material-transparent
            />
            <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial
                    color={0x050510}
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

// Dynamic Lighting System
export function DynamicLighting({ mousePosition }) {
    const lightRef = useRef();

    useFrame((state) => {
        if (lightRef.current && mousePosition) {
            const time = state.clock.getElapsedTime();

            // Follow mouse with smooth interpolation
            lightRef.current.position.x += (mousePosition.x * 0.05 - lightRef.current.position.x) * 0.1;
            lightRef.current.position.y += (mousePosition.y * 0.05 - lightRef.current.position.y) * 0.1;

            // Pulse intensity
            lightRef.current.intensity = 2 + Math.sin(time * 2) * 0.5;
        }
    });

    return (
        <>
            {/* Ambient light for base visibility */}
            <ambientLight intensity={0.3} color={0x0066ff} />

            {/* Mouse-reactive point light */}
            <pointLight
                ref={lightRef}
                position={[0, 0, 50]}
                intensity={2}
                distance={100}
                decay={2}
                color={0x00f0ff}
            />

            {/* Directional lights for depth */}
            <directionalLight position={[10, 10, 5]} intensity={0.5} color={0x00f0ff} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} color={0x8800ff} />

            {/* Hemisphere light for overall ambience */}
            <hemisphereLight
                color={0x00f0ff}
                groundColor={0x000000}
                intensity={0.4}
                position={[0, 50, 0]}
            />
        </>
    );
}

// Animated Background Shapes
export function BackgroundShapes() {
    const shapesRef = useRef([]);

    const shapes = useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100 - 50,
            ],
            scale: Math.random() * 3 + 1,
            color: [0x00f0ff, 0x0066ff, 0x8800ff, 0xff00aa][Math.floor(Math.random() * 4)],
            speed: Math.random() * 0.5 + 0.2,
            shape: ['box', 'sphere', 'octahedron'][Math.floor(Math.random() * 3)],
        }));
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        shapesRef.current.forEach((mesh, i) => {
            if (mesh) {
                const shape = shapes[i];
                mesh.rotation.x = time * shape.speed;
                mesh.rotation.y = time * shape.speed * 0.7;
                mesh.position.y += Math.sin(time * shape.speed + i) * 0.01;
            }
        });
    });

    return (
        <group>
            {shapes.map((shape, i) => (
                <mesh
                    key={shape.id}
                    ref={(el) => (shapesRef.current[i] = el)}
                    position={shape.position}
                    scale={shape.scale}
                >
                    {shape.shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
                    {shape.shape === 'sphere' && <sphereGeometry args={[0.5, 16, 16]} />}
                    {shape.shape === 'octahedron' && <octahedronGeometry args={[0.7]} />}
                    <meshStandardMaterial
                        color={shape.color}
                        transparent
                        opacity={0.15}
                        wireframe
                        emissive={shape.color}
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
        </group>
    );
}
