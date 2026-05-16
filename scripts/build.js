const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'src');
const dist = path.join(__dirname, '..', 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const file of ['index.html','styles.css','main.js']) {
  fs.copyFileSync(path.join(src, file), path.join(dist, file));
}
console.log('Build complete: dist ready');
