"use client";

import React, { useRef } from 'react';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function TorusDan(props: any) {
    // Configuração correta do caminho. O useGLTF gerencia o Draco automaticamente na maioria dos casos.
    const { nodes } = useGLTF('/media/Torus_dan.glb');
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    // Rotação suave constante para dar vida ao objeto
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.rotation.y += delta * 1.0;
        }
    });

    // Encontra a geometria correta. 
    // Nota: Baseado no seu GLB, o nó pode se chamar 'Sphere002' ou 'Retopo_Cube001'.
    // Adicionei uma verificação de segurança.
    // @ts-ignore
    const geometry = nodes.Sphere002?.geometry || nodes.Retopo_Cube001?.geometry || nodes.Torus002?.geometry;

    if (!geometry) return null;

    return (
        <group {...props} dispose={null}>
            <mesh ref={meshRef} geometry={geometry} scale={viewport.width > 440 ? 2:2}>
                {/* CONFIGURAÇÃO DO VIDRO LÍQUIDO (Igual à HERO.jpg) */}
            <MeshTransmissionMaterial
                     backside={true} // Crucial para objetos fechados; renderiza a face interna.
                     samples={16} // Qualidade da refração. Ajustar para performance se necessário.
                     resolution={900} // Resolução do buffer de transmissão. Ajustar para performance.
                     transmission={1} // Transparência total (100% de luz passa através do objeto).
                     roughness={0.0} // Superfície perfeitamente lisa.
                     thickness={2.5} // Espessura simulada do volume.
                     ior={0.5} // Índice de Refração (Vidro padrão é 1.5).
                     chromaticAberration={0.01} // Separação dos canais RGB nas bordas.
                     anisotropy={0.1} // Alongamento dos reflexos especulares.
                     distortion={0.5} // Amplitude principal da distorção líquida.
                     distortionScale={0.9} // Frequência das ondas de distorção.
                     temporalDistortion={9.2} // Velocidade da animação automática da superfície.
                    color={"#D929AA"} // Cor base do material (opcional).
                />
            </mesh>
        </group>
    );
}

// Pré-carregamento para evitar o piscar
useGLTF.preload('/media/Torus_dan.glb');
