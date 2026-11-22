import { DoubleSide, MeshStandardMaterial } from 'three'

// The OBJ exports omit usemtl records. Tree group names are explicit so their
// existing bark/leaf approximations do not depend on mesh traversal order.
const singleMap = {
  sheep: 'sheep-skin', wheat: 'wheat-atlas', flower: 'flower-albedo',
  grass: 'grass-albedo', fence: 'fence-albedo', rock: 'rock-albedo'
}
const treeGroups = {
  Branched_Tree_1A3_1_0: { mapId: 'tree-bark', normalId: 'tree-bark-normal' },
  Branched_Tree_1A3_1_1: { mapId: 'tree-leaves', alphaTest: 0.3, side: DoubleSide }
}

export function sceneMaterialOptions(modelId, meshName, textures = {}) {
  const entry = modelId === 'tree' ? treeGroups[meshName] :
    singleMap[modelId] ? { mapId: singleMap[modelId] } : undefined
  // Unknown groups and missing textures remain renderable instead of receiving
  // an arbitrary leaf/bark map. This is an approximation, not Unity parity.
  const options = { roughness: 0.88, metalness: 0, transparent: false }
  if (!entry) return options
  if (textures[entry.mapId]) options.map = textures[entry.mapId]
  if (entry.normalId && textures[entry.normalId]) options.normalMap = textures[entry.normalId]
  if (entry.alphaTest) options.alphaTest = entry.alphaTest
  if (entry.side !== undefined) options.side = entry.side
  if (modelId === 'flower' || modelId === 'grass') {
    options.alphaTest = 0.35
    options.side = DoubleSide
  }
  return options
}

export function createSceneMaterial(modelId, meshName, textures) {
  return new MeshStandardMaterial(sceneMaterialOptions(modelId, meshName, textures))
}
