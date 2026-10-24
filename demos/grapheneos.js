
// Camera
const scenes={Photo:'a houseplant striking a dramatic pose',Portrait:'a houseplant with very blurry background drama',Night:'a houseplant, but spooky',Selfie:'you, looking great, plus a confused houseplant'};
const mode=document.getElementById('mode'), scene=document.getElementById('scene'), flash=document.getElementById('flash'), gal=document.getElementById('gallery');
let shots=0, lastFlash=0;
mode.addEventListener('change',()=>{ scene.textContent='Viewfinder: '+scenes[mode.value]+'.'; });
document.getElementById('shutter').addEventListener('click',()=>{
  shots++; document.getElementById('count').textContent=shots;
  const now=Date.now();
  if(now-lastFlash>500 && !matchMedia('(prefers-reduced-motion: reduce)').matches){ lastFlash=now; flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); }
  Lab.msg(gal,'',`Photo ${shots}, ${mode.value} mode: ${scenes[mode.value]}. Saved on this pretend phone only.`);
});
// Messaging
const thread=document.getElementById('thread'), sms=document.getElementById('sms');
Lab.msg(thread,'Pizza Palace','Your pizza is in the oven. The oven is very excited.',{meta:'7:58 PM'});
const pz=['Got it! Extra cheese has been noted and celebrated.','Our driver is on the way. He is singing.','Sorry, we are out of pineapple. A customer took all of it. All of it.','Thank you for texting Pizza Palace, where every slice is a slice of life.'];
let k=0;
document.getElementById('smsf').addEventListener('submit',e=>{
  e.preventDefault(); const t=sms.value.trim(); sms.value=''; sms.focus(); if(!t) return;
  Lab.msg(thread,'You',t,{cls:'me',meta:`${Lab.time()}, delivered`});
  const r=pz[k++%pz.length]; setTimeout(()=>Lab.msg(thread,'Pizza Palace',r,{meta:Lab.time()}),1300);
});
// PDF viewer
const pages=[
 ['How to Own a Houseplant','Chapter 1. Buy a plant. Congratulations, you now have a roommate who never pays rent.'],
 ['Chapter 2: Water','Water the plant. Not too much, not too little. The plant will not tell you which. That is part of the fun.'],
 ['Chapter 3: Talking','Talk to your plant every day. It will not answer, which makes it an excellent listener.'],
 ['Chapter 4: The End','If your plant is still alive, you win. If not, there is always a cactus. Cacti forgive everything.'],
];
let pg=0, size=1;
const page=document.getElementById('page'), info=document.getElementById('pginfo');
function drawPage(){ page.textContent=''; page.append(Lab.el('h4','',pages[pg][0]), Lab.el('p','',pages[pg][1])); page.style.fontSize=size+'rem'; info.textContent=`Page ${pg+1} of ${pages.length}`; }
document.getElementById('pgprev').addEventListener('click',()=>{ if(pg>0){ pg--; drawPage(); } else info.textContent='Page 1 of 4. Already on the first page.'; });
document.getElementById('pgnext').addEventListener('click',()=>{ if(pg<pages.length-1){ pg++; drawPage(); } else info.textContent=`Page ${pages.length} of ${pages.length}. That is the end. The plant thanks you.`; });
document.getElementById('zoomin').addEventListener('click',()=>{ size=Math.min(2,size+0.25); drawPage(); });
document.getElementById('zoomout').addEventListener('click',()=>{ size=Math.max(0.75,size-0.25); drawPage(); });
drawPage();
