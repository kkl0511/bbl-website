// Booking.jsx — calendar-style booking (dynamic slots + mailto submit)
const SERVICES_LIST_KO = [
  { id: 'basic',    name: '기본 바이오메카닉스',  dur: '40분',   price: '30만원', tier: 'INDIV · 001' },
  { id: 'advanced', name: '정밀 바이오메카닉스',  dur: '90분',   price: '50–70만원', tier: 'INDIV · 002' },
  { id: 'team1',    name: '1회 측정 (10명+)',     dur: '2시간 (10명 기준)',  price: '21만원 / 인', tier: 'TEAM · 003' },
  { id: 'teamann',  name: '연간 단체 패키지',     dur: '연 12회', price: '15만원 / 인 / 회', tier: 'TEAM · 004' },
];
const SERVICES_LIST_EN = [
  { id: 'basic',    name: 'Basic Biomechanics',     dur: '40min',   price: '300,000 KRW', tier: 'INDIV · 001' },
  { id: 'advanced', name: 'Advanced Biomechanics',  dur: '90min',   price: '500–700,000 KRW', tier: 'INDIV · 002' },
  { id: 'team1',    name: 'Team measurement (10+)', dur: '2h (10 athletes)',      price: '210,000 / athlete', tier: 'TEAM · 003' },
  { id: 'teamann',  name: 'Annual team package',    dur: '12×/yr',  price: '150,000 / session', tier: 'TEAM · 004' },
];

const DEFAULT_ADMIN_EMAIL = 'bbl@kookmin.ac.kr';

function buildMonth(y, m) {
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  const startDow = first.getDay();
  const days = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, m, d));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function groupSlots(times) {
  const m = [], a = [], e = [];
  times.forEach(t => {
    const h = parseInt(t.split(':')[0], 10);
    if (h < 12) m.push(t);
    else if (h < 17) a.push(t);
    else e.push(t);
  });
  return { morning: m, afternoon: a, evening: e };
}

function Booking() {
  const T = window.useT();
  const locale = window.currentLocale();
  const today = new Date();
  const [cursor, setCursor] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [service, setService] = React.useState('basic');
  const [date, setDate] = React.useState(null);
  const [slot, setSlot] = React.useState(null);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [memo, setMemo] = React.useState('');
  const [openDates, setOpenDates] = React.useState({});
  const [adminEmail, setAdminEmail] = React.useState(DEFAULT_ADMIN_EMAIL);
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    fetch('slots.json', { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && data.openDates) setOpenDates(data.openDates);
        if (data && data.adminEmail) setAdminEmail(data.adminEmail);
      })
      .catch(() => {});
  }, []);

  const services = locale === 'en' ? SERVICES_LIST_EN : SERVICES_LIST_KO;
  const currentService = services.find(s => s.id === service) || services[0];
  const days = buildMonth(cursor.getFullYear(), cursor.getMonth());
  const monthLabel = cursor.toLocaleDateString(locale === 'en' ? 'en-US' : 'ko-KR', { year: 'numeric', month: 'long' });

  const dowKo = ['일', '월', '화', '수', '목', '금', '토'];
  const dowEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dow = locale === 'en' ? dowEn : dowKo;

  const isSelectable = (d) => {
    if (!d) return false;
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (d < t) return false;
    const key = dateKey(d);
    return !!(openDates[key] && openDates[key].length > 0);
  };
  const isSelected = (d) => d && date && d.toDateString() === date.toDateString();

  const availableSlots = date ? (openDates[dateKey(date)] || []) : [];
  const grouped = groupSlots(availableSlots);

  const canSubmit = service && date && slot && name.trim() && phone.trim();

  const submit = () => {
    if (!canSubmit) return;
    const dateStr = date.toLocaleDateString(locale === 'en' ? 'en-US' : 'ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    const subjectKo = `[BBL 예약] ${currentService.name} · ${dateStr} ${slot}`;
    const subjectEn = `[BBL Booking] ${currentService.name} · ${dateStr} ${slot}`;
    const subject = locale === 'en' ? subjectEn : subjectKo;

    const bodyKo = `안녕하세요, BBL 분석 예약 문의드립니다.

━━━ 예약 정보 ━━━
• 서비스: ${currentService.name} (${currentService.tier})
• 소요 시간: ${currentService.dur}
• 비용: ${currentService.price}
• 날짜: ${dateStr}
• 시간: ${slot}

━━━ 신청자 정보 ━━━
• 이름: ${name}
• 연락처: ${phone}
• 이메일: ${email || '-'}

━━━ 메모 ━━━
${memo || '(없음)'}

확정 여부 회신 부탁드립니다.
감사합니다.`;

    const bodyEn = `Hi BBL, I'd like to request a biomechanics session.

━━━ Booking ━━━
• Service: ${currentService.name} (${currentService.tier})
• Duration: ${currentService.dur}
• Fee: ${currentService.price}
• Date: ${dateStr}
• Time: ${slot}

━━━ Contact ━━━
• Name: ${name}
• Phone: ${phone}
• Email: ${email || '-'}

━━━ Notes ━━━
${memo || '(none)'}

Please confirm availability. Thank you.`;

    const body = locale === 'en' ? bodyEn : bodyKo;
    const mailto = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 8000);
  };

  const step1 = true;
  const step2 = !!service;
  const step3 = !!date && !!slot;

  const monthHasOpenDates = (() => {
    const y = cursor.getFullYear(), m = cursor.getMonth();
    return Object.keys(openDates).some(k => {
      const [ky, km] = k.split('-').map(Number);
      return ky === y && km === m + 1;
    });
  })();

  return (
    <section id="book" className="hp-section hp-book" data-screen-label="08 Book">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('book.label')} <span className="dim">004·B</span></div>
          <h2 className="hp-h2">
            {T('book.h2.1')}<br/>
            {T('book.h2.2') && <em>{T('book.h2.2')}</em>}
          </h2>
          <p className="hp-sec-lead">{T('book.lead')}</p>
        </header>

        <div className="hp-book-progress">
          <div className={`hp-book-step ${step1 ? 'on' : ''}`}><span className="n">01</span>{T('book.step1')}</div>
          <div className={`hp-book-step ${step2 ? 'on' : ''}`}><span className="n">02</span>{T('book.step2')}</div>
          <div className={`hp-book-step ${step3 ? 'on' : ''}`}><span className="n">03</span>{T('book.step3')}</div>
        </div>

        <div className="hp-book-grid">
          {/* LEFT — service + summary */}
          <aside className="hp-book-aside">
            <div className="hp-book-aside-k mono">{T('book.service')}</div>
            <div className="hp-book-svc-list">
              {services.map(s => (
                <button
                  key={s.id}
                  className={`hp-book-svc ${service === s.id ? 'on' : ''}`}
                  onClick={() => setService(s.id)}
                >
                  <div className="hp-book-svc-k mono">{s.tier}</div>
                  <div className="hp-book-svc-n">{s.name}</div>
                  <div className="hp-book-svc-meta mono">{s.dur} · {s.price}</div>
                </button>
              ))}
            </div>

            <div className="hp-book-summary">
              <div className="mono k">{T('book.duration')}</div>
              <div className="v">{currentService.dur}</div>
              <div className="mono k">📍</div>
              <div className="v">{locale === 'en' ? 'Kookmin Biomechanics Lab, Seoul' : '국민대 바이오메카닉스 랩'}</div>
            </div>
            <p className="hp-book-note mono">※ {T('book.notes')}</p>
          </aside>

          {/* RIGHT — calendar + slots */}
          <div className="hp-book-main">
            <div className="hp-book-cal">
              <div className="hp-book-cal-head">
                <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="hp-book-arrow" aria-label="prev">←</button>
                <div className="hp-book-month">{monthLabel}</div>
                <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="hp-book-arrow" aria-label="next">→</button>
              </div>
              <div className="hp-book-cal-dow">
                {dow.map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="hp-book-cal-grid">
                {days.map((d, i) => {
                  if (!d) return <div key={i} className="hp-book-cal-cell empty" />;
                  const sel = isSelected(d);
                  const ok = isSelectable(d);
                  const isToday = d.toDateString() === today.toDateString();
                  return (
                    <button
                      key={i}
                      className={`hp-book-cal-cell ${sel ? 'sel' : ''} ${ok ? 'ok' : 'off'} ${isToday ? 'today' : ''}`}
                      onClick={() => ok && (setDate(d), setSlot(null))}
                      disabled={!ok}
                    >
                      {d.getDate()}
                      {isToday && <span className="today-dot" />}
                    </button>
                  );
                })}
              </div>
              {!monthHasOpenDates && (
                <div className="hp-book-noopen mono">
                  {locale === 'en' ? 'No open dates this month — try the next one →' : '이번 달 예약 가능한 날이 없습니다 — 다음 달을 확인해보세요 →'}
                </div>
              )}
            </div>

            <div className="hp-book-slots">
              <div className="hp-book-slots-head mono">
                {T('book.slots')}
                {date && <span className="hp-book-selected-date">
                  · {date.toLocaleDateString(locale === 'en' ? 'en-US' : 'ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })}
                </span>}
              </div>

              {!date && <p className="hp-book-slots-empty">{locale === 'en' ? 'Select an open date first.' : '먼저 열려있는 날짜를 선택해주세요.'}</p>}

              {date && availableSlots.length === 0 && (
                <p className="hp-book-slots-empty">{locale === 'en' ? 'No slots available on this date.' : '이 날짜는 예약 가능한 시간이 없습니다.'}</p>
              )}

              {date && availableSlots.length > 0 && (
                <div className="hp-book-slot-groups">
                  {['morning', 'afternoon', 'evening'].map(period => (
                    grouped[period].length > 0 && (
                      <div key={period} className="hp-book-slot-group">
                        <div className="hp-book-slot-period mono">{T(`book.${period}`)}</div>
                        <div className="hp-book-slot-row">
                          {grouped[period].map(t => (
                            <button
                              key={t}
                              className={`hp-book-slot ${slot === t ? 'on' : ''}`}
                              onClick={() => setSlot(t)}
                            >{t}</button>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            {slot && (
              <div className="hp-book-form">
                <div className="hp-book-form-head mono">{T('book.contact')}</div>
                <div className="hp-book-form-grid">
                  <input
                    type="text"
                    placeholder={locale === 'en' ? 'Name *' : '이름 *'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="hp-book-input"
                  />
                  <input
                    type="tel"
                    placeholder={locale === 'en' ? 'Phone *' : '연락처 (010-xxxx-xxxx) *'}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="hp-book-input"
                  />
                  <input
                    type="email"
                    placeholder={locale === 'en' ? 'Email (optional)' : '이메일 (선택)'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="hp-book-input"
                  />
                  <textarea
                    placeholder={locale === 'en' ? 'Notes (position, goals, preferred contact time, etc.)' : '메모 (포지션 · 목표 · 선호 연락 시간 등)'}
                    value={memo}
                    onChange={e => setMemo(e.target.value)}
                    className="hp-book-input hp-book-textarea"
                    rows="3"
                  />
                </div>
              </div>
            )}

            <button
              className="btn btn-primary btn-full hp-book-confirm"
              onClick={submit}
              disabled={!canSubmit}
            >
              {sent
                ? (locale === 'en' ? '✓ Email opened — please send it' : '✓ 메일 앱이 열렸습니다 — 발송해 주세요')
                : `${T('book.submit')} →`}
            </button>
            {sent && (
              <p className="hp-book-sent-hint mono">
                {locale === 'en'
                  ? 'If your email app didn\'t open, please contact us directly: ' + adminEmail
                  : '메일 앱이 열리지 않았다면 직접 문의해주세요: ' + adminEmail}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Booking = Booking;
