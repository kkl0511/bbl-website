// Nav.jsx — adds locale toggle (KR/EN) + all sections
function Nav() {
  const T = window.useT();
  const [scrolled, setScrolled] = React.useState(false);
  const [section, setSection] = React.useState('intro');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const loc = window.currentLocale();

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const secs = ['intro','why','system','services','faq','contact'];
      for (const id of secs) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 140 && r.bottom >= 140) { setSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['why', T('nav.01')],
    ['system', T('nav.02')],
    ['services', T('nav.03')],
    ['faq', T('nav.08')],
  ];

  const switchLocale = () => {
    const next = loc === 'ko' ? 'en' : 'ko';
    window.setLocale(next);
    window.TWEAKS.locale = next;
    try {
      window.parent.postMessage({type: '__edit_mode_set_keys', edits: {locale: next}}, '*');
    } catch (e) {}
  };

  return (
    <nav className={`hp-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="hp-nav-inner">
        <a href="#intro" className="hp-brand" onClick={() => setMobileOpen(false)} aria-label="BioMotion Baseball Lab">
          <img src="assets/bbl-logo-icon.png" alt="" className="hp-brand-icon" />
          <div className="hp-brand-lockup">
            <div className="hp-brand-tag">BioMotion Baseball Lab<span className="hp-brand-abbr">(BBL)</span></div>
          </div>
        </a>
        <div className={`hp-nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {links.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className={section === id ? 'on' : ''} onClick={() => setMobileOpen(false)}>
              <span className="num">{String(i+1).padStart(2,'0')}</span>
              {label}
            </a>
          ))}
          <button className="hp-nav-locale" onClick={switchLocale} title="Switch language">
            <span className={loc === 'ko' ? 'on' : ''}>KR</span>
            <span className="hp-nav-locale-sep">/</span>
            <span className={loc === 'en' ? 'on' : ''}>EN</span>
          </button>
          <a href="#contact" className="hp-nav-cta" onClick={() => setMobileOpen(false)}>{T('nav.cta')} <span>→</span></a>
        </div>
        <button className="hp-nav-burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="menu">
          <span className={mobileOpen ? 'on' : ''} />
          <span className={mobileOpen ? 'on' : ''} />
        </button>
      </div>
      <div className="hp-nav-progress"><div className="hp-nav-progress-bar" id="hp-progress" /></div>
    </nav>
  );
}
window.Nav = Nav;
