const colsEl=document.getElementById('cols');
const data={
 home:['Home',[['Deck Dave','Running 14 columns on one screen. My computer sounds like a jet. Worth it.'],['Retro Rita','The old TweetDeck is back and so is my productivity. Just kidding, I am scrolling five timelines now.']]],
 notif:['Notifications',[['Pixel Pete','Pixel Pete followed you.'],['Gary the Grill','Gary the Grill liked your tweet about soup.']]],
 toast:['Search: toast',[['Toast Fan 99','Hot take: toast is just bread that went to the gym.'],['Breakfast Bot','Daily toast report: golden, crispy, emotionally stable.']]],
 cats:['Search: cats',[['Whisker News','Breaking: local cat knocks glass off table, shows no remorse.'],['Cat Facts','Cats sleep 16 hours a day. Inspiring.']]],
 games:['List: Gaming news',[['Patch Notes Paul','New update fixes the bug where the boss was too easy. Nobody asked for this.'],['Speedrun Sam','New world record: beat the game in 4 minutes by walking through a wall.']]],
 likes:['Likes',[['','Twitter made likes private, so this column stays empty in the real extension too. Spooky.']]],
};
const lists={};
function column(key){
  const [name,items]=data[key]; const sec=Lab.el('section'); const id='col-'+key; sec.setAttribute('aria-labelledby',id+'-h');
  const h=Lab.el('h3','',name+' column'); h.id=id+'-h'; const ul=Lab.el('ul','feed'); lists[key]=ul;
  items.forEach(([who,t])=>who?Lab.msg(ul,who,t,{meta:Lab.pick(['2m','14m','1h'])}):Lab.msg(ul,'',t,{cls:'sys'}));
  sec.append(h,ul); colsEl.append(sec); return h;
}
['home','notif','toast'].forEach(column);
const tw=document.getElementById('tw'), left=document.getElementById('left');
tw.addEventListener('input',()=>{ left.textContent=280-tw.value.length; });
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=tw.value.trim(); tw.value=''; left.textContent='280'; tw.focus(); if(!t) return;
  Lab.msg(lists.home,'You',t,{cls:'me',meta:'now'});
  setTimeout(()=>Lab.msg(lists.notif,'',Lab.pick(['Deck Dave liked your tweet. He saw it in column 9.','Retro Rita retweeted your tweet.','Pixel Pete replied: this is the content I am here for.']),{cls:'sys'}),1500);
});
document.getElementById('add').addEventListener('click',()=>{
  const k=document.getElementById('addpick').value;
  if(lists[k]){ Lab.msg(lists.home,'','That column is already on your deck.',{cls:'sys'}); return; }
  const h=column(k); h.tabIndex=-1; h.focus();
});
