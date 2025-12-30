'use client';

import { useRef } from 'react';
import type { Group, MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

export default function Eyes() {
    const group = useRef<Group | null>(null);
    const leftMaterial = useRef<MeshBasicMaterial | null>(null);
    const rightMaterial = useRef<MeshBasicMaterial | null>(null);

    useFrame((state) => {
        if (!group.current || !leftMaterial.current || !rightMaterial.current) return;

        const t = state.clock.getElapsedTime();
        const pointer = state.pointer;

        const dist = Math.min(1, Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y));
        const targetOpacity = 0.6 + dist * 0.4;

        const lerp = (a: number, b: number, alpha: number) => a + (b - a) * alpha;

        leftMaterial.current.opacity = lerp(leftMaterial.current.opacity, targetOpacity, 0.12);
        rightMaterial.current.opacity = lerp(rightMaterial.current.opacity, targetOpacity, 0.12);

        const lookX = (pointer.x || 0) * 0.12;
        const lookY = (pointer.y || 0) * 0.12 + Math.sin(t * 0.8) * 0.02;

        group.current.position.x = lookX;
        group.current.position.y = lookY;
    });

    return (
        <group ref={group} position={[-0.14, 0.06, 0.8]}>
            <mesh>
                <sphereGeometry args={[0.09, 32, 32]} />
                <meshBasicMaterial
                    ref={leftMaterial}
                    color="#FFFFFF"
                    transparent
                    opacity={0.7}
                />
            </mesh>
            <mesh position={[0.28, 0, 0]}>
                <sphereGeometry args={[0.09, 32, 32]} />
                <meshBasicMaterial
                    ref={rightMaterial}
                    color="#FFFFFF"
                    transparent
                    opacity={0.7}
                />
            </mesh>
        </group>
    );
}
