const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const markdown = fs.readFileSync(path.join(root, 'README.md'), 'utf8')
  .replace(/assets\/(hero|flow)(-mobile)?(-light)?\.svg/g, 'assets/$1$2$3-static.svg')
  .replace('[Disable animation](PROFILE-STATIC.md)', '[Enable animation](README.md)');
fs.writeFileSync(path.join(root, 'PROFILE-STATIC.md'), '<!-- Generated from README.md. Edit the source, then run scripts/build-static-profile.cjs. -->\n' + markdown);
console.log('Generated motion-free profile.');
