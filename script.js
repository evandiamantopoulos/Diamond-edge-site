// Animated hero grid + particles, scroll reveals, and stat counters
const grid = document.getElementById('grid');
const g = grid.getContext('2d');
let W,H,t=0, dots=[];

function resize(){
  W = grid.width = window.innerWidth;
  H = grid.height = Math.max(520, window.innerHeight*0.72);
  dots = Array.from({length: Math.min(120, Math.floor(W*H/12000))}, () => ({
    x: Math.random()*W,
    y: Math.random()*H,
    vx: (Math.random()*0.6+0.2)*(Math.random()<0.5?-1:1),
    vy: (Math.random()*0.6+0.2)*(Math.random()<0.5?-1:1),
    a: Math.random()*0.5+0.2
  }));
}
function tick(){
  t+=0.01;
  g.clearRect(0,0,W,H);
  // grid lines
  g.strokeStyle = 'rgba(118,179,255,0.10)';
  g.lineWidth = 1;
  const step = 40;
  const offset = (Math.sin(t)*10);
  for(let x = -step; x < W+step; x+=step){
    g.beginPath();
    g.moveTo(x+offset, 0);
    g.lineTo(x+offset, H);
    g.stroke();
  }
  for(let y = -step; y < H+step; y+=step){
    g.beginPath();
    g.moveTo(0, y-offset);
    g.lineTo(W, y-offset);
    g.stroke();
  }
  // particles
  for(const d of dots){
    d.x += d.vx*0.6; d.y += d.vy*0.6;
    if(d.x<0||d.x>W) d.vx*=-1;
    if(d.y<0||d.y>H) d.vy*=-1;
    g.fillStyle = `rgba(118,179,255,${d.a})`;
    g.fillRect(d.x, d.y, 1.5, 1.5);
  }
  requestAnimationFrame(tick);
}
window.addEventListener('resize', resize);
resize(); tick();

// Mobile nav toggle
const header = document.querySelector('.site-header');
const nt = document.querySelector('.nav-toggle');
if(nt){ nt.addEventListener('click', ()=> header.classList.toggle('open')); }

// Reveal on scroll
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); ro.unobserve(e.target); }
  })
}, {threshold:0.15});
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Stat counters
function animateCounter(el){
  const target = +el.dataset.target;
  const dur = 1600;
  const start = performance.now();
  function step(ts){
    const p = Math.min(1, (ts-start)/dur);
    const val = Math.floor(target * (0.1 + 0.9*p*p));
    el.textContent = val.toLocaleString();
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
document.querySelectorAll('.stat .num').forEach(animateCounter);

// Year
document.getElementById('year').textContent = new Date().getFullYear();
