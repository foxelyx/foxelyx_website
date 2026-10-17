"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const ITEMS = [
  { kind: "text", text: "We", line: 0 },
  { kind: "logo", line: 0 },
  { kind: "text", text: "Build", line: 0 },
  { kind: "text", text: "Digital", line: 1 },
  { kind: "text", text: "Services", line: 1 },
] as const;

const LOGO_ASPECT = 300 / 312;

type ScrollState = { word: number; cover: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutBack(value: number) {
  const c1 = 1.2;
  const c3 = c1 + 1;
  return 1 + c3 * (value - 1) ** 3 + c1 * (value - 1) ** 2;
}

function reveal(progress: number, index: number) {
  const stagger = 0.7 / Math.max(ITEMS.length - 1, 1);
  const start = index * stagger;
  return clamp((progress - start) / 0.3, 0, 1);
}

function readScroll(): ScrollState {
  const track = document.querySelector("[data-particle-scroll]");
  if (!(track instanceof HTMLElement)) return { word: 1, cover: 0 };
  const scrolled = Math.max(-track.getBoundingClientRect().top, 0);
  const wordDistance = Math.max(track.offsetHeight - window.innerHeight * 2, 1);
  return {
    word: clamp(scrolled / wordDistance, 0, 1),
    cover: clamp((scrolled - wordDistance) / window.innerHeight, 0, 1),
  };
}

const particleVertexShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uHoverRadius;
  uniform float uForce;
  uniform float uSize;
  attribute float aRandom;
  attribute vec3 aColor;

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;
    vColor = aColor;

    pos.x += sin(uTime * 0.5 + aRandom * 10.0) * 0.08;
    pos.y += cos(uTime * 0.5 + aRandom * 10.0) * 0.08;

    vec3 fromMouse = pos - vec3(uMouse.xy, 0.0);
    float dist = length(fromMouse.xy);

    if (dist < uHoverRadius && dist > 0.0001) {
      vec3 dir = normalize(fromMouse);
      float force = (1.0 - (dist / uHoverRadius)) * uForce;
      pos += dir * force;
      pos.z += sin(dist * 10.0) * force * 0.5;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * (0.65 + aRandom * 0.7) * (1.0 / -mvPosition.z);
    vAlpha = 1.0 - smoothstep(0.0, 4.0, abs(pos.z - position.z));
  }
`;

const particleFragmentShader = `
  uniform float uOpacity;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    float distToCenter = distance(gl_PointCoord, vec2(0.5));
    if (distToCenter > 0.5) discard;
    gl_FragColor = vec4(vColor, vAlpha * uOpacity);
  }
`;

function createSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const gray = new THREE.Color("#8892b0");
  const accent = new THREE.Color("#f97316");

  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.76 + Math.random() * 0.24);
    const sinPhi = Math.sin(phi);

    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    randoms[i] = Math.random();

    const color = Math.random() < 0.07 ? accent : gray;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return { positions, colors, randoms };
}

function useLogoTexture() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    const loaded = loader.load("/images/foxelyx-mark.png", (next) => {
      if (!active) {
        next.dispose();
        return;
      }
      next.colorSpace = THREE.SRGBColorSpace;
      next.anisotropy = 8;
      setTexture(next);
    });
    return () => {
      active = false;
      loaded.dispose();
    };
  }, []);

  return texture;
}

function ScrollHeadline({
  compact,
  scrollRef,
}: {
  compact: boolean;
  scrollRef: MutableRefObject<ScrollState>;
}) {
  const fontSize = compact ? 0.3 : 0.46;
  const logoHeight = fontSize * 0.98;
  const logoWidth = logoHeight * LOGO_ASPECT;
  const logoMap = useLogoTexture();
  const widths = useRef(
    ITEMS.map((item) => (item.kind === "logo" ? logoWidth : 0)),
  );
  const bases = useRef(ITEMS.map(() => ({ x: 0, y: 0 })));
  const wordRefs = useRef<Array<THREE.Mesh | null>>([]);

  const layout = () => {
    if (widths.current.some((width) => width <= 0)) return;
    const gap = fontSize * 0.28;
    const lineShift = fontSize * 0.62;
    const lines = [0, 1].map((line) =>
      ITEMS.map((item, index) => (item.line === line ? index : -1)).filter((index) => index >= 0),
    );

    lines.forEach((indices, line) => {
      const total =
        indices.reduce((sum, index) => sum + widths.current[index], 0) +
        gap * (indices.length - 1);
      let cursor = -total / 2;
      for (const index of indices) {
        const width = widths.current[index];
        bases.current[index] = {
          x: cursor + width / 2,
          y: line === 0 ? lineShift : -lineShift,
        };
        cursor += width + gap;
      }
    });
  };

  useFrame(() => {
    const progress = scrollRef.current.word;
    const cover = scrollRef.current.cover;

    ITEMS.forEach((_, index) => {
      const mesh = wordRefs.current[index];
      if (!mesh) return;
      const amount = easeOutBack(reveal(progress, index));
      const settled = Math.min(Math.max(amount, 0), 1.08);
      const base = bases.current[index];
      mesh.position.x = base.x;
      mesh.position.y = base.y + (1 - settled) * fontSize * 0.22;
      mesh.scale.setScalar(0.84 + settled * 0.16);
      const opacity = Math.min(Math.max(amount, 0), 1) * (1 - cover);
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        material.opacity = opacity;
        material.transparent = true;
        material.depthWrite = opacity > 0.92;
      }
      mesh.visible = opacity > 0.02;
    });
  });

  return (
    <group>
      {ITEMS.map((item, index) =>
        item.kind === "logo" ? (
          logoMap ? (
            <mesh
              key="logo"
              ref={(node) => {
                wordRefs.current[index] = node;
              }}
              renderOrder={1}
            >
              <planeGeometry args={[logoWidth, logoHeight]} />
              <meshBasicMaterial
                map={logoMap}
                transparent
                opacity={0}
                toneMapped={false}
                depthWrite={false}
              />
            </mesh>
          ) : null
        ) : (
          <Text
            key={item.text}
            ref={(node) => {
              wordRefs.current[index] = node as THREE.Mesh | null;
            }}
            font="/fonts/Inter-SemiBold.woff"
            fontSize={fontSize}
            color="#0b0b0b"
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.04}
            material-toneMapped={false}
            material-transparent
            material-opacity={0}
            material-depthWrite={false}
            onSync={(troika) => {
              const bounds = troika.textRenderInfo?.blockBounds as
                | [number, number, number, number]
                | undefined;
              if (!bounds) return;
              const width = bounds[2] - bounds[0];
              if (width > 0 && Math.abs(widths.current[index] - width) > 0.001) {
                widths.current[index] = width;
                layout();
              }
            }}
          >
            {item.text}
          </Text>
        ),
      )}
    </group>
  );
}

function ParticleField({ count, compact }: { count: number; compact: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const hovered = useRef(false);
  const mouseTarget = useRef(new THREE.Vector3(0, 99, 0));
  const tilt = useRef({ x: 0, y: 0 });
  const scrollRef = useRef<ScrollState>({ word: 0, cover: 0 });
  const geometry = useMemo(
    () => createSphere(count, compact ? 1.5 : 1.85),
    [count, compact],
  );
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 99, 0) },
      uHoverRadius: { value: compact ? 0.82 : 1.02 },
      uForce: { value: compact ? 1.25 : 1.65 },
      uSize: { value: compact ? 14 : 11 },
      uOpacity: { value: 0.85 },
    }),
    [compact],
  );

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
      pointer.current.active = true;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const points = pointsRef.current;
    const material = materialRef.current;
    if (!group || !points || !material) return;

    const step = Math.min(delta, 0.05);
    points.rotation.y += step * 0.11;
    points.rotation.x += step * 0.04;

    tilt.current.x += (pointer.current.y * -0.12 - tilt.current.x) * Math.min(step * 2.4, 1);
    tilt.current.y += (pointer.current.x * 0.16 - tilt.current.y) * Math.min(step * 2.4, 1);
    group.rotation.x = tilt.current.x;
    group.rotation.y = tilt.current.y;

    scrollRef.current = readScroll();
    const cover = scrollRef.current.cover;
    points.scale.setScalar(1 + cover * 0.5);

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uOpacity.value = 0.85 * (1 - cover * 0.92);

    if (pointer.current.active) {
      const { viewport } = state;
      mouseTarget.current.set(
        (pointer.current.x * viewport.width) / 2,
        (-pointer.current.y * viewport.height) / 2,
        0,
      );
      group.updateMatrixWorld(true);
      points.worldToLocal(mouseTarget.current);
      const mouse = material.uniforms.uMouse.value as THREE.Vector3;
      if (!hovered.current) {
        mouse.copy(mouseTarget.current);
        hovered.current = true;
      } else {
        mouse.lerp(mouseTarget.current, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry onUpdate={(geo) => geo.computeBoundingSphere()}>
          <bufferAttribute
            attach="attributes-position"
            args={[geometry.positions, 3]}
          />
          <bufferAttribute attach="attributes-aColor" args={[geometry.colors, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[geometry.randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          toneMapped={false}
          uniforms={uniforms}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
        />
      </points>
      <ScrollHeadline compact={compact} scrollRef={scrollRef} />
    </group>
  );
}

export function ParticleScene() {
  const [compact] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [count] = useState(() => (compact ? 4800 : 14000));
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const track = document.querySelector("[data-particle-scroll]");
      const rect = track?.getBoundingClientRect();
      const next = rect ? rect.bottom > 0 && rect.top < window.innerHeight : true;
      setRunning((current) => (current === next ? current : next));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="particle-hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, compact ? 7.2 : 5.8], fov: 48 }}
        dpr={count > 8000 ? [1, 1.5] : [1, 1.25]}
        frameloop={running ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none" }}
      >
        <color attach="background" args={["#ffffff"]} />
        <Suspense fallback={null}>
          <ParticleField count={count} compact={compact} />
        </Suspense>
      </Canvas>
    </div>
  );
}
