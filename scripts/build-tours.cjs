/* Self-contained, deterministic profile flow artwork. No runtime dependencies. */
const fs = require('node:fs');
const path = require('node:path');

const output = path.resolve(__dirname, '..', 'assets');
const flows = [
  {
    id: 'schoolpro', brand: 'SCHOOLPRO', title: 'One event. A clear path.',
    description: 'Illustrated SchoolPro event path: Telegram events pass through aiogram role middleware backed by a Redis role cache, then domain services for quizzes, homework and progress, and SQLAlchemy database access to PostgreSQL. The animation illustrates sequence, not live traffic.',
    caption: 'Redis caches roles along the event path.',
    steps: [
      ['ENTRY', 'Telegram event', 'aiogram / asyncio', 'Five role interfaces'],
      ['ACCESS', 'Role middleware', 'Permissions', 'Redis role cache'],
      ['LOGIC', 'Domain services', 'Quizzes + homework', 'Progress + forecasts'],
      ['STORAGE', 'PostgreSQL', 'SQLAlchemy', 'Async repository'],
    ],
  },
  {
    id: 'hhmogger', brand: 'HH_MOGGER', title: 'Fit first. Then the letter.',
    description: 'Illustrated hh_mogger workflow: hh.ru API access through OAuth, local vacancy scoring, LLM-assisted cover letter generation for relevant vacancies, and rate-limited automated applications. The animation illustrates sequence, not live requests or application results.',
    caption: 'Matching stays local. Generation follows relevance.',
    steps: [
      ['CONNECT', 'hh.ru / OAuth', 'Vacancy API', 'Authorised access'],
      ['MATCH', 'Local scoring', 'Vacancy relevance', 'No LLM for matching'],
      ['WRITE', 'LLM cover letter', 'Relevant vacancies', 'Clean post-processing'],
      ['DELIVER', 'Applications', 'Automated delivery', 'Deliberate rate limits'],
    ],
  },
  {
    id: 'anomia', brand: 'ANOMIA', title: 'From generation to the game.',
    description: 'Illustrated ANOMIA asset workflow: ComfyUI generates assets, contact sheets support review, approved assets are selected, and a custom Python pipeline installs them into the project. The animation illustrates the workflow, not live generation or approval activity.',
    caption: 'A custom Python pipeline connects the steps.',
    steps: [
      ['GENERATE', 'ComfyUI', 'Asset generation', 'Custom Python pipeline'],
      ['REVIEW', 'Contact sheets', 'Visual review', 'Compare candidates'],
      ['APPROVE', 'Approved assets', 'Selection after review', 'Ready for installation'],
      ['INSTALL', 'Project assets', 'Project installation', 'Inside the game'],
    ],
  },
];

const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[c]);

function makeStyle(mobile, isStatic) {
  const travel = mobile ? 'translateY' : 'translateX';
  const interval = mobile ? 75 : 233;
  const reduced = `.stage { animation: none !important; opacity: .65; }
      .packet { animation: none !important; display: none; }
      .progress { animation: none !important; stroke-dashoffset: 0; }`;
  return `<style>
      text { font-family: Arial, sans-serif; }
      .eyebrow { fill: #9DAAA0; font-family: Consolas, monospace; font-size: ${mobile ? 15 : 11}px; letter-spacing: 1.3px; }
      .heading { fill: #F3F5ED; font-size: ${mobile ? 29 : 25}px; font-weight: 700; letter-spacing: -.5px; }
      .label { fill: #F3F5ED; font-size: ${mobile ? 23 : 18}px; font-weight: 700; letter-spacing: -.25px; }
      .detail { fill: #9DAAA0; font-size: ${mobile ? 17 : 13}px; }
      .step { fill: #C5F277; font-family: Consolas, monospace; font-size: ${mobile ? 17 : 11}px; letter-spacing: .5px; }
      .caption { fill: #9DAAA0; font-size: ${mobile ? 16 : 14}px; }
      .card { fill: #17211D; stroke: #314137; }
      .stage { fill: #253521; stroke: #C5F277; opacity: 0; animation: stage 12s linear infinite; }
      .stage-2 { animation-delay: 3s; }
      .stage-3 { animation-delay: 6s; }
      .stage-4 { animation-delay: 9s; }
      .rail { fill: none; stroke: #314137; stroke-width: 2; }
      .progress { fill: none; stroke: #C5F277; stroke-width: 2; stroke-dasharray: ${interval * 3}; stroke-dashoffset: ${interval * 3}; animation: progress 12s linear infinite; }
      .packet { fill: #C5F277; stroke: #101715; stroke-width: 4; animation: packet 12s linear infinite; }
      @keyframes stage {
        0%, 20% { opacity: 1; }
        25%, 99.99% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes packet {
        0%, 18% { transform: ${travel}(0px); opacity: 1; }
        25%, 43% { transform: ${travel}(${interval}px); opacity: 1; }
        50%, 68% { transform: ${travel}(${interval * 2}px); opacity: 1; }
        75%, 94% { transform: ${travel}(${interval * 3}px); opacity: 1; }
        99.99% { transform: ${travel}(${interval * 3}px); opacity: 0; }
        100% { transform: ${travel}(0px); opacity: 0; }
      }
      @keyframes progress {
        0%, 18% { stroke-dashoffset: ${interval * 3}; opacity: .55; }
        25%, 43% { stroke-dashoffset: ${interval * 2}; opacity: .55; }
        50%, 68% { stroke-dashoffset: ${interval}; opacity: .55; }
        75%, 94% { stroke-dashoffset: 0; opacity: .55; }
        99.99% { stroke-dashoffset: 0; opacity: 0; }
        100% { stroke-dashoffset: ${interval * 3}; opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) { ${reduced} }
      ${isStatic ? reduced : ''}
    </style>`;
}

function drawFlow(flow, mobile, isStatic) {
  const width = mobile ? 600 : 960;
  const height = mobile ? 442 : 278;
  const id = `${flow.id}-${mobile ? 'mobile' : 'desktop'}${isStatic ? '-static' : ''}`;
  const pieces = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc">`,
    `  <title id="${id}-title">${escape(flow.brand)} — a four-step flow illustration</title>`,
    `  <desc id="${id}-desc">${escape(flow.description)}</desc>`,
    `  <defs>${makeStyle(mobile, isStatic)}</defs>`,
    `  <rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="12" fill="#101715" stroke="#314137"/>`,
    `  <text class="eyebrow" x="28" y="${mobile ? 32 : 28}">${escape(flow.brand)} / FLOW ILLUSTRATION</text>`,
    `  <text class="heading" x="28" y="${mobile ? 69 : 61}">${escape(flow.title)}</text>`,
  ];

  if (mobile) {
    pieces.push('  <path class="rail" d="M37 134 V359"/>');
    pieces.push('  <path class="progress" d="M37 134 V359"/>');
    flow.steps.forEach((step, i) => {
      const y = 102 + i * 75;
      pieces.push(
        `  <rect class="card" x="68" y="${y}" width="504" height="64" rx="9"/>`,
        `  <rect class="stage stage-${i + 1}" x="68" y="${y}" width="504" height="64" rx="9"/>`,
        `  <circle cx="37" cy="${y + 32}" r="4" fill="#718568"/>`,
        `  <text class="step" x="553" y="${y + 27}" text-anchor="end">0${i + 1}</text>`,
        `  <text class="label" x="86" y="${y + 27}">${escape(step[1])}</text>`,
        `  <text class="detail" x="86" y="${y + 51}">${escape(step[2])} · ${escape(step[3])}</text>`,
      );
    });
    // A separate rail lets sequence remain legible while the packet travels.
    pieces.push('  <circle class="packet" cx="37" cy="134" r="7"/>');
    pieces.push(`  <text class="caption" x="28" y="421">${escape(flow.caption)}</text>`);
  } else {
    for (let i = 0; i < 3; i++) {
      const x = 235 + i * 233;
      pieces.push(`  <path d="M${x + 2} 156 h18 m-5 -4 5 4 -5 4" fill="none" stroke="#718568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`);
    }
    flow.steps.forEach((step, i) => {
      const x = 28 + i * 233;
      pieces.push(
        `  <rect class="card" x="${x}" y="97" width="205" height="116" rx="9"/>`,
        `  <rect class="stage stage-${i + 1}" x="${x}" y="97" width="205" height="116" rx="9"/>`,
        `  <text class="step" x="${x + 16}" y="121">0${i + 1} / ${escape(step[0])}</text>`,
        `  <text class="label" x="${x + 16}" y="153">${escape(step[1])}</text>`,
        `  <text class="detail" x="${x + 16}" y="177">${escape(step[2])}</text>`,
        `  <text class="detail" x="${x + 16}" y="197">${escape(step[3])}</text>`,
      );
    });
    pieces.push('  <path class="rail" d="M130.5 233 H829.5"/>');
    pieces.push('  <path class="progress" d="M130.5 233 H829.5"/>');
    for (let i = 0; i < 4; i++) pieces.push(`  <circle cx="${130.5 + i * 233}" cy="233" r="3" fill="#718568"/>`);
    pieces.push('  <circle class="packet" cx="130.5" cy="233" r="7"/>');
    pieces.push(`  <text class="caption" x="480" y="260" text-anchor="middle">${escape(flow.caption)}</text>`);
  }
  pieces.push('</svg>\n');
  return pieces.join('\n');
}

fs.mkdirSync(output, { recursive: true });
for (const flow of flows) {
  for (const mobile of [false, true]) {
    for (const isStatic of [false, true]) {
      const filename = `tour-${flow.id}${mobile ? '-mobile' : ''}${isStatic ? '-static' : ''}.svg`;
      fs.writeFileSync(path.join(output, filename), drawFlow(flow, mobile, isStatic), 'utf8');
      process.stdout.write(`${filename}\n`);
    }
  }
}
