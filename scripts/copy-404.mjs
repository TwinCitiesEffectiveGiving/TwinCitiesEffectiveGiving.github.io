import { cp, writeFile } from 'node:fs/promises'

const out = 'dist/twin-cities-effective-giving/browser'

await cp(`${out}/index.html`, `${out}/404.html`)
console.log('Copied index.html -> 404.html for GitHub Pages SPA fallback')

await writeFile(`${out}/.nojekyll`, '')
console.log('Created .nojekyll')
