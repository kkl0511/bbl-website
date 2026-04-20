// Report.jsx — 2-channel delivery (i18n)
function Report() {
  const T = window.useT();
  return (
    <section id="report" className="hp-section hp-report" data-screen-label="05 Report">
      <div className="hp-container">
        <header className="hp-sec-head">
          <div className="hp-sec-label"><span>/</span>{T('report.label')} <span className="dim">004</span></div>
          <h2 className="hp-h2">
            {T('report.h2.1')}<br/>
            <em>{T('report.h2.2')}</em>
          </h2>
        </header>

        <div className="hp-delivery-grid">
          <article className="hp-delivery-card">
            <div className="hp-delivery-tag">{T('report.ch1.tag')}</div>
            <h3 className="hp-delivery-title">{T('report.ch1.title')}</h3>
            <p className="hp-delivery-desc">{T('report.ch1.desc')}</p>
            <div className="hp-delivery-visual">
              <img src="assets/team-feedback-session.jpg" alt="team same-day feedback briefing" />
              <span className="hp-delivery-stamp">LIVE · ON-FIELD</span>
            </div>
          </article>

          <article className="hp-delivery-card">
            <div className="hp-delivery-tag">{T('report.ch2.tag')}</div>
            <h3 className="hp-delivery-title">{T('report.ch2.title')}</h3>
            <p className="hp-delivery-desc">{T('report.ch2.desc')}</p>
            <div className="hp-delivery-stack">
              <div className="hp-delivery-doc a">
                <img src="assets/report-pitching-sample.jpg" alt="pitching report" />
                <div className="hp-delivery-doc-tag">PITCHING</div>
              </div>
              <div className="hp-delivery-doc b">
                <img src="assets/report-hitting-sample.jpg" alt="hitting report" />
                <div className="hp-delivery-doc-tag">HITTING</div>
              </div>
              <div className="hp-delivery-doc c">
                <img src="assets/analysis-software.jpg" alt="analysis hub" />
                <div className="hp-delivery-doc-tag">HUB APP</div>
              </div>
            </div>
          </article>
        </div>

        <p className="hp-delivery-note">{T('report.note')}</p>
      </div>
    </section>
  );
}
window.Report = Report;
