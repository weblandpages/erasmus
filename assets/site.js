(function(){
  const supported = ['es','en','fr','de','it','pt'];
  const labels = {
    es: 'Seleccionar idioma',
    en: 'Select language',
    fr: 'Choisir la langue',
    de: 'Sprache auswählen',
    it: 'Seleziona lingua',
    pt: 'Selecionar idioma'
  };

  function translated(source, lang){
    if(lang === 'en') return source;
    const dict = window.ERASMUS_I18N && window.ERASMUS_I18N[lang];
    return dict && dict[source] ? dict[source] : source;
  }

  function setLanguage(lang){
    if(!supported.includes(lang)) lang = 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach(el => {
      if(lang === 'es' && el.dataset.es){
        el.textContent = el.dataset.es;
      } else if(lang === 'en'){
        el.textContent = el.dataset.en;
      } else {
        el.textContent = translated(el.dataset.en, lang);
      }
    });

    const body = document.body;
    const title = body.getAttribute('data-title-' + lang) || body.getAttribute('data-title-en');
    const description = body.getAttribute('data-description-' + lang) || body.getAttribute('data-description-en');
    if(title) document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if(meta && description) meta.content = description;

    const select = document.getElementById('language-select');
    if(select){
      select.value = lang;
      select.setAttribute('aria-label', labels[lang] || labels.en);
    }

    localStorage.setItem('erasmus-language', lang);
  }

  window.setLanguage = setLanguage;

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang');
  const saved = localStorage.getItem('erasmus-language');
  const browserLanguages = navigator.languages || [navigator.language || 'en'];
  const browser = browserLanguages
    .map(v => (v || '').toLowerCase().split('-')[0])
    .find(v => supported.includes(v));

  setLanguage(supported.includes(requested) ? requested : (supported.includes(saved) ? saved : (browser || 'en')));
})();
