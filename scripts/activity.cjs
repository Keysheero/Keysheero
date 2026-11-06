const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseCalendar(html, end) {
  const endDate = new Date(`${end}T00:00:00Z`);
  if (!Number.isFinite(+endDate)) throw new Error('Invalid calendar end date');
  const startDate = new Date(endDate);
  startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
  startDate.setUTCDate(startDate.getUTCDate() + 1);
  const start = startDate.toISOString().slice(0, 10);
  const counts = new Map();
  const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = attrs(match[1]).for;
    const count = match[2].trim().match(/^(No|[\d,]+) contributions? on /);
    if (id && count) counts.set(id, count[1] === 'No' ? 0 : Number(count[1].replaceAll(',', '')));
  }
  const days = [];
  for (const match of html.matchAll(/<td\b[^>]*data-date="[^>]*>/g)) {
    const a = attrs(match[0]);
    if (a['data-date'] < start || a['data-date'] > end) continue;
    const count = counts.get(a.id);
    if (!Number.isSafeInteger(count) || count < 0) throw new Error(`Missing contribution count for ${a['data-date']}`);
    days.push({ date: a['data-date'], count });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  const expected = Math.round((endDate - startDate) / 86400000) + 1;
  if (days.length !== expected || new Set(days.map(d => d.date)).size !== expected) {
    throw new Error(`Incomplete calendar: expected ${expected} unique days, received ${days.length}`);
  }
  days.forEach((day, i) => {
    if (day.date !== new Date(+startDate + i * 86400000).toISOString().slice(0, 10)) throw new Error('Calendar dates are not consecutive');
  });
  return { start, end, days };
}

function summarize(calendar) {
  const months = new Map();
  for (const day of calendar.days) {
    const key = day.date.slice(0, 7);
    if (!months.has(key)) months.set(key, { month: key, label: MONTHS[Number(key.slice(5)) - 1], count: 0 });
    months.get(key).count += day.count;
  }
  return { contributions: calendar.days.reduce((sum, d) => sum + d.count, 0), activeDays: calendar.days.filter(d => d.count > 0).length, months: [...months.values()] };
}
module.exports = { parseCalendar, summarize };
