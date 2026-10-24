// Fork Lab home: the demo picker. Choosing a demo opens its page right away.
const pick=document.getElementById('pick');
pick.addEventListener('change',()=>{ if(pick.value) location.href=pick.value; });
// Coming back with the Back button: reset to "Choose a demo…" so picking the same demo again still works.
window.addEventListener('pageshow',()=>{ pick.value=''; });
