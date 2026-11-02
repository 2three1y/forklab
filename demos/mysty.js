const feed=document.getElementById('feed'), y=document.getElementById('y');
function yap(who,t,hype,mine){
  const li=Lab.el('li',mine?'me':''); const p=Lab.el('p'); p.append(Lab.el('span','who',who),document.createTextNode(': '+t)); li.append(p);
  let n=hype; const b=Lab.el('button'); b.type='button'; b.setAttribute('aria-pressed','false'); const draw=()=>b.textContent='🔥 Hype '+n; draw(); Lab.toggle(b,on=>{n+=on?1:-1; draw();});
  const row=Lab.el('div','row'); row.append(b); li.append(row); feed.append(li);
}
[['Mist Queen','First yap on the new app. Is this thing on?',9],['Loud Larry','I have been yapping for 3 hours straight. My thumbs are tired. I will not stop.',22],['Quiet Quinn','I do not yap much. This is my yap for the year.',41]].forEach(s=>yap(...s));
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=y.value.trim(); y.value=''; y.focus(); if(!t) return;
  yap('You',t,0,true);
  setTimeout(()=>Lab.msg(feed,Lab.pick(['Loud Larry','Mist Queen','Quiet Quinn']),Lab.pick(['Great yap. Ten out of ten.','This yap changed my life a little.','Yapping back to say: same.','Okay but this is actually so true.']),{meta:'replied to your yap'}),1500);
});
