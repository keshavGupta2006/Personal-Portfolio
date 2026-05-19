// NO-JSX implementation: avoids babel plugin attribute injection on R3F intrinsics.
import { createElement as h, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- Bonfire logs ---------------- */
function Logs() {
  const logMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a0e08",
        roughness: 1,
        metalness: 0,
      }),
    []
  );

  const stones = Array.from({ length: 9 }).map((_, i) => {
    const a = (i / 9) * Math.PI * 2;
    return h(
      "mesh",
      {
        key: i,
        position: [Math.cos(a) * 1.25, 0, Math.sin(a) * 1.25],
        rotation: [0, (i * 1.27) % Math.PI, 0],
        castShadow: true,
        receiveShadow: true,
      },
      h("dodecahedronGeometry", { args: [0.22 + (i % 3) * 0.04, 0] }),
      h("meshStandardMaterial", { color: "#15110d", roughness: 1 })
    );
  });

  const logCfg = [
    { rot: [0, 0, Math.PI / 6], pos: [-0.05, 0.25, 0] },
    { rot: [0, 0, -Math.PI / 6], pos: [0.05, 0.25, 0] },
    { rot: [Math.PI / 6, 0, 0], pos: [0, 0.25, -0.05] },
    { rot: [-Math.PI / 6, 0, 0], pos: [0, 0.25, 0.05] },
  ];

  return h(
    "group",
    { position: [0, -0.85, 0] },
    ...stones,
    ...logCfg.map((c, i) =>
      h(
        "mesh",
        { key: `log-${i}`, rotation: c.rot, position: c.pos, material: logMat },
        h("cylinderGeometry", { args: [0.09, 0.09, 1.4, 10] })
      )
    ),
    h(
      "mesh",
      { position: [0, 0.02, 0], receiveShadow: true },
      h("cylinderGeometry", { args: [0.65, 0.75, 0.06, 24] }),
      h("meshStandardMaterial", { color: "#2a1a10", roughness: 1 })
    )
  );
}

/* ---------------- Flame ---------------- */
function Flame() {
  const inner = useRef();
  const outer = useRef();
  const light = useRef();
  const glow = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const flick = 1 + Math.sin(t * 18) * 0.06 + Math.sin(t * 31) * 0.04;
    const flickX = 1 + Math.sin(t * 22) * 0.05;
    if (inner.current) {
      inner.current.scale.set(flickX, flick, flickX);
      inner.current.position.y = -0.05 + Math.sin(t * 9) * 0.02;
    }
    if (outer.current) {
      outer.current.scale.set(flickX * 1.05, flick * 1.05, flickX * 1.05);
      outer.current.rotation.y = t * 0.4;
    }
    if (light.current) {
      light.current.intensity =
        8 + Math.sin(t * 14) * 1.6 + Math.sin(t * 7) * 0.8;
    }
    if (glow.current) {
      glow.current.material.opacity = 0.55 + Math.sin(t * 9) * 0.08;
    }
  });

  return h(
    "group",
    { position: [0, -0.2, 0] },
    h("pointLight", {
      ref: light,
      color: "#ffae5c",
      intensity: 9,
      distance: 14,
      decay: 2,
      position: [0, 0.4, 0],
      castShadow: true,
    }),
    h(
      "mesh",
      { ref: outer, position: [0, 0.1, 0] },
      h("coneGeometry", { args: [0.45, 1.4, 12, 1, true] }),
      h("meshBasicMaterial", {
        color: "#ff7a1a",
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    ),
    h(
      "mesh",
      { ref: inner, position: [0, -0.05, 0] },
      h("coneGeometry", { args: [0.28, 1, 10, 1, true] }),
      h("meshBasicMaterial", {
        color: "#ffd58a",
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    ),
    h(
      "mesh",
      { position: [0, -0.25, 0] },
      h("sphereGeometry", { args: [0.18, 16, 16] }),
      h("meshBasicMaterial", { color: "#fff1c2" })
    ),
    h(
      "mesh",
      { ref: glow, position: [0, -0.55, 0], rotation: [-Math.PI / 2, 0, 0] },
      h("circleGeometry", { args: [1.4, 32] }),
      h("meshBasicMaterial", {
        color: "#ff8a3c",
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
  );
}

/* ---------------- Embers ---------------- */
function Embers({ count = 220 }) {
  const ref = useRef();
  const data = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.6;
      arr[i * 3 + 1] = Math.random() * 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      seeds[i] = Math.random();
    }
    return { arr, seeds };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const s = data.seeds[i];
      pos[i * 3 + 1] += 0.008 + s * 0.012;
      pos[i * 3] += Math.sin(t * (0.6 + s) + s * 9) * 0.0035;
      pos[i * 3 + 2] += Math.cos(t * (0.5 + s) + s * 7) * 0.0035;
      if (pos[i * 3 + 1] > 2.6) {
        pos[i * 3] = (Math.random() - 0.5) * 0.4;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return h(
    "points",
    { ref, position: [0, -0.2, 0] },
    h(
      "bufferGeometry",
      null,
      h("bufferAttribute", {
        attach: "attributes-position",
        count,
        array: data.arr,
        itemSize: 3,
      })
    ),
    h("pointsMaterial", {
      color: "#ffb169",
      size: 0.045,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
  );
}

/* ---------------- Adventurer ---------------- */
function Adventurer({ position, rotation = [0, 0, 0], hood = "#0c0c10", cloak = "#0a0a0e" }) {
  return h(
    "group",
    { position, rotation },
    h(
      "mesh",
      { position: [0, 0.05, 0.1], castShadow: true },
      h("sphereGeometry", { args: [0.36, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2] }),
      h("meshStandardMaterial", { color: cloak, roughness: 1 })
    ),
    h(
      "mesh",
      { position: [0, 0.45, 0], castShadow: true },
      h("coneGeometry", { args: [0.38, 0.85, 12] }),
      h("meshStandardMaterial", { color: cloak, roughness: 1 })
    ),
    h(
      "mesh",
      { position: [0, 0.88, 0.02], castShadow: true },
      h("sphereGeometry", { args: [0.16, 14, 14] }),
      h("meshStandardMaterial", { color: "#19120c", roughness: 1 })
    ),
    h(
      "mesh",
      { position: [0, 0.93, -0.02], castShadow: true },
      h("coneGeometry", { args: [0.24, 0.45, 10] }),
      h("meshStandardMaterial", { color: hood, roughness: 1 })
    )
  );
}

/* ---------------- Mountains ---------------- */
function Mountains() {
  const peaks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      const x = -18 + i * 2.7 + (Math.random() - 0.5) * 0.8;
      const ht = 2.4 + Math.random() * 2.6;
      const w = 2.8 + Math.random() * 1.5;
      arr.push({ x, h: ht, w, z: -14 - Math.random() * 4 });
    }
    return arr;
  }, []);
  return h(
    "group",
    null,
    ...peaks.map((p, i) =>
      h(
        "mesh",
        { key: i, position: [p.x, p.h / 2 - 1, p.z] },
        h("coneGeometry", { args: [p.w, p.h, 4] }),
        h("meshStandardMaterial", { color: "#070810", roughness: 1 })
      )
    )
  );
}

/* ---------------- Trees ---------------- */
function Trees() {
  const trees = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (3.5 + Math.random() * 6);
      const z = -6 - Math.random() * 5;
      const ht = 1.2 + Math.random() * 1.4;
      arr.push({ x, z, h: ht });
    }
    return arr;
  }, []);
  return h(
    "group",
    null,
    ...trees.map((t, i) =>
      h(
        "group",
        { key: i, position: [t.x, -1, t.z] },
        h(
          "mesh",
          { position: [0, t.h * 0.6, 0] },
          h("coneGeometry", { args: [0.4, t.h, 6] }),
          h("meshStandardMaterial", { color: "#080a0c", roughness: 1 })
        ),
        h(
          "mesh",
          { position: [0, t.h * 1.1, 0] },
          h("coneGeometry", { args: [0.28, t.h * 0.6, 6] }),
          h("meshStandardMaterial", { color: "#06080a", roughness: 1 })
        )
      )
    )
  );
}

/* ---------------- Ground ---------------- */
function Ground() {
  return h(
    "mesh",
    { rotation: [-Math.PI / 2, 0, 0], position: [0, -1, 0], receiveShadow: true },
    h("circleGeometry", { args: [40, 64] }),
    h("meshStandardMaterial", { color: "#0a0d12", roughness: 1 })
  );
}

/* ---------------- Camera idle sway ---------------- */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.15) * 0.35;
    state.camera.position.y = 1.55 + Math.sin(t * 0.22) * 0.08;
    state.camera.lookAt(0, -0.1, 0);
  });
  return null;
}

/* ---------------- Inner scene ---------------- */
function SceneContents() {
  return h(
    Suspense,
    { fallback: null },
    h("fog", { attach: "fog", args: ["#0a0f24", 8, 22] }),
    h("ambientLight", { intensity: 0.22, color: "#4a5a80" }),
    h("directionalLight", { position: [-6, 10, -4], intensity: 0.4, color: "#8aa0cc" }),
    h(Stars, { radius: 80, depth: 40, count: 1200, factor: 2.5, fade: true, speed: 0.6 }),
    h(Mountains),
    h(Trees),
    h(Ground),
    h(Float, { speed: 0.6, rotationIntensity: 0, floatIntensity: 0.08 }, h(Logs)),
    h(Flame),
    h(Embers),
    h(Adventurer, { position: [-1.55, -0.95, 0.6], rotation: [0, 0.7, 0], hood: "#08080c" }),
    h(Adventurer, { position: [1.6, -0.95, 0.5], rotation: [0, -0.6, 0], hood: "#0c0a08", cloak: "#0e0a08" }),
    h(Adventurer, { position: [0.2, -0.95, -1.55], rotation: [0, Math.PI, 0], hood: "#0a0a10" }),
    h(CameraRig)
  );
}

/* ---------------- Scene root ---------------- */
export default function BonfireScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.6, 5.5], fov: 52 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      style={{ position: "absolute", inset: 0, background: "transparent" }}
    >
      <SceneContents />
    </Canvas>
  );
}
