// System.jsx — BBL 3단계 분석 + equipment
function System() {
  const T = window.useT();
  const locale = window.currentLocale();

  const STEPS = locale === 'en' ? [
    { n: 'STEP 1', q: 'What is the body saying right now?', r: 'Baseline captured',     desc: 'VALD fitness assessment and motion mechanics captured in a single session — we pinpoint whether the issue lies in fitness or technique.' },
    { n: 'STEP 2', q: 'What do the numbers mean?',           r: 'Leak points found',     desc: 'Kinematic sequence, joint torque and ground reaction read together — we pinpoint what is actually holding performance back.' },
    { n: 'STEP 3', q: 'What do we change next?',             r: 'A specific prescription', desc: 'Drills translated into the athlete\'s language and a monitoring plan that carries through to the next session.' },
  ] : [
    { n: 'STEP 1', q: '지금 몸은 어떤 상태인가?',         r: '베이스라인 측정',     desc: 'VALD 체력 평가와 동작 메카닉스를 한 세션에 담아, 체력과 기술 중 무엇이 문제인지 파악합니다.' },
    { n: 'STEP 2', q: '숫자는 무엇을 말하는가?',             r: '에너지 누수 지점 포착', desc: '키네마틱 시퀀스 · 관절 토크 · 지면반력을 교차로 읽어, 실력의 발목을 잡는 구간을 짚어냅니다.' },
    { n: 'STEP 3', q: '다음 훈련에서 무엇을 바꿀까?',       r: '구체적인 처방',       desc: '선수의 언어로 번역된 드릴과 다음 측정까지의 모니터링 계획을 함께 건넵니다.' },
  ];

  // Equipment — typographic cards with optional real photo header.
  // Cards without a photo fall back to a pure type treatment with an accent glyph area.
  const ACCENTS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981', '#ef4444', '#a855f7'];
  const EQUIPMENT = locale === 'en' ? [
    { name: 'Qualisys',        role: '3D Motion Capture',     spec: '240 Hz · 16-cam',           tag: 'optical',    src: 'equipment-qualisys.jpg' },
    { name: 'Theia3D',         role: 'Markerless Capture',    spec: 'AI pose · offline',         tag: 'ai vision',  src: 'equipment-theia3d.jpg' },
    { name: 'Rapsodo',         role: 'Ball Tracking',         spec: 'velocity · spin · trajectory', tag: 'radar',   src: 'equipment-rapsodo.jpg' },
    { name: 'Uplift Labs',     role: 'Mobile Markerless',     spec: 'iPad · on-site',            tag: 'mobile',     src: 'equipment-uplift-labs.jpg' },
    { name: 'AMTI',            role: 'Force Plate · Pitching',spec: 'GRF · drive leg',           tag: 'pitching',   src: 'equipment-amti.jpg' },
    { name: 'Swing Catalyst',  role: '3D Force Plate · Hitting', spec: 'GRF · torque · weight shift', tag: 'hitting',  src: 'equipment-swing-catalyst.jpg' },
  ] : [
    { name: 'Qualisys',        role: '3D 모션캡쳐',           spec: '240Hz · 16-cam',            tag: 'optical',    src: 'equipment-qualisys.jpg' },
    { name: 'Theia3D',         role: '마커리스 캡쳐',         spec: 'AI pose · offline',         tag: 'ai vision',  src: 'equipment-theia3d.jpg' },
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
              <img src="../assets/uplift-field-session.jpg" alt="BBL analyst capturing a Korea University pitcher on the field" loading="lazy" />
              <div className="hp-captureflow-overlay">
                <span className="hp-captureflow-step">01 · {locale === 'en' ? 'CAPTURE' : '캡쳐'}</span>
                <span className="hp-captureflow-title">{locale === 'en' ? 'On the mound' : '마운드 위에서'}</span>
                <span className="hp-captureflow-sub">{locale === 'en' ? 'Uplift Labs markerless · iPad on tripod · no bodysuit, no sensors' : 'Uplift Labs 마커리스 · 트라이포드 iPad · 수트도 센서도 붙이지 않습니다'}</span>
              </div>
            </figure>
            <div className="hp-captureflow-arrow" aria-hidden="true">→</div>
            <figure className="hp-captureflow-tile is-screen">
              <video
                src="../assets/uplift-analysis-ui.mp4"
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
                src="../assets/lab-motion-capture.mp4"
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
                src="../assets/pitching-skeleton.mp4"
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
                    src={`../assets/${e.src}`}
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
