// FAQ + Contact + Footer (i18n)
const FAQS_KO = [
  { q: 'BBL은 다른 측정 센터와 무엇이 다른가요?', a: '세 가지가 다릅니다. ① 30년간 쌓인 국민대 바이오메카닉스 연구가 분석의 뼈대입니다 — 검증된 학술 방법론, 논문 기반 진단. ② 선수 출신이면서 바이오메카닉스를 전공한 플레이어-애널리스트가 직접 설명합니다. ③ 한국 선수 1,000명 이상의 자체 벤치마크로, 해외 일반 평균이 아니라 당신 또래와 비교합니다.' },
  { q: '처음인데 어떤 서비스를 선택해야 하나요?', a: '처음이라면 \'기본 바이오메카닉스\'(30만원 · 40분)로 시작하시길 권합니다. 동작과 체력의 베이스라인을 한 번에 측정합니다. 이후 고교·프로 선수는 지면반력·관절 토크까지 포함된 \'정밀 바이오메카닉스\'(아마추어 50만 · 프로 70만)로 더 깊게 들여다볼 수 있습니다.' },
  { q: '중학생도 이용할 수 있나요?', a: '네. 기본 바이오메카닉스는 중·고등학생이 주요 대상입니다. VALD 체력 평가는 신체 성장 편차 때문에 고교생 이상을 권장하며, 중학생은 성장 단계에 맞춰 동작 메카닉스 중심 세션으로 맞춰 드립니다.' },
  { q: '팀 단위 출장 분석이 가능한가요?', a: '네. 포터블 장비(Uplift Labs · Rapsodo · VALD)를 들고 팀이 있는 곳으로 갑니다. 10명 이상 단체 측정 시 선수 전원 리포트 + 현장 피드백 + 코치진 브리핑이 포함됩니다. 1회 단체(1인 15만원) 또는 연간 패키지(1인 1회 10만원, 연 12회) 중 선택할 수 있습니다.' },
  { q: '예약은 어떻게 하나요?', a: '상단 \'예약\' 섹션에서 서비스·날짜·시간을 선택하시거나, 아래 문의 폼 또는 메일(happygh@kookmin.ac.kr)로 포지션·학년·희망 일정을 남겨주세요. 초기 상담 약 15분이며, 예약은 보통 2주 이내로 잡힙니다.' },
];
const FAQS_EN = [
  { q: 'How is BBL different from other measurement centers?', a: 'Three differences. ① Thirty years of Kookmin biomechanics research form the backbone — peer-reviewed methods, not proprietary guesswork. ② A player-analyst hybrid — former athletes with biomechanics grad degrees explain the data themselves. ③ A benchmark of 1,000+ Korean athletes, so you compare against peers, not a generic overseas average.' },
  { q: 'Which service should a first-timer pick?', a: 'Start with Basic Biomechanics (300k KRW · 40 min) — a single-session baseline of motion and fitness. HS and pro athletes can then go deeper with Advanced Biomechanics (amateur 500k · pro 700k), adding ground reaction and joint torque.' },
  { q: 'Can middle-school students use BBL?', a: 'Yes. Basic Biomechanics is built around MS and HS athletes. VALD fitness testing is recommended HS and up due to growth-stage variance; for MS we tailor a motion-mechanics focused session.' },
  { q: 'Do you travel to team locations?', a: 'Yes. Our portable chain (Uplift Labs · Rapsodo · VALD) travels to the team. 10+ athletes: full individual reports, on-site feedback and a staff briefing. Single session 150k KRW/athlete, or an annual package — 100k/athlete/session, 12× a year.' },
  { q: 'How do I book?', a: 'Pick service, date and time in the Booking section above, or email happygh@kookmin.ac.kr with your position, level and preferred schedule. ~15 min initial consult; typically bookable within 2 weeks.' },
];

function FAQ() {
  const T = window.useT();
  const locale = window.currentLocale();
  const FAQS = locale === 'en' ? FAQS_EN : FAQS_KO;
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="hp-section hp-faq" data-screen-label="09 FAQ">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('faq.label')} <span className="dim">006</span></div>
          <h2 className="hp-h2">{T('faq.h2')}</h2>
        </header>
        <div className="hp-faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`hp-faq-item ${open===i?'is-open':''}`}>
              <button className="hp-faq-q" onClick={() => setOpen(open===i ? -1 : i)}>
                <span className="hp-faq-n">Q.{String(i+1).padStart(2,'0')}</span>
                <span className="hp-faq-text">{f.q}</span>
                <span className="hp-faq-arrow">{open===i ? '—' : '+'}</span>
              </button>
              <div className="hp-faq-a-wrap">
                <div className="hp-faq-a">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.FAQ = FAQ;

function Contact() {
  const T = window.useT();
  const locale = window.currentLocale();
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({name:'', email:'', phone:'', type:'', msg:''});
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(()=>setSent(false), 3200); };

  return (
    <section id="contact" className="hp-section hp-contact" data-screen-label="10 Contact">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('contact.label')} <span className="dim">007</span></div>
          <h2 className="hp-h2">
            {T('contact.h2.1')}<br/>
            <em>{T('contact.h2.2')}</em>
          </h2>
          <p className="hp-sec-lead">{T('contact.lead')}</p>
        </header>

        <div className="hp-contact-grid">
          <form className="hp-form" onSubmit={submit}>
            <div className="hp-form-row">
              <label><span>{T('contact.name')} *</span><input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={locale === 'en' ? 'Full name' : '홍길동'} required /></label>
              <label><span>{T('contact.email')} *</span><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="name@email.com" required /></label>
            </div>
            <div className="hp-form-row">
              <label><span>{T('contact.phone')}</span><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="010-0000-0000" /></label>
              <label><span>{T('contact.type')} *</span>
                <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} required>
                  <option value="">{T('contact.select')}</option>
                  <option>{T('contact.type.1')}</option>
                  <option>{T('contact.type.2')}</option>
                  <option>{T('contact.type.3')}</option>
                  <option>{T('contact.type.4')}</option>
                  <option>{T('contact.type.5')}</option>
                  <option>{T('contact.type.6')}</option>
                </select>
              </label>
            </div>
            <label><span>{T('contact.msg')} *</span><textarea rows="5" value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder={T('contact.msg.ph')} required /></label>
            <button type="submit" className="btn btn-primary btn-full">{sent ? T('contact.sent') : `${T('contact.send')} →`}</button>
          </form>

          <aside className="hp-contact-info">
            <div className="hp-info-block">
              <div className="k">📧 EMAIL</div>
              <div><a href="mailto:happygh@kookmin.ac.kr">happygh@kookmin.ac.kr</a></div>
            </div>
            <div className="hp-info-block">
              <div className="k">📍 LOCATION</div>
              <div>{locale === 'en' ? '77 Jeongneung-ro, Seongbuk-gu, Seoul\nKookmin University' : '서울특별시 성북구 정릉로 77\n국민대학교'}</div>
            </div>
            <div className="hp-info-block">
              <div className="k">🏢 {locale === 'en' ? 'OPERATOR' : '운영'}</div>
              <div>{locale === 'en' ? 'BioMotion Inc.' : '㈜ 바이오모션'}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
window.Contact = Contact;

function Footer() {
  const T = window.useT();
  const locale = window.currentLocale();
  const metaLines = T('footer.meta').split('\n');
  return (
    <footer className="hp-footer" data-screen-label="11 Footer">
      <div className="hp-container">
        <div className="hp-footer-grid">
          <div className="hp-footer-brand">
            <img src="assets/bbl-logo-dark.png" alt="BioMotion Baseball Lab" className="hp-footer-logo hp-brand-logo-dark" />
            <img src="assets/bbl-logo-light.png" alt="BioMotion Baseball Lab" className="hp-footer-logo hp-brand-logo-light" />
            <div className="hp-footer-meta">
              {metaLines.map((l, i) => <React.Fragment key={i}>{l}{i < metaLines.length-1 && <br/>}</React.Fragment>)}
            </div>
          </div>
          <div className="hp-footer-links">
            <div className="col">
              <div className="h">{T('footer.site')}</div>
              <a href="#why">{T('nav.01')}</a>
              <a href="#system">{T('nav.02')}</a>
              <a href="#services">{T('nav.03')}</a>
              <a href="#book">{T('nav.07')}</a>
            </div>
            <div className="col">
              <div className="h">{T('footer.contact')}</div>
              <a href="mailto:happygh@kookmin.ac.kr">happygh@kookmin.ac.kr</a>
              <a href="#contact">{T('nav.cta')}</a>
              <span>{T('footer.reply')}</span>
            </div>
          </div>
        </div>
        <div className="hp-footer-bottom">
          <span>© 2026 BioMotion Inc. All rights reserved.</span>
          <span className="mono">BBL · KOOKMIN UNIV. · SEOUL · KR</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
