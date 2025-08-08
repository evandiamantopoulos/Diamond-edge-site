// Minimal AI chatbot widget
const launcher = document.createElement('button');
launcher.className = 'chat-launcher';
launcher.innerText = 'Ask AI';
document.body.appendChild(launcher);

const win = document.createElement('div');
win.className = 'chat-window';
win.innerHTML = `
  <div class="chat-header">
    <strong>Diamond Edge • AI</strong>
    <button id="chat-close" class="btn btn-ghost" style="padding:6px 10px">×</button>
  </div>
  <div class="chat-body" id="chat-body">
    <div class="msg bot">Hi! Ask me about pricing, features, or booking a demo.</div>
    <div class="msg bot">Try: “How does contract review work?”</div>
  </div>
  <div class="chat-input">
    <input id="chat-input" placeholder="Type your question..." />
    <button id="chat-send" class="btn btn-primary">Send</button>
  </div>
`;
document.body.appendChild(win);

launcher.addEventListener('click', ()=> win.style.display = (win.style.display==='flex'?'none':'flex'));
document.getElementById('chat-close').addEventListener('click', ()=> win.style.display='none');

const chatBody = document.getElementById('chat-body');
const input = document.getElementById('chat-input');
document.getElementById('chat-send').addEventListener('click', sendMsg);
input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ sendMsg(); }});

function addMsg(text, who='user'){
  const m = document.createElement('div');
  m.className = 'msg ' + (who==='user'?'user':'bot');
  m.textContent = text;
  chatBody.appendChild(m);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMsg(){
  const q = input.value.trim();
  if(!q) return;
  addMsg(q,'user');
  input.value='';
  try {
    // Route through the serverless endpoint (see /api/chat.js)
    const r = await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ question: q })
    });
    if(!r.ok) throw new Error('Network error');
    const data = await r.json();
    addMsg(data.answer || 'Sorry, no answer returned.','bot');
  } catch (err){
    // Fallback canned answers so the widget is useful without API setup
    const fallback = cannedAnswer(q);
    addMsg(fallback,'bot');
  }
}

function cannedAnswer(q){
  q = q.toLowerCase();
  if(q.includes('price') || q.includes('cost')){
    return 'Our Starter plan is $1,500/mo, Pro is $3,000/mo, and Enterprise is custom. You can book a demo from the Sign Up link.';
  }
  if(q.includes('contract')){
    return 'Upload an agreement; we flag risky clauses, missing terms, and produce a plain-English summary plus suggested redlines for your approval.';
  }
  if(q.includes('research') || q.includes('case law')){
    return 'Ask natural-language questions; we return grounded answers with citations and related cases. Export to memo with one click.';
  }
  if(q.includes('brief')){
    return 'Provide transcripts, exhibits, and notes. We generate a structured brief: chronology, issues, witness summaries — you review and finalize.';
  }
  return 'I can help with pricing, features, and booking a demo. Try asking about contract review, research, or briefs.';
}
