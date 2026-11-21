# Cozy Country asset study

A React Three Fiber and Three.js study of the Cozy Country v2.6.5 Unity assets. The public site contains the WebGL 2 pasture scene and a browser for the extracted mesh and material records.

## Live site

https://shifatmasud.github.io/cozy-country-r3f-pages/

The full asset-browser build completed successfully on GitHub Pages. It statically reads the extracted asset archive during build; it does not install or execute the APK.

## Full browser source bundle

https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-r3f-full-browser.zip

Size: 1,862,494 bytes  
SHA-256: `e3f974ff8a20407cc64a7c690cecfd88d6047e89b43a82312a20328b857b005c`

This bundle includes the React Three Fiber/Three.js app, the mesh and material browser, and the safe static asset extractor. The Pages workflow downloads this bundle and the three-part source asset archive, verifies their checksums, extracts the files, checks inventory counts, builds the browser and deploys it.

## Full extracted asset archive

Download the three parts and concatenate them in order:

```sh
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part0
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part1
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part2
cat cozy-country-extracted-assets.tar.gz.part0 cozy-country-extracted-assets.tar.gz.part1 cozy-country-extracted-assets.tar.gz.part2 > cozy-country-extracted-assets.tar.gz
echo 'd6e87fb655369c0a60b7c579eecc782f76efdc6e5116b71f9e06c2d77627910f cozy-country-extracted-assets.tar.gz' | sha256sum -c -
tar -xzf cozy-country-extracted-assets.tar.gz
```

The archive is 250,252,263 bytes. It contains 1,329 OBJ meshes, 956 Unity material records, 237 animation clips, 139 legacy animation records, 13 animator controllers, 26 avatars, two avatar masks, four terrain-data files and 13 terrain-layer files. It includes 1,914 PNG exports from 1,942 Texture2D records and 670 initial PNG exports from 693 Sprite records. The extraction manifest and mesh/material relationship data are included.

Run the included safe extractor from the project directory:

```sh
python3 scripts/extract-public-assets.py ../cozy-country-extracted-assets.tar.gz public/assets src/generated/assetCatalog.json src/generated/threeMaterialsFull.json
```

It verifies the source archive checksum, rejects unsafe archive paths, checks the exported mesh/texture counts and validates available material texture references. The Pages workflow runs these checks before building.

## Recovered sprites and shader data

The recovered Sprite archive contains the 23 additional PNG exports and recovery manifest, bringing the Sprite total to 693/693:

https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-recovered-sprites.tar.gz

SHA-256: `456be520e71249197e9d9af81eac0b1a983f4396e6da4ff899d491b04c2e4829`

The supplemental archive contains serialized data for all 359 Shader objects, 30 ComputeShaders, one ShaderVariantCollection, two Texture2DArray objects, one Texture3D, three Cubemaps and two RenderTextures. Shader text has been confirmed for 357 of 359 Shader objects through the original and alternate extraction paths. Two have raw serialized data and metadata but no confirmed text dump.

Combine the two supplemental archive parts and verify before extracting:

```sh
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-supplemental-assets.tar.gz.part00
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-supplemental-assets.tar.gz.part01
cat cozy-country-supplemental-assets.tar.gz.part00 cozy-country-supplemental-assets.tar.gz.part01 > cozy-country-supplemental-assets.tar.gz
echo '017ca25c3dd2ec7e3cd282448357700558c0d4d2663d603b94c877d09f73cf61 cozy-country-supplemental-assets.tar.gz' | sha256sum -c -
tar -xzf cozy-country-supplemental-assets.tar.gz
```

The supplemental archive also contains raw data and metadata for all 28 Texture2D records whose PNG export initially failed. One additional texture was reconstructed from RGBAFloat data. Twenty-seven records have no pixel payload in the APK, so their pixels cannot be reconstructed from this package.

## Conversion coverage and limits

The static browser exposes 1,329 mesh exports and 956 material records. The converted material inventory categorizes 422 as Standard PBR, 78 as toon approximations and 53 as unlit; 403 custom-shader materials still use a generic PBR fallback. The small interactive pasture scene uses seven selected meshes and ten source-linked material records. Those counts describe available mappings, not 1:1 fidelity for every asset.

The exported 237 animation clips have not been converted into playable Three.js animation tracks. Two shaders have no confirmed text dump, and the 27 Texture2D records without pixel payload plus one additional failed decode remain image gaps. Full 1:1 conversion of every original model, texture, material and shader has not been achieved.

## Provenance and rights

The source APK was labeled as a modified Cozy Country 2.6.5 package from APKAward. The APK itself is not included, and the app was not installed or executed. These are third-party game assets; redistribution rights have not been verified. No ownership or permission is asserted. See `ATTRIBUTION.md`.