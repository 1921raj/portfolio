import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { portfolioConfig } from '../portfolio.config';

/**
 * Profile Picture Cube
 * Displays the developer's profile picture as a rotating 3D cube
 */
export function ProfileCube() {
    const meshRef = useRef();
    const { profileCube } = portfolioConfig.space3D;
    const { profileImage } = portfolioConfig.personal;

    if (!profileCube.enabled) return null;

    // Try to load profile image, fallback to solid color if not found
    let texture;
    try {
        texture = useLoader(TextureLoader, profileImage);
    } catch (error) {
        console.warn('Profile image not found, using solid color cube');
    }

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            // Smooth rotation
            meshRef.current.rotation.x = time * profileCube.rotationSpeed * 0.3;
            meshRef.current.rotation.y = time * profileCube.rotationSpeed;
            // Subtle floating motion
            meshRef.current.position.y = profileCube.position[1] + Math.sin(time * 0.5) * 0.5;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={profileCube.position}
            scale={profileCube.size}
        >
            <boxGeometry args={[1, 1, 1]} />
            {texture ? (
                // If image loaded, use it on all sides
                <meshStandardMaterial
                    map={texture}
                    emissive={0x00f0ff}
                    emissiveIntensity={0.2}
                    metalness={0.3}
                    roughness={0.4}
                />
            ) : (
                // Fallback: gradient material
                <meshStandardMaterial
                    color={0x00f0ff}
                    emissive={0x00f0ff}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            )}
            {/* Wireframe overlay for futuristic look */}
            <lineSegments>
                <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
                <lineBasicMaterial attach="material" color={0x00f0ff} opacity={0.3} transparent />
            </lineSegments>
        </mesh>
    );
}

/**
 * Tech Cubes - Animated technology logos flying in 3D space
 * Shows your tech stack as floating cubes with logos
 */
export function TechCubes() {
    const { techCubes } = portfolioConfig.space3D;

    if (!techCubes.enabled || !techCubes.technologies) return null;

    return (
        <group>
            {techCubes.technologies.map((tech, index) => (
                <TechCube
                    key={tech.name}
                    tech={tech}
                    index={index}
                    total={techCubes.technologies.length}
                />
            ))}
        </group>
    );
}

function TechCube({ tech, index, total }) {
    const meshRef = useRef();

    // Try to load tech logo
    let texture;
    try {
        if (tech.logo) {
            texture = useLoader(TextureLoader, tech.logo);
        }
    } catch (error) {
        // Logo not found, will use solid color
    }

    // Calculate position in a circle around the origin
    const angle = (index / total) * Math.PI * 2;
    const radius = 25;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 10;

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Orbit around center
            const orbitAngle = angle + time * 0.1;
            meshRef.current.position.x = Math.cos(orbitAngle) * radius;
            meshRef.current.position.z = Math.sin(orbitAngle) * radius;
            meshRef.current.position.y = y + Math.sin(time * 0.5 + index) * 2;

            // Rotate cube
            meshRef.current.rotation.x = time * 0.3;
            meshRef.current.rotation.y = time * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={[x, y, z]} scale={2}>
            <boxGeometry args={[1, 1, 1]} />
            {texture ? (
                <meshStandardMaterial
                    map={texture}
                    emissive={tech.color}
                    emissiveIntensity={0.3}
                    metalness={0.5}
                    roughness={0.3}
                />
            ) : (
                <meshStandardMaterial
                    color={tech.color}
                    emissive={tech.color}
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                />
            )}
            {/* Glowing edges */}
            <lineSegments>
                <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
                <lineBasicMaterial attach="material" color={tech.color} opacity={0.8} transparent linewidth={2} />
            </lineSegments>
        </mesh>
    );
}

/**
 * Skill Category Cubes
 * One cube for each skill category, floating in formation
 */
export function SkillCategoryCubes() {
    const categories = portfolioConfig.skills.categories;

    return (
        <group>
            {categories.map((category, index) => (
                <SkillCube
                    key={category.name}
                    category={category}
                    index={index}
                    total={categories.length}
                />
            ))}
        </group>
    );
}

function SkillCube({ category, index, total }) {
    const meshRef = useRef();

    // Position cubes in a grid formation
    const cols = 2;
    const spacing = 15;
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = (col - cols / 2) * spacing + spacing / 2;
    const z = (row - total / (cols * 2)) * spacing;
    const y = 10;

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Gentle floating
            meshRef.current.position.y = y + Math.sin(time + index) * 1.5;

            // Slow rotation
            meshRef.current.rotation.x = time * 0.2 + index;
            meshRef.current.rotation.y = time * 0.3;

            // Pulse scale
            const pulse = 1 + Math.sin(time * 2 + index) * 0.05;
            meshRef.current.scale.set(pulse * 2.5, pulse * 2.5, pulse * 2.5);
        }
    });

    return (
        <group>
            <mesh ref={meshRef} position={[x, y, z]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={category.color}
                    emissive={category.color}
                    emissiveIntensity={0.5}
                    metalness={0.7}
                    roughness={0.3}
                    transparent
                    opacity={0.7}
                />
                {/* Wireframe */}
                <lineSegments>
                    <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
                    <lineBasicMaterial attach="material" color={category.color} linewidth={2} />
                </lineSegments>
            </mesh>

            {/* Floating emoji icon above cube */}
            <mesh position={[x, y + 2, z]}>
                <planeGeometry args={[1.5, 1.5]} />
                <meshBasicMaterial
                    color={0xffffff}
                    transparent
                    opacity={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

/**
 * Image Gallery Cubes
 * If you have multiple profile images, show them as a gallery
 */
export function GalleryCubes() {
    const { gallery } = portfolioConfig.personal;

    if (!gallery || gallery.length <= 1) return null;

    return (
        <group>
            {gallery.map((imagePath, index) => (
                <GalleryCube
                    key={index}
                    imagePath={imagePath}
                    index={index}
                    total={gallery.length}
                />
            ))}
        </group>
    );
}

function GalleryCube({ imagePath, index, total }) {
    const meshRef = useRef();

    let texture;
    try {
        texture = useLoader(TextureLoader, imagePath);
    } catch (error) {
        console.warn(`Gallery image ${imagePath} not found`);
        return null;
    }

    // Arrange in arc
    const angle = (index / total) * Math.PI;
    const radius = 12;
    const x = Math.cos(angle) * radius - 10;
    const z = Math.sin(angle) * radius;
    const y = 5;

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.y = time * 0.3 + index * 0.5;
            meshRef.current.position.y = y + Math.sin(time * 0.5 + index) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[x, y, z]} scale={1.5}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                map={texture}
                emissive={0xffffff}
                emissiveIntensity={0.1}
            />
        </mesh>
    );
}

/**
 * Animated Data Streams
 * Flowing lines of code/data around the cubes
 */
export function DataStreams() {
    const linesRef = useRef();

    useFrame((state) => {
        if (linesRef.current) {
            const time = state.clock.getElapsedTime();
            linesRef.current.rotation.y = time * 0.1;
        }
    });

    // Create flowing data stream lines
    const points = [];
    for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        const radius = 20 + Math.sin(i * 0.2) * 5;
        points.push(
            new THREE.Vector3(
                Math.cos(angle) * radius,
                (i - 50) * 0.2,
                Math.sin(angle) * radius
            )
        );
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line ref={linesRef} geometry={lineGeometry}>
            <lineBasicMaterial
                attach="material"
                color={0x00f0ff}
                transparent
                opacity={0.2}
                linewidth={1}
            />
        </line>
    );
}
