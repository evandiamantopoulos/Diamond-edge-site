const launcher=document.createElement('button');launcher.className='chat-launcher';launcher.innerText='Ask AI';document.body.appendChild(launcher);
const win=document.createElement('div');win.className='chat-window';win.innerHTML=`<div class="chat-header"><strong>Diamond Edge • AI</strong><button id="chat-close" class="btn btn-ghost" style="padding:6px 10px">×</button></div>
<div class="chat-body" id="chat-body"><div class="msg bot">Hi! Ask me about pricing, features, or booking a demo.</div></div>
<div class="chat-input"><input id="chat-input" placeholder="Type your question..." /><button id="chat-send" class="btn btn-primary">Send</button></div>`;
document.body.appendChild(win);
launcher.addEventListener('click',()=>{win.style.display=(win.style.display==='flex'?'none':'flex')});
document.getElementById('chat-close').addEventListener('click',()=>win.style.display='none');
const chatBody=document.getElementById('chat-body');const input=document.getElementById('chat-input');
document.getElementById('chat-send').addEventListener('click',sendMsg);input.addEventListener('keydown',e=>{if(e.key==='Enter'){sendMsg();}});
function addMsg(t,w='user'){const m=document.createElement('div');m.className='msg '+(w==='user'?'user':'bot');m.textContent=t;chatBody.appendChild(m);chatBody.scrollTop=chatBody.scrollHeight;}
async function sendMsg(){const q=input.value.trim();if(!q)return;addMsg(q,'user');input.value='';try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q})});const data=await r.json();addMsg(data.answer||'No answer returned.','bot');}catch(err){addMsg(canned(q),'bot');}}
function canned(q){q=q.toLowerCase();if(q.includes('price')||q.includes('cost'))return 'Starter $1,500/mo, Pro $3,000/mo, Enterprise custom. Book a demo from Sign Up.';
if(q.includes('contract'))return 'Upload an agreement; we flag risky clauses, missing terms, and produce a plain‑English summary with suggested redlines.';
if(q.includes('research')||q.includes('case law'))return 'Ask natural‑language questions; we return grounded answers with citations and related cases.';
if(q.includes('brief'))return 'Provide transcripts, exhibits, and notes. We generate a structured brief for your review.';
return 'I can help with pricing, features, and booking a demo. Try asking about contract review, research, or briefs.';}