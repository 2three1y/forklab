const out=document.getElementById('out'), st=document.getElementById('st');
const layouts=[
 ['Centered card','A big title at the top','One card in the middle with the main content','A wide main button at the bottom of the card'],
 ['Split screen','A picture on the top half','The content on the bottom half','Two buttons side by side'],
 ['Step by step','A progress bar that says step 1 of 3','One question at a time','Next and Back buttons'],
 ['Tabs at the bottom','A header with the app name','A scrolling list in the middle','Four tabs along the bottom'],
];
const styles={Minimal:'white space, one accent color, thin lines',Playful:'round corners, bright colors, a tiny mascot waving',Retro:'pixel font, chunky borders, 1998 energy','High contrast':'black and yellow, extra large text, thick focus outlines'};
let count=0;
function card(title,parts,note){
  count++; const li=Lab.el('li'); const h=Lab.el('h4','',title); li.append(h);
  const ul=Lab.el('ul'); parts.forEach(p=>ul.append(Lab.el('li','',p))); li.append(ul, Lab.el('p','meta',note));
  const b=Lab.el('button','','Fork this design'); b.type='button';
  b.addEventListener('click',()=>{ const twist=Lab.pick(['bigger buttons','dark mode','everything moved one inch to the left for no reason','a confetti button','fewer words']); const h2=card(title.replace(/^Option (\d+)/,'Remix of option $1')+' with '+twist,parts.concat('Change: '+twist),'Forked from '+title.split(':')[0]+'.'); h2.tabIndex=-1; h2.focus(); });
  li.append(Lab.el('div','row')); li.lastChild.append(b); out.append(li); return h;
}
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const q=document.getElementById('q').value.trim()||'A screen'; const s=document.getElementById('style').value;
  st.textContent='Designing… the pretend agent is drawing three options.';
  setTimeout(()=>{
    out.textContent=''; count=0; const pick=[...layouts].sort(()=>Math.random()-.5).slice(0,3);
    pick.forEach(([name,...parts],i)=>card('Option '+(i+1)+': '+name,parts,s+' style for “'+q+'”: '+styles[s]+'.'));
    st.textContent='Done. Three design options are in the list.';
  },1000);
});
