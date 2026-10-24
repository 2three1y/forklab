
const seed=[
 ['Retro Rita','@retrorita','Just changed my profile picture for the first time in 6 years. Everybody stay calm.',12,40],
 ['Gary the Grill','@garygrills','Live tweeting my lunch: it is a sandwich. Updates to follow.',3,8],
 ['Pixel Pete','@pixelpete','Remember when the star button was called favorite? I do. I miss it every day.',25,99],
 ['Hashtag Hank','@hank','#throwback to when my biggest problem was fitting a joke into 140 characters. Still my biggest problem.',7,31],
];
const tl=document.getElementById('tl'), tw=document.getElementById('tw'), left=document.getElementById('left');
function tweet(name,handle,text,rts,likes,mine){
  const li=Lab.el('li',mine?'me':'');
  const head=Lab.el('p'); head.append(Lab.el('span','who',name),document.createTextNode(' '+handle+' · '+(mine?'now':Lab.pick(['2h','5h','1d'])))); li.append(head, Lab.el('p','',text));
  const row=Lab.el('div','row');
  const mk=(label,n)=>{ const b=Lab.el('button'); b.type='button'; b.setAttribute('aria-pressed','false'); const draw=()=>b.textContent=`${label} ${n}`; draw(); Lab.toggle(b,on=>{n+=on?1:-1; draw();}); return b; };
  row.append(mk('🔁 Retweet',rts),mk('❤️ Like',likes)); li.append(row); tl.append(li);
}
seed.forEach(s=>tweet(...s));
tw.addEventListener('input',()=>{ left.textContent=140-tw.value.length; });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=tw.value.trim(); tw.value=''; left.textContent='140'; tw.focus(); if(!t) return;
  tweet('You','@you',t,0,0,true);
  setTimeout(()=>tl.append(Lab.el('li','sys',Lab.pick(['Pixel Pete liked your tweet. He says it reminds him of the good old days.','Retro Rita retweeted you. You are basically famous now.','Gary the Grill liked your tweet between bites.']))),1500);
});
