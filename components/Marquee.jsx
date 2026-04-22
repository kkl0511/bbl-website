// Marquee.jsx — kinematic sequence scrolling kinetic type
function Marquee() {
  const items = ['KINEMATIC SEQUENCE', '운동사슬', 'GROUND REACTION FORCE', '키네마틱 시퀀스', 'JOINT TORQUE', '관절 토크', 'POWER TRANSFER', '에너지 전달', 'QUALISYS · THEIA3D · VALD'];
  return (
    <div className="hp-marquee" aria-hidden="true">
      <div className="hp-marquee-track">
        {[...items, ...items].map((s,i) => <span key={i}>{s} <i>✦</i></span>)}
      </div>
    </div>
  );
}
window.Marquee = Marquee;
