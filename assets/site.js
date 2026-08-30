
(function(){
  function setLanguage(lang){
    if(!['es','en'].includes(lang)) lang='es';
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-es][data-en]').forEach(el=>{el.textContent=el.dataset[lang];});
    document.querySelectorAll('[data-aria-es][data-aria-en]').forEach(el=>{el.setAttribute('aria-label',el.dataset['aria'+lang.charAt(0).toUpperCase()+lang.slice(1)]);});
    const body=document.body;
    if(body.dataset['title'+lang.toUpperCase()]) document.title=body.dataset['title'+lang.toUpperCase()];
    const meta=document.querySelector('meta[name="description"]');
    if(meta && body.dataset['description'+lang.toUpperCase()]) meta.content=body.dataset['description'+lang.toUpperCase()];
    document.querySelectorAll('.language-switch button').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));
    localStorage.setItem('erasmus-language',lang);
  }
  window.setLanguage=setLanguage;
  const saved=localStorage.getItem('erasmus-language');
  const browser=(navigator.language||'').toLowerCase().startsWith('es')?'es':'en';
  setLanguage(saved||browser);
})();
