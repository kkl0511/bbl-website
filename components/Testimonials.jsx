// Testimonials.jsx — athlete/coach voices carousel
const VOICES = [
  {
    quoteKo: '상체만 고치면 되는 줄 알았습니다. 웨이트를 아무리 해도 제구가 안 잡혔죠. 분석 결과 원인은 하체 — 무릎이 흔들려 공 놓는 지점이 매번 달랐던 겁니다. 훈련법을 바꾼 그 해에 구속과 제구를 동시에 잡았고, KBO 드래프트에 지명됐습니다.',
    quoteEn: 'I thought the problem was my upper body. No matter how much I lifted, command wouldn\'t come. The analysis pointed down — a wavering knee that shifted my release every pitch. The year I changed training, velocity and command locked in together. I was drafted by the KBO.',
    nameKo: '정튼튼 · P',
    nameEn: 'Pitcher Jeong T.',
    roleKo: '고려대 야구부 → NC 다이노스 (2026 KBO 신인 드래프트 5R)',
    roleEn: 'Korea Univ. → NC Dinos (2026 KBO Draft · R5)',
    statKo: ['5라운드', 'KBO 지명'],
    statEn: ['Round 5', 'KBO Draft'],
  },
  {
    quoteKo: '내 몸이 어떻게 움직이는지 처음으로 \'봤습니다\'. 감각이 그래프 한 장으로 정리된 날, 구속이 145에서 150으로 움직이기 시작했습니다.',
    quoteEn: 'The first time I actually saw how my body moves. The day feeling became a graph, my velocity started moving — 145 to 150.',
    nameKo: '김 · P',
    nameEn: 'Pitcher K.',
    roleKo: 'KBO 2군 투수 · 좌완',
    roleEn: 'KBO Futures · LHP',
    statKo: ['+5km/h', '평균 구속'],
    statEn: ['+5 km/h', 'avg velocity'],
  },
  {
    quoteKo: '25명 선수에게 각기 다른 처방이 나온 게 충격이었습니다. 스윙 유형이 다르다는 건 알았지만, 체중이동 패턴이 이렇게까지 다를 줄은 몰랐습니다.',
    quoteEn: 'A different prescription for all 25 athletes — that was the shock. I knew swing types differed. I didn\'t know weight-shift patterns differed this much.',
    nameKo: '박 · 감독',
    nameEn: 'Coach P.',
    roleKo: '고교 야구부 감독',
    roleEn: 'HS Head Coach',
    statKo: ['25명', '전원 맞춤 리포트'],
    statEn: ['25', 'custom reports'],
  },
  {
    quoteKo: '아들 허리 통증의 원인을 병원에서도 찾지 못했습니다. BBL은 타격 때 뒤쪽 발 체중이동이 부족하다는 걸 짚어줬고, 그때부터 \'무엇을 고쳐야 할지\'가 명확해졌습니다.',
    quoteEn: 'The hospital couldn\'t explain my son\'s back pain. BBL traced it to insufficient rear-foot load on swings — we finally knew exactly what to fix.',
    nameKo: '이 · 학부모',
    nameEn: 'Parent L.',
    roleKo: '고1 내야수 학부모',
    roleEn: 'Parent of HS infielder',
    statKo: ['원인', '정확한 진단'],
    statEn: ['Root cause', 'identified'],
  },
  {
    quoteKo: '데이터를 선수 언어로 옮기는 게 제일 어렵습니다. 선수 출신 애널리스트가 직접 설명해주니, 그날부터 코치진과 선수 사이에 공용어가 생겼습니다.',
    quoteEn: 'Translating data into a player\'s language is the hardest part. With a player-analyst explaining it, my staff and athletes finally speak the same language.',
    nameKo: '최 · 코치',
    nameEn: 'Coach C.',
    roleKo: '대학 투수 코치',
    roleEn: 'College Pitching Coach',
    statKo: ['공용 언어', '팀 전체'],
    statEn: ['Shared', 'vocabulary'],
  },
];

function Testimonials() {
  const T = window.useT();
  const locale = window.currentLocale();
  const [i, setI] = React.useState(0);
  const [auto, setAuto] = React.useState(true);

  React.useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI(x => (x + 1) % VOICES.length), 6500);
    return () => clearInterval(id);
  }, [auto]);

  const v = VOICES[i];
  return (
    <section id="voices" className="hp-section hp-testi" data-screen-label="07 Voices">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('testi.label')} <span className="dim">{String(VOICES.length).padStart(3,'0')}·V</span></div>
          <p className="hp-sec-lead">{T('testi.lead')}</p>
        </header>

        <div className="hp-testi-stage" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
          <div className="hp-testi-marks" aria-hidden>“</div>

          <div className="hp-testi-quote-wrap">
            {VOICES.map((vo, idx) => (
              <blockquote
                key={idx}
                className={`hp-testi-quote ${idx === i ? 'on' : ''}`}
                aria-hidden={idx !== i}
              >
                <p>{locale === 'en' ? vo.quoteEn : vo.quoteKo}</p>
                <footer>
                  <div className="hp-testi-cite">
                    <div className="hp-testi-name">{locale === 'en' ? vo.nameEn : vo.nameKo}</div>
                    <div className="hp-testi-role mono">{locale === 'en' ? vo.roleEn : vo.roleKo}</div>
                  </div>
                  <div className="hp-testi-stat">
                    <div className="v">{locale === 'en' ? vo.statEn[0] : vo.statKo[0]}</div>
                    <div className="l mono">{locale === 'en' ? vo.statEn[1] : vo.statKo[1]}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="hp-testi-nav">
            <button className="hp-testi-arrow" onClick={() => setI((i - 1 + VOICES.length) % VOICES.length)} aria-label="prev">←</button>
            <div className="hp-testi-dots">
              {VOICES.map((_, idx) => (
                <button
                  key={idx}
                  className={`hp-testi-dot ${idx === i ? 'on' : ''}`}
                  onClick={() => setI(idx)}
                  aria-label={`slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="hp-testi-count mono">{String(i + 1).padStart(2, '0')} / {String(VOICES.length).padStart(2, '0')}</span>
            <button className="hp-testi-arrow" onClick={() => setI((i + 1) % VOICES.length)} aria-label="next">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Testimonials = Testimonials;
