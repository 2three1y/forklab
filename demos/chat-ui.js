
const rules=[
 [/hello|hi\b|hey/i,'Hello! I am a pretend model running entirely on your phone. My parameters are mostly snacks.'],
 [/joke|funny/i,'Why did the sandwich go to school? It wanted to be a little more well-bread.'],
 [/weather/i,'I cannot check the weather because I am offline, but I predict a 100 percent chance of you being awesome.'],
 [/sandwich|food|eat/i,'Sandwiches are the perfect technology. Two breads, infinite possibilities. Toasted is better. I will not be taking questions.'],
 [/code|program/i,'Here is my best code advice: name your variables like you will read them at 3 AM. Because you will.'],
 [/who are you|what are you/i,'I am a scripted bot in Fork Lab, inspired by Hugging Face Chat UI. I have no brain, but I have range.'],
 [/thank/i,'You are welcome! That will be zero dollars and one compliment.'],
];
const filler=['Great question. I have thought about it for 0.6 seconds and I believe the answer is: probably!','Interesting. Tell me more, but slowly, I am a small model.','I asked my training data and it shrugged.','That is above my pay grade, and my pay is zero.'];
const chat=document.getElementById('chat'), q=document.getElementById('q'), model=document.getElementById('model');
function greet(){ Lab.msg(chat,model.value,'Hi! Ask me anything. Results may be delicious but not accurate.'); }
greet();
document.getElementById('newchat').addEventListener('click',()=>{ chat.textContent=''; greet(); });
q.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); document.getElementById('f').requestSubmit(); } });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=q.value.trim(); q.value=''; q.focus(); if(!t) return;
  Lab.msg(chat,'You',t,{cls:'me'});
  const hit=rules.find(r=>r[0].test(t)); const ans=hit?hit[1]:Lab.pick(filler); const m=model.value;
  setTimeout(()=>Lab.msg(chat,m,ans),900);
});
