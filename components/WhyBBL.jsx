// WhyBBL.jsx — 30년 연구 노하우를 분석 서비스로 (i18n-aware)
function useCountUp(target, run) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    let raf, start = null, dur = 1600;
    const tick = (ts) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts-start)/dur);
      const ease = 1 - Math.pow(1-t, 3);
      setV(target * ease);
      if (t<1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return v;
}

function Stat({ value, suffix, prefix, label, run }) {
  const v = useCountUp(value, run);
  const display = Number.isInteger(value) ? Math.round(v) : (value >= 100 ? Math.round(v) : v.toFixed(value>=10?0:1));
  return (
    <div className="hp-stat">
      <div className="hp-stat-num">{prefix}{display}<em>{suffix}</em></div>
      <div className="hp-stat-label">{label}</div>
    </div>
  );
}

function WhyBBL() {
  const T = window.useT();
  const locale = window.currentLocale();
  const [active, setActive] = React.useState(null);
  const ref = React.useRef();
  React.useEffect(() => {
    const io = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setActive('go');
    }, {threshold: 0.2});
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const suffix = locale === 'en' ? '+' : '년+';
  const suffix2 = locale === 'en' ? '+' : '종+';

  const PILLARS = locale === 'en' ? [
    {
      n: '01', kicker: 'COMMUNICATION', title: 'Field-ready communication',
      desc: 'Results spoken in the athlete\'s language. Our player-analysts — former competitive players with biomechanics grad degrees — handle both measurement and feedback.',
      proof: [['PLAYER', '→ ANALYST hybrid'], ['24h', 'report delivery'], ['1,000+', 'Korean athlete benchmarks']],
      tag: 'talk',
    },
    {
      n: '02', kicker: 'INSIGHT', title: 'Insight that prescribes',
      desc: 'Data-driven, objective analysis. Validated academic methods and paper-backed diagnosis tell you not just what, but how to fix it.',
      proof: [['30 yr+', 'sports biomechanics research'], ['15 yr+', 'baseball biomechanics in Korea'], ['PhD', 'researcher-led analysis']],
      tag: 'think',
    },
    {
      n: '03', kicker: 'EQUIPMENT', title: 'World-class instrumentation',
      desc: 'A measurement chain on par with MLB and Driveline. Qualisys 3D · Theia3D markerless · VALD ForceDecks · Rapsodo · Uplift Labs · AMTI · Swing Catalyst force plates.',
      proof: [['240 Hz', '3D motion capture'], ['1000 Hz', 'force plate sampling'], ['10+', 'MLB/Driveline-grade tools']],
      tag: 'tools',
    },
  ] : [
    {
      n: '01', kicker: 'COMMUNICATION', title: '현장 전달 소통 스킬',
      desc: '선수의 언어로 분석 결과 전달. 전직 야구선수이면서 대학원에서 바이오메카닉스를 전공한 플레이어-애널리스트가 측정과 피드백을 모두 담당합니다.',
      proof: [['PLAYER', '→ ANALYST 하이브리드'], ['24h', '리포트 전달 이내'], ['1,000+', '한국 선수 벤치마크']],
      tag: '소통',
    },
    {
      n: '02', kicker: 'INSIGHT', title: '통찰력 있는 분석 능력',
      desc: '빅데이터 기반 객관적 분석. 검증된 학술 방법론과 논문 기반 진단으로 단순 비교가 아닌 무엇을 어떻게 고칠지 알려드립니다.',
      proof: [['30년+', '스포츠 바이오메카닉스 연구'], ['15년+', '국내 최초 야구 바이오메카닉스'], ['PhD', '박사 연구진 직접 분석']],
      tag: '통찰',
    },
    {
      n: '03', kicker: 'EQUIPMENT', title: '세계 최고 수준 분석 장비',
      desc: 'MLB · Driveline과 동급의 측정 체계. Qualisys 3D 모션캡쳐 · Theia3D 마커리스 · VALD ForceDecks · Rapsodo · Uplift Labs · AMTI · Swing Catalyst 포스플레이트.',
      proof: [['240Hz', '3D 모션캡쳐'], ['1000Hz', '포스플레이트 샘플링'], ['10종+', 'MLB/Driveline 급 장비']],
      tag: '장비',
    },
  ];

  return (
    <section id="why" className="hp-section hp-why" ref={ref} data-screen-label="02 About">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('about.label')} <span className="dim">002</span></div>
          <h2 className="hp-h2">
            {T('about.h2.1')}<br/>
            <em>{T('about.h2.2')}</em>
          </h2>
          <p className="hp-sec-lead">
            <strong>{T('about.lead.1')}</strong> {T('about.lead.2')}<br/>
            {T('about.lead.3')}
          </p>
        </header>

        <div className="hp-stat-row">
          <Stat value={30} suffix={suffix} label={T('about.stat.1')} run={active} />
          <Stat value={15} suffix={suffix} label={T('about.stat.2')} run={active} />
          <Stat value={10} suffix={suffix2} label={T('about.stat.3')} run={active} />
          <Stat value={1} suffix="" prefix={locale === 'en' ? 'Only ' : 'No.'} label={T('about.stat.4')} run={active} />
        </div>

        <div className="hp-unity-banner">
          <div className="hp-unity-head">
            <span className="hp-unity-k">{T('about.unity.k')}</span>
            <h3 className="hp-unity-title">{T('about.unity.title')}</h3>
          </div>
        </div>

        <div className="hp-pillars">
          {PILLARS.map((p, i) => (
            <article key={p.n} className="hp-pillar" style={{'--delay': `${i*0.12}s`}}>
              <div className="hp-pillar-head">
                <div className="hp-pillar-n">{p.n}</div>
                <div className="hp-pillar-kicker">{p.kicker} · <span>{p.tag}</span></div>
              </div>
              <h3 className="hp-pillar-title">{p.title}</h3>
              <p className="hp-pillar-desc">{p.desc}</p>
              <div className="hp-pillar-proof">
                {p.proof.map(([k,v]) => (
                  <div key={k} className="hp-pillar-proof-row">
                    <div className="hp-pillar-proof-k">{k}</div>
                    <div className="hp-pillar-proof-v">{v}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
window.WhyBBL = WhyBBL;
