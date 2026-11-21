# Cozy Country: little pasture

A small interactive React Three Fiber scene built from statically extracted Cozy Country v2.6.5 Unity assets.

## Live scene

https://shifatmasud.github.io/cozy-country-r3f-pages/

## Project bundle

The release includes the runnable project with seven OBJ meshes and nine PNG textures:

https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-r3f-scene.zip

Unzip it, then run:

```sh
npm install
npm run dev
```

Drag to orbit and scroll to zoom. `npm run build` creates the static build. The Pages workflow builds this project.

## Full extracted asset collection

The first archive contains the extracted meshes, materials, textures, animations, avatars, terrain data, and relationship manifest. Download all three parts, concatenate in order, verify, then extract:

```sh
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part0
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part1
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part2
cat cozy-country-extracted-assets.tar.gz.part0 cozy-country-extracted-assets.tar.gz.part1 cozy-country-extracted-assets.tar.gz.part2 > cozy-country-extracted-assets.tar.gz
echo 'd6e87fb655369c0a60b7c579eecc782f76efdc6e5116b71f9e06c2d77627910f  cozy-country-extracted-assets.tar.gz' | sha256sum -c -
tar -xzf cozy-country-extracted-assets.tar.gz
```

This 250,252,263-byte archive contains 1,329 OBJ meshes, 956 material records, 237 animation clips, 139 legacy animation records, 13 animator controllers, 26 avatars, two avatar masks, four terrain-data files, and 13 terrain-layer files. It includes 1,914 of 1,942 Texture2D PNG exports and 670 of 693 sprite PNG exports. The original extraction manifest and `asset_relationships.json` are included.

## Supplemental shaders and texture records

The supplemental archive adds serialized Unity shader and additional texture-class data. Download both parts and reassemble them:

```sh
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-supplemental-assets.tar.gz.part00
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-supplemental-assets.tar.gz.part01
cat cozy-country-supplemental-assets.tar.gz.part00 cozy-country-supplemental-assets.tar.gz.part01 > cozy-country-supplemental-assets.tar.gz
echo '017ca25c3dd2ec7e3cd282448357700558c0d4d2663d603b94c877d09f73cf61  cozy-country-supplemental-assets.tar.gz' | sha256sum -c -
tar -xzf cozy-country-supplemental-assets.tar.gz
```

The supplemental manifest records 359 Shader objects, 30 ComputeShader objects, one ShaderVariantCollection, two Texture2DArray objects, one Texture3D, three Cubemaps, and two RenderTextures. Shader serialized data and parsed JSON are included for all 359 shaders; UnityPy generated text dumps for 285, while parsing failed for 74, so those 74 are represented by their raw Unity serialization and metadata rather than a recovered shader text dump. The archive also includes raw serialized data and metadata for all 28 Texture2D records that failed PNG export; a display PNG was reconstructed for PropTex from its RGBAFloat data. The other 27 Texture2D records have zero dimensions and no inline pixel data or stream path in the APK, so their pixels could not be reconstructed. The original extraction recorded 23 additional Sprite PNG export failures.

The small Pages scene uses a selected subset of seven meshes and nine textures, listed in `public/assets/scene-assets.json`.

The full and supplemental extraction archives are attached to the public v1.0.0 release, rather than stored as individual files on the `main` branch:

https://github.com/shifatmasud/cozy-country-r3f-pages/releases/tag/v1.0.0

## Provenance and limitations

The files were statically extracted from the Cozy Country v2.6.5 Android package supplied for this task. The APK itself is not included, and the app was not installed or executed. Asset provenance and redistribution rights are not verified; this repository does not assert permission to redistribute the original game assets.
