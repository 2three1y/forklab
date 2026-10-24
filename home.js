// Fork Lab home: the demo picker. Opens the chosen demo page; nothing else changes on this page.
const pickf=document.getElementById('pickf'), pick=document.getElementById('pick');
pickf.addEventListener('submit',e=>{ e.preventDefault(); location.href=pick.value; });
