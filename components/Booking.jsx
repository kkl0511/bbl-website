// Booking.jsx — calendar-style booking (Cal.com-inspired)
const SERVICES_LIST_KO = [
  { id: 'basic',    name: '기본 바이오메카닉스',  dur: '40분',   price: '30만원', tier: 'INDIV · 001' },
  { id: 'advanced', name: '정밀 바이오메카닉스',  dur: '90분',   price: '50–70만원', tier: 'INDIV · 002' },
  { id: 'team1',    name: '1회 측정 (10명+)',     dur: '2시간',  price: '21만원 / 인', tier: 'TEAM · 003' },
  { id: 'teamann',  name: '연간 단체 패키지',     dur: '연 12회', price: '15만원 / 인 / 회', tier: 'TEAM · 004' },
];
const SERVICES_LIST_EN = [
  { id: 'basic',    name: 'Basic Biomechanics',     dur: '40min',   price: '300,000 KRW', tier: 'INDIV · 001' },
  { id: 'advanced', name: 'Advanced Biomechanics',  dur: '90min',   price: '500–700,000 KRW', tier: 'INDIV · 002' },
  { id: 'team1',    name: 'Team measurement (10+)', dur: '2h',      price: '210,000 / athlete', tier: 'TEAM · 003' },
  { id: 'teamann',  name: 'Annual team package',    dur: '12×/yr',  price: '150,000 / session', tier: 'TEAM · 004' },
];

const SLOTS_KO = {
  morning: ['10:00', '11:00'],
  afternoon: ['13:00', '14:00', '15:00', '16:00'],
  evening: ['17:00', '18:00', '19:00'],
};

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

function Booking() {
  const T = window.useT();
  const locale = window.currentLocale();
  const today = new Date();
  const [cursor, setCursor] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [service, setService] = React.useState('basic');
  const [date, setDate] = React.useState(null);
  const [slot, setSlot] = React.useState(null);
  const [sent, setSent] = React.useState(false);

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
    if (d.getDay() === 0) return false; // closed Sundays
    return true;
  };
  const isSelected = (d) => d && date && d.toDateString() === date.toDateString();

  const submit = () => {
    if (!date || !slot) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const step1 = true;
  const step2 = !!service;
  const step3 = !!date && !!slot;

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
            </div>

            <div className="hp-book-slots">
              <div className="hp-book-slots-head mono">
                {T('book.slots')}
                {date && <span className="hp-book-selected-date">
                  · {date.toLocaleDateString(locale === 'en' ? 'en-US' : 'ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })}
                </span>}
              </div>

              {!date && <p className="hp-book-slots-empty">{locale === 'en' ? 'Select a date first.' : '먼저 날짜를 선택해주세요.'}</p>}

              {date && (
                <div className="hp-book-slot-groups">
                  {Object.entries(SLOTS_KO).map(([period, times]) => (
                    <div key={period} className="hp-book-slot-group">
                      <div className="hp-book-slot-period mono">{T(`book.${period}`)}</div>
                      <div className="hp-book-slot-row">
                        {times.map(t => (
                          <button
                            key={t}
                            className={`hp-book-slot ${slot === t ? 'on' : ''}`}
                            onClick={() => setSlot(t)}
                          >{t}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className="btn btn-primary btn-full hp-book-confirm"
              onClick={submit}
              disabled={!date || !slot}
            >
              {sent ? T('book.confirmed') : `${T('book.confirm')} →`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Booking = Booking;
