// Original SVG artwork. Node built-ins only; no external fonts or image services.
const fs = require('node:fs');
const path = require('node:path');
const { summarize } = require('./activity.cjs');
const root = path.join(__dirname, '..');
const output = path.join(root, 'assets');
const activity = JSON.parse(fs.readFileSync(path.join(root, 'data/activity.json'), 'utf8'));
const summary = summarize(activity);
fs.mkdirSync(output, { recursive: true });

const palettes = {
  dark: { bg: '#101916', panel: '#17241e', fg: '#eff4e9', muted: '#a8b8aa', border: '#33473a', accent: '#c7ed95', dim: '#6e9650' },
  light: { bg: '#f5f8ef', panel: '#eaf0e2', fg: '#1b3022', muted: '#52644f', border: '#cbd6c2', accent: '#426b2d', dim: '#8da96d' },
};
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const t = (x, y, value, size = 16, cls = '', extra = '') => `<text x="${x}" y="${y}" font-size="${size}" class="${cls}" ${extra}>${esc(value)}</text>`;

function svg(name, w, h, title, desc, p, body, motion = '', isStatic = false) {
  const style = `text{font-family:Arial,Helvetica,sans-serif;fill:${p.fg}}.muted{fill:${p.muted}}.accent{fill:${p.accent}}.mono{font-family:Consolas,'Liberation Mono',monospace;letter-spacing:1px}.bold{font-weight:700;letter-spacing:-1px}.rule{fill:none;stroke:${p.border}}.panel{fill:${p.panel};stroke:${p.border}}${isStatic ? '' : motion}@media(prefers-reduced-motion:reduce){.moving,.stage{animation:none!important}.moving{display:none!important}.stage{opacity:0!important}}`;
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc><style>${style}</style><rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="16" fill="${p.bg}" stroke="${p.border}"/>${body}</svg>\n`;
  fs.writeFileSync(path.join(output, `${name}.svg`), content);
}

function hero(mobile, p, isStatic) {
  const w = mobile ? 600 : 1000, h = mobile ? 330 : 260;
  const left = mobile ? 30 : 38;
  let body = t(left, mobile ? 39 : 37, 'KEYSHEERO', mobile ? 18 : 13, 'mono muted');
  body += t(left, mobile ? 99 : 101, 'Kirill Belyakov', mobile ? 47 : 54, 'bold');
  body += t(left, mobile ? 139 : 142, 'Python backend developer', mobile ? 25 : 24);
  body += t(left, mobile ? 174 : 210, 'Almaty, Kazakhstan', mobile ? 19 : 16, 'muted');
  if (!mobile) body += '<path class="rule" d="M38 173H487"/>';
  const y = mobile ? 242 : 118, xs = mobile ? [98, 300, 502] : [622, 780, 938];
  body += `<path d="M${xs[0]} ${y}H${xs[2]}" stroke="${p.border}" stroke-width="2"/>`;
  if (!isStatic) body += `<path class="moving" d="M${xs[0]} ${y}H${xs[2]}" fill="none" stroke="${p.accent}" stroke-width="2" stroke-dasharray="30 ${xs[2]-xs[0]}"/>`;
  xs.forEach((x,i) => {
    body += `<rect x="${x-28}" y="${y-28}" width="56" height="56" rx="15" class="panel"/>`;
    if (!isStatic) body += `<rect x="${x-28}" y="${y-28}" width="56" height="56" rx="15" fill="none" stroke="${p.accent}" class="stage s${i}" opacity="0"/>`;
    if (i === 0) body += `<g fill="none" stroke="${p.accent}" stroke-width="1.6"><path d="m${x-10} ${y} 7-7m-7 7 7 7m13-14 7 7-7 7"/></g>`;
    if (i === 1) body += t(x,y+7,'{ }',23,'mono accent','text-anchor="middle"');
    if (i === 2) body += `<g fill="none" stroke="${p.accent}" stroke-width="1.6"><ellipse cx="${x}" cy="${y-8}" rx="11" ry="4"/><path d="M${x-11} ${y-8}v16c0 6 22 6 22 0v-16M${x-11} ${y}c0 6 22 6 22 0"/></g>`;
    body += t(x,y+59,['REQUEST','PYTHON','DATA'][i],mobile?15:12,'mono muted','text-anchor="middle"');
  });
  if (!mobile) {
    body += t(610,37,'BACKEND / ASYNC',12,'mono muted');
    body += t(780,210,'request → service → storage',13,'muted','text-anchor="middle"');
  }
  const travel = xs[2]-xs[0]+30;
  const motion = `.moving{animation:travel 9s linear infinite}.stage{animation:stage 9s ease-in-out infinite}.s1{animation-delay:3s}.s2{animation-delay:6s}@keyframes travel{0%{stroke-dashoffset:35;opacity:0}8%{opacity:1}87%{opacity:1}100%{stroke-dashoffset:-${travel};opacity:0}}@keyframes stage{0%,32%,100%{opacity:0}10%,23%{opacity:.9}}`;
  return { w,h,body,motion,title:'Kirill Belyakov — Python backend developer',desc:'Based in Almaty, Kazakhstan. The illustration follows a request through a Python service to storage. It is decorative, not live telemetry.' };
}

function proof(mobile, p) {
  const w = mobile ? 600 : 1000, h = mobile ? 226 : 148;
  const columns = mobile ? [[30,80],[330,80],[30,179]] : [[30,76],[365,76],[700,76]];
  let body = '';
  const values = [['100+','paying subscribers'],['5','user roles'],['May 2025','in production since']];
  values.forEach(([value,label],i) => {
    const [x,y] = columns[i];
    body += t(x,y,value,mobile?(i===2?30:46):(i===2?36:46),'bold '+(i===0?'accent':''));
    body += t(x,y+(mobile?29:31),label,mobile?19:18,'muted');
  });
  if(mobile) body += '<path class="rule" d="M300 28v82M30 137h540"/>';
  else body += '<path class="rule" d="M330 28v92M665 28v92"/>';
  return { w,h,body,title:'SchoolPro in production',desc:'100+ paying subscribers. Five user roles. In production since May 2025. Figures confirmed by the developer in November 2026.' };
}

function chart(mobile,p) {
  const w=mobile?600:1000,h=mobile?360:230;
  let body=t(30,35,'GITHUB / LAST 12 MONTHS',mobile?18:12,'mono muted');
  const updated = new Date(`${activity.updated}T00:00:00Z`).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});
  if (!mobile) body+=t(970,35,`UPDATED ${updated.toUpperCase()}`,11,'mono muted','text-anchor="end"');
  body+=t(30,103,summary.contributions.toLocaleString('en-US'),mobile?55:52,'bold accent');
  body+=t(30,133,'contributions',mobile?20:17,'muted');
  body+=t(mobile?320:250,103,String(summary.activeDays),mobile?55:52,'bold');
  body+=t(mobile?320:250,133,'active days',mobile?20:17,'muted');
  if (!mobile) body+=t(30,195,`${activity.start} → ${activity.end}`,12,'mono muted');
  const cx=mobile?30:470,cy=mobile?282:169,cw=mobile?540:500,ch=mobile?88:91;
  const max=Math.max(1,...summary.months.map(m=>m.count));
  const step=cw/summary.months.length,bar=step*.56;
  body+=`<path class="rule" d="M${cx} ${cy}h${cw}M${cx} ${cy-ch}h${cw}" opacity=".6"/>`;
  summary.months.forEach((month,i)=>{
    const bh=month.count===0?2:Math.max(3,(month.count/max)*ch),x=cx+i*step+(step-bar)/2;
    body+=`<rect x="${x.toFixed(2)}" y="${(cy-bh).toFixed(2)}" width="${bar.toFixed(2)}" height="${bh.toFixed(2)}" rx="3" fill="${month.count===max?p.accent:month.count===0?p.border:p.dim}"><title>${esc(month.month)}: ${month.count} contributions</title></rect>`;
    if(month.count>0)body+=t(cx+i*step+step/2,cy-bh-8,String(month.count),mobile?14:11,'muted','text-anchor="middle"');
    body+=t(cx+i*step+step/2,cy+22,month.label,mobile?18:12,'muted','text-anchor="middle"');
  });
  if(mobile) body+=t(30,335,`UPDATED ${updated.toUpperCase()}`,16,'mono muted');
  return {w,h,body,title:'GitHub activity over the last 12 months',desc:`${summary.contributions} contributions on ${summary.activeDays} active days from ${activity.start} to ${activity.end}. Counts come from the public GitHub profile. First and last chart months can be partial.`};
}

function flow(mobile,p,isStatic) {
  const w=mobile?600:1000,h=mobile?414:246;
  let body=t(28,36,'SCHOOLPRO / REQUEST FLOW',mobile?18:13,'mono muted');
  const labels=[['Telegram event','aiogram / asyncio'],['Role middleware','Redis role cache'],['Domain services','Homework, quizzes, progress'],['PostgreSQL','SQLAlchemy / async access']];
  labels.forEach(([label,detail],i)=>{
    const x=mobile?76:28+i*245,y=mobile?64+i*76:73,cw=mobile?496:209,ch=mobile?60:104;
    body+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10" class="panel"/>`;
    if(!isStatic)body+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10" fill="none" stroke="${p.accent}" class="stage s${i}" opacity="0"/>`;
    body+=t(x+16,y+(mobile?25:42),label,mobile?22:20);
    body+=t(x+16,y+(mobile?48:74),detail,mobile?17:13,'muted');
    if(mobile) {
      if(i<3) body+=`<path d="M38 ${y+30}v76" class="rule" stroke-width="2"/>`;
      body+=`<circle cx="38" cy="${y+30}" r="5" fill="${p.accent}"/>`;
    } else if(i<3) body+=`<path d="M${x+cw+7} ${y+52}h17m-5-4 5 4-5 4" fill="none" stroke="${p.dim}" stroke-width="1.5"/>`;
  });
  if(!mobile) {
    body+=`<path d="M132 200H867" class="rule" stroke-width="2"/>`;
    if(!isStatic) body+=`<circle class="moving" cx="132" cy="200" r="4" fill="${p.accent}"/>`;
  } else if(!isStatic)body+=`<circle class="moving" cx="38" cy="94" r="7" fill="${p.accent}"/>`;
  body+=t(28,h-18,'Illustrated sequence · not live traffic',mobile?15:12,'muted');
  const move=mobile?'translateY':'translateX',d=mobile?76:245;
  const motion=`.stage{animation:step 12s ease-in-out infinite}.s1{animation-delay:3s}.s2{animation-delay:6s}.s3{animation-delay:9s}.moving{animation:packet 12s ease-in-out infinite}@keyframes step{0%,25%,100%{opacity:0}7%,18%{opacity:1}}@keyframes packet{0%,15%{transform:${move}(0px);opacity:1}25%,40%{transform:${move}(${d}px);opacity:1}50%,65%{transform:${move}(${d*2}px);opacity:1}75%,93%{transform:${move}(${d*3}px);opacity:1}99.9%{transform:${move}(${d*3}px);opacity:0}100%{transform:${move}(0px);opacity:0}}`;
  return {w,h,body,motion,title:'SchoolPro request flow',desc:'A Telegram event passes through role middleware with Redis caching, domain services, and SQLAlchemy to PostgreSQL. This is an architectural illustration, not live traffic.'};
}

for(const [theme,p] of Object.entries(palettes))for(const mobile of [false,true]) {
  for(const [id,draw,animated] of [['hero',hero,true],['proof',proof,false],['activity',chart,false],['flow',flow,true]]) {
    for(const isStatic of animated?[false,true]:[false]) {
      const name=id+(mobile?'-mobile':'')+(theme==='light'?'-light':'')+(isStatic?'-static':'');
      const r=draw(mobile,p,isStatic);
      svg(name,r.w,r.h,r.title,r.desc,p,r.body,r.motion,isStatic);
    }
  }
}
const readmePath=path.join(root,'README.md');
const readme=fs.readFileSync(readmePath,'utf8');
const alt=`GitHub activity: ${summary.contributions} contributions on ${summary.activeDays} active days, ${activity.start} to ${activity.end}. Updated ${activity.updated}.`;
if(!readme.includes('alt="GitHub activity:'))throw new Error('Missing activity alt text anchor in README');
fs.writeFileSync(readmePath,readme.replace(/alt="GitHub activity:[^"]*"/,`alt="${alt}"`));
console.log('Generated themed, responsive artwork and accessible activity summary.');
