(() => {
  const boot = document.querySelector('.boot');
  if (boot) {
    const seen = sessionStorage.getItem('dariaOSBooted');
    if (seen) boot.remove();
    else {
      sessionStorage.setItem('dariaOSBooted','1');
      setTimeout(()=>boot.classList.add('done'),620);
      setTimeout(()=>boot.remove(),1150);
    }
  }

  const time = document.querySelector('[data-time]');
  const tick = () => { if(time) time.textContent = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date()); };
  tick(); setInterval(tick,30000);

  const page = document.body.dataset.page;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach(a=>a.classList.add('active'));

  const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const cur = document.querySelector('.cursor');
  if(cur && matchMedia('(pointer:fine)').matches){
    window.addEventListener('mousemove', e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});
    document.querySelectorAll('[data-cursor]').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cur.textContent=el.dataset.cursor||'OPEN';cur.classList.add('show')});
      el.addEventListener('mouseleave',()=>cur.classList.remove('show'));
    });
  }

  const buttons = document.querySelectorAll('.filter-btn');
  if(buttons.length){
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
      const f=btn.dataset.filter;
      document.querySelectorAll('.archive-item').forEach(item=>item.classList.toggle('hidden',f!=='all' && item.dataset.cat!==f));
    }));
  }
})();
