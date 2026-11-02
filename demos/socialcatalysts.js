const people=[['Ava',12,7],['Ben',30,3],['Chloe',8,6],['Dev',15,2],['Eli',4,0],['You',0,0]];
const tb=document.getElementById('tb'), res=document.getElementById('res');
function draw(){ tb.textContent=''; people.forEach(([n,p,c])=>{ const tr=Lab.el('tr'); tr.append(Lab.el('th','',n),Lab.el('td','',String(p)),Lab.el('td','',String(c))); tr.firstChild.scope='row'; tb.append(tr); }); }
draw();
const rate=([,p,c])=>p?c/p:0;
document.getElementById('find').addEventListener('click',()=>{
  const ranked=people.filter(x=>x[1]).sort((a,b)=>rate(b)-rate(a));
  const top=ranked.slice(0,2).map(x=>x[0]+' ('+Math.round(rate(x)*100)+' percent of posts)').join(' and ');
  Lab.msg(res,'','Top social catalysts: '+top+'. Ben posts the most, but his posts rarely get his friends talking to each other. Posting a lot is not the same as bringing people together.',{cls:'sys'});
});
document.getElementById('post').addEventListener('click',()=>{
  const k=document.getElementById('kind').value, me=people[5]; me[1]++;
  const s={q:[1,'Ava and Dev argued about pineapple for 40 comments. They had never talked before. Catalyst post!',''],
           p:[.25,'Ava and Ben started talking about sandwiches in your comments. Surprise catalyst post!','Three friends said “looks good.” Nobody talked to each other. Not a catalyst post.'],
           n:[.6,'Chloe and Eli started comparing phone cases in your comments. Catalyst post!','Dev asked what phone it is. That is it. Not a catalyst post.']}[k];
  const hit=Math.random()<s[0]; if(hit) me[2]++;
  draw(); Lab.msg(res,'You',hit?s[1]:s[2],{meta:'Your score: '+me[2]+' catalyst posts out of '+me[1]});
});
