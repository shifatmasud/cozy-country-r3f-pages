import assert from 'node:assert/strict'
import fs from 'node:fs'
import { DoubleSide, MeshStandardMaterial, NoColorSpace, SRGBColorSpace } from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { createSceneMaterial, sceneMaterialOptions } from '../src/sceneMaterials.js'
import { getTextureColorSpace } from '../src/textureColorSpace.js'

const ids = ['sheep', 'wheat', 'tree', 'flower', 'grass', 'fence', 'rock']
const expected = { sheep:'sheep-skin', wheat:'wheat-atlas', flower:'flower-albedo', grass:'grass-albedo', fence:'fence-albedo', rock:'rock-albedo' }
const textures = Object.fromEntries([...Object.values(expected), 'tree-bark', 'tree-leaves', 'tree-bark-normal'].map(id => [id, { id }]))
let count = 0
for (const id of ids) {
  const obj = new OBJLoader().parse(fs.readFileSync(new URL(`../public/assets/models/${id}.obj`, import.meta.url), 'utf8'))
  const meshes = []
  obj.traverse(child => { if (child.isMesh) meshes.push(child) })
  assert.ok(meshes.length, `${id} must contain a mesh`)
  for (const mesh of meshes) {
    const opt = sceneMaterialOptions(id, mesh.name, textures)
    const material = createSceneMaterial(id, mesh.name, textures)
    assert.ok(material instanceof MeshStandardMaterial, `${id} uses a real PBR material`)
    assert.equal(material.roughness, 0.88)
    assert.equal(material.metalness, 0)
    if (id === 'tree') {
      const bark = mesh.name === 'Branched_Tree_1A3_1_0'
      assert.ok(bark || mesh.name === 'Branched_Tree_1A3_1_1', `unexpected tree group ${mesh.name}`)
      assert.equal(opt.map, textures[bark ? 'tree-bark' : 'tree-leaves'])
      assert.equal(opt.normalMap, bark ? textures['tree-bark-normal'] : undefined)
      if (!bark) { assert.equal(opt.side, DoubleSide); assert.equal(opt.alphaTest, 0.3) }
    } else assert.equal(opt.map, textures[expected[id]])
    if (id === 'flower' || id === 'grass') { assert.equal(opt.side, DoubleSide); assert.equal(opt.alphaTest, 0.35) }
    count++
  }
}
assert.equal(count, 8)
assert.equal(sceneMaterialOptions('tree','unknown',textures).map, undefined)
assert.equal(sceneMaterialOptions('unknown','anything',textures).map, undefined)
assert.equal(sceneMaterialOptions('tree','Branched_Tree_1A3_1_0',{}).normalMap, undefined)
assert.equal(sceneMaterialOptions('sheep','sheep_low.001_0',{}).map, undefined)
assert.equal(getTextureColorSpace('tree-bark-normal'), NoColorSpace)
assert.equal(getTextureColorSpace('tree-bark'), SRGBColorSpace)
console.log('Scene material checks passed: 8 actual OBJ groups, PBR properties, named tree groups, missing resources and color spaces.')
