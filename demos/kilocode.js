
const snippets=[
 [/fizz|buzz/i,'fizzbuzz.js',`for (let i = 1; i <= 15; i++) {
  let out = '';
  if (i % 3 === 0) out += 'Fizz';
  if (i % 5 === 0) out += 'Buzz';
  console.log(out || i);
}`],
 [/button/i,'button.html',`<button type="button" id="hi">Say hi</button>
<p id="said"></p>
<script>
  document.getElementById('hi').addEventListener('click', () => {
    document.getElementById('said').textContent = 'Hi! You pressed the button.';
  });
</script>`],
 [/sort/i,'sort.js',`const snacks = ['pretzels', 'apples', 'cookies', 'nachos'];
const sorted = [...snacks].sort((a, b) => a.localeCompare(b));
console.log(sorted); // apples, cookies, nachos, pretzels`],
 [/todo|list/i,'todo.js',`const todos = [];
function add(task) { todos.push({ task, done: false }); }
function finish(i) { todos[i].done = true; }
add('Write code');
add('Take a nap');
finish(1); // priorities`],
 [/joke|funny/i,'joke.py',`import random
jokes = [
    "Why do programmers like dark mode? Because light attracts bugs.",
    "I would tell you a UDP joke, but you might not get it.",
]
print(random.choice(jokes))`],
 [/hello|hi\b/i,'hello.swift',`import Foundation
print("Hello from Fork Lab! No servers were harmed.")`],
 [/api|fetch|server|internet/i,'offline.js',`// Fork Lab is offline on purpose.
// So instead of calling a server, we pretend:
async function fakeFetch() {
  return { ok: true, data: 'totally real server response' };
}
fakeFetch().then(r => console.log(r.data));`],
];
const fallback=['idea.js',`// I am not sure what that is, so here is a function
// that is confident anyway.
function doTheThing(input) {
  return 'Done! (I think.) You asked for: ' + input;
}
console.log(doTheThing('something cool'));`];
const steps=['Reading your request very seriously.','Pretending to think really hard.','Writing code with great confidence.'];
const ask=document.getElementById('ask'), log=document.getElementById('log'), code=document.getElementById('code');
let busy=false;
document.getElementById('f').addEventListener('submit',e=>{
  e.preventDefault(); const t=ask.value.trim(); ask.value=''; ask.focus(); if(!t||busy) return;
  busy=true; Lab.msg(log,'You',t,{cls:'me'});
  const hit=snippets.find(s=>s[0].test(t)); const [file,src]=hit?[hit[1],hit[2]]:fallback;
  steps.forEach((s,i)=>setTimeout(()=>Lab.msg(log,'Agent',s),400*(i+1)));
  setTimeout(()=>{ code.value=src; Lab.msg(log,'Agent',`Done. Wrote ${file}, ${src.split('\n').length} lines, into the code box below.`); busy=false; },400*(steps.length+1));
});
document.getElementById('copy').addEventListener('click',async()=>{
  const out=document.getElementById('copied');
  try{ await navigator.clipboard.writeText(code.value); out.textContent='Copied the code.'; }
  catch(_){ code.select(); out.textContent='Copy is blocked here, so I selected the code for you instead.'; }
});
