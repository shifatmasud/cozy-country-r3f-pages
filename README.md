# Cozy Country: little pasture

A small interactive React Three Fiber scene built from statically extracted Cozy Country v2.6.5 Unity assets.

## Live scene

https://shifatmasud.github.io/cozy-country-r3f-pages/

## Project bundle

The GitHub release archive includes the complete runnable project, including its seven OBJ meshes and nine PNG textures:

https://github.com/shifatmasud/cozy-country-r3f-pages/releases/download/v1.0.0/cozy-country-r3f-scene.zip

Unzip it, then run:

```sh
npm install
npm run dev
```

Drag to orbit and scroll to zoom. `npm run build` creates the static build. GitHub Pages rebuilds from the same release archive when the workflow runs.

The source files are in this repository under `src/`; the selected asset map is in `public/assets/scene-assets.json`.

## Provenance

The mesh and texture files were statically extracted from the Cozy Country v2.6.5 Android package supplied for this task. The APK itself is not included. The app was not installed or executed. Asset provenance and rights limitations are documented in `ATTRIBUTION.md`. No redistribution rights are asserted.