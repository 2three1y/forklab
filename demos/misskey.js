
const R=[['👍','Like'],['😂','Haha'],['🎉','Party'],['❤️','Love']];
const seed=[
 ['@toastmaster','Day 12 of trying to explain the fediverse to my cat. She has started her own instance out of spite.',[3,5,1,2]],
 ['@plantdad','My houseplant has more followers than me now. It just sits there. Maybe that is the secret.',[8,12,2,4]],
 ['@quietbyte','Reminder: drink water. Your keyboard does not count as a snack.',[6,1,0,9]],
 ['@spoonhub','Hot take: cereal is a soup. Please direct all complaints to my renotes.',[2,15,1,0]],
];
const tl=document.getElementById('tl'), ta=document.getElementById('note');
function note(who,text,counts,opts={}){
  const li=Lab.el('li',opts.cls||'');
  const head=Lab.el('p'); head.append(Lab.el('span','who',who), document.createTextNode(opts.tag?` ${opts.tag}`:''));
  li.append(head, Lab.el('p','',text));
  if(!opts.noActions){
    const row=Lab.el('div','row');
    R.forEach(([e,name],i)=>{
      let n=counts[i]; const b=Lab.el('button','',''); b.type='button'; b.setAttribute('aria-pressed','false');
      const draw=()=>{ b.textContent=`${e} ${name} ${n}`; }; draw();
      Lab.toggle(b,on=>{ n+=on?1:-1; draw(); }); row.append(b);
    });
    const rn=Lab.el('button','','Renote'); rn.type='button'; rn.setAttribute('aria-pressed','false'); let copy=null;
    Lab.toggle(rn,on=>{ if(on){ copy=note('You','renoted '+who+': '+text,[0,0,0,0],{cls:'me',tag:'(renote)',noActions:true}); rn.textContent='Renoted'; } else { copy&&copy.remove(); copy=null; rn.textContent='Renote'; } });
    row.append(rn); li.append(row);
  }
  tl.append(li); return li;
}
seed.forEach(s=>note(s[0],s[1],s[2]));
const replies=['@plantdad reacted 🎉 to your note. The plant also approves.','@toastmaster renoted you. The cat is jealous.','@spoonhub says: this is the best note since the cereal one.'];
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=ta.value.trim(); ta.value=''; ta.focus(); if(!t) return;
  note('You (@you)',t,[0,0,0,0],{cls:'me'});
  setTimeout(()=>{ const li=Lab.el('li','sys',Lab.pick(replies)); tl.append(li); },1500);
});
