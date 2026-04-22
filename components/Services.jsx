// Services.jsx — individual/team tiers + spec table (i18n-aware)
function Services() {
  const T = window.useT();
  const locale = window.currentLocale();
  const [mode, setMode] = React.useState('individual');

  const INDIVIDUAL = locale === 'en' ? [
    {
      k: 'BASIC · 001', t: '30min + 10min',
      name: 'Basic Biomechanics',
      desc: 'Baseline diagnosis of motion and fitness. Recommended for youth and amateur prospects.',
      price: '300,000', unit: 'KRW',
      items: ['Uplift Labs markerless capture', 'VALD fitness (CMJ · IMTP)', 'Rapsodo ball tracking', 'Kinematic sequence', 'Same-day feedback (10 min)'],
    },
    {
      k: 'ADVANCED · 002', t: '60min + 30min',
      name: 'Advanced Biomechanics',
      desc: 'Basic + ground reaction and joint-torque deep dive. For amateur prospects and pros.',
      prices: [['AMATEUR', '500,000'], ['PRO', '700,000']], unit: 'KRW',
      featured: true,
      items: ['Qualisys 3D markerless', 'VALD ForceDecks', 'AMTI · Swing Catalyst GRF', 'Joint torque (injury risk)', 'Energy flow · leak points', 'Deep feedback (30 min)'],
    },
  ] : [
    {
      k: 'BASIC · 001', t: '30분 + 10분',
      name: '기본 바이오메카닉스',
      desc: '동작·체력 기본 진단. 중·고교생과 아마추어 유망주 권장.',
      price: '30', unit: '만원',
      items: ['Uplift Labs 마커리스 캡쳐', 'VALD 체력 평가 (CMJ · IMTP)', 'Rapsodo 볼 트래킹', '키네마틱 시퀀스', '당일 피드백 (10분)'],
    },
    {
      k: 'ADVANCED · 002', t: '60분 + 30분',
      name: '정밀 바이오메카닉스',
      desc: '기본 + 지면반력 · 관절 토크 심층 분석. 아마추어 유망주 · 프로선수.',
      prices: [['아마', '50'], ['프로', '70']], unit: '만원',
      featured: true,
      items: ['Qualisys 3D 마커리스', 'VALD ForceDecks 포스플레이트', 'AMTI · Swing Catalyst 지면반력', '관절 토크 (부상 위험성)', '에너지 흐름 · 누수 지점', '심층 피드백 (30분)'],
    },
  ];

  const TEAM = locale === 'en' ? [
    {
      k: 'TEAM · 003', t: '4h / 10 athletes',
      name: 'Single team session (10+)',
      desc: 'One-time HS/MS team measurement. Full athlete reports + staff briefing.',
      price: '210,000', unit: 'KRW / athlete',
      items: ['Uplift Labs markerless', 'VALD fitness', 'Rapsodo ball tracking', 'Kinematic sequence', 'Team report'],
    },
    {
      k: 'TEAM · 004', t: '12 sessions / yr',
      name: 'Annual team package',
      desc: '12 sessions / year · basic 10 + advanced 2. Per-athlete, per-session.',
      price: '150,000', unit: 'KRW / athlete / session',
      featured: true,
      items: ['Uplift ×10 + Qualisys ×2', 'VALD fitness every session', 'GRF + joint torque ×2', 'Per-athlete season tracking', 'Staff briefing'],
    },
  ] : [
    {
      k: 'TEAM · 003', t: '4시간 / 10인',
      name: '1회 측정 (10명+)',
      desc: '중·고교팀 1회 단체 측정. 선수 전원 분석 + 코칭스태프 브리핑.',
      price: '21', unit: '만원 / 인',
      items: ['Uplift Labs 마커리스', 'VALD 체력 평가', 'Rapsodo 볼 트래킹', '키네마틱 시퀀스', '팀 단위 리포트'],
    },
    {
      k: 'TEAM · 004', t: '연 12회',
      name: '연간 단체 패키지',
      desc: '연 12회 · 기본 10 + 정밀 2. 중·고교팀 1년 계약, 인당 1회당.',
      price: '15', unit: '만원 / 인 / 회',
      featured: true,
      items: ['Uplift 10회 + Qualisys 2회', 'VALD 체력 평가 매 회', '정밀 2회: 지면반력 + 관절 토크', '선수별 시즌 트래킹', '코칭스태프 브리핑'],
    },
  ];

  const cards = mode === 'individual' ? INDIVIDUAL : TEAM;

  // Spec table rows
  const specKo = [
    ['주요 대상', '초·중·고교생', '아마 유망주 · 프로', '중·고교팀', '중·고교팀 · 1년 계약'],
    ['방문 횟수', '1회', '1회', '1회', '연 12회 (10+2)'],
    ['소요시간', '30분 + 10분', '60분 + 30분', '4시간 / 10인', '매 회 측정 + 피드백'],
    ['모션캡쳐', 'Uplift Labs', 'Qualisys 3D 마커리스', 'Uplift Labs', 'Uplift + Qualisys (연 2회)'],
    ['VALD 체력 평가', '✓', '✓', '✓', '✓'],
    ['볼 트래킹 (Rapsodo)', '✓', '✓', '✓', '✓'],
    ['구속·회전·회전 효율 (투수)', '✓', '✓', '✓', '✓'],
    ['타구 속도·발사각·비거리 (타자)', '✓', '✓', '✓', '✓'],
    ['키네마틱 시퀀스', '✓', '✓', '✓', '✓'],
    ['배트 스피드·궤적 (타자)', '—', '✓', '—', '✓ (연 2회)'],
    ['지면반력 분석 (AMTI · Swing Catalyst)', '—', '✓', '—', '✓ (연 2회)'],
    ['체중 이동 패턴 분석', '—', '✓', '—', '✓ (연 2회)'],
    ['관절 토크 (부상 위험성)', '—', '✓', '—', '✓ (연 2회)'],
    ['에너지 흐름 · 누수 지점', '—', '✓', '—', '✓ (연 2회)'],
  ];
  const specEn = [
    ['Primary audience', 'Youth · HS', 'Amateur prospect · Pro', 'HS / MS team', 'HS / MS · annual contract'],
    ['Visits', '1', '1', '1', '12 / yr (10 + 2)'],
    ['Duration', '30 + 10min', '60 + 30min', '4h / 10 athletes', 'every session + feedback'],
    ['Motion capture', 'Uplift Labs', 'Qualisys 3D markerless', 'Uplift Labs', 'Uplift + Qualisys (×2/yr)'],
    ['VALD fitness', '✓', '✓', '✓', '✓'],
    ['Ball tracking (Rapsodo)', '✓', '✓', '✓', '✓'],
    ['Pitch velo · spin · efficiency', '✓', '✓', '✓', '✓'],
    ['Exit velo · launch · distance', '✓', '✓', '✓', '✓'],
    ['Kinematic sequence', '✓', '✓', '✓', '✓'],
    ['Bat speed · path', '—', '✓', '—', '✓ (×2/yr)'],
    ['Ground reaction forces', '—', '✓', '—', '✓ (×2/yr)'],
    ['Weight-shift patterns', '—', '✓', '—', '✓ (×2/yr)'],
    ['Joint torque (injury risk)', '—', '✓', '—', '✓ (×2/yr)'],
    ['Energy flow · leak points', '—', '✓', '—', '✓ (×2/yr)'],
  ];
  const priceRow = locale === 'en'
    ? ['Price (incl. VAT)', '300,000', '500,000 (amateur) / 700,000 (pro)', '210,000 / athlete', '150,000 / athlete / session']
    : ['가격 (VAT 포함)', '30만원', '50만원(아마)/70만원(프로)', '21만원 / 인', '15만원 / 인 / 회'];
  const spec = locale === 'en' ? specEn : specKo;
  const header = locale === 'en'
    ? ['Item', 'Basic Biomechanics', 'Advanced Biomechanics', 'Single team', 'Annual team']
    : ['항목', '기본 바이오메카닉스', '정밀 바이오메카닉스', '1회 단체 측정', '연간 단체 패키지'];

  return (
    <section id="services" className="hp-section hp-services" data-screen-label="04 Services">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('services.label')} <span className="dim">005</span></div>
          <h2 className="hp-h2">{T('services.h2')}</h2>
        </header>

        <div className="hp-toggle-wrap">
          <div className="hp-toggle">
            <button className={mode==='individual'?'on':''} onClick={()=>setMode('individual')}>{T('services.toggle.ind')}</button>
            <button className={mode==='team'?'on':''}     onClick={()=>setMode('team')}>{T('services.toggle.team')}</button>
            <span className="hp-toggle-slider" style={{transform: mode==='team' ? 'translateX(100%)' : 'translateX(0)'}}/>
          </div>
        </div>

        <div className="hp-tiers">
          {cards.map((c, i) => (
            <article key={i} className={`hp-tier ${c.featured ? 'hp-tier-featured' : ''}`}>
              {c.featured && <div className="hp-tier-badge">RECOMMENDED</div>}
              <div className="hp-tier-head">
                <span className="k">{c.k}</span>
                <span className="t">{c.t}</span>
              </div>
              <h3 className="hp-tier-name">{c.name}</h3>
              <p className="hp-tier-desc">{c.desc}</p>

              {c.prices ? (
                <div className="hp-tier-price-split">
                  {c.prices.map(([lbl, val]) => (
                    <div key={lbl} className="hp-tier-price-col">
                      <span className="l">{lbl}</span>
                      <span className="big">{val}</span>
                      <span className="u">{c.unit}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hp-tier-price">
                  <span className="big">{c.price}</span>
                  <span className="u">{c.unit}</span>
                </div>
              )}

              <ul className="hp-tier-list">
                {c.items.map(it => <li key={it}>{it}</li>)}
              </ul>
              <a href="#book" className={`btn ${c.featured ? 'btn-primary' : 'btn-ghost'} btn-full`}>
                {T('services.reserve')} →
              </a>
            </article>
          ))}
        </div>

        <details className="hp-spec" open>
          <summary>
            <span>{T('services.spec')}</span>
            <span className="hp-spec-arrow">▼</span>
          </summary>
          <div className="hp-spec-wrap">
            <table className="hp-spec-table">
              <thead>
                <tr>{header.map((h, i) => <th key={i} className={i===2?'feat':''}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {spec.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => <td key={j} className={j===2?'feat':''}>{c}</td>)}
                  </tr>
                ))}
                <tr className="hp-spec-price">
                  {priceRow.map((c, j) => <td key={j} className={j===2?'feat':''}>{c}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </details>

        <div className="hp-vat">{T('services.vat')}</div>
      </div>
    </section>
  );
}
window.Services = Services;
