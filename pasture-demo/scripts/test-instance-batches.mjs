import assert from 'node:assert/strict'
import { BoxGeometry, Euler, Group, Matrix4, Mesh, MeshBasicMaterial, Quaternion, Vector3 } from 'three'
import { createInstanceBatches } from '../src/instanceBatches.js'

const root = new Group()
root.position.set(2, -1, 3)
root.scale.setScalar(1.5)
const material = new MeshBasicMaterial()
const first = new Mesh(new BoxGeometry(1, 1, 1), material)
first.position.set(0.5, 0.25, -1)
const second = new Mesh(new BoxGeometry(2, 1, 1), material)
second.position.set(-1, 0, 0.5)
root.add(first, second)
const placements = [
  { position: [10, 2, -3], rotation: [0, Math.PI / 2, 0], scale: 0.5 },
  { position: [-4, 1, 7], scale: 2 }
]
const batches = createInstanceBatches(root, placements)
assert.equal(batches.length, 2, 'each source mesh should keep its own geometry/material batch')
assert.deepEqual(batches.map(batch => batch.matrices.length), [2, 2], 'each mesh should carry both placements')
assert.equal(batches[0].geometry, first.geometry)
assert.equal(batches[0].material, material)

for (const [meshIndex, sourceMesh] of [first, second].entries()) {
  for (const [placementIndex, item] of placements.entries()) {
    const placeMatrix = new Matrix4().compose(
      new Vector3(...item.position),
      new Quaternion().setFromEuler(new Euler(...(item.rotation ?? [0, 0, 0]))),
      new Vector3(item.scale ?? 1, item.scale ?? 1, item.scale ?? 1)
    )
    const expected = placeMatrix.multiply(sourceMesh.matrixWorld.clone())
    assert.ok(batches[meshIndex].matrices[placementIndex].equals(expected), `mesh ${meshIndex}, placement ${placementIndex} should retain its full nested transform`)
  }
}

assert.throws(() => createInstanceBatches(root, []), /non-empty/)
assert.throws(() => createInstanceBatches({}, placements), /Object3D/)
console.log('Model instancing checks passed: 2 source meshes × 2 transformed placements; geometry, material, and nested transforms are preserved.')
