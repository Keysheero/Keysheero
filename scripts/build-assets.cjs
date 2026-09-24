const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../assets');
fs.mkdirSync(dir, {recursive:true});
const font = 'Arial, Helvetica, sans-serif';
const mono = 'Consolas, monospace';
const text = (x,y,size,fill,value,extra='') => `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}" ${extra}>${value}</text>`;
const label = (x,y,value,fill='#9DAAA0',size=13) => `<text x="${x}" y="${y}" font-family="${mono}" font-size="${size}" letter-spacing="1.6" fill="${fill}">${value}</text>`;
function svg(name,w,h,title,body,styles=''){
  fs.writeFileSync(path.join(dir,name), `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">Original profile artwork for Kirill Belyakov. Decorative motion respects reduced-motion preferences.</desc>${styles?`<style>${styles}</style>`:''}${body}</svg>\n`);
}
const motion = `@keyframes flow{to{stroke-dashoffset:-160}}@keyframes breathe{0%,100%{opacity:.35}50%{opacity:1}}.flow{animation:flow 8s linear infinite}.pulse{animation:breathe 4s ease-in-out infinite}@media(prefers-reduced-motion:reduce){.flow,.pulse{animation:none}}`;
function sculpture(tx=0,ty=0,scale=1){return `<g transform="translate(${tx} ${ty}) scale(${scale})">
  <g fill="none" stroke="#263C30"><path d="M625 131 771 57 916 131 771 205Z"/><path d="M607 232 771 150 934 232 771 314Z"/><path d="M607 262 771 180 934 262 771 344Z"/></g>
  <path d="M640 118V264L771 330 902 264V118" fill="none" stroke="#425840" stroke-dasharray="3 7"/>
  <g stroke="#4D654B" stroke-width="1.2">
    <path d="M652 231 771 291 889 231V255L771 315 652 255Z" fill="#17251D"/>
    <path d="M652 231 771 172 889 231 771 291Z" fill="#203323"/>
    <path d="M672 176 771 226 869 176V201L771 251 672 201Z" fill="#243F28"/>
    <path d="M672 176 771 127 869 176 771 226Z" fill="#324F30"/>
    <path d="M694 120 771 159 848 120V146L771 185 694 146Z" fill="#80A558" stroke="#C5F277"/>
    <path d="M694 120 771 82 848 120 771 159Z" fill="#C5F277" stroke="#DBF6AA"/>
  </g>
  <g stroke="#253A20" stroke-width="2" fill="none"><path d="m744 116-12 6 12 6m54-12 12 6-12 6m-18-14-17 27"/></g>
  <g stroke="#C5F277" stroke-width="2" fill="none" stroke-dasharray="12 148" class="flow"><path d="M640 118V264L771 330 902 264V118"/><path d="M652 231 771 291 889 231"/></g>
  <g fill="#C5F277"><circle cx="640" cy="118" r="4"/><circle cx="902" cy="118" r="4"/><circle cx="771" cy="330" r="4"/></g>
  <g fill="none" stroke="#C5F277" class="pulse"><circle cx="640" cy="118" r="9"/><circle cx="902" cy="118" r="9"/></g>
  ${label(705,372,'CODE → PROD', '#9DAAA0',12)}
</g>`;}
svg('hero.svg',960,440,'Kirill Belyakov — Python backend developer. I build it. I keep it running.',`
  <rect x=".5" y=".5" width="959" height="439" rx="18" fill="#101715" stroke="#314137"/>
  <path d="M40 75H920M40 354H568" stroke="#314137"/>
  ${text(40,49,27,'#C5F277','kb.', 'font-weight="700" letter-spacing="-2"')}
  ${label(105,47,'KIRILL BELYAKOV','#F3F5ED',14)}
  ${label(688,47,'PYTHON / BACKEND','#9DAAA0',13)}
  ${text(38,160,68,'#F3F5ED','I build it.', 'font-weight="700" letter-spacing="-3.4"')}
  ${text(38,229,56,'#F3F5ED','I keep it', 'font-weight="700" letter-spacing="-2.8"')}
  ${text(38,293,68,'#C5F277','running.', 'font-weight="700" letter-spacing="-3.4"')}
  ${text(42,386,18,'#D5DDD2','Async services. Real users. Full ownership.')}
  ${label(42,416,'ALMATY, KZ  /  REMOTE + RELOCATION','#9DAAA0',12)}
  ${sculpture(0,13,1)}
`,motion);
svg('hero-mobile.svg',600,590,'Kirill Belyakov — Python backend developer. I build it. I keep it running.',`
  <rect x=".5" y=".5" width="599" height="589" rx="18" fill="#101715" stroke="#314137"/>
  ${text(32,49,30,'#C5F277','kb.','font-weight="700" letter-spacing="-2"')}
  ${label(92,46,'KIRILL BELYAKOV','#F3F5ED',18)}
  <path d="M32 73H568" stroke="#314137"/>
  ${label(32,114,'PYTHON / BACKEND','#9DAAA0',17)}
  ${text(28,191,70,'#F3F5ED','I build it.','font-weight="700" letter-spacing="-3"')}
  ${text(28,263,70,'#F3F5ED','I keep it','font-weight="700" letter-spacing="-3"')}
  ${text(28,335,70,'#C5F277','running.','font-weight="700" letter-spacing="-3"')}
  ${sculpture(-210,230,.8)}
  ${text(32,403,21,'#D5DDD2','Async services.')}
  ${text(32,435,21,'#D5DDD2','Real users.')}
  ${text(32,467,21,'#D5DDD2','Full ownership.')}
  ${label(32,536,'ALMATY, KZ','#9DAAA0',16)}
  ${label(32,566,'REMOTE + RELOCATION','#9DAAA0',16)}
`,motion);
function metrics(mobile){
  const w=mobile?600:960, h=mobile?180:146, col=w/3;
  let body=`<rect width="${w}" height="${h}" rx="14" fill="#E9EDDF"/>`;
  [['100+','paying subscribers'],['5','role interfaces'],['8','live migrations']].forEach(([n,l],i)=>{
    const x=col*i+(mobile?20:32);
    if(i)body+=`<path d="M${col*i} 25V${h-25}" stroke="#C8CDBD"/>`;
    body+=label(x,mobile?33:30,'0'+(i+1),'#50604D',mobile?15:11);
    body+=text(x,mobile?108:91,mobile?53:48,'#17231C',n,'font-weight="700" letter-spacing="-2"');
    body+=text(x,mobile?147:120,mobile?18:18,'#475541',l);
  });
  svg(mobile?'proof-mobile.svg':'proof.svg',w,h,'SchoolPro: 100+ paying subscribers, 5 role interfaces, 8 live database migrations.',body);
}
metrics(false);metrics(true);
function project(name,index,title,category,light,art){
  const bg=light?'#E9EDDF':'#17211D', fg=light?'#17231C':'#F3F5ED', muted=light?'#53634F':'#9DAAA0';
  svg(name,960,155,`${index} / ${title} — ${category}`,`
  <rect x=".5" y=".5" width="959" height="154" rx="14" fill="${bg}" stroke="${light?'#D6DDCB':'#314137'}"/>
  ${label(30,36,`${index} / SELECTED WORK`,muted,12)}
  ${text(27,94,45,fg,title,'font-weight="700" letter-spacing="-1.6"')}
  ${text(30,128,17,muted,category)}${art}`);
}
project('schoolpro-title.svg','01','SchoolPro','EDTECH · SOLE DEVELOPER · IN PRODUCTION SINCE MAY 2025',false,`
 <g transform="translate(770 28)" fill="none" stroke="#C5F277" stroke-width="1.4"><path d="m0 20 55-20 55 20-55 20Z"/><path d="m0 43 55 20 55-20M0 66l55 20 55-20"/><path d="M55 40v46"/><circle cx="55" cy="97" r="3" fill="#C5F277"/></g>`);
project('hh-mogger-title.svg','02','hh_mogger','JOB SEARCH AUTOMATION · TELEGRAM MINI APP',true,`
 <g transform="translate(762 31)" fill="none" stroke="#6B7D58" stroke-width="1.5"><rect x="0" y="0" width="68" height="89" rx="6"/><path d="M13 21h35M13 34h26M13 47h30"/><rect x="37" y="18" width="68" height="89" rx="6" fill="#DCE7CC"/><path d="m55 65 12 12 22-28" stroke="#314929" stroke-width="3"/></g>`);
project('anomia-title.svg','03','ANOMIA','COMMERCIAL VISUAL NOVEL · RELEASED &amp; MONETISED',false,`
 <g transform="translate(829 79)" fill="none" stroke="#9DAAA0"><circle r="51"/><circle r="34"/><path d="m0-58 51 87H-51Z" stroke="#C5F277" stroke-width="1.5"/><path d="M-65 0H65M0-65V65" stroke="#314137"/><circle r="6" fill="#C5F277" stroke="none"/></g>`);
svg('contact.svg',960,154,'Have a backend worth building? Let’s talk — kbelakov88@gmail.com',`
  <rect width="960" height="154" rx="14" fill="#C5F277"/>
  ${label(30,35,'NEXT / LET’S BUILD','#3F592B',12)}
  ${text(27,87,38,'#17231C','Have a backend worth building?','font-weight="700" letter-spacing="-1.3"')}
  ${text(30,125,19,'#3F592B','kbelakov88@gmail.com')}
  <g fill="none" stroke="#17231C" stroke-width="2.5"><circle cx="885" cy="78" r="32"/><path d="m873 90 24-24h-23m23 0v23"/></g>`);
for (const [name,idx,title,line1,line2,light] of [
  ['schoolpro','01','SchoolPro','EDTECH · SOLE DEVELOPER','IN PRODUCTION SINCE MAY 2025',false],
  ['hh-mogger','02','hh_mogger','JOB SEARCH AUTOMATION','TELEGRAM MINI APP',true],
  ['anomia','03','ANOMIA','COMMERCIAL VISUAL NOVEL','RELEASED &amp; MONETISED',false]
]) {
  svg(`${name}-title-mobile.svg`,600,218,`${idx} / ${title}`,`
    <rect x=".5" y=".5" width="599" height="217" rx="14" fill="${light?'#E9EDDF':'#17211D'}" stroke="${light?'#D6DDCB':'#314137'}"/>
    ${label(28,37,`${idx} / SELECTED WORK`,light?'#53634F':'#9DAAA0',16)}
    ${text(26,108,56,light?'#17231C':'#F3F5ED',title,'font-weight="700" letter-spacing="-1.6"')}
    ${label(28,158,line1,light?'#53634F':'#9DAAA0',18)}
    ${label(28,189,line2,light?'#53634F':'#9DAAA0',18)}
    <path d="M531 32h35v35M531 67l35-35" fill="none" stroke="${light?'#53634F':'#C5F277'}" stroke-width="2"/>`);
}
svg('contact-mobile.svg',600,252,'Have a backend worth building? Let’s talk — kbelakov88@gmail.com',`
  <rect width="600" height="252" rx="14" fill="#C5F277"/>
  ${label(28,39,'NEXT / LET’S BUILD','#3F592B',17)}
  ${text(25,107,42,'#17231C','Have a backend','font-weight="700" letter-spacing="-1.3"')}
  ${text(25,157,42,'#17231C','worth building?','font-weight="700" letter-spacing="-1.3"')}
  ${text(28,216,24,'#3F592B','kbelakov88@gmail.com')}
  <g fill="none" stroke="#17231C" stroke-width="2.5"><circle cx="521" cy="121" r="32"/><path d="m509 133 24-24h-23m23 0v23"/></g>`);
console.log('Generated profile SVG assets.');

