const agents=[
 ['Orchestrator','Morning plan: find more socks, sell more socks, lose fewer socks. Evening summary at 8 PM.'],
 ['Business Planning','New goal for this week: 10 more sock orders. Recommendation: stop putting socks in the dryer.'],
 ['Competitor Research','Looked at Sock Seeker Pro. They have a mascot. We need a mascot.'],
 ['Social Media','Drafted a post: “Lost a sock? We find it. Lost two? We find both. Lost three? Are you okay?” Sandbox mode, so it was not posted.'],
 ['Email Outreach','Wrote 3 friendly emails to laundromats. Sandbox mode, so none were sent.'],
 ['Customer Support','Read 2 pretend support messages and drafted replies. One customer found their sock in their other shoe.'],
 ['Ads Management','Suggested moving 5 pretend dollars to ads for people who say “where is my other sock.” Sandbox mode, so nothing was spent.'],
 ['Code Generation','Added a “Report a missing sock” button to the pretend website. Opened a pretend pull request.'],
 ['Finance','Pretend revenue today: 42 dollars. Pretend spending: 0 dollars, because sandbox mode.'],
];
const list=document.getElementById('agents'), log=document.getElementById('log');
function run(i){ const [n,t]=agents[i]; Lab.msg(log,n,t,{meta:Lab.time()}); }
agents.forEach(([n],i)=>{ const li=Lab.el('li'); const b=Lab.el('button','','Run '+n); b.type='button'; b.addEventListener('click',()=>run(i)); li.append(b); list.append(li); });
document.getElementById('morning').addEventListener('click',()=>{ run(0); [1,2,3].forEach((i,k)=>setTimeout(()=>run(i),700*(k+1))); });
