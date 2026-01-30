import * as THREE from 'three';
import { atmosphereShaders } from './GhostScene.shaders';

export const fluorescentColors: { [key: string]: number } = {
    cyan: 0x00ffff,
    lime: 0x00ff00,
    magenta: 0xff00ff,
    yellow: 0xffff00,
    orange: 0xff4500,
    pink: 0xff1493,
    purple: 0x9400d3,
    blue: 0x0080ff,
    green: 0x00ff80,
    red: 0xff0040,
    teal: 0x00ffaa,
    violet: 0x8a2be2,
};

export const createAtmosphere = (params: any) => {
    const geometry = new THREE.PlaneGeometry(300, 300);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
            revealRadius: { value: params.revealRadius },
            fadeStrength: { value: params.fadeStrength },
            baseOpacity: { value: params.baseOpacity },
            revealOpacity: { value: params.revealOpacity },
            time: { value: 0 },
        },
        vertexShader: atmosphereShaders.vertexShader,
        fragmentShader: atmosphereShaders.fragmentShader,
        transparent: true,
        depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -50;
    mesh.renderOrder = -100;
    return { mesh, material };
};

export const createGhost = (params: any) => {
    const group = new THREE.Group();

    const geometry = new THREE.SphereGeometry(2, 40, 40);
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
        if (positions[i + 1] < -0.2) {
            const x = positions[i];
            const z = positions[i + 2];
            const noise1 = Math.sin(x * 5) * 0.35;
            const noise2 = Math.cos(z * 4) * 0.25;
            const noise3 = Math.sin((x + z) * 3) * 0.15;
            positions[i + 1] = -2.0 + noise1 + noise2 + noise3;
        }
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
        color: params.bodyColor,
        transparent: true,
        opacity: params.ghostOpacity,
        emissive: fluorescentColors[params.glowColor],
        emissiveIntensity: params.emissiveIntensity,
        roughness: 0.02,
        metalness: 0.0,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    });

    const body = new THREE.Mesh(geometry, material);
    group.add(body);

    return { group, body, material };
};

export const createEyes = (ghostGroup: THREE.Group, params: any) => {
    const eyeGroup = new THREE.Group();
    ghostGroup.add(eyeGroup);
    const socketGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    const socketMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
    leftSocket.position.set(-0.7, 0.6, 1.9);
    leftSocket.scale.set(1.1, 1.0, 0.6);
    eyeGroup.add(leftSocket);

    const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
    rightSocket.position.set(0.7, 0.6, 1.9);
    rightSocket.scale.set(1.1, 1.0, 0.6);
    eyeGroup.add(rightSocket);

    const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);
    const leftEyeMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
    leftEye.position.set(-0.7, 0.6, 2.0);
    eyeGroup.add(leftEye);

    const rightEyeMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
    });
    const rightEye = new THREE.Mesh(eyeGeometry, rightEyeMaterial);
    rightEye.position.set(0.7, 0.6, 2.0);
    eyeGroup.add(rightEye);

    const outerGlowGeometry = new THREE.SphereGeometry(0.525, 12, 12);
    const leftOuterGlowMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
        side: THREE.BackSide,
    });
    const leftOuterGlow = new THREE.Mesh(outerGlowGeometry, leftOuterGlowMaterial);
    leftOuterGlow.position.set(-0.7, 0.6, 1.95);
    eyeGroup.add(leftOuterGlow);

    const rightOuterGlowMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
        side: THREE.BackSide,
    });
    const rightOuterGlow = new THREE.Mesh(outerGlowGeometry, rightOuterGlowMaterial);
    rightOuterGlow.position.set(0.7, 0.6, 1.95);
    eyeGroup.add(rightOuterGlow);

    return {
        group: eyeGroup,
        leftEyeMaterial,
        rightEyeMaterial,
        leftOuterGlowMaterial,
        rightOuterGlowMaterial,
    };
};

export const createFireflies = (params: any, count: number) => {
    const fireflies: THREE.Mesh[] = [];
    const group = new THREE.Group();

    for (let i = 0; i < count; i++) {
        const fireflyGeom = new THREE.SphereGeometry(0.02, 2, 2);
        const fireflyMat = new THREE.MeshBasicMaterial({
            color: 0xffff44,
            transparent: true,
            opacity: 0.9,
        });
        const firefly = new THREE.Mesh(fireflyGeom, fireflyMat);
        firefly.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20
        );

        const glowGeom = new THREE.SphereGeometry(0.08, 8, 8);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0xffff88,
            transparent: true,
            opacity: 0.4,
            side: THREE.BackSide,
        });
        const glow = new THREE.Mesh(glowGeom, glowMat);
        firefly.add(glow);
        const light = new THREE.PointLight(0xffff44, 0.8, 3, 2);
        firefly.add(light);

        firefly.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * params.fireflySpeed,
                (Math.random() - 0.5) * params.fireflySpeed,
                (Math.random() - 0.5) * params.fireflySpeed
            ),
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 2 + Math.random() * 3,
            glowMat,
            fireflyMat,
            light,
        };
        group.add(firefly);
        fireflies.push(firefly);
    }
    return { group, fireflies };
};

export const createParticleSystem = (params: any) => {
    const particles: THREE.Mesh[] = [];
    const group = new THREE.Group();
    const pool: THREE.Mesh[] = [];

    const particleGeometries = [
        new THREE.SphereGeometry(0.05, 6, 6),
        new THREE.TetrahedronGeometry(0.04, 0),
        new THREE.OctahedronGeometry(0.045, 0),
    ];

    const particleBaseMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.particleColor],
        transparent: true,
        opacity: 0,
        alphaTest: 0.1,
    });

    const initPool = (count: number) => {
        for (let i = 0; i < count; i++) {
            const geom = particleGeometries[Math.floor(Math.random() * particleGeometries.length)];
            const p = new THREE.Mesh(geom, particleBaseMaterial.clone());
            p.visible = false;
            group.add(p);
            pool.push(p);
        }
    };

    const create = (origin: THREE.Vector3) => {
        let p;
        if (pool.length > 0) {
            p = pool.pop();
            if (p) p.visible = true;
        } else if (particles.length < params.particleCount) {
            const geom = particleGeometries[Math.floor(Math.random() * particleGeometries.length)];
            p = new THREE.Mesh(geom, particleBaseMaterial.clone());
            group.add(p);
        } else return null;

        if (!p) return null;

        const pColor = new THREE.Color(fluorescentColors[params.particleColor]);
        pColor.offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);
        const pMaterial = p.material as THREE.MeshBasicMaterial;
        pMaterial.color = pColor;

        // Position logic (relative to ghost)
        p.position.copy(origin);
        p.position.z -= 0.8 + Math.random() * 0.6;
        p.position.x += (Math.random() - 0.5) * 3.5;
        p.position.y += (Math.random() - 0.5) * 3.5 - 0.8;

        const s = 0.6 + Math.random() * 0.7;
        p.scale.set(s, s, s);
        p.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);

        p.userData.life = 1.0;
        p.userData.decay = Math.random() * 0.003 + params.particleDecayRate;
        p.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.015,
            y: (Math.random() - 0.5) * 0.015,
            z: (Math.random() - 0.5) * 0.015,
        };
        p.userData.velocity = {
            x: (Math.random() - 0.5) * 0.012,
            y: (Math.random() - 0.5) * 0.012 - 0.002,
            z: (Math.random() - 0.5) * 0.012 - 0.006,
        };
        pMaterial.opacity = Math.random() * 0.9;
        particles.push(p);
        return p;
    };

    const update = (time: number) => {
        // Return dead particles to pool
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            if (!p.visible || p.userData.life <= 0) {
                p.visible = false;
                (p.material as THREE.MeshBasicMaterial).opacity = 0;
                pool.push(p);
                particles.splice(i, 1);
                continue;
            }

            p.userData.life -= p.userData.decay;
            const particleMaterial = p.material as THREE.MeshBasicMaterial;
            particleMaterial.opacity = p.userData.life * 0.85;

            if (p.userData.velocity) {
                p.position.add(p.userData.velocity as THREE.Vector3);
                p.position.x += Math.cos(time * 1.8 + p.position.y) * 0.0008;
            }
            if (p.userData.rotationSpeed) {
                p.rotation.x += p.userData.rotationSpeed.x;
                p.rotation.y += p.userData.rotationSpeed.y;
                p.rotation.z += p.userData.rotationSpeed.z;
            }
        }
    };

    return { group, initPool, create, update, particles };
};
