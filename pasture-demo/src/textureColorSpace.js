import { NoColorSpace, SRGBColorSpace } from 'three'

// Color textures use sRGB; normal-map pixels encode vector data and stay linear.
export function getTextureColorSpace(id) {
  return id.endsWith('-normal') ? NoColorSpace : SRGBColorSpace
}
