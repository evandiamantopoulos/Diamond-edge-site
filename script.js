// Simple starfield animation + nav toggle + smooth hash links
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let w, h, stars;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  // generate stars
  const count = Math.min(400, Math.floor(w*h/6000));
  stars = Array.from({length: count}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    z: Math.random()*2 + 0.5,
    r: Math.random()*1.2 + 0.2,
    a: Math.random()*0.5 + 0.3
  }));
}
function tick(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = '#fff';
  for(const s of stars){
    s.x += (s.z*0.15);
    if(s.x > w) s.x = 0;
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
window.addEventListener('resize', resize);
resize(); tick();

// Mobile nav toggle
const header = document.querySelector('.site-header');
document.querySelector('.nav-toggle').addEventListener('click', () => {
  header.classList.toggle('open');
});

// Smooth scroll fix for offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if(!id) return;
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({top:y, behavior:'smooth'});
    }
  });
});
