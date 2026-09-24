// Generate the motion-free document from the canonical profile; never edit the mirror.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let markdown = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
markdown = markdown.replace(/assets\/(hero(?:-mobile)?|tour-(?:schoolpro|hhmogger|anomia)(?:-mobile)?)\.svg/g, 'assets/$1-static.svg');
markdown = markdown.replaceAll('href="PROFILE-STATIC.md"', 'href="README.md"');
markdown = markdown.replaceAll('Motion-free view', 'Animated view').replaceAll('Read without motion', 'View animated profile');
markdown = markdown.replace('Follow a request — SchoolPro in motion', 'Follow a request — SchoolPro step by step');
fs.writeFileSync(path.join(root, 'PROFILE-STATIC.md'), '<!-- Generated from README.md by scripts/build-static-profile.cjs. -->\n' + markdown);
console.log('Generated PROFILE-STATIC.md');
