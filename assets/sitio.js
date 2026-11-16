(function(){
  var NUM='584246540852';
  // Menú móvil
  var nav=document.querySelector('.nav'), btn=document.querySelector('.menu-btn');
  if(btn){btn.addEventListener('click',function(){var a=nav.classList.toggle('abierto');btn.setAttribute('aria-expanded',a?'true':'false')});}
  // Enlaces de WhatsApp con mensaje
  [].forEach.call(document.querySelectorAll('[data-wa]'),function(a){a.href='https://wa.me/'+NUM+'?text='+encodeURIComponent(a.getAttribute('data-wa'))});
  // Formularios que arman un mensaje de WhatsApp
  function fecha(v){if(!v)return'';var p=v.split('-');var m=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];return (+p[2])+' de '+m[+p[1]-1]+' de '+p[0]}
  [].forEach.call(document.querySelectorAll('form[data-intro]'),function(f){
    var prev=f.querySelector('.preview'), env=f.querySelector('.enviar');
    function msg(){
      var l=[f.getAttribute('data-intro')];
      [].forEach.call(f.querySelectorAll('[data-label]'),function(el){
        if(el.hidden||el.closest('[hidden]'))return;
        var v='';
        if(el.tagName==='FIELDSET'){v=[].map.call(el.querySelectorAll('input:checked'),function(i){return i.value}).join(', ')}
        else{v=(el.value||'').trim(); if(el.type==='date')v=fecha(v)}
        if(v)l.push(el.getAttribute('data-label')+': '+v);
      });
      return l.join('\n');
    }
    function upd(){var m=msg();if(prev)prev.textContent=m;if(env)env.href='https://wa.me/'+NUM+'?text='+encodeURIComponent(m)}
    // Delivery o pickup: mostrar solo los campos que tocan
    function modo(){
      var r=f.querySelector('input[name=modo]:checked'); if(!r)return;
      var pick=/Pickup/.test(r.value);
      [].forEach.call(f.querySelectorAll('.solo-delivery'),function(e){e.hidden=pick});
      [].forEach.call(f.querySelectorAll('.solo-pickup'),function(e){e.hidden=!pick});
    }
    [].forEach.call(document.querySelectorAll('[data-modo]'),function(a){
      a.addEventListener('click',function(){
        var want=a.getAttribute('data-modo');
        [].forEach.call(f.querySelectorAll('input[name=modo]'),function(r){r.checked=r.value.indexOf(want)===0});
        modo();upd();
      });
    });
    f.addEventListener('change',modo);modo();
    f.addEventListener('input',upd);f.addEventListener('change',upd);
    f.addEventListener('submit',function(e){e.preventDefault()});
    upd();
  });
  // Copiar número
  [].forEach.call(document.querySelectorAll('.copiar'),function(c){
    c.addEventListener('click',function(){
      var t='+58 424 654 0852';
      function sel(){var n=document.getElementById('tel');if(!n)return;var r=document.createRange();r.selectNodeContents(n);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Número seleccionado'}
      try{navigator.clipboard.writeText(t).then(function(){c.textContent='Copiado'},sel)}catch(e){sel()}
    });
  });
  // Pestañas del menú: marcar la sección visible
  var tabs=[].slice.call(document.querySelectorAll('.pestanas a'));
  if(tabs.length&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){tabs.forEach(function(t){t.classList.toggle('activa',t.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
    tabs.forEach(function(t){var s=document.querySelector(t.getAttribute('href'));if(s)io.observe(s)});
  }
})();
