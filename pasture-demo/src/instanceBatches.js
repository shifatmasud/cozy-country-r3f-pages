import { Euler, Matrix4, Quaternion, Vector3 } from 'three'

export function createInstanceBatches(asset, placements) {
  if (!asset || typeof asset.traverse !== 'function') throw new TypeError('asset must be a Three.js Object3D')
  if (!Array.isArray(placements) || placements.length === 0) throw new TypeError('placements must be a non-empty array')

  asset.updateMatrixWorld(true)
  const batches = []
  asset.traverse(child => {
    if (!child.isMesh || !child.geometry || !child.material) return
    const matrices = placements.map(({ position, rotation = [0, 0, 0], scale = 1 }) => {
      if (!Array.isArray(position) || position.length !== 3 || !Array.isArray(rotation) || rotation.length !== 3 || !Number.isFinite(scale)) {
        throw new TypeError('each placement needs a 3D position, 3D rotation, and finite scale')
      }
      const placementMatrix = new Matrix4().compose(
        new Vector3(...position),
        new Quaternion().setFromEuler(new Euler(...rotation)),
        new Vector3(scale, scale, scale)
      )
      return placementMatrix.multiply(child.matrixWorld.clone())
    })
    batches.push({ geometry: child.geometry, material: child.material, matrices })
  })
  return batches
}