// System.jsx — BBL 3단계 분석 + kinematic sequence + equipment
function KinematicSequence() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    const tick = (now) => { setT(((now-start)/1000) % 4); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const segments = [
    { label: 'PELVIS', korean: '골반', english: 'Pelvis', peak: 0.55, offset: 0.0, max: 650 },
    { label: 'TORSO',  korean: '몸통', english: 'Torso',  peak: 0.9,  offset: 0.8, max: 980 },
    { label: 'ARM',    korean: '팔',   english: 'Arm',    peak: 1.6,  offset: 1.4, max: 1300 },
    { label: 'HAND',   korean: '손',   english: 'Hand',   peak: 2.1,  offset: 1.9, max: 1780 },
  ];
  const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b'];
  const locale = window.currentLocale();

  const W = 720, H = 280, pad = 40;
  const xScale = x => pad + (x / 3.5) * (W - pad*2);
  const yScale = y => H - pad - (y / 2000) * (H - pad*2);
  const curve = (s) => {
    const pts = [];
    for (let x = 0; x <= 3.5; x += 0.05) {
      const d = x - s.peak;
      const w = 0.55;
      const val = s.max * Math.exp(-(d*d)/(w*w));
      pts.push([xScale(x), yScale(val)]);
    }
    return pts.map((p,i)=> (i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(' ');
  };

  const captureLabel = locale === 'en' ? '3D CAPTURE · HITTER · MARKERLESS' : '3D 캡쳐 · 타자 · 마커리스';
  const chartLabel   = locale === 'en' ? 'ANGULAR VELOCITY · PROXIMAL → DISTAL' : '각속도 · PROXIMAL → DISTAL';
  const captureNote  = locale === 'en' ? 'Full-body pose and ground reaction recorded together.' : '전신 포즈와 지면반력을 함께 기록합니다.';

  return (
    <div className="hp-ksq">
      <div className="hp-ksq-chrome">
        <span className="rec"><span className="rec-d" />LIVE</span>
        <span>KINEMATIC SEQUENCE · PROXIMAL → DISTAL</span>
        <span className="mono right">{t.toFixed(2)}s / 3.50s</span>
      </div>
      <div className="hp-ksq-split">
        <figure className="hp-ksq-capture">
          <video
            className="hp-ksq-video"
            src="assets/kinematic-sequence-hitting.mp4"
            autoPlay muted loop playsInline
            aria-label="Kinematic sequence 3D capture of a hitter"
          />
          <div className="hp-ksq-capture-overlay">
            <div className="hp-ksq-capture-anchor tl" aria-hidden="true" />
            <div className="hp-ksq-capture-anchor tr" aria-hidden="true" />
            <div className="hp-ksq-capture-anchor bl" aria-hidden="true" />
            <div className="hp-ksq-capture-anchor br" aria-hidden="true" />
            <div className="hp-ksq-capture-label">
              <span className="k">{captureLabel}</span>
              <span className="d">{captureNote}</span>
            </div>
          </div>
        </figure>
        <div className="hp-ksq-chartwrap">
          <div className="hp-ksq-chartlabel">
            <span>{chartLabel}</span>
            <span className="mono right">°/s</span>
          </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="hp-ksq-chart" preserveAspectRatio="xMidYMid meet">
        {[0,500,1000,1500,2000].map(y=>(
          <g key={y}>
            <line x1={pad} x2={W-pad} y1={yScale(y)} y2={yScale(y)} stroke="rgba(255,255,255,0.06)" />
            <text x={pad-8} y={yScale(y)+4} fontSize="9" textAnchor="end" fill="var(--ink-3)" fontFamily="JetBrains Mono">{y}</text>
          </g>
        ))}
        {[0,1,2,3].map(x=>(
          <g key={x}>
            <line x1={xScale(x)} x2={xScale(x)} y1={pad} y2={H-pad} stroke="rgba(255,255,255,0.04)" strokeDasharray="2 3"/>
            <text x={xScale(x)} y={H-pad+16} fontSize="9" textAnchor="middle" fill="var(--ink-3)" fontFamily="JetBrains Mono">T+{x}.0s</text>
          </g>
        ))}
        {segments.map((s, idx) => (
          <path key={s.label} d={curve(s)} fill="none" stroke={colors[idx]} strokeWidth="2" opacity={0.85} />
        ))}
        <line x1={xScale(t)} x2={xScale(t)} y1={pad} y2={H-pad} stroke="var(--primary-soft)" strokeWidth="1" />
        <circle cx={xScale(t)} cy={pad-4} r="3" fill="var(--primary-soft)" />
        {segments.map((s, idx) => {
          const d = t - s.peak;
          const w = 0.55;
          const val = s.max * Math.exp(-(d*d)/(w*w));
          return <circle key={s.label} cx={xScale(t)} cy={yScale(val)} r="4" fill={colors[idx]} stroke="var(--bg)" strokeWidth="1.5"/>;
        })}
      </svg>
        </div>
      </div>
      <div className="hp-ksq-legend">
        {segments.map((s, idx) => {
          const d = t - s.peak;
          const w = 0.55;
          const val = Math.round(s.max * Math.exp(-(d*d)/(w*w)));
          return (
            <div key={s.label} className="hp-ksq-row">
              <span className="dot" style={{background:colors[idx]}}/>
              <span className="k">{s.label}</span>
              <span className="kr">{locale === 'en' ? s.english : s.korean}</span>
              <span className="v">{val}<em>°/s</em></span>
            </div>
          );
        })}
      </div>
      <div className="hp-ksq-note">
        <strong>PROXIMAL → DISTAL</strong>
        <span>{window.T('system.kseq.note')}</span>
      </div>
    </div>
  );
}

function System() {
  const T = window.useT();
  const locale = window.currentLocale();

  const STEPS = locale === 'en' ? [
    { n: 'STEP 1', q: 'What is the body saying right now?', r: 'Baseline captured',     desc: 'VALD fitness and motion mechanics recorded in a single session, so the cause cannot hide behind separate visits.' },
    { n: 'STEP 2', q: 'What do the numbers mean?',           r: 'Leak points found',     desc: 'Kinematic sequence, joint torque and ground reaction read together — we pinpoint what is actually holding performance back.' },
    { n: 'STEP 3', q: 'What do we change next?',             r: 'A specific prescription', desc: 'Drills translated into the athlete\'s language and a monitoring plan that carries through to the next session.' },
  ] : [
    { n: 'STEP 1', q: '지금 몸은 어떤 상태인가?',         r: '베이스라인 측정',     desc: 'VALD 체력 평가와 동작 메카닉스를 한 세션에 담아, 원인이 여러 방문 사이로 흩어지지 않게 합니다.' },
    { n: 'STEP 2', q: '숫자는 무엇을 말하는가?',             r: '에너지 누수 지점 포착', desc: '키네마틱 시퀀스 · 관절 토크 · 지면반력을 교차로 읽어, 실력의 발목을 잡는 구간을 짚어냅니다.' },
    { n: 'STEP 3', q: '다음 훈련에서 무엇을 바꿀까?',       r: '구체적인 처방',       desc: '선수의 언어로 번역된 드릴과 다음 측정까지의 모니터링 계획을 함께 건넵니다.' },
  ];

  // Equipment — typographic cards with optional real photo header.
  // Cards without a photo fall back to a pure type treatment with an accent glyph area.
  const ACCENTS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981', '#ef4444', '#a855f7'];
  const EQUIPMENT = locale === 'en' ? [
    { name: 'Qualisys',        role: '3D Motion Capture',     spec: '240 Hz · 16-cam',           tag: 'optical',    src: 'equipment-qualisys.jpg' },
    { name: 'Theia3D',         role: 'Markerless Capture',    spec: 'AI pose · offline',         tag: 'ai vision',  src: 'equipment-theia3d.jpg' },
    { name: 'VALD ForceDecks', role: 'Force Plates · Fitness',spec: '1000 Hz GRF · CMJ · IMTP',  tag: 'dual plate', src: 'equipment-vald-forcedecks.jpg' },
    { name: 'VALD ForceFrame', role: 'Isometric Strength',    spec: 'shoulder · hip · posterior chain', tag: 'isometric', src: 'equipment-vald-forceframe.jpg' },
    { name: 'Rapsodo',         role: 'Ball Tracking',         spec: 'velocity · spin · trajectory', tag: 'radar',   src: 'equipment-rapsodo.jpg' },
    { name: 'Uplift Labs',     role: 'Mobile Markerless',     spec: 'iPad · on-site',            tag: 'mobile',     src: 'equipment-uplift-labs.jpg' },
    { name: 'AMTI',            role: 'Force Plate · Pitching',spec: 'GRF · drive leg',           tag: 'pitching',   src: 'equipment-amti.jpg' },
    { name: 'Swing Catalyst',  role: '3D Force Plate · Hitting', spec: 'GRF · torque · weight shift', tag: 'hitting',  src: 'equipment-swing-catalyst.jpg' },
  ] : [
    { name: 'Qualisys',        role: '3D 모션캡쳐',           spec: '240Hz · 16-cam',            tag: 'optical',    src: 'equipment-qualisys.jpg' },
    { name: 'Theia3D',         role: '마커리스 캡쳐',         spec: 'AI pose · offline',         tag: 'ai vision',  src: 'equipment-theia3d.jpg' },
    { name: 'VALD ForceDecks', role: '포스플레이트 · 체력',   spec: '1000Hz GRF · CMJ · IMTP',   tag: 'dual plate', src: 'equipment-vald-forcedecks.jpg' },
    { name: 'VALD ForceFrame', role: '등척성 근력 측정',      spec: '어깨 · 고관절 · 후면 사슬',  tag: 'isometric',  src: 'equipment-vald-forceframe.jpg' },
    { name: 'Rapsodo',         role: '볼 트래킹',             spec: '구속 · 회전 · 궤적',         tag: 'radar',     src: 'equipment-rapsodo.jpg' },
    { name: 'Uplift Labs',     role: '마커리스 모바일',       spec: 'iPad · 현장 출장',           tag: 'mobile',    src: 'equipment-uplift-labs.jpg' },
    { name: 'AMTI',            role: '투수용 포스플레이트',   spec: 'GRF · 드라이브 레그',        tag: 'pitching',  src: 'equipment-amti.jpg' },
    { name: 'Swing Catalyst',  role: '타자용 3D 포스플레이트', spec: 'GRF · 토크 · 체중 이동',   tag: 'hitting',   src: 'equipment-swing-catalyst.jpg' },
  ];

  const resultLabel = locale === 'en' ? 'result' : '결과';

  return (
    <section id="system" className="hp-section hp-system" data-screen-label="03 System">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('system.label')} <span className="dim">003</span></div>
          <h2 className="hp-h2">
            {T('system.h2.1')}<br/>
            <em>{T('system.h2.2')}</em>
          </h2>
        </header>

        <div className="hp-captureflow hp-captureflow-tiers">
          <div className="hp-captureflow-row">
            <header className="hp-captureflow-tier">
              <span className="hp-captureflow-tier-n">TIER A</span>
              <span className="hp-captureflow-tier-k">{locale === 'en' ? 'Mobile · On-site' : '현장 출장 · 마커리스'}</span>
              <span className="hp-captureflow-tier-t">{locale === 'en' ? 'Basic biomechanics' : '기본 바이오메카닉스'}</span>
            </header>
            <figure className="hp-captureflow-tile is-field">
              <img src="assets/uplift-field-session.jpg" alt="BBL analyst capturing a Korea University pitcher on the field" loading="lazy" />
              <div className="hp-captureflow-overlay">
                <span className="hp-captureflow-step">01 · {locale === 'en' ? 'CAPTURE' : '캡쳐'}</span>
                <span className="hp-captureflow-title">{locale === 'en' ? 'On the mound' : '마운드 위에서'}</span>
                <span className="hp-captureflow-sub">{locale === 'en' ? 'Uplift Labs markerless · iPad on tripod · no bodysuit, no sensors' : 'Uplift Labs 마커리스 · 트라이포드 iPad · 수트도 센서도 붙이지 않습니다'}</span>
              </div>
            </figure>
            <div className="hp-captureflow-arrow" aria-hidden="true">→</div>
            <figure className="hp-captureflow-tile is-screen">
              <video
                src="assets/uplift-analysis-ui.mp4"
                autoPlay muted loop playsInline
                aria-label="Uplift Labs kinematic sequence analysis software"
              />
              <div className="hp-captureflow-overlay">
                <span className="hp-captureflow-step">02 · {locale === 'en' ? 'ANALYZE' : '분석'}</span>
                <span className="hp-captureflow-title">{locale === 'en' ? 'On the screen' : '화면 위에서'}</span>
                <span className="hp-captureflow-sub">{locale === 'en' ? 'Kinematic sequence · X-factor · 3D pose — read together, in one view' : '키네마틱 시퀀스 · X-Factor · 3D 포즈를 한 화면에서 교차로 읽습니다'}</span>
              </div>
            </figure>
          </div>

          <div className="hp-captureflow-row is-lab">
            <header className="hp-captureflow-tier">
              <span className="hp-captureflow-tier-n">TIER B</span>
              <span className="hp-captureflow-tier-k">{locale === 'en' ? 'Lab · Precision' : '연구실 · 정밀 측정'}</span>
              <span className="hp-captureflow-tier-t">{locale === 'en' ? 'Precision biomechanics' : '정밀 바이오메카닉스'}</span>
            </header>
            <figure className="hp-captureflow-tile is-field is-videocapture">
              <video
                src="assets/lab-motion-capture.mp4"
                autoPlay muted loop playsInline
                aria-label="Live Qualisys motion capture of a marker-suited pitcher at SK Futures Park"
              />
              <div className="hp-captureflow-overlay">
                <span className="hp-captureflow-step">01 · {locale === 'en' ? 'CAPTURE' : '캡쳐'}</span>
                <span className="hp-captureflow-title">{locale === 'en' ? 'Inside the lab' : '연구실 안에서'}</span>
                <span className="hp-captureflow-sub">{locale === 'en' ? 'Qualisys 3D · 240 Hz · 16-cam motion capture on instrumented force-plate mound' : 'Qualisys 3D · 240Hz · 16대 모션캡쳐 + 지면반력 마운드'}</span>
              </div>
            </figure>
            <div className="hp-captureflow-arrow" aria-hidden="true">→</div>
            <figure className="hp-captureflow-tile is-screen is-black">
              <video
                src="assets/pitching-skeleton.mp4"
                autoPlay muted loop playsInline
                aria-label="3D biomechanical skeleton of a pitcher on dual force plates"
              />
              <div className="hp-captureflow-overlay">
                <span className="hp-captureflow-step">02 · {locale === 'en' ? 'ANALYZE' : '분석'}</span>
                <span className="hp-captureflow-title">{locale === 'en' ? 'Into the model' : '모델 위에서'}</span>
                <span className="hp-captureflow-sub">{locale === 'en' ? 'Full-body 3D skeleton · joint torque · ground reaction vectors — the body made solvable' : '전신 3D 스켈레톤 · 관절 토크 · 지면반력 벡터 — 몸을 풀이 가능한 문제로'}</span>
              </div>
            </figure>
          </div>
        </div>

        <div className="hp-steps-grid">
          {STEPS.map((s, i) => (
            <article key={s.n} className="hp-step">
              <div className="hp-step-head">
                <span className="hp-step-n">{s.n}</span>
                <span className="hp-step-k">0{i+1} / 03</span>
              </div>
              <h3 className="hp-step-q">{s.q}</h3>
              <p className="hp-step-desc">{s.desc}</p>
              <div className="hp-step-r">
                <span className="hp-step-r-k">{resultLabel}</span>
                <span className="hp-step-r-v">{s.r}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="hp-sub-head">
          <div className="hp-sec-label"><span>/</span>{T('system.kseq.label')} <span className="dim">003·A</span></div>
          <h3 className="hp-sub-title">{T('system.kseq.title')}</h3>
        </div>

        <KinematicSequence />

        <div className="hp-equip-head">
          <div className="k">{T('system.equip.k')}</div>
          <div className="d">{T('system.equip.d')}</div>
        </div>
        <div className="hp-equip-grid">
          {EQUIPMENT.map((e,i) => (
            <article key={e.name} className={`hp-equip${e.src ? ' has-img' : ''}`} style={{'--i': i, '--accent': ACCENTS[i % ACCENTS.length]}}>
              {e.src && (
                <div className="hp-equip-img" style={e.src === 'equipment-vald-forcedecks.jpg' ? {overflow:'hidden'} : undefined}>
                  <img
                    src={`assets/${e.src}`}
                    alt={e.name}
                    loading="lazy"
                    style={e.src === 'equipment-vald-forcedecks.jpg'
                      ? {transform: 'rotate(90deg) scale(1.25)', transformOrigin: 'center center'}
                      : undefined}
                  />
                </div>
              )}
              <div className="hp-equip-body">
                <header className="hp-equip-top">
                  <span className="hp-equip-n">{String(i+1).padStart(2,'0')}</span>
                  <span className="hp-equip-tag">{e.tag}</span>
                </header>
                <div className="hp-equip-name">{e.name}</div>
                <div className="hp-equip-role">{e.role}</div>
                <footer className="hp-equip-foot">
                  <span className="hp-equip-bar" aria-hidden="true"></span>
                  <span className="hp-equip-spec">{e.spec}</span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.System = System;
