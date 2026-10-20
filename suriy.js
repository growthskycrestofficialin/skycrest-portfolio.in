/* === LOADER === */
window.addEventListener('load',()=>{setTimeout(()=>{document.getElementById('loader').classList.add('hidden');},2200);});

/* === THEME === */
const savedTheme=localStorage.getItem('skycrest-theme')||'dark';
document.documentElement.setAttribute('data-theme',savedTheme);
updateThemeIcon(savedTheme);
function toggleTheme(){const c=document.documentElement.getAttribute('data-theme');const n=c==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);localStorage.setItem('skycrest-theme',n);updateThemeIcon(n);}
function updateThemeIcon(t){const i=document.getElementById('themeIcon');if(i)i.className=t==='dark'?'fas fa-sun':'fas fa-moon';}

/* === SCROLL PROGRESS BAR === */
window.addEventListener('scroll',()=>{const s=document.documentElement;const p=(s.scrollTop/(s.scrollHeight-s.clientHeight))*100;document.getElementById('scrollBar').style.width=p+'%';});

/* === TRAILING CURSOR === */
const dot=document.getElementById('cursorDot');
const trails=[document.getElementById('t1'),document.getElementById('t2'),document.getElementById('t3'),document.getElementById('t4'),document.getElementById('t5')];
let mx=0,my=0;
const pos=trails.map(()=>({x:0,y:0}));
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function animTrails(){let x=mx,y=my;trails.forEach((t,i)=>{pos[i].x+=(x-pos[i].x)*.22;pos[i].y+=(y-pos[i].y)*.22;t.style.left=pos[i].x+'px';t.style.top=pos[i].y+'px';x=pos[i].x;y=pos[i].y;});requestAnimationFrame(animTrails);})();

/* === PARTICLE NETWORK (Interactive Canvas) === */
(function(){
  const canvas=document.getElementById('particleCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];
  let mouse={x:-999,y:-999};

  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();
  window.addEventListener('resize',resize);
  document.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});

  const isDark=()=>document.documentElement.getAttribute('data-theme')!=='light';

  function Particle(){
    this.x=Math.random()*W;
    this.y=Math.random()*H;
    this.vx=(Math.random()-.5)*.5;
    this.vy=(Math.random()-.5)*.5;
    this.r=Math.random()*2+1;
  }

  for(let i=0;i<80;i++)particles.push(new Particle());

  function draw(){
    ctx.clearRect(0,0,W,H);
    const col=isDark()?'99,157,255':'41,82,200';

    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;

      // mouse repel
      const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){p.x+=dx/dist*1.5;p.y+=dy/dist*1.5;}

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${col},.55)`;
      ctx.fill();
    });

    // draw lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<140){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(${col},${.18*(1-d/140)})`;
          ctx.lineWidth=.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* === MOBILE NAV === */
function toggleNav(){document.getElementById('mobileNav').classList.toggle('open');}

/* === NAVBAR SCROLL === */
const navbar=document.getElementById('navbar');
const navLinks=document.querySelectorAll('nav ul li a');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>50);
  let cur='';
  document.querySelectorAll('section').forEach(s=>{if(window.scrollY>=s.offsetTop-220)cur=s.getAttribute('id');});
  navLinks.forEach(l=>{l.classList.remove('active-link');if(l.getAttribute('href')==='#'+cur)l.classList.add('active-link');});
});

/* === TYPING === */
const roles=['GRAPHIC DESIGNER','VIDEO EDITOR','WEB DEVELOPER','DIGITAL MARKETER','SEO SPECIALIST','BRANDING EXPERT'];
let ri=0,ci=0,del=false;
const typEl=document.getElementById('typing');
function typeEffect(){
  const cur=roles[ri];
  if(!del){typEl.textContent=cur.substring(0,ci+1);ci++;if(ci===cur.length){del=true;setTimeout(typeEffect,1600);return;}}
  else{typEl.textContent=cur.substring(0,ci-1);ci--;if(ci===0){del=false;ri=(ri+1)%roles.length;}}
  setTimeout(typeEffect,del?55:105);
}
typeEffect();

/* === TABS === */
function showTab(id,btn){
  document.querySelectorAll('.tab-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.project-filter button').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

/* === SLIDER (old poster-slider) === */
document.querySelectorAll('.poster-slider').forEach(slider=>{
  const imgs=slider.querySelectorAll('img');let cur=0;
  if(imgs.length)imgs[0].classList.add('active');
  setInterval(()=>{imgs[cur].classList.remove('active');cur=(cur+1)%imgs.length;imgs[cur].classList.add('active');},3000);
});

/* === PORTRAIT SLIDER — 4:5 with dots + counter === */
document.querySelectorAll('.portrait-slider').forEach(slider => {
  const imgs = slider.querySelectorAll('img');
  if (!imgs.length) return;
  let cur = 0;
  const total = imgs.length;

  // Set counter attributes
  slider.setAttribute('data-current', '1');
  slider.setAttribute('data-total', total);

  // Create dots
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'portrait-slider-dots';
  imgs.forEach((_,i) => {
    const d = document.createElement('span');
    if (i === 0) d.classList.add('active');
    dotsWrap.appendChild(d);
  });
  slider.appendChild(dotsWrap);

  const dots = dotsWrap.querySelectorAll('span');

  // Set first active
  imgs[0].classList.add('active');

  setInterval(() => {
    imgs[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (cur + 1) % total;
    imgs[cur].classList.add('active');
    dots[cur].classList.add('active');
    slider.setAttribute('data-current', cur + 1);
  }, 3200);
});

/* === COUNTER === */
(function(){
  const sec=document.querySelector('.stats-section');if(!sec)return;
  const obs=new IntersectionObserver(entries=>{
    if(!entries[0].isIntersecting)return;
    document.querySelectorAll('.counter').forEach(c=>{
      const t=parseInt(c.dataset.target);let n=0;const inc=t/80;
      function run(){n+=inc;if(n<t){c.innerText=Math.ceil(n);requestAnimationFrame(run);}else c.innerText=t+'+';}
      run();
    });
    obs.disconnect();
  });
  obs.observe(sec);
})();

/* === REVEAL === */
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target);}});
},{threshold:.08});
document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el=>revObs.observe(el));

/* === FAQ === */
function toggleFaq(item){
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

console.log('🚀 SkyCrest — Fully Upgraded');
