import assert from 'node:assert/strict'
import { NoColorSpace, SRGBColorSpace } from 'three'
import { getTextureColorSpace } from '../src/textureColorSpace.js'

assert.equal(getTextureColorSpace('tree-bark-normal'), NoColorSpace)
for (const id of ['sheep-skin', 'wheat-atlas', 'tree-bark', 'tree-leaves', 'flower-albedo', 'grass-albedo', 'fence-albedo', 'rock-albedo']) {
  assert.equal(getTextureColorSpace(id), SRGBColorSpace, `${id} should be sampled as color data`)
}
console.log('Texture color-space checks passed: 1 linear normal map, 8 sRGB color maps.')
