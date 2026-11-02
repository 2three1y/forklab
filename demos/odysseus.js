// Odysseus pretend workspace. Everything is scripted and fake. No network, nothing is saved.
const chatsEl=document.getElementById('chats'), chat=document.getElementById('chat'), q=document.getElementById('q'), st=document.getElementById('st');
const chatH=document.getElementById('chat-h'), model=document.getElementById('model');
const chats=[
  {title:'Sock Finder plans', log:[['You','What should Sock Finder do first?'],['Odysseus','Find the missing left sock. It is always the left one.']]},
  {title:'Toast debate', log:[['You','Is toast a sandwich?'],['Odysseus','Toast is one slice. A sandwich needs two. Toast is a solo artist.']]},
  {title:'Cookbook: pick a model', log:[['You','Which model fits on my server?'],['Odysseus','Pretend answer: Pretend Llama 8B fits. Potato 1B fits on an actual potato.']]}
];
let cur=0, n=0;
const pagesList=['chat','notes','tasks','inbox'], names={chat:'Chat',notes:'Notes',tasks:'Tasks',inbox:'Inbox'};
let page='chat';
function show(p){
  page=p;
  pagesList.forEach(x=>{ document.getElementById('p-'+x).hidden=x!==p; document.getElementById('go-'+x).setAttribute('aria-pressed',String(x===p)); });
  st.textContent=p==='chat'?'Open: Chat, '+chats[cur].title+'.':'Open: '+names[p]+'.';
}
pagesList.forEach(x=>document.getElementById('go-'+x).addEventListener('click',()=>show(x)));
function drawChats(){
  chatsEl.textContent='';
  chats.forEach((c,i)=>{ const li=Lab.el('li'); const b=Lab.el('button','',c.title); b.type='button'; b.setAttribute('aria-pressed',String(i===cur)); b.addEventListener('click',()=>openChat(i)); li.append(b); chatsEl.append(li); });
}
function openChat(i){
  cur=i; chat.textContent='';
  chats[i].log.forEach(m=>Lab.msg(chat,m[0],m[1],m[0]==='You'?{cls:'me'}:{}));
  chatH.textContent='Chat: '+chats[i].title+' (newest at the bottom)';
  drawChats(); show('chat');
}
function add(who,text){ chats[cur].log.push([who,text]); Lab.msg(chat,who,text,who==='You'?{cls:'me'}:{}); }
// Notes
const notes=document.getElementById('notes');
['Server password is in my head, not in a note. Good job me.','Toast is a lifestyle.'].forEach(t=>Lab.msg(notes,'Note',t));
function addNote(t){ Lab.msg(notes,'Note',t); }
document.getElementById('nf').addEventListener('submit',e=>{ e.preventDefault(); const i=document.getElementById('nq'); const t=i.value.trim(); i.value=''; if(t) addNote(t); });
// Tasks
const tasks=document.getElementById('tasks');
function addTask(t,done){
  const li=Lab.el('li'); const lab=Lab.el('label','check'); const cb=Lab.el('input'); cb.type='checkbox'; cb.checked=!!done;
  lab.append(cb, document.createTextNode(t)); li.append(lab); tasks.append(li);
}
addTask('Update the pretend server',true); addTask('Feed the pretend fish',false);
// Inbox
const inbox=document.getElementById('inbox');
[['Grandma','Did you eat?','Sorted: Important. Reply soon.'],['Sock Store','50 percent off left socks only','Sorted: Promo. Probably skip.'],['Server','Backup finished','Sorted: FYI. Nothing to do.']].forEach(m=>Lab.msg(inbox,m[0],m[1],{meta:m[2]}));
// Chat replies
const rules=[
  [/hello|hi\b|hey/i,()=>'Hey! I am running on your own pretend server, so nobody else sees this chat.'],
  [/joke|funny/i,()=>'Why did the server go to therapy? Too many unresolved requests.'],
  [/who are you|what are you/i,()=>'I am a scripted pretend Odysseus in Fork Lab. The real one is a whole AI workspace.'],
  [/private|local|server|cloud/i,()=>'Self-hosted means it runs on a computer you own. In this demo, that computer is pretend.'],
  [/thank/i,()=>'Anytime. That will be zero dollars, because I am pretend.'],
];
const filler=['Good question. Let me think locally. Okay, I think yes.','Hmm. My pretend GPU is warm now. The answer is probably socks.','I would look that up, but this demo has no internet. Very peaceful.'];
document.getElementById('newchat').addEventListener('click',()=>{ n++; chats.push({title:'New chat '+n, log:[['Odysseus','New chat. What are we working on?']]}); openChat(chats.length-1); q.focus(); });
q.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); document.getElementById('f').requestSubmit(); } });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=q.value.trim(); q.value=''; q.focus(); if(!t) return;
  add('You',t);
  let ans;
  const task=t.match(/(?:add )?(?:a )?task(?: to)?[: ]+(.+)/i), note=t.match(/note[: ]+(.+)/i);
  if(task){ task[1]=task[1].charAt(0).toUpperCase()+task[1].slice(1); addTask(task[1],false); ans='Added to Tasks: '+task[1]+'.'; }
  else if(note){ addNote(note[1]); ans='Saved to Notes: '+note[1]+'.'; }
  else { const hit=rules.find(r=>r[0].test(t)); ans=hit?hit[1]():Lab.pick(filler); }
  const who='Odysseus ('+model.value.replace(/ \(.*\)/,'')+')';
  setTimeout(()=>add(who,ans),800);
});
openChat(0);
