const rules=[
 [/hello|hi\b|hey/i,'Hi! I live inside an Android app now. It is cozy in here. Slightly smaller than a website.'],
 [/joke|funny/i,'Why did the phone wear glasses? It lost its contacts.'],
 [/battery/i,'I am not draining your battery. That is the 47 tabs you have open. I am innocent.'],
 [/android|phone|app/i,'Fun fact: I am basically the HuggingChat website wearing a phone app costume. Very convincing costume though.'],
 [/who are you|what are you/i,'I am a scripted bot in Fork Lab, inspired by the HuggingChat Android app. Zero brains, full charge.'],
 [/thank/i,'Anytime! Please rate me five stars in the pretend Play Store.'],
];
const filler=['Good question. Let me think for 0.4 seconds. Okay, I think yes.','I would answer that, but I am a small app with big dreams.','Hmm. My notification bell says I should say something smart. Something smart.','Let me check. Checking. Done. The answer is vibes.'];
const chat=document.getElementById('chat'), q=document.getElementById('q'), net=document.getElementById('net');
let offline=false, last='';
function bot(t){ last=t; Lab.msg(chat,'HuggingChat',t); }
function greet(){ bot('Hi! I am the pretend HuggingChat app. Ask me anything.'); }
greet();
Lab.toggle(document.getElementById('plane'),on=>{ offline=on; net.textContent=on?'No internet. The app shows: Could not connect. Check your connection and try again.':'Connected to the internet again. The app is showing the chat.'; });
document.getElementById('share').addEventListener('click',()=>{ Lab.msg(chat,'',last?'You shared the last reply to Messages. Pretend share, nothing was sent.':'Nothing to share yet.',{cls:'sys'}); });
document.getElementById('newchat').addEventListener('click',()=>{ chat.textContent=''; greet(); });
q.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); document.getElementById('f').requestSubmit(); } });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=q.value.trim(); q.value=''; q.focus(); if(!t) return;
  Lab.msg(chat,'You',t,{cls:'me'});
  if(offline){ setTimeout(()=>Lab.msg(chat,'','Message not sent. No internet. Turn off airplane mode and send it again.',{cls:'sys'}),500); return; }
  const hit=rules.find(r=>r[0].test(t)); const ans=hit?hit[1]:Lab.pick(filler);
  setTimeout(()=>bot(ans),900);
});
