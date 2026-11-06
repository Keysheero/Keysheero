const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { summarize } = require('./activity.cjs');
const root = path.resolve(__dirname, '..');
for (const name of ['README.md', 'PROFILE-STATIC.md']) {
  const content = fs.readFileSync(path.join(root, name), 'utf8');
  const images = [...content.matchAll(/(?:src|srcset)="(assets\/[^"]+)"/g)].map(m => m[1]);
  assert(images.length > 0, `${name}: missing images`);
  for (const image of images) {
    const svg = fs.readFileSync(path.join(root, image), 'utf8');
    assert(svg.includes('<title') && svg.includes('<desc'), `${image}: missing accessible description`);
    assert(!/<script|<foreignObject|https?:\/\//.test(svg.replace('http://www.w3.org/2000/svg', '')), `${image}: must be self-contained`);
    if (name === 'PROFILE-STATIC.md') assert(!svg.includes('@keyframes'), `${image}: static view contains animation`);
  }
}
const canonical = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const staticProfile = fs.readFileSync(path.join(root, 'PROFILE-STATIC.md'), 'utf8');
const expectedStatic = canonical.replace(/assets\/(hero|flow)(-mobile)?(-light)?\.svg/g, 'assets/$1$2$3-static.svg').replace('[Disable animation](PROFILE-STATIC.md)', '[Enable animation](README.md)');
assert(staticProfile.endsWith(expectedStatic), 'Static profile is out of date');
const activity = JSON.parse(fs.readFileSync(path.join(root, 'data/activity.json'), 'utf8'));
const totals = summarize(activity);
assert.equal(totals.contributions, activity.contributions);
assert.equal(totals.activeDays, activity.activeDays);
assert(canonical.includes(`GitHub activity: ${totals.contributions} contributions on ${totals.activeDays} active days`), 'Activity alt text is stale');
console.log('Profile links, static view, self-contained SVGs and activity totals are valid.');
