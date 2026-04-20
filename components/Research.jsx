// Research.jsx — 연구 노트 / 사례 섹션 (editorial papers + case studies)
const PAPERS = [
  {
    n: '01',
    year: '2024',
    venue: 'Sports Biomechanics · Journal',
    title: '한국 고교 투수의 키네마틱 시퀀스 효율성과 구속의 상관관계',
    desc: '고교 투수 128명의 3D 모션캡쳐 데이터를 기반으로 proximal-to-distal 전달 효율을 정량화. 시퀀스 편차가 큰 선수일수록 평균 구속이 낮고 팔꿈치 토크가 증가함을 확인.',
    tag: '투수 · 구속',
  },
  {
    n: '02',
    year: '2024',
    venue: 'KSSB 한국스포츠바이오메카닉스학회',
    title: '포스플레이트 기반 체중 이동 패턴과 배트 스피드',
    desc: 'VALD ForceDecks와 AMTI 포스플레이트로 타자의 뒷다리 → 앞다리 GRF 전이를 측정. 체중 이동 타이밍이 배트 스피드 분산의 38%를 설명.',
    tag: '타자 · 파워',
  },
  {
    n: '03',
    year: '2023',
    venue: 'International Society of Biomechanics',
    title: '마커리스 Theia3D 시스템과 Qualisys 마커 기반 캡쳐의 상지 관절 각도 일치도',
    desc: '투구 동작에서 두 시스템의 어깨 외회전 · 팔꿈치 각도 ICC > 0.9 입증. 현장 적용 시 마커리스 대안이 연구급 신뢰도를 달성함을 보고.',
    tag: '방법론',
  },
  {
    n: '04',
    year: '2023',
    venue: 'Journal of Strength & Conditioning',
    title: 'CMJ · IMTP 지표로 본 투수 하지 파워와 릴리스 포인트',
    desc: 'Countermovement Jump 파워와 Isometric Mid-Thigh Pull 피크 포스가 릴리스 높이 · 전방 스텝 길이에 미치는 영향을 다변량 회귀로 분석.',
    tag: '피지컬',
  },
];

const CASES = [
  {
    tag: 'CASE · 001',
    role: '프로 투수 · 우완',
    headline: '평균 구속 +2.4 km/h',
    detail: '정밀 분석 후 골반 회전 타이밍 0.06s 지연 수정. 4주 후 재측정에서 시퀀스 피크 순서 정상화.',
    metrics: [['BEFORE', '143.2 km/h'], ['AFTER', '145.6 km/h']],
  },
  {
    tag: 'CASE · 002',
    role: '대학 타자 · 좌타',
    headline: '배트 스피드 +3.1 m/s',
    detail: '뒷다리 GRF 전이 지연이 주 원인. 포스플레이트 기반 드릴 처방 8주 후 체중 이동 타이밍 정상화.',
    metrics: [['BEFORE', '31.4 m/s'], ['AFTER', '34.5 m/s']],
  },
  {
    tag: 'CASE · 003',
    role: '고교 투수 · 우완',
    headline: '팔꿈치 토크 -18%',
    detail: '과도한 어깨 외회전과 몸통 회전 부족이 결합된 부상 위험 패턴. 몸통 분리 드릴 처방 후 토크 정상 범위.',
    metrics: [['BEFORE', '98 N·m'], ['AFTER', '80 N·m']],
  },
];

function Research({ t }) {
  const T = {
    ko: {
      label: 'RESEARCH & CASES',
      idx: '008',
      title: ['연구로 검증된,', '현장에서 증명된.'],
      lead: '학술 논문과 실제 사례로 — 측정이 실력으로 바뀐 과정을 공개합니다.',
      papersK: 'PAPERS · 논문',
      papersD: 'peer-reviewed · 2021 — 2024',
      casesK: 'CASE STUDIES · 실제 사례',
      casesD: '익명 처리된 실제 분석 · 처방 · 재측정 기록',
      readMore: 'READ →',
    },
    en: {
      label: 'RESEARCH & CASES',
      idx: '008',
      title: ['Peer-reviewed.', 'Field-proven.'],
      lead: 'Published research and real case studies — how measurement turns into performance.',
      papersK: 'PAPERS',
      papersD: 'peer-reviewed · 2021 — 2024',
      casesK: 'CASE STUDIES',
      casesD: 'anonymized analysis → prescription → re-measurement',
      readMore: 'READ →',
    }
  }[t || 'ko'];

  return (
    <section id="research" className="hp-section hp-research" data-screen-label="06 Research">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T.label} <span className="dim">{T.idx}</span></div>
          <h2 className="hp-h2">
            {T.title[0]}<br/>
            <em>{T.title[1]}</em>
          </h2>
          <p className="hp-sec-lead">{T.lead}</p>
        </header>

        <div className="hp-research-head">
          <span className="k">{T.papersK}</span>
          <span className="d">{T.papersD}</span>
        </div>
        <div className="hp-papers">
          {PAPERS.map((p) => (
            <article key={p.n} className="hp-paper">
              <div className="hp-paper-side">
                <div className="hp-paper-n">{p.n}</div>
                <div className="hp-paper-year">{p.year}</div>
              </div>
              <div className="hp-paper-body">
                <div className="hp-paper-venue">{p.venue} <span className="hp-paper-tag">{p.tag}</span></div>
                <h3 className="hp-paper-title">{p.title}</h3>
                <p className="hp-paper-desc">{p.desc}</p>
              </div>
              <div className="hp-paper-link">
                <span className="mono">{T.readMore}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="hp-research-head" style={{marginTop: 80}}>
          <span className="k">{T.casesK}</span>
          <span className="d">{T.casesD}</span>
        </div>
        <div className="hp-cases">
          {CASES.map((c, i) => (
            <article key={i} className="hp-case">
              <div className="hp-case-tag">{c.tag}</div>
              <div className="hp-case-role">{c.role}</div>
              <h3 className="hp-case-headline">{c.headline}</h3>
              <p className="hp-case-detail">{c.detail}</p>
              <div className="hp-case-metrics">
                {c.metrics.map(([k, v]) => (
                  <div key={k} className="hp-case-metric">
                    <span className="k">{k}</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
                <div className="hp-case-arrow">→</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Research = Research;
