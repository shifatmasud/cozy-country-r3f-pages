from pathlib import Path
import sys

if len(sys.argv) != 2:
    raise SystemExit('usage: apply-webgl2-preflight.py PROJECT_DIR')
app = Path(sys.argv[1]) / 'src' / 'App.jsx'
source = app.read_text()
if 'function canCreateWebGL2Context()' in source or 'webgl2Available' in source:
    raise SystemExit('WebGL 2 preflight already exists; refusing to apply twice')
replacements = [
    ("import React, { Suspense, useMemo, useState } from 'react'", "import React, { Suspense, useEffect, useMemo, useState } from 'react'"),
    ('function WebGLFallback() {', '''function canCreateWebGL2Context() {
  if (typeof document === 'undefined') return false
  try {
    const probe = document.createElement('canvas')
    const context = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: false })
    if (!context) return false
    context.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

function WebGLFallback() {'''),
    ('return <div className="webgl-fallback">', 'return <div className="webgl-fallback" role="status" aria-live="polite">'),
    ("const [mode, setMode] = useState('pasture')", "const [webgl2Available, setWebgl2Available] = useState(null)\n    useEffect(() => { setWebgl2Available(canCreateWebGL2Context()) }, [])\n    const [mode, setMode] = useState('pasture')"),
    ('<Canvas className="scene-canvas"', '{webgl2Available === true ? <Canvas className="scene-canvas"'),
    ('</Canvas>', '</Canvas> : webgl2Available === false ? <WebGLFallback /> : null}'),
]
for old, new in replacements:
    count = source.count(old)
    if count != 1:
        raise SystemExit(f'expected one anchor, found {count}: {old[:100]!r}')
    source = source.replace(old, new, 1)
app.write_text(source)
print('Applied explicit WebGL 2 preflight; the full asset browser remains outside the 3D gate.')
