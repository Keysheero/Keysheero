// Read only the calendar already visible on the public profile. No token needed.
const fs = require('node:fs');
const path = require('node:path');
const { parseCalendar, summarize } = require('./activity.cjs');

async function main() {
  const end = new Date().toISOString().slice(0, 10);
  const source = 'https://github.com/users/Keysheero/contributions';
  let html;
  if (process.argv[2]) html = fs.readFileSync(process.argv[2], 'utf8');
  else {
    // GitHub's default calendar is rolling-year. Supplying only `to` switches
    // the endpoint to the current calendar year and can silently truncate it.
    const response = await fetch(source, { headers: { 'User-Agent': 'Keysheero-profile', 'Accept-Language': 'en-US,en;q=0.9' }, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    html = await response.text();
  }
  const calendar = parseCalendar(html, end);
  const data = { source, updated: end, ...calendar, ...summarize(calendar) };
  const target = path.join(__dirname, '../data/activity.json');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  // Parsing must succeed before replacing the last good snapshot.
  fs.writeFileSync(`${target}.tmp`, `${JSON.stringify(data, null, 2)}\n`);
  fs.renameSync(`${target}.tmp`, target);
  console.log(`Activity: ${data.contributions} contributions on ${data.activeDays} days (${data.start}–${data.end}).`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
