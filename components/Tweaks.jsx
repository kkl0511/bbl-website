// Tweaks.jsx — editable panel
function Tweaks({open, setOpen, settings, setSettings}) {
  if (!open) return null;
  const set = (k, v) => {
    const next = {...settings, [k]: v};
    setSettings(next);
    window.parent.postMessage({type:'__edit_mode_set_keys', edits:{[k]:v}}, '*');
  };
  const colors = [
    {k:'cobalt', v:'#2563EB', name:'Cobalt'},
    {k:'azure', v:'#0ea5e9', name:'Azure'},
    {k:'royal', v:'#1e40af', name:'Royal'},
    {k:'emerald', v:'#10b981', name:'Emerald'},
    {k:'crimson', v:'#dc2626', name:'Crimson'},
  ];
  const heroes = ['split','fullbleed','centered'];
  return (
    <div className="hp-tweaks">
      <div className="hp-tweaks-head">
        <span>TWEAKS</span>
        <button onClick={()=>setOpen(false)}>×</button>
      </div>
      <div className="hp-tweaks-body">
        <div className="hp-tw-row">
          <div className="hp-tw-k">Theme</div>
          <div className="hp-tw-btns">
            <button className={settings.theme==='dark'?'on':''} onClick={()=>set('theme','dark')}>Dark</button>
            <button className={settings.theme==='light'?'on':''} onClick={()=>set('theme','light')}>Light</button>
          </div>
        </div>
        <div className="hp-tw-row">
          <div className="hp-tw-k">Primary</div>
          <div className="hp-tw-swatches">
            {colors.map(c => (
              <button key={c.k} title={c.name} style={{background:c.v, outline: settings.primary===c.v?'2px solid #fff':'none'}} onClick={()=>set('primary', c.v)} />
            ))}
          </div>
        </div>
        <div className="hp-tw-row">
          <div className="hp-tw-k">Hero layout</div>
          <div className="hp-tw-btns">
            {heroes.map(h => <button key={h} className={settings.hero===h?'on':''} onClick={()=>set('hero',h)}>{h}</button>)}
          </div>
        </div>
        <div className="hp-tw-row">
          <div className="hp-tw-k">Type scale</div>
          <input type="range" min="0.85" max="1.2" step="0.05" value={settings.scale} onChange={e=>set('scale', Number(e.target.value))}/>
          <div className="hp-tw-v">{settings.scale.toFixed(2)}×</div>
        </div>
      </div>
    </div>
  );
}
window.Tweaks = Tweaks;
