// ResearchNotes.jsx — editorial article list
const NOTES = [
  {
    n: '001',
    date: '2026.03.14',
    tag: 'KINEMATICS',
    titleKo: '분리각 35°의 문턱 — 골반과 몸통 사이에서 구속이 결정된다',
    titleEn: 'The 35° threshold — where pelvis and torso decide velocity',
    excerptKo: '국내 프로 30명 데이터 — 분리각 35°를 넘길 때 구속 평균 2.3mph 증가. 다만 상체 과부하 위험이 동반되므로 ForceDecks 기반 보조 훈련이 필요.',
    excerptEn: '30 KBO pitchers — separation past 35° correlates with +2.3mph avg. Upper-body overload risk calls for ForceDecks-based adjunct training.',
    readKo: 7,
    readEn: 6,
    img: 'hero-pitcher-analysis.jpg',
  },
  {
    n: '002',
    date: '2026.02.21',
    tag: 'HITTING',
    titleKo: '뒤쪽 발의 1.8배 — 타구 속도를 가르는 숫자',
    titleEn: '1.8× body weight — the rear-foot number that splits exit velocity',
    excerptKo: '체중 대비 1.8배 이상의 뒤쪽 발 수직 지면반력을 보이는 타자는 평균 타구 속도가 6km/h 높았다. 고교생 25명 대상 측정 결과.',
    excerptEn: 'Hitters peaking above 1.8× bodyweight in rear-foot vertical GRF showed +6 km/h avg exit velocity (n=25 HS).',
    readKo: 5,
    readEn: 4,
    img: 'hero-hitting-analysis-poster.jpg',
  },
  {
    n: '003',
    date: '2026.01.30',
    tag: 'INJURY',
    titleKo: '팔꿈치가 먼저 말한다 — 토크가 자가 보고보다 정확한 이유',
    titleEn: 'The elbow speaks first — why torque beats self-reported fatigue',
    excerptKo: '토미 존 수술 이후 복귀 선수 12명 장기 추적. 3D 마커 기반 관절 토크가 자가 보고 피로도보다 재부상 예측에 유의미.',
    excerptEn: '12-athlete longitudinal study post-TJ — marker-based joint torque beat self-report fatigue as a re-injury predictor.',
    readKo: 9,
    readEn: 7,
    img: 'equipment-theia3d-forceplate.jpg',
  },
  {
    n: '004',
    date: '2025.12.12',
    tag: 'METHOD',
    titleKo: '마커리스와 마커 기반 — 언제, 무엇을, 왜 선택하는가',
    titleEn: 'Markerless or marker-based — when, what, why',
    excerptKo: '현장 빠른 피드백에는 마커리스, 정밀 관절 토크 분석에는 마커 기반. BBL 내부 비교 실험과 가이드라인.',
    excerptEn: 'Markerless wins for fast on-field feedback; marker-based for precision joint torque. BBL internal guideline and benchmark.',
    readKo: 6,
    readEn: 5,
    img: 'equipment-uplift-labs-poster.jpg',
  },
];

function ResearchNotes() {
  const T = window.useT();
  const locale = window.currentLocale();
  return (
    <section id="research" className="hp-section hp-research" data-screen-label="06 Research">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('research.label')} <span className="dim">004·R</span></div>
          <h2 className="hp-h2">
            {T('research.h2.1')}<br/>
            <em>{T('research.h2.2')}</em>
          </h2>
          <p className="hp-sec-lead">{T('research.lead')}</p>
        </header>

        <div className="hp-notes-list">
          {NOTES.map((note) => (
            <article key={note.n} className="hp-note">
              <div className="hp-note-meta">
                <span className="hp-note-n">{note.n}</span>
                <span className="hp-note-date mono">{note.date}</span>
                <span className="hp-note-tag">{note.tag}</span>
              </div>
              <div className="hp-note-body">
                <h3 className="hp-note-title">{locale === 'en' ? note.titleEn : note.titleKo}</h3>
                <p className="hp-note-excerpt">{locale === 'en' ? note.excerptEn : note.excerptKo}</p>
                <div className="hp-note-foot mono">
                  <span>{locale === 'en' ? note.readEn : note.readKo} {T('research.readtime')}</span>
                  <span className="arr">→</span>
                </div>
              </div>
              <div className="hp-note-img">
                <img src={`assets/${note.img}`} alt="" />
              </div>
            </article>
          ))}
        </div>

        <div className="hp-notes-all">
          <a href="#" className="btn btn-ghost">{T('research.viewall')} <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}
window.ResearchNotes = ResearchNotes;
