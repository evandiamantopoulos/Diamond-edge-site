// Footer year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

(function(){
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d', { alpha:true });
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let W,H,stars=[],tick=0;
  function resize(){ W=canvas.clientWidth=innerWidth; H=canvas.clientHeight=innerHeight;
    canvas.width=Math.floor(W*DPR); canvas.height=Math.floor(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); spawn(); }
  function spawn(){ const density=0.00028; const count=Math.floor(W*H*density);
    stars = Array.from({length:count}).map(()=>{
      const r=Math.random(); let color='rgba(255,255,255,1)';
      if(r<0.08) color='rgba(255,138,61,1)'; else if(r<0.16) color='rgba(122,162,255,1)';
      return {x:Math.random()*W,y:Math.random()*H,vx:(Math.random()*0.12+0.03)*(Math.random()<0.5?1:-1),
              vy:(Math.random()*0.08+0.02)*(Math.random()<0.5?1:-1),z:Math.random()*0.9+0.1,r:Math.random()*1.2+0.25,color};
    }); }
  function frame(){ tick++; ctx.clearRect(0,0,W,H); const tw=0.75+Math.sin(tick*0.02)*0.12;
    for(const s of stars){ s.x+=s.vx*s.z*0.7; s.y+=s.vy*s.z*0.7;
      if(s.x<-5) s.x=W+5; if(s.x>W+5) s.x=-5; if(s.y<-5) s.y=H+5; if(s.y>H+5) s.y=-5;
      ctx.globalAlpha=Math.min(1, tw*(0.55+s.z*0.6)); ctx.fillStyle=s.color;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r*s.z,0,Math.PI*2); ctx.fill();
    } ctx.globalAlpha=1; requestAnimationFrame(frame); }
  addEventListener('resize', resize, {passive:true}); resize(); frame();
})();