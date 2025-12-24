'use client';

import * as THREE from 'three';
import {
  useRef,
  useState,
  useEffect,
  // memo, // Removido - não utilizado
  // forwardRef, // Removido - não utilizado
  useMemo,
} from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  // Plane, // Removido - não utilizado
  useFBO,
  MeshTransmissionMaterial,
  Preload,
  Text,
  Image as DreiImage,
  RoundedBox,
} from '@react-three/drei';
import { easing } from 'maath';
import { NAV_LINKS } from '@/config/navigation';
import { BRAND } from '@/config/brand';

interface FluidGlassProps {
  children?: ReactNode;
  scale?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
}

export default function FluidGlass(props: FluidGlassProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) return <>{props.children}</>;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 25 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <BarOrchester {...props} />
        <Preload all />
      </Canvas>
    </div>
  );
}

function BarOrchester(props: FluidGlassProps) {
  const { viewport: vp, gl, camera } = useThree();
  const buffer = useFBO();
  const [contentScene] = useState(() => new THREE.Scene());

  useFrame((state) => {
    // Render the Logo/Nav scene into the buffer so the bar can distort it
    gl.setRenderTarget(buffer);
    gl.setClearColor('#000000', 0);
    gl.render(contentScene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <>
          <Logo />
          <NavItems />
        </>,
        contentScene
      )}

      {/* Plane showing the captured UI behind the glass */}
      <mesh position={[0, 0, 4.9]}>
        <planeGeometry args={[vp.width, vp.height]} />
        <meshBasicMaterial map={buffer.texture} transparent opacity={1} />
      </mesh>

      {/* THE GLASS BAR */}
      <BarWrapper buffer={buffer.texture} {...props} />
    </>
  );
}

function NavItems() {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const spacing = 1.35;
  const fontSize = 0.16;

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 5]);
    // Align links to the right side
    group.current.position.set(v.width / 2 - 4.2, 0, 5);

    group.current.children.forEach((child, i) => {
      child.position.x = i * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = link;
    }
  };

  return (
    <group ref={group}>
      {NAV_LINKS.map((link) => (
        <NavItem
          key={link.label}
          label={link.label}
          href={link.href}
          fontSize={fontSize}
          onNavigate={handleNavigate}
        />
      ))}
    </group>
  );
}

function NavItem({
  label,
  href,
  fontSize,
  onNavigate,
}: {
  label: string;
  href: string;
  fontSize: number;
  onNavigate: (l: string) => void; // Corrigido nome do parâmetro para 'l'
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  // Estados para armazenar os valores interpolados usando THREE.Vector3 e THREE.Color
  const scale = useRef(new THREE.Vector3(1, 1, 1));
  const color = useRef(new THREE.Color('white')); // Inicializado com a cor padrão

  // Memoizar as cores para evitar recriações desnecessárias
  const hoverColor = useMemo(() => new THREE.Color('#0057ff'), []);
  const defaultColor = useMemo(() => new THREE.Color('white'), []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const targetScale = hovered ? 1.1 : 1;
    // Interpolar a escala - Agora passa THREE.Vector3
    easing.damp3(
      scale.current,
      new THREE.Vector3(targetScale, targetScale, 1),
      0.15,
      delta
    );
    // Aplicar a escala interpolada
    ref.current.scale.copy(scale.current);

    // Interpolar a cor
    const targetColor = hovered ? hoverColor : defaultColor;
    easing.dampC(color.current, targetColor, 0.15, delta);

    // --- CORREÇÃO CRÍTICA ---
    // O Text do Drei não tem um material.color acessível diretamente do objeto mesh
    // Ele usa um material gerado internamente. A propriedade 'color' no componente Text é reativa.
    // Portanto, devemos atualizar a propriedade 'color' do componente Text via estado ou uma abordagem baseada em material.
    // A maneira mais confiável é criar um estado para a cor do Text e atualizá-lo.
    // Vamos manter a cor interpolada em 'color.current' e aplicá-la ao Text via uma atualização direta da propriedade de material,
    // mas precisamos garantir que o material seja do tipo correto.
    // A melhor abordagem é usar um estado para a cor e aplicá-la diretamente ao componente Text.
    // Vamos usar uma abordagem baseada em estado para a cor do Text.
    // A interpolação da cor é feita em color.current, e aplicamos ao material.
    // O Text do Drei atualiza seu material quando a propriedade color muda.
    // Portanto, a atualização deve ser feita no material associado ao ref.current.
    // No entanto, o Drei Text pode encapsular o material.
    // A solução mais robusta é usar um estado para a cor e passá-la como propriedade ao Text.
    // Mas para manter a interpolação suave, vamos atualizar o material.color diretamente, mas com uma verificação de tipo mais segura.
    // A propriedade ref.current.material pode ser um array se houver múltiplos materiais, ou pode ser nula inicialmente.
    // Vamos tentar uma abordagem mais direta e segura:

    const material = ref.current.material;
    if (material) {
      if (Array.isArray(material)) {
        // Se for um array, iterar sobre os materiais
        material.forEach((mat) => {
          if (mat && (mat as THREE.MeshStandardMaterial).color) {
            (mat as THREE.MeshStandardMaterial).color.copy(color.current);
          }
        });
      } else if ((material as THREE.MeshStandardMaterial).color) {
        // Se for um único material, verificar se tem a propriedade color
        (material as THREE.MeshStandardMaterial).color.copy(color.current);
      }
    }
  });

  // Agora, o Text recebe a cor interpolada como propriedade
  // A interpolação é feita no useFrame, e a cor é aplicada ao material do objeto mesh.
  // O Text pode não atualizar automaticamente o material se a propriedade color não mudar.
  // Para garantir a atualização, precisamos forçar a atualização do material no useFrame.
  // A abordagem acima com material.color.copy(color.current) deve funcionar.
  // Se não funcionar, uma alternativa é usar um estado para a cor e atualizar a propriedade color do Text.
  // Por enquanto, vamos manter a abordagem de atualização direta do material.

  return (
    <Text
      ref={ref}
      fontSize={fontSize}
      color={color.current} // A cor interpolada é passada como propriedade
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onNavigate(href);
      }}
    >
      {label.toUpperCase()}
    </Text>
  );
}

function Logo() {
  const { viewport, camera } = useThree();
  const ref = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!ref.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 5]);
    ref.current.position.set(-v.width / 2 + 1.2, 0, 5);
  });

  return (
    <group ref={ref}>
      <DreiImage
        url={BRAND.logos.light}
        transparent
        scale={[2.2, 0.6]}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
        onClick={() => (window.location.href = '/')}
      />
    </group>
  );
}

interface BarWrapperProps extends FluidGlassProps {
  buffer: THREE.Texture;
}

// Removido memo e forwardRef pois não são mais necessários para este componente
function BarWrapper({
  buffer,
  ior = 1.3,
  thickness = 6,
  chromaticAberration = 0.15,
  anisotropy = 0.4,
}: BarWrapperProps) {
  // Removido ref
  const { viewport: vp, camera } = useThree();
  const internalRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const mesh = internalRef.current; // Usando apenas internalRef
    if (!mesh) return;
    const v = vp.getCurrentViewport(camera, [0, 0, 5.1]);

    // Centered bar
    mesh.position.set(0, 0, 5.1);

    // Stretched Rectangular Pill Scale
    const targetScaleX = v.width * 0.96;
    const targetScaleY = 0.65;
    const targetScaleZ = 0.2;

    // Interpolar a escala para suavizar
    mesh.scale.lerp(
      new THREE.Vector3(targetScaleX, targetScaleY, targetScaleZ),
      0.1
    );
  });

  return (
    <RoundedBox
      ref={internalRef} // Apenas internalRef
      args={[1, 1, 1]}
      radius={0.3} // Pill shape corner
      smoothness={4}
      renderOrder={100}
    >
      <MeshTransmissionMaterial
        buffer={buffer}
        ior={ior}
        thickness={thickness}
        anisotropy={anisotropy}
        chromaticAberration={chromaticAberration}
        distortion={0.3}
        distortionScale={0.2}
        temporalDistortion={0}
        transmission={1}
        roughness={0.02}
        metalness={0.05}
        backside
      />
    </RoundedBox>
  );
}
