
const peers=[
 {nick:'PixelPigeon', hops:1, lines:['Got it! Passing it along like a hot potato.','Bluetooth says hi. Bluetooth says everything is hi.','I am standing next to a vending machine for better signal. It is not helping.']},
 {nick:'CaptainCrumpet', hops:2, lines:['Message received, captain. Wait, I am the captain.','Relaying this across the food court at the speed of snacks.','My battery is at 4 percent but my spirit is at 100.']},
 {nick:'WaffleWizard', hops:3, lines:['A wizard is never late. Messages just take 3 hops.','I cast Relay. It is super effective.','Tell the others the waffles are ready. Metaphorically.']}
];
let nick='you'+Math.floor(1000+Math.random()*9000);
const list=document.getElementById('msgs'), input=document.getElementById('msg'), nickEl=document.getElementById('nick'), peerList=document.getElementById('peers');
nickEl.textContent=nick;
function drawPeers(){ peerList.textContent=''; peers.forEach(p=>{ peerList.append(Lab.el('li','',`${p.nick}, ${p.hops} hop${p.hops>1?'s':''} away`)); }); }
drawPeers();
Lab.msg(list,'',`Joined #mesh at ${Lab.time()}. 3 peers in range. No internet needed, just good vibes.`,{cls:'sys'});
Lab.msg(list,'PixelPigeon','Anyone else here? My phone just found three strangers and a toaster.',{meta:'direct, 1 hop'});
function sys(t){ Lab.msg(list,'',t,{cls:'sys'}); }
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=input.value.trim(); input.value=''; input.focus(); if(!t) return;
  if(t.startsWith('/')){
    const [cmd,...rest]=t.split(/\s+/); const arg=rest.join(' ');
    if(cmd==='/nick'){ if(!arg){ sys('Usage: /nick NewName'); return; } const old=nick; nick=arg.slice(0,24); nickEl.textContent=nick; sys(`${old} is now known as ${nick}.`); setTimeout(()=>Lab.msg(list,'WaffleWizard',`Nice name, ${nick}. Very mysterious.`,{meta:'relayed, 3 hops'}),1200); return; }
    if(cmd==='/who'){ sys('Online in #mesh: '+[nick+' (you)',...peers.map(p=>p.nick)].join(', ')+'.'); return; }
    if(cmd==='/help'){ sys('Commands: /nick NewName changes your name. /who lists who is here. /clear clears the messages.'); return; }
    if(cmd==='/clear'){ list.textContent=''; sys('Messages cleared. The mesh forgets nothing, but this page does.'); return; }
    sys(`Unknown command ${cmd}. Try /help.`); return;
  }
  Lab.msg(list,nick,t,{cls:'me',meta:`sent ${Lab.time()}`});
  const p=Lab.pick(peers);
  const relay=peers.filter(x=>x.hops<p.hops).map(x=>x.nick);
  setTimeout(()=>{
    Lab.msg(list,p.nick,Lab.pick(p.lines),{meta: relay.length? `relayed through ${relay.join(' and ')}, ${p.hops} hops` : 'direct, 1 hop'});
  }, 900+p.hops*500);
});
