const videos={calm:[0,0,1,0,0,0,1,0],concert:[0,1,2,6,8,7,2,0],cartoon:[0,0,1,4,1,0,3,0]};
const st=document.getElementById('st'), log=document.getElementById('log'), show=document.getElementById('show'), play=document.getElementById('play');
let timer=null, sec=0, frames=[], blocked=false;
function stop(){ clearInterval(timer); timer=null; }
function step(){
  if(sec>=frames.length){ stop(); st.textContent='Video finished. Shield is still on.'; Lab.msg(log,'','Video finished.',{cls:'sys'}); return; }
  const n=frames[sec], lim=+document.getElementById('lvl').value; sec++;
  if(n>=lim){ stop(); blocked=true; show.hidden=false; st.textContent='Blocked at second '+sec+': '+n+' flashes in one second. The video is dimmed and paused.'; Lab.msg(log,'Shield','Second '+sec+': '+n+' flashes. Too many. Dimmed and paused the video.'); return; }
  Lab.msg(log,'Shield','Second '+sec+': '+n+' flash'+(n===1?'':'es')+'. Safe, still playing.');
}
play.addEventListener('click',()=>{ stop(); log.textContent=''; show.hidden=true; blocked=false; sec=0; frames=videos[document.getElementById('vid').value]; st.textContent='Playing. The shield is checking every second.'; timer=setInterval(step,700); });
show.addEventListener('click',()=>{ show.hidden=true; Lab.msg(log,'You','Chose to show the video anyway. In the real extension that is your choice too. Here it just skips the flashing part.'); const lim=+document.getElementById('lvl').value; while(sec<frames.length&&frames[sec]>=lim) sec++; st.textContent='Playing again. The shield is still checking.'; play.focus(); timer=setInterval(step,700); });
