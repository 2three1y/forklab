const chat=document.getElementById('chat'), q=document.getElementById('q'), app=document.getElementById('app'), todo=document.getElementById('todo');
const say=t=>Lab.msg(chat,'Lobster',t,{meta:'via '+app.value});
say('Hi! I am your pretend lobster assistant. Pinch me with a job. 🦞');
app.addEventListener('change',()=>Lab.msg(chat,'','Switched to '+app.value+'. Same lobster, different chat app.',{cls:'sys'}));
function answer(t){
  let m;
  if((m=t.match(/remind me (to )?(.+)/i))) return 'Reminder set: '+m[2]+'. I will pinch you gently at 7 PM. Pretend reminder, no alarm will ring.';
  if((m=t.match(/add (.+?) to (my )?(to-?do )?list/i))){ todo.append(Lab.el('li','',m[1])); return 'Added “'+m[1]+'” to your to-do list. You now have '+todo.children.length+' things to do. Good luck.'; }
  if(/weather/i.test(t)) return 'Pretend weather: 72 degrees, sunny, light breeze, zero chance of lobsters falling from the sky.';
  if(/joke|funny/i.test(t)) return 'Why did the lobster blush? Because the sea weed.';
  if(/who are you|what are you/i.test(t)) return 'I am a scripted lobster in Fork Lab, inspired by OpenClaw. The real one runs on your computer. I run on vibes.';
  if(/thank/i.test(t)) return 'Claws up! Anytime.';
  return Lab.pick(['On it. Just kidding, I am pretend, but I believe in you.','I can do reminders, to-do lists, weather and jokes. Everything else makes me nervous.','Interesting request. I have added it to my list of things to think about while molting.']);
}
q.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); document.getElementById('f').requestSubmit(); } });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=q.value.trim(); q.value=''; q.focus(); if(!t) return;
  Lab.msg(chat,'You',t,{cls:'me',meta:'via '+app.value});
  const a=answer(t); setTimeout(()=>say(a),800);
});
