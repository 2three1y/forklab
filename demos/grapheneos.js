
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

// Menu: pick which mini demo is shown. Focus stays on the menu; the choice lives in the URL hash.
const pick=document.getElementById('pick');
const demoIds=['camera','messaging','pdf','appstore'];
const oldAnchors={'cam-h':'camera','sms-h':'messaging','pdf-h':'pdf','store-h':'appstore'};
function showDemo(id){
  if(!demoIds.includes(id)) id='camera';
  demoIds.forEach(d=>{ document.getElementById('demo-'+d).hidden=(d!==id); });
  pick.value=id;
  return id;
}
function fromHash(){ const h=decodeURIComponent(location.hash.slice(1)); return oldAnchors[h]||h; }
showDemo(fromHash());
pick.addEventListener('change',()=>{ const id=showDemo(pick.value); history.replaceState(null,'','#'+id); });
window.addEventListener('hashchange',()=>{ const h=fromHash(); if(demoIds.includes(h)) showDemo(h); });

// App Store
const storeStatus=document.getElementById('store-status');
const appList=document.getElementById('apps');
const say=t=>{ storeStatus.textContent='Store status: '+t; };
const apps=[
 {name:'Toast Timer',desc:'Tells you the exact second your toast is perfect. Also gently judges you for walking away.',size:'2 MB',perms:'No permissions. It only needs to know about toast.',open:'Toast Timer is open. Your toast is golden. You may proceed with butter.'},
 {name:'Sock Finder',desc:'Locates your missing socks. Success rate: zero percent. Confidence: one hundred percent.',size:'4 MB',perms:'No permissions. The socks remain a mystery.',open:'Sock Finder is open. Scanning... the socks are in another dimension. Sorry.'},
 {name:'Plant Pal',desc:'Reminds you to water your houseplant, the same one from the camera demo. It misses you.',size:'3 MB',perms:'No permissions. The plant respects your privacy.',open:'Plant Pal is open. Your plant says hi and would like a drink.'},
 {name:'Nap Planner',desc:'Schedules your naps so they never overlap with your other naps.',size:'1 MB',perms:'No permissions. Just vibes and pillows.',open:'Nap Planner is open. Your next nap is in 12 minutes. Get comfy.'},
 {name:'Humble Calculator',desc:'Does math without bragging about it. Two plus two is four, and it will not make a big deal of it.',size:'1 MB',perms:'No permissions. It just counts.',open:'Humble Calculator is open. It solved your math and did not even tell anyone.'},
];
const INSTALL_MS=1500;
apps.forEach((a,i)=>{
  const li=Lab.el('li');
  const h=Lab.el('h5','',a.name); h.id='app-'+i;
  const d=Lab.el('p','',a.desc);
  const meta=Lab.el('p','meta',`${a.size}. ${a.perms}`);
  const st=Lab.el('p','meta','Not installed.');
  const row=Lab.el('div','row');
  const main=Lab.el('button','primary','Install '+a.name); main.type='button';
  const un=Lab.el('button','','Uninstall '+a.name); un.type='button'; un.hidden=true;
  row.append(main,un); li.append(h,d,meta,st,row); appList.append(li);
  let state='none';
  main.addEventListener('click',()=>{
    if(state==='installing') return;
    if(state==='installed'){ say(a.open); return; }
    state='installing'; main.textContent='Installing '+a.name+'…'; main.setAttribute('aria-disabled','true');
    st.textContent='Installing…'; say(`Installing ${a.name}…`);
    setTimeout(()=>{
      state='installed'; main.textContent='Open '+a.name; main.removeAttribute('aria-disabled');
      un.hidden=false; st.textContent='Installed.'; say(`${a.name} installed. Use Open ${a.name} to try it.`);
    },INSTALL_MS);
  });
  un.addEventListener('click',()=>{
    state='none'; main.textContent='Install '+a.name; un.hidden=true; st.textContent='Not installed.';
    main.focus(); // the Uninstall button just hid itself, so keep focus on this app
    say(`${a.name} uninstalled. It took its toast crumbs with it.`);
  });
});
const updList=document.getElementById('updates'), updCount=document.getElementById('upd-count'), updAll=document.getElementById('updall');
const updates=[
 {name:'Weather Guess',from:'2.0',to:'2.1',note:'Now three percent less wrong about rain.'},
 {name:'Flashlight',from:'9.4',to:'9.5',note:'The light is now slightly more light.'},
];
function countLeft(){
  const left=updates.filter(u=>u.state!=='done').length;
  updCount.textContent= left ? `${left} update${left>1?'s':''} waiting.` : 'Everything is up to date.';
  if(!left){ updAll.textContent='All up to date'; updAll.setAttribute('aria-disabled','true'); }
  return left;
}
function runUpdate(u, done){
  if(u.state) return false;
  u.state='updating'; u.btn.textContent='Updating '+u.name+'…'; u.btn.setAttribute('aria-disabled','true'); u.st.textContent='Updating…';
  setTimeout(()=>{ u.state='done'; u.btn.textContent=u.name+' is up to date'; u.st.textContent=`Version ${u.to}, installed.`; u.ver.textContent=`Version ${u.to}. ${u.note}`; countLeft(); done&&done(); },INSTALL_MS);
  return true;
}
updates.forEach(u=>{
  const li=Lab.el('li');
  li.append(Lab.el('h5','',u.name));
  u.ver=Lab.el('p','',`Version ${u.from} to ${u.to}. ${u.note}`);
  u.st=Lab.el('p','meta','Update available.');
  const row=Lab.el('div','row');
  u.btn=Lab.el('button','','Update '+u.name); u.btn.type='button';
  u.btn.addEventListener('click',()=>{
    if(runUpdate(u,()=>say(`${u.name} updated to version ${u.to}.`))) say(`Updating ${u.name}…`);
  });
  row.append(u.btn); li.append(u.ver,u.st,row); updList.append(li);
});
updAll.addEventListener('click',()=>{
  const todo=updates.filter(u=>!u.state);
  if(!todo.length){ if(!updates.some(u=>u.state==='updating')) say('Everything is already up to date. Your phone is proud of you.'); return; }
  let n=todo.length;
  todo.forEach(u=>runUpdate(u,()=>{ if(--n===0) say('All updates done. Everything is up to date.'); }));
  say(`Updating ${todo.length} app${todo.length>1?'s':''}…`);
});
