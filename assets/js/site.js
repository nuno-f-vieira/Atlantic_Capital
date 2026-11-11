/* Atlantic Capital — modals, mobile menu, reveal on scroll, investor form */
document.documentElement.classList.add('js');

document.addEventListener('click',e=>{
  const o=e.target.closest('[data-open]');
  if(o){e.preventDefault();const m=document.getElementById(o.dataset.open);if(m){m.hidden=false;const x=m.querySelector('.mdl-x');if(x)x.focus();}return;}
  if(e.target.closest('[data-close]')||e.target.classList.contains('mdl')){const m=e.target.closest('.mdl');if(m)m.hidden=true;}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.mdl').forEach(m=>m.hidden=true)});

(function(){
  const b=document.getElementById('burger'),d=document.getElementById('drawer');
  if(!b||!d)return;
  const set=o=>{d.hidden=!o;b.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};
  b.addEventListener('click',e=>{e.stopPropagation();set(d.hidden)});
  d.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
  document.addEventListener('click',e=>{if(!d.hidden&&!d.contains(e.target))set(false)});
})();

(function(){
  const els=[].slice.call(document.querySelectorAll('.rv'));
  const show=el=>el.classList.add('in');
  if(!('IntersectionObserver' in window)){els.forEach(show);return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target);}}),{threshold:.06,rootMargin:'0px 0px -4% 0px'});
  els.forEach(el=>io.observe(el));
  setTimeout(()=>els.forEach(show),2500);
})();

(function(){
  const f=document.getElementById('invForm');
  if(!f)return;
  const msg=document.getElementById('formmsg'),pt=document.documentElement.lang==='pt';
  const T=pt?{cfg:'Formulário ainda não ligado. Escreva para info@atlanticcapital.pt.',send:'A enviar…',ok:'Obrigado. Entraremos em contacto.',err:'Ocorreu um erro. Escreva para info@atlanticcapital.pt.'}
           :{cfg:'Form not yet connected. Please write to info@atlanticcapital.pt.',send:'Sending…',ok:'Thank you. We will be in touch.',err:'Something went wrong. Please write to info@atlanticcapital.pt.'};
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    if(f.action.includes('YOUR_FORM_ID')){msg.textContent=T.cfg;return;}
    msg.textContent=T.send;
    try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
      if(r.ok){f.reset();msg.textContent=T.ok;}else msg.textContent=T.err;}
    catch(_){msg.textContent=T.err;}
  });
})();
/* every page opens at its top (unless the link targets a section) */
(function(){
  try{ if('scrollRestoration' in history) history.scrollRestoration='manual'; }catch(e){}
  const toTop=()=>{ if(!location.hash){ document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0,0); document.documentElement.style.scrollBehavior=''; } };
  toTop(); addEventListener('load',toTop); addEventListener('pageshow',toTop);
  // clicking a menu item for the page you are already on goes back to its top
  document.addEventListener('click',e=>{const a=e.target.closest('a[href]'); if(!a||a.hasAttribute('data-open')||a.getAttribute('href').charAt(0)==='#') return;
    const u=new URL(a.getAttribute('href'),location.href);
    if(u.pathname===location.pathname && !u.hash){ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }});
})();

