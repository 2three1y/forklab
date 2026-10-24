
const items=[
 {type:'heading',label:'Settings'},
 {type:'switch',label:'Wi-Fi',on:true},
 {type:'switch',label:'Dark mode',on:false},
 {type:'slider',label:'Brightness',value:40},
 {type:'button',label:'Order a pizza',count:0},
 {type:'button',label:'Snooze alarm',count:0},
 {type:'link',label:'Terms nobody reads'},
];
const list=document.getElementById('items'), said=document.getElementById('said');
let i=-1, moves=0;
document.getElementById('total').textContent=items.length;
function speech(it){
  if(it.type==='heading') return `${it.label}, heading`;
  if(it.type==='switch') return `${it.label}, switch, ${it.on?'on':'off'}, double tap to toggle`;
  if(it.type==='slider') return `${it.label}, ${it.value} percent, slider, double tap to raise`;
  if(it.type==='link') return `${it.label}, link`;
  return `${it.label}, button, double tap to activate`;
}
function visible(it){
  if(it.type==='switch') return `${it.label}: ${it.on?'On':'Off'}`;
  if(it.type==='slider') return `${it.label}: ${it.value}%`;
  return it.label;
}
function draw(){ list.textContent=''; items.forEach((it,k)=>{ const li=Lab.el('li',k===i?'current':'',visible(it)); if(k===i) li.setAttribute('aria-current','true'); list.append(li); }); document.getElementById('pos').textContent=i+1; document.getElementById('moves').textContent=moves; }
function say(t){ said.textContent='Screen reader says: '+t; }
function move(d){
  const n=i+d; moves++;
  if(n<0){ i=0; say('Start of screen. '+speech(items[0])); }
  else if(n>=items.length){ say('End of screen. Nothing more over here, just vibes.'); }
  else { i=n; say(speech(items[i])); }
  draw();
}
document.getElementById('next').addEventListener('click',()=>move(1));
document.getElementById('prev').addEventListener('click',()=>move(-1));
document.getElementById('act').addEventListener('click',()=>{
  if(i<0){ say('Nothing is highlighted yet. Press Next first.'); return; }
  const it=items[i]; moves++;
  if(it.type==='switch'){ it.on=!it.on; say(`${it.on?'On':'Off'}. ${it.label}, switch`); }
  else if(it.type==='slider'){ it.value=it.value>=100?0:it.value+10; say(`${it.value} percent`); }
  else if(it.type==='heading'){ say('Headings cannot be activated, but they appreciate the attention.'); }
  else if(it.type==='link'){ say('Opening Terms nobody reads. Just kidding, nobody opens it.'); }
  else { it.count++; say(it.label==='Order a pizza' ? `Pizza ordered ${it.count} time${it.count>1?'s':''}. Not really. This is pretend.` : `Alarm snoozed. ${it.count*9} more minutes of sleep earned.`); }
  draw();
});
draw();
