const mx=document.getElementById('mx'), im=document.getElementById('im'), m=document.getElementById('m'), from=document.getElementById('from');
function both(who,t,first){ const a=first==='matrix'?mx:im, b=first==='matrix'?im:mx; Lab.msg(a,who,t,{cls:who==='You'?'me':''}); setTimeout(()=>Lab.msg(b,who,t,{cls:who==='You'?'me':'',meta:'carried by the bridge'}),700); }
both('Mom','Did you eat dinner?','imsg');
const replies=['Okay sweetie. Also why is your message blue AND green at the same time?','Love you. Did you do your homework?','Who is Matrix? Is that a new friend?','Great! Call your grandma.','Thumbs up emoji. I do not know how to send the real one.'];
m.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); document.getElementById('f').requestSubmit(); } });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=m.value.trim(); m.value=''; m.focus(); if(!t) return;
  both('You',t,from.value);
  setTimeout(()=>both('Mom',Lab.pick(replies),'imsg'),2000);
});
