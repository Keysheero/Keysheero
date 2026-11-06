const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parseCalendar, summarize } = require('./activity.cjs');

function fixture() {
  return Array.from({ length: 365 }, (_, i) => {
    const date = new Date(Date.UTC(2025, 10, 7) + i * 86400000).toISOString().slice(0, 10);
    const count = i === 0 ? '1,234 contributions' : i === 364 ? '1 contribution' : 'No contributions';
    return `<td id="day-${i}" data-date="${date}" data-level="0"></td><tool-tip for="day-${i}">${count} on November 7th.</tool-tip>`;
  });
}

test('calendar uses dates, handles zeros, singular counts and thousands', () => {
  const calendar = parseCalendar(fixture().reverse().join('\n'), '2026-11-06');
  assert.equal(calendar.days[0].date, '2025-11-07');
  assert.equal(calendar.days[364].count, 1);
  const summary = summarize(calendar);
  assert.equal(summary.contributions, 1235);
  assert.equal(summary.activeDays, 2);
  assert.equal(summary.months.reduce((n, m) => n + m.count, 0), 1235);
});
test('padding and future dates do not inflate totals', () => {
  const html = fixture().join('') + '<td id="future" data-date="2026-11-07"></td><tool-tip for="future">99 contributions on November 7th.</tool-tip><td id="past" data-date="2025-11-06"></td><tool-tip for="past">99 contributions on November 6th.</tool-tip>';
  assert.equal(summarize(parseCalendar(html, '2026-11-06')).contributions, 1235);
});
test('missing dates fail instead of producing a misleading zero card', () => {
  assert.throws(() => parseCalendar(fixture().slice(1).join(''), '2026-11-06'), /Incomplete/);
});
test('duplicate dates fail', () => {
  const rows = fixture();
  rows[1] = rows[0];
  assert.throws(() => parseCalendar(rows.join(''), '2026-11-06'), /Incomplete/);
});
test('changed tooltip format fails instead of silently changing the total', () => {
  assert.throws(() => parseCalendar(fixture().join('').replace('1,234 contributions', 'many contributions'), '2026-11-06'), /Missing contribution/);
});
