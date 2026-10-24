
const seed=[
 ['Penny Gadget','@penny@sock.social','Just finished assembling a bookshelf with zero leftover screws. I am now accepting applications for apprentices.',null,4,11],
 ['Moss Enjoyer','@moss@green.zone','Went for a walk and said hi to 14 dogs. Productivity is a state of mind.',null,9,30],
 ['Chef Oops','@oops@kitchen.town','I tried a new recipe tonight.','Food crimes, mild',2,7],
 ['Sleepy Server','@admin@tiny.instance','Instance update: the server got a new fan. It is very loud and very proud.',null,1,5],
];
const tl=document.getElementById('tl'), ta=document.getElementById('post'), cwon=document.getElementById('cwon'), cwbox=document.getElementById('cwbox'), cw=document.getElementById('cw'), left=document.getElementById('left');
const cwBodies={'Food crimes, mild':'It was pineapple on toast with ketchup. I regret nothing. My smoke alarm regrets everything.'};
function post(name,handle,text,warn,boosts,favs,mine){
  const li=Lab.el('li',mine?'me':'');
  const head=Lab.el('p'); head.append(Lab.el('span','who',name),document.createTextNode(' '+handle)); li.append(head);
  if(warn){ const d=Lab.el('details'); d.append(Lab.el('summary','','Content warning: '+warn+'. Show post'), Lab.el('p','',text)); li.append(d); }
  else li.append(Lab.el('p','',text));
  const row=Lab.el('div','row');
  const mk=(label,n)=>{ const b=Lab.el('button'); b.type='button'; b.setAttribute('aria-pressed','false'); const draw=()=>b.textContent=`${label} ${n}`; draw(); Lab.toggle(b,on=>{n+=on?1:-1; draw();}); return b; };
  row.append(mk('🔁 Boost',boosts),mk('⭐ Favourite',favs)); li.append(row); tl.append(li);
}
seed.forEach(s=>post(s[0],s[1],s[3]?cwBodies[s[3]]:s[2],s[3],s[4],s[5]));
cwon.addEventListener('change',()=>{ cwbox.hidden=!cwon.checked; });
ta.addEventListener('input',()=>{ left.textContent=500-ta.value.length; });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=ta.value.trim(); if(!t){ ta.focus(); return; }
  const w=cwon.checked&&cw.value.trim()?cw.value.trim():null;
  post('You','@you@forklab.local',t,w,0,0,true);
  ta.value=''; cw.value=''; left.textContent='500'; ta.focus();
  setTimeout(()=>{ tl.append(Lab.el('li','sys',Lab.pick(['Moss Enjoyer favourited your post.','Penny Gadget boosted your post. Fame at last.','Sleepy Server favourited your post. The fan cheered.']))); },1500);
});
