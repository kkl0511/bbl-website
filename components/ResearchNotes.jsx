// ResearchNotes.jsx — editorial article list (dynamic from notes.json)
const NOTES_FALLBACK = [
  {
    n: '001',
    date: '2026.03.14',
    tag: 'KINEMATICS',
    titleKo: '분리각 35°의 문턱 — 골반과 몸통 사이에서 구속이 결정된다',
    titleEn: 'The 35° threshold — where pelvis and torso decide velocity',
    excerptKo: '국내 프로 30명 데이터 — 분리각 35°를 넘길 때 구속 평균 2.3mph 증가.',
    excerptEn: '30 KBO pitchers — separation past 35° correlates with +2.3mph avg.',
    readKo: 7,
    readEn: 6,
    img: 'hero-pitcher-analysis.jpg',
  },
];

function ResearchNotes() {
  const T = window.useT();
  const locale = window.currentLocale();
  const [notes, setNotes] = React.useState(NOTES_FALLBACK);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // Try to fetch notes.json (relative to index.html)
    fetch('notes.json', { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNotes(data);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <section id="research" className="hp-section hp-research" data-screen-label="06 Research">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('research.label')} <span className="dim">{String(notes.length).padStart(3, '0')}·R</span></div>
          <h2 className="hp-h2">
            {T('research.h2.1')}<br/>
            <em>{T('research.h2.2')}</em>
          </h2>
          <p className="hp-sec-lead">{T('research.lead')}</p>
        </header>

        <div className="hp-notes-list">
          {notes.map((note) => {
            const hasPdf = !!note.pdf;
            const content = (
              <>
                <div className="hp-note-meta">
                  <span className="hp-note-n">{note.n}</span>
                  <span className="hp-note-date mono">{note.date}</span>
                  <span className="hp-note-tag">{note.tag}</span>
                  {hasPdf && <span className="hp-note-pdf mono" aria-label="PDF available">PDF</span>}
                </div>
                <div className="hp-note-body">
                  <h3 className="hp-note-title">{locale === 'en' ? note.titleEn : note.titleKo}</h3>
                  <p className="hp-note-excerpt">{locale === 'en' ? note.excerptEn : note.excerptKo}</p>
                  <div className="hp-note-foot mono">
                    <span>{locale === 'en' ? note.readEn : note.readKo} {T('research.readtime')}</span>
                    <span className="arr">{hasPdf ? '↗' : '→'}</span>
                  </div>
                </div>
                <div className="hp-note-img">
                  {note.video ? (
                    <video
                      src={`assets/${note.video}`}
                      autoPlay muted loop playsInline preload="metadata"
                      aria-label=""
                    />
                  ) : note.img ? (
                    <img src={`assets/${note.img}`} alt="" onError={(e) => { e.target.style.opacity = '0.3'; }} />
                  ) : null}
                </div>
              </>
            );
            return hasPdf ? (
              <a
                key={note.n}
                href={`assets/${note.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hp-note hp-note-link"
              >
                {content}
              </a>
            ) : (
              <article key={note.n} className="hp-note">
                {content}
              </article>
            );
          })}
        </div>


        <div className="hp-notes-all">
          <a href="notes.html" className="btn btn-ghost">{T('research.viewall')} <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}
window.ResearchNotes = ResearchNotes;
