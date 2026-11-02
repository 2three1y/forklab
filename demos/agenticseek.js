// AgenticSeek pretend agent. Everything is scripted and fake. No network, nothing runs.
const log=document.getElementById('log'), q=document.getElementById('q'), st=document.getElementById('st');
let safe=true, timers=[], busy=false;
function say(who,text,code){ const li=Lab.msg(log,who,text); if(code){ li.append(Lab.el('pre','',code)); } return li; }
function sys(text){ Lab.msg(log,'',text,{cls:'sys'}); }
function stopAll(){ timers.forEach(clearTimeout); timers=[]; busy=false; }
function run(steps){
  stopAll(); busy=true;
  steps.forEach((s,i)=>{ timers.push(setTimeout(()=>{
    st.textContent=i===steps.length-1?'Done. The agent is waiting for a task.':'Step '+(i+1)+' of '+steps.length+': '+s[0]+' is working.';
    say(s[0],s[1],s[2]);
    if(i===steps.length-1) busy=false;
  },700*(i+1))); });
}
const pages=['Top 5 Socks of 2026, from Fake Sock Weekly','Reddit-ish thread: are toe socks a crime?','SockCompare dot pretend: price list'];
function browse(topic){ return [
  ['Browser agent','Searching the web for: '+topic+'. Pretend search, no internet used.'],
  ['Browser agent','Found 3 results. Opening the first one: '+pages[0]+'.'],
  ['Browser agent','Reading the page. Skipping a pop-up that wants my email. Nice try.'],
  ['Browser agent','Also checked '+pages[1]+'. Opinions are strong over there.'],
  ['Browser agent','Summary: the most loved pick is the Cozy Wool Crew Sock. Runner-up: socks with tiny tacos on them.']
]; }
const game=`import random

secret = random.randint(1, 10)
guess = int(input("Guess a number from 1 to 10: "))
if guess == secret:
    print("You got it!")
else:
    print("Nope, it was", secret)`;
const site=`<!doctype html>
<html lang="en-US">
<title>Sock Shop</title>
<h1>Sock Shop</h1>
<p>Warm socks. Fair prices. Zero holes.</p>
<a href="shop.html">See all socks</a>`;
function code(task){
  const isGame=/game|guess/i.test(task);
  return [
    ['Coder','Writing '+(isGame?'guess.py':'hello.py')+':',isGame?game:'print("Hello from the pretend coder!")\nprint("Task was: '+task.slice(0,40).replace(/"/g,"'")+'")'],
    ['Coder','Running it in a pretend sandbox. Nothing real runs on this page.'],
    ['Coder','Pretend output:',isGame?'Guess a number from 1 to 10: 7\nNope, it was 3':'Hello from the pretend coder!'],
    ['Coder','It worked on the first try. Suspicious, but okay.']
  ];
}
function plan(task){ return [
  ['Planner','Plan for: '+task+'. Step 1: the browser agent checks other sock shops. Step 2: the coder writes the first page. Step 3: I check the work.'],
  ['Browser agent','Looking at 2 pretend sock shop websites. Both have a big button and a picture of a sock. Noted.'],
  ['Coder','Writing index.html:',site],
  ['Planner','Checked the page. It has a language, a heading and a plain link. All steps done.']
]; }
function files(){ return [
  ['File agent','Looking in the pretend folder Documents.'],
  ['File agent','Found 4 files: homework_FINAL.docx, homework_FINAL_v2.docx, homework_REAL_final.docx, cat_pictures.zip.'],
  ['File agent','The newest one is homework_REAL_final.docx. I would open it, but this is all pretend.']
]; }
const casual=['Doing great! I am a pretend agent with no tasks, which is my favorite kind of day.','Honestly? I could plan, browse and code, but chatting is nice too.','Good question. My router says this one is just for vibes.'];
function route(task){
  if(/delete|rm -rf|wipe|format|erase/i.test(task)){
    if(safe) return [['Router','Picked: Coder.'],['Coder','Blocked by safe mode. That command could delete files, so I will not run it.']];
    return [['Router','Picked: Coder.'],['Coder','Safe mode is off, so the real agent would run this command. That is exactly why safe mode matters.'],['Coder','Good news: this page cannot touch your files. Nothing was deleted.']];
  }
  if(/plan|project|website|and then/i.test(task)) return [['Router','Picked: Planner. This task has more than one step.']].concat(plan(task));
  if(/code|python|script|program|game|function|write/i.test(task)) return [['Router','Picked: Coder.']].concat(code(task));
  if(/file|folder|document|homework/i.test(task)) return [['Router','Picked: File agent.']].concat(files());
  if(/search|find|best|web|news|weather|price|look up/i.test(task)) return [['Router','Picked: Browser agent.']].concat(browse(task));
  return [['Router','Picked: Casual agent.'],['Casual agent',Lab.pick(casual)]];
}
sys('Pretend agent ready. Everything here is fake and offline.');
const ex=document.getElementById('ex');
ex.addEventListener('change',()=>{ if(ex.value){ q.value=ex.value; } });
Lab.toggle(document.getElementById('safe'),on=>{ safe=on; sys(on?'Safe mode is on. Risky commands get blocked.':'Safe mode is off. The real agent would now run any command it wants. This pretend one still cannot.'); });
document.getElementById('stop').addEventListener('click',()=>{ if(busy){ stopAll(); sys('You stopped the agent.'); } st.textContent='Stopped. The agent is waiting for a task.'; });
document.getElementById('clear').addEventListener('click',()=>{ stopAll(); log.textContent=''; st.textContent='The agent is waiting for a task.'; sys('Pretend agent ready. Everything here is fake and offline.'); });
q.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); document.getElementById('f').requestSubmit(); } });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=q.value.trim(); q.value=''; q.focus(); if(!t) return;
  Lab.msg(log,'You',t,{cls:'me'});
  run(route(t));
});
