// Hero.jsx — "감(感)의 시대는 끝났다" editorial hero, i18n-aware
function Hero() {
  const T = window.useT();
  const [, force] = React.useReducer(x => x+1, 0);
  React.useEffect(() => {
    const h = () => force();
    window.addEventListener('tweaks-changed', h);
    return () => window.removeEventListener('tweaks-changed', h);
  }, []);
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf; const start = performance.now();
    const tick = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const metrics = [
    { label: 'PELVIS', base: 580,  drift: 40, unit: '°/s' },
    { label: 'TORSO',  base: 880,  drift: 55, unit: '°/s' },
    { label: 'ARM',    base: 1180, drift: 70, unit: '°/s' },
    { label: 'BAT',    base: 1850, drift: 110, unit: '°/s' },
  ];

  return (
    <section id="intro" className="hp-hero" data-screen-label="01 Hero">
      <div className="hp-hero-grid">
        <div className="hp-hero-meta">
          <div className="hp-hero-tag">
            <span className="dot" />
            {T('hero.tag')}
          </div>
          <div className="hp-hero-coord">
            37.6104° N &nbsp; · &nbsp; 127.0029° E<br/>
            {T('hero.coord')}
          </div>
        </div>

        <div className="hp-hero-head">
          <h1 className="hp-hero-h1" key={window.TWEAKS.heroHeadline}>
            <span className="line">
              <span className="hp-hero-index">01 —</span> {T(`hero.v.${window.TWEAKS.heroHeadline || 'feel'}.1`)}
            </span>
            <span className="line">{T(`hero.v.${window.TWEAKS.heroHeadline || 'feel'}.2`)}</span>
            <span className="line hp-hero-h1-accent">{T(`hero.v.${window.TWEAKS.heroHeadline || 'feel'}.3`)}</span>
          </h1>
          <p className="hp-hero-lead">{T('hero.lead')}</p>
          <div className="hp-hero-cta">
            <a href="#contact" className="btn btn-primary">{T('hero.cta.book')} <span className="arr">→</span></a>
            <a href="#services" className="btn btn-ghost">{T('hero.cta.services')}</a>
          </div>
        </div>

        <div className="hp-hero-visual">
          <div className="hp-hero-frame">
            <div className="hp-hero-frame-chrome">
              <span className="rec"><span className="rec-d" /> REC</span>
              <span className="mono">{T('hero.session')}</span>
              <span className="mono right">TC 00:01:{String(Math.floor(t*30)%60).padStart(2,'0')}</span>
            </div>
            <video
              className="hp-hero-video"
              src="assets/hero-hitting-analysis.mp4"
              autoPlay muted loop playsInline preload="metadata"
              aria-label="hitting biomechanics analysis"
            />
            <svg className="hp-hero-overlay" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden>
              {/* subtle corner ticks only — video has its own analysis overlay */}
              {[
                [20, 20, 40, 20], [20, 20, 20, 40],
                [580, 20, 560, 20], [580, 20, 580, 40],
                [20, 380, 40, 380], [20, 380, 20, 360],
                [580, 380, 560, 380], [580, 380, 580, 360],
              ].map((s, i) => (
                <line key={i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} stroke="var(--primary-soft)" strokeOpacity="0.6" strokeWidth="1.5" />
              ))}
            </svg>
            <div className="hp-hero-frame-foot">
              <div>
                <div className="lbl">{T('hero.kseq')}</div>
                <div className="val">{T('hero.release')}</div>
              </div>
              <div className="spark">
                {metrics.map((m,i) => {
                  const v = Math.round(m.base + Math.sin(t*2 + i) * m.drift);
                  return (
                    <div key={m.label} className="spark-col">
                      <div className="spark-l">{m.label}</div>
                      <div className="spark-v">{v}<em>{m.unit}</em></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="hp-hero-footer">
          <div className="hp-hero-footer-item">
            <span className="k">{T('hero.equipment')}</span>
            <span>Qualisys · Theia3D · VALD ForceDecks · Rapsodo · Uplift Labs · AMTI · Swing Catalyst</span>
          </div>
          <div className="hp-hero-footer-item right">
            <span className="k">{T('hero.scroll')}</span>
            <span className="scroll-hint">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
