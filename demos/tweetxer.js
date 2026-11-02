const pool=['Just had cereal for dinner. Living my best life.','Why is it called a building if it is already built?','Hot take: socks are just shoes for your shoes.','My code works and I do not know why. Do not touch it.','Today I learned that octopuses have three hearts. I have one and it is tired.','Who else is up at 2 AM thinking about that thing they said in 5th grade?','Pizza is a vegetable if you believe hard enough.','New phone who dis','I tweeted this in 2014 and I regret it already.','Me: I will go to bed early. Also me at 3 AM: reading about the history of spoons.'];
const st=document.getElementById('st'), leftEl=document.getElementById('left');
let tweets=[], timer=null, paused=false, done=0, total=0;
function draw(){ leftEl.textContent=''; tweets.forEach(t=>Lab.msg(leftEl,'You',t)); if(!tweets.length) Lab.msg(leftEl,'','Nothing left. Squeaky clean.',{cls:'sys'}); }
function load(){ tweets=Array.from({length:30},(_,i)=>pool[i%pool.length]+(i>=pool.length?' (again, '+(Math.floor(i/pool.length)+1)+')':'')); total=30; done=0; draw(); st.textContent='Archive loaded: found 30 tweets in tweets.js. Ready to delete.'; }
function stop(){ clearInterval(timer); timer=null; }
document.getElementById('load').addEventListener('click',()=>{ stop(); load(); });
document.getElementById('go').addEventListener('click',()=>{
  if(!total) load(); if(timer) return; if(!tweets.length){ st.textContent='All tweets are already deleted. Choose Start over to try again.'; return; }
  st.textContent='Deleting. '+done+' of '+total+' done.';
  timer=setInterval(()=>{
    if(paused) return; tweets.shift(); done++;
    if(done%5===0||!tweets.length){ st.textContent=tweets.length?'Deleting. '+done+' of '+total+' done.':'Finished. All '+total+' pretend tweets deleted. Your past is gone, like it never happened.'; draw(); }
    if(!tweets.length) stop();
  },300);
});
const pb=document.getElementById('pause');
Lab.toggle(pb,on=>{ paused=on; if(timer) st.textContent=on?'Paused at '+done+' of '+total+'.':'Deleting again. '+done+' of '+total+' done.'; });
document.getElementById('reset').addEventListener('click',()=>{ stop(); paused=false; pb.setAttribute('aria-pressed','false'); tweets=[]; total=0; done=0; leftEl.textContent=''; st.textContent='No archive loaded yet.'; });
