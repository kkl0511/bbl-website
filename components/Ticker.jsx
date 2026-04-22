// Ticker.jsx — infinite scrolling marquee of equipment brands
function Ticker() {
  const items = [
    'QUALISYS · 3D MOCAP · 240Hz',
    'THEIA3D · MARKERLESS',
    'VALD FORCEDECKS · 1000Hz',
    'RAPSODO · BALL TRACKING',
    'SMARTSPEED · AGILITY',
    'UPLIFT LABS · MARKERLESS',
    'IMTP · ISOMETRIC MIDTHIGH PULL',
    'KOOKMIN UNIV. · BIOMECHANICS LAB',
  ];
  const loop = [...items, ...items];
  return (
    <div className="hp-ticker" aria-hidden>
      <div className="hp-ticker-track">
        {loop.map((t,i) => (
          <span className="hp-ticker-item" key={i}>
            <span className="hp-ticker-star">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
window.Ticker = Ticker;
