# Cozy Country: little pasture

A small interactive React Three Fiber scene built from statically extracted Cozy Country v2.6.5 Unity assets.

## Live scene

https://shifatmasud.github.io/cozy-country-r3f-pages/

## Project bundle

The release includes the complete runnable project with seven OBJ meshes and nine PNG textures:

https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-r3f-scene.zip

Unzip it, then run:

```sh
npm install
npm run dev
```

Drag to orbit and scroll to zoom. `npm run build` creates the static build. GitHub Pages rebuilds from the same project bundle when the workflow runs.

## Full extracted asset collection

The complete exported asset archive is attached to the same GitHub release as three ordered parts. Download all three, concatenate them in this order, verify the checksum, then extract:

```sh
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part0
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part1
curl -L -O https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-extracted-assets.tar.gz.part2
cat cozy-country-extracted-assets.tar.gz.part0 cozy-country-extracted-assets.tar.gz.part1 cozy-country-extracted-assets.tar.gz.part2 > cozy-country-extracted-assets.tar.gz
echo 'd6e87fb655369c0a60b7c579eecc782f76efdc6e5116b71f9e06c2d77627910f  cozy-country-extracted-assets.tar.gz' | sha256sum -c -
tar -xzf cozy-country-extracted-assets.tar.gz
```

The 250,252,263-byte compressed archive contains the full accessible extraction: 1,329 OBJ meshes, 956 material records, 237 animation clips, 139 legacy animation records, 13 animator controllers, 26 avatars, two avatar masks, four terrain-data files, and 13 terrain-layer files. It includes 1,914 of 1,942 Texture2D records and 670 of 693 sprite records; 28 textures and 23 sprites were not exported. The full extraction manifest is in the archive. The small Pages scene uses a selected subset of seven meshes and nine textures, listed in `public/assets/scene-assets.json`.

The extracted collection is stored in GitHub release attachments, rather than as individual files on the `main` branch. The release attachments are part of this repository.

## Provenance

The mesh and texture files were statically extracted from the Cozy Country v2.6.5 Android package supplied for this task. The APK itself is not included. The app was not installed or executed. Asset provenance and rights limitations are documented in `ATTRIBUTION.md`. No redistribution rights are asserted.
