'use client'

import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

function DriftingGlow() {
    const group = useRef<THREE.Group>(null)

    const colors = useMemo(() => ['#3b82f6', '#7c3aed'], [])

    useFrame((state, delta) => {
        if (!group.current) return
        group.current.rotation.z += delta * 0.03
        group.current.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.25
        group.current.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.18
    })

    return (
        <group ref={group}>
            <Sparkles count={50} scale={[14, 8, 1]} size={2.2} speed={0.25} opacity={0.35} color={colors[0]} />
            <Sparkles count={24} scale={[10, 6, 1]} size={3.2} speed={0.18} opacity={0.18} color={colors[1]} />
        </group>
    )
}

export default function HeaderScene() {
    const reduceMotion = useReducedMotion()
    if (reduceMotion) return null

    return (
        <div className="absolute inset-0">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ width: '100%', height: '100%' }}
            >
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.7} />
                <DriftingGlow />
            </Canvas>
        </div>
    )
}

