# Cozy Country: little pasture

A small interactive React Three Fiber scene assembled from statically extracted Cozy Country v2.6.5 assets.

## Full runnable bundle

The complete project bundle, including its seven OBJ meshes and nine PNG textures, is stored in the user's private Google Drive:

https://drive.google.com/file/d/14Bjo3YqQqlyPH0jzdbkZzdl5tzktlTzm/view?usp=drivesdk

Download and unzip that bundle to get the ready-to-run project. To run the code in this repository instead, copy `public/assets/models` and `public/assets/textures` from the bundle into the matching paths here, then run:

```sh
npm install
npm run dev
```

Drag to orbit and scroll to zoom. `npm run build` creates the static build.

## Asset collection and limitations

The full accessible static extraction is archived in three private Google Drive parts. Concatenate parts 0, 1, and 2 in order, then extract the resulting gzip tar archive:

https://drive.google.com/file/d/1QqCYyfU4KfvLAYX3XLL8yOXkeLXM07dE/view?usp=drivesdk
https://drive.google.com/file/d/1RomVK05mSfD4aHAf_qjqGqalx7aFmdeO/view?usp=drivesdk
https://drive.google.com/file/d/1tBN8T9qLEA8uAYgQzQmixtsEHOQxU104/view?usp=drivesdk

The scene uses static meshes. Unity animation clips and controller/rig metadata are preserved in the extraction archive as raw JSON and are not played in this Three.js scene. Some source textures and sprites could not be exported; failures are listed in the extraction manifest.

## Provenance and rights

The APK was supplied by the user and is labeled as a modified build by APKAward. It was statically analyzed and not installed or executed. The APK itself is not in this repository. The extracted models and textures are game assets; no ownership or redistribution permission is claimed. This repository and Drive files are intended to remain private unless the publisher's terms or written permission allow broader distribution.

The scene build succeeded, and a headless Chrome test created a WebGL2 context, loaded all 16 included model and texture files, and reported no JavaScript console errors. Visual inspection was limited to a reduced screenshot; not every model or texture was separately reviewed at full size.