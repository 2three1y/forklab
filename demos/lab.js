
// Fork Lab shared helpers. No network, no storage of anything personal.
window.Lab = {
  el(tag, cls, text){ const e=document.createElement(tag); if(cls) e.className=cls; if(text!=null) e.textContent=text; return e; },
  time(){ const d=new Date(); return d.toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}); },
  pick(a){ return a[Math.floor(Math.random()*a.length)]; },
  msg(list, who, text, opts={}){
    const li=Lab.el('li', opts.cls||'');
    if(who){ const w=Lab.el('span','who',who); li.append(w, document.createTextNode(': ')); }
    li.append(document.createTextNode(text));
    if(opts.meta){ li.append(Lab.el('div','meta',opts.meta)); }
    list.append(li); return li;
  },
  toggle(btn, onChange){
    btn.addEventListener('click', ()=>{ const on=btn.getAttribute('aria-pressed')!=='true'; btn.setAttribute('aria-pressed', String(on)); onChange && onChange(on); });
  }
};
