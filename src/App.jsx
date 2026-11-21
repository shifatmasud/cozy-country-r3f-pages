import React, { Suspense, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Box3, DoubleSide, SRGBColorSpace, TextureLoader, Vector3 } from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

const base = `${import.meta.env.BASE_URL}assets/`
const modelIds = ['sheep', 'wheat', 'tree', 'flower', 'grass', 'fence', 'rock']
const textureIds = ['sheep-skin', 'wheat-atlas', 'tree-bark', 'tree-leaves', 'tree-bark-normal', 'flower-albedo', 'grass-albedo', 'fence-albedo', 'rock-albedo']
const modelFiles = Object.fromEntries(modelIds.map(id => [id, `${base}models/${id}.obj`]))
const textureFiles = Object.fromEntries(textureIds.map(id => [id, `${base}textures/${id}.png`]))
const sizeY = { sheep: 1.38, wheat: 1.02, tree: 5.6, flower: 0.58, grass: 0.58, fence: 0.72, rock: 0.66 }
const textureFor = { sheep: 'sheep-skin', wheat: 'wheat-atlas', flower: 'flower-albedo', grass: 'grass-albedo', fence: 'fence-albedo', rock: 'rock-albedo' }

function LoadedPasture() {
  const loadedModels = useLoader(OBJLoader, modelIds.map(id => modelFiles[id]))
  const loadedTextures = useLoader(TextureLoader, textureIds.map(id => textureFiles[id]))
  const assets = useMemo(() => {
    const maps = Object.fromEntries(textureIds.map((id, i) => {
      const tex = loadedTextures[i]
      tex.colorSpace = SRGBColorSpace
      tex.anisotropy = 8
      return [id, tex]
    }))
    return Object.fromEntries(modelIds.map((id, i) => {
      const object = loadedModels[i].clone(true)
      let childIndex = 0
      object.traverse(child => {
        if (!child.isMesh) return
        let mapId = textureFor[id]
        let normalMap
        let alphaTest = 0
        let side = undefined
        if (id === 'tree') {
          mapId = childIndex === 0 ? 'tree-bark' : 'tree-leaves'
          if (childIndex === 0) normalMap = maps['tree-bark-normal']
          else { alphaTest = 0.3; side = DoubleSide }
        } else if (id === 'flower' || id === 'grass') {
          alphaTest = 0.35
          side = DoubleSide
        }
        childIndex++
        child.material = new (child.material.constructor)({
          map: maps[mapId], normalMap, roughness: 0.88, metalness: 0,
          alphaTest, transparent: false, side
        })
        child.castShadow = true
        child.receiveShadow = true
      })
      object.updateMatrixWorld(true)
      const bounds = new Box3().setFromObject(object)
      const center = bounds.getCenter(new Vector3())
      const height = Math.max(0.001, bounds.max.y - bounds.min.y)
      const scale = sizeY[id] / height
      object.scale.setScalar(scale)
      object.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale)
      return [id, object]
    }))
  }, [loadedModels, loadedTextures])
  return <>
    <hemisphereLight intensity={1.05} color="#fff7dc" groundColor="#6e7955" />
    <ambientLight intensity={0.38} />
    <directionalLight position={[-5, 11, 7]} intensity={2.25} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={12} shadow-camera-bottom={-12} />
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.035, 0]} receiveShadow>
      <planeGeometry args={[16, 12]} />
      <meshStandardMaterial color="#88ad70" roughness={1} />
    </mesh>
    <mesh rotation-x={-Math.PI / 2} position={[0.1, -0.022, 2.15]} receiveShadow>
      <planeGeometry args={[7.4, 1.12]} />
      <meshStandardMaterial color="#d8c49a" roughness={1} />
    </mesh>
    <mesh rotation-x={-Math.PI / 2} position={[3.25, -0.018, 2.1]}>
      <circleGeometry args={[1.08, 48]} />
      <meshStandardMaterial color="#83c3c7" roughness={0.28} metalness={0.05} />
    </mesh>

    <Model asset={assets.tree} position={[-4.2, 0, -2.45]} rotation={[-0.05, -0.25, 0]} />
    <Model asset={assets.tree} position={[-5.45, 0, 0.55]} rotation={[0, 0.55, 0]} scale={0.74} />

    {[
      [-1.45, 0, -0.1, 0], [-0.25, 0, -0.1, 0], [0.95, 0, -0.1, 0], [2.15, 0, -0.1, 0],
      [-1.45, 0, -1.15, 0], [-0.25, 0, -1.15, 0], [0.95, 0, -1.15, 0], [2.15, 0, -1.15, 0],
      [-1.65, 0, 1.0, Math.PI / 2], [-1.65, 0, 2.05, Math.PI / 2], [2.65, 0, 0.55, Math.PI / 2], [2.65, 0, 1.65, Math.PI / 2]
    ].map((p, i) => <Model key={`fence-${i}`} asset={assets.fence} position={p.slice(0, 3)} rotation={[0, p[3], 0]} scale={0.92} />)}

    {[[-1.05, 0, 0.68, 0.1], [0.2, 0, 0.8, -0.45], [1.35, 0, 0.55, 0.35], [-0.55, 0, 2.45, 1.1]].map((p, i) => <Model key={`sheep-${i}`} asset={assets.sheep} position={p.slice(0, 3)} rotation={[0, p[3], 0]} />)}

    {Array.from({ length: 18 }, (_, i) => {
      const row = Math.floor(i / 6), col = i % 6
      return <Model key={`wheat-${i}`} asset={assets.wheat} position={[0.18 + col * 0.32, 0, -2.25 + row * 0.43]} rotation={[0, ((i * 17) % 35) * Math.PI / 180, 0]} scale={0.58} />
    })}

    {[
      [-3.45, 0, 1.55, 0.2], [-2.85, 0, 2.85, 0.7], [0.4, 0, 3.25, 1.1], [2.35, 0, -2.25, 0.5],
      [4.25, 0, 1.45, 1.5], [-5.2, 0, -1.0, 0.3]
    ].map((p, i) => <Model key={`rock-${i}`} asset={assets.rock} position={p.slice(0, 3)} rotation={[0, p[3], 0]} scale={0.48} />)}

    {[
      [-3.4, 0, 0.1, 0], [-2.8, 0, 0.65, 0.9], [-2.2, 0, 2.8, 0.3], [0.05, 0, 3.0, 1.8],
      [1.9, 0, 2.95, 0.45], [4.0, 0, 0.35, 2.4], [4.5, 0, 2.7, 1.3], [-4.75, 0, 1.25, 0.6]
    ].map((p, i) => <Model key={`flower-${i}`} asset={assets.flower} position={p.slice(0, 3)} rotation={[0, p[3], 0]} scale={1.16} />)}

    {[
      [-4.2, 0, 1.8, 0.3], [-3.8, 0, 2.2, 1.3], [-0.2, 0, 3.55, 1.8], [1.1, 0, 3.4, 0.6],
      [3.85, 0, 2.75, 2.0], [4.8, 0, 0.55, 0.2], [-4.7, 0, -0.8, 1.2], [0.7, 0, -2.7, 0.7]
    ].map((p, i) => <Model key={`grass-${i}`} asset={assets.grass} position={p.slice(0, 3)} rotation={[0, p[3], 0]} scale={1.3} />)}

    <OrbitControls makeDefault target={[0, 1, 0.15]} enableDamping dampingFactor={0.08} minDistance={8} maxDistance={22} maxPolarAngle={Math.PI / 2.05} />
  </>
}

function Model({ asset, position, rotation = [0, 0, 0], scale = 1 }) {
  const instance = useMemo(() => asset.clone(true), [asset])
  return <primitive object={instance} position={position} rotation={rotation} scale={scale} />
}

export default function App() {
  return <main className="app-shell">
    <Canvas className="scene-canvas" shadows dpr={[1, 1.5]} camera={{ position: [10, 9, 12], fov: 34 }} gl={{ antialias: true, alpha: false }}>
      <color attach="background" args={['#d5e4dc']} />
      <Suspense fallback={null}><LoadedPasture /></Suspense>
    </Canvas>
    <header className="title-card">
      <div className="eyebrow">A LITTLE PASTURE</div>
      <h1>Cozy Country</h1>
      <p>quiet morning at the edge of the wheat field</p>
    </header>
    <aside className="scene-note">
      <span className="dot" /> drag to orbit <span className="separator">·</span> scroll to zoom
    </aside>
    <footer className="asset-note">7 extracted models <span>·</span> original mesh and texture files</footer>
  </main>
}
