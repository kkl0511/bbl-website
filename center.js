'use strict';

// Helper to bind consultation links dynamically
function bindConsultLinks(root = document) {
  const select = document.querySelector('#consult-sport');
  if (!select) return;
  root.querySelectorAll('[data-consult]').forEach(link => {
    if (link.dataset.boundConsult === '1') return;
    link.dataset.boundConsult = '1';
    link.addEventListener('click', () => {
      const targetVal = link.dataset.consult;
      const exists = Array.from(select.options).some(opt => opt.value === targetVal || opt.textContent === targetVal);
      if (!exists && targetVal) {
        const opt = document.createElement('option');
        opt.value = targetVal;
        opt.textContent = targetVal;
        select.appendChild(opt);
      }
      select.value = targetVal;
      updateMail();
    });
  });
}

// 1. Consumer-Focused Programs & Services (#services) — Bullet-Point Style (개조식)
const individualPrograms = [
  {
    label: 'ASSESSMENT', badge: '투구 또는 타격', scope: '레슨 등록 없이 1회 가능',
    name: '개인 분석 + 피드백', description: '현재 동작을 기록하고 훈련 과제를 찾는 과정',
    items: ['3D 동작·양발 지면반력·트래킹', '유지할 강점과 우선 과제', '개인 온라인 리포트'],
    consultValue: '개인 정밀 분석 + 피드백 (1회 단독 가능)', cta: '개인 분석 상담',
  },
  {
    label: 'COACHING', badge: '1:1 레슨', scope: '분석 결과에 따른 과제',
    name: '분석 기반 레슨', description: '측정에서 찾은 과제를 훈련에 적용하는 과정',
    items: ['선수에게 맞는 동작 큐와 드릴', '목표 동작을 영상으로 점검', '재측정 연계 상담'],
    consultValue: '투구·타격 1:1 레슨 문의', cta: '레슨 상담',
  },
  {
    label: 'YOUTH', badge: '유소년·학부모', scope: '연령과 목표에 맞춤',
    name: '유소년 프로그램 상담', description: '선수의 경험과 훈련 목표에 맞는 과정 안내',
    items: ['투구·타격 기본 동작', '학부모에게 결과와 훈련 방향 설명'],
    consultValue: '유소년 프로그램 문의', cta: '유소년 상담',
  },
];

const battingPackages = [
  {
    name: '측정 + 피드백', label: 'ASSESSMENT', stepBadge: '티배팅 기준', scopeBadge: '온라인 리포트',
    consultValue: '타격 패키지 — STEP 1 측정 + 피드백',
    description: '3D 스윙과 타구를 함께 확인', extras: [],
  },
  {
    name: '측정 + 피드백 + 레슨', label: 'ASSESSMENT & LESSON', stepBadge: '레슨 60분', scopeBadge: '측정 결과 기반',
    consultValue: '타격 패키지 — STEP 2 측정 + 피드백 + 레슨(60분)',
    description: '01 구성 전체 포함', extras: ['분석 기반 타격 레슨 60분'],
  },
  {
    name: '레슨 + 재측정', label: 'LESSON & RECHECK', stepBadge: '레슨 후 재측정', scopeBadge: '동일 조건 비교',
    consultValue: '타격 패키지 — STEP 3 측정 + 피드백 + 레슨 + 재측정',
    description: '02 구성 전체 포함', extras: ['레슨 후 3D 스윙 재측정'],
  },
];
const baseBattingItems = ['3D 스윙 분석과 공·배트 트래킹', '피지컬 측정 1회', '결과 피드백과 온라인 리포트'];

const individualContainer = document.querySelector('#individual-pricing-content');
if (individualContainer) {
  individualContainer.innerHTML = `<div class="price-grid">${individualPrograms.map((p, i) => `
    <article class="price-card">
      <div class="price-card-main">
        <div class="package-label"><span>${p.label}</span><span class="mono">0${i + 1}</span></div>
        <h3>${p.name}</h3>
        <p class="package-desc">${p.description}</p>
        <div class="price"><strong>${p.badge}</strong><span>${p.scope}</span><small>BIOMOTION BASEBALL</small></div>
        <ul>${p.items.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
      <a href="#contact" class="price-link" data-consult="${p.consultValue}">${p.cta} <span aria-hidden="true">↗</span></a>
    </article>`).join('')}</div>`;
}

const priceCards = document.querySelector('#price-cards');
if (priceCards) {
  priceCards.innerHTML = battingPackages.map((p, i) => `
    <article class="price-card">
      <div class="price-card-main">
        <div class="package-label"><span>${p.label}</span><span class="mono">0${i + 1}</span></div>
        <h3>${p.name}</h3><p class="package-desc">${p.description}</p>
        <div class="price"><strong>${p.stepBadge}</strong><span>${p.scopeBadge}</span><small>BATTING PACKAGE</small></div>
        <ul>${(i === 0 ? baseBattingItems : []).map(item => `<li>${item}</li>`).join('')}${p.extras.map((item, j) => `<li class="extra${j === 0 ? ' extra-first' : ''}">${item}</li>`).join('')}</ul>
      </div>
      <a href="#contact" class="price-link" data-consult="${p.consultValue}" aria-label="${p.name} 상담 안내">이 구성으로 상담하기 <span aria-hidden="true">↗</span></a>
    </article>`).join('');
}

const teamContainer = document.querySelector('#team-pricing-content');
teamContainer.innerHTML = `
  <article class="pricing-detail-card">
    <div class="pricing-detail-head">
      <div><span class="mini-label">TEAM ASSESSMENT</span><h3>학교·구단 단체 측정</h3></div>
    </div>
    <ul class="pricing-rate-list">
      <li><div><strong>투구·타격 측정</strong><span>종목·인원·일정에 맞춰 측정 범위 협의</span></div></li>
      <li><div><strong>선수 리포트와 코칭진 브리핑</strong><span>선수별 우선 과제와 팀 훈련 연계 논의</span></div></li>
    </ul>
    <a href="#contact" class="price-link" data-consult="학교·구단 단체 측정 문의">단체 측정 상담 <span aria-hidden="true">↗</span></a>
  </article>`;

function showPricingTab(key) {
  const keys = ['individual', 'batting', 'team'];
  keys.forEach(k => {
    const btn = document.querySelector(`#ptab-${k}`);
    const panel = document.querySelector(`#pricing-panel-${k}`);
    const selected = k === key;
    if (btn) {
      btn.setAttribute('aria-selected', String(selected));
      btn.tabIndex = selected ? 0 : -1;
    }
    if (panel) {
      panel.hidden = !selected;
    }
  });
}

document.querySelectorAll('[data-pricing-tab]').forEach(btn => {
  btn.addEventListener('click', () => showPricingTab(btn.dataset.pricingTab));
  btn.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const keys = ['individual', 'batting', 'team'];
    const idx = keys.indexOf(btn.dataset.pricingTab);
    const nextIdx = e.key === 'Home' ? 0 : e.key === 'End' ? keys.length - 1 : e.key === 'ArrowRight' ? (idx + 1) % keys.length : (idx - 1 + keys.length) % keys.length;
    const nextKey = keys[nextIdx];
    showPricingTab(nextKey);
    document.querySelector(`#ptab-${nextKey}`).focus();
  });
});

// 2. Consumer-Focused 3D Biomechanics Workbench (#analysis-panel) — Bullet-Point Style (개조식)
const sports = {
  pitching: {
    subtitle: 'PITCHING · 투구 키네틱 체인',
    title: '밀어낸 힘, 버틴 힘, 팔로 이어지는 타이밍',
    description: '선수의 투구 유형과 강점을 바탕으로, 같은 투구 안의 뒷발 추진·앞발 제동·골반·몸통·팔과 공 결과의 연결을 확인합니다.',
    video: 'assets/pitch-3d-ko-20261106.mp4',
    poster: 'assets/pitch-3d-ko-poster.jpg',
    motionImage: 'assets/pitching-motion-anonymous-20261107.png',
    curvesImage: 'assets/pitching-curves-anonymous-20261107.png',
    caption: '코치 교육랩의 익명 실측 예시 · 앞발 착지 +100 ms의 동작과 파워·에너지 곡선',
    scope: '3D 좌표·양발 지면반력은 측정 기반, 관절 토크·파워·에너지는 모델 추정입니다. 동작과 공 결과를 함께 읽으며, 화면의 수치를 개인의 정상 기준으로 사용하지 않습니다.',
    stages: [
      {title: '뒷다리 드라이브', body: '뒷발 지면반력의 방향과 추진 시점, 골반 전진의 연결을 확인합니다.'},
      {title: '앞발 착지·블로킹', body: '앞발의 제동 충격량과 앞 고관절이 지지하는 시점을 함께 봅니다.'},
      {title: '골반 → 몸통 회전', body: '양발의 지면 토크와 골반·몸통 회전이 이어지는 시점 및 파워를 읽습니다.'},
      {title: '몸통 → 팔·회전관성', body: '몸통–위팔 경계 파워와 팔의 회전반경, 어깨·팔꿈치 토크를 함께 확인합니다.'},
      {title: '릴리스·구질 연결', body: '손까지 이어지는 에너지와 릴리스 동작을 기록된 구속·공 결과와 대조합니다.'},
    ],
    triage: [
      { badge: '01 에너지 흐름·관절 토크 분석', stage: '근거', text: '양발 지면반력과 경계 파워를 같은 투구 시점에 맞춰, 에너지가 전달·흡수되는 구간과 관절 부하를 확인합니다.' },
      { badge: '02 강점 KEEP + 우선 과제 1~2개', stage: '코칭', text: '체력·메카닉 근거를 함께 읽고, 센터 내 트레이닝과 큐·드릴을 1:1 코칭에서 시험합니다. 잘되는 움직임과 공 결과도 함께 지킵니다.' },
      { badge: '03 같은 조건 재측정', stage: '확인', text: '목표 동작·에너지 전달·구속과 구질, 기존 강점 유지 여부를 비교해 큐를 유지·수정합니다. 제구는 목표·도착점 자료가 있을 때 별도로 평가합니다.' },
    ],
  },
  batting: {
    subtitle: 'BATTING · 타격 키네틱 체인',
    title: '지면의 지지부터 배트 가속까지, 연결을 읽습니다',
    description: '선수의 스윙 유형과 리듬을 바탕으로, 하체·골반의 움직임이 몸통·양팔·배트로 이어지는 순서와 타구 결과를 함께 봅니다.',
    video: 'assets/swing-3d-ko-20261106.mp4',
    poster: 'assets/swing-3d-ko-poster.jpg',
    motionImage: 'assets/batting-motion-anonymous-20261107.png',
    curvesImage: 'assets/batting-curves-anonymous-20261107.png',
    caption: '코치 교육랩의 익명 티배팅 실측 예시 · 기록 임팩트 −60 ms의 동작과 파워·에너지 곡선',
    scope: '3D 좌표·힘판은 실측, 파워·에너지는 모델 추정입니다. 예시의 파워 곡선은 임팩트 전 유효 구간이며, 충돌 순간의 에너지나 손별 배트 기여를 확정한 값이 아닙니다.',
    stages: [
      {title: '지면·양발 토크', body: '뒷발 로딩과 앞발 제동이 만드는 지면반력, 힘의 작용선과 회전 토크를 봅니다.'},
      {title: '하지 → 골반 전달', body: '양다리의 지지·추진과 골반 회전 파워가 이어지는 타이밍을 확인합니다.'},
      {title: '골반 ↔ 몸통 연결', body: '분리각과 몸통 운동에너지의 저장·변화, 골반 유출·몸통 유입 파워를 함께 읽습니다.'},
      {title: '몸통 → 양팔·손목', body: '양 어깨·팔꿈치와 전완 쪽 손목 경계에서 파워가 드나드는 흐름을 살핍니다.'},
      {title: '양손 → 배트·임팩트', body: '양손–배트 경계와 임팩트 직전의 배트 에너지를 기록된 타구속도·발사각과 비교합니다.'},
    ],
    triage: [
      { badge: '01 스윙 에너지 흐름·관절 토크 분석', stage: '근거', text: '지면 토크·관절 파워·배트 에너지를 같은 시점에 놓고, 어느 연결 구간에서 타이밍과 부하를 살펴야 하는지 정합니다.' },
      { badge: '02 강점 KEEP + 맞춤 큐·드릴', stage: '코칭', text: '좋은 타구를 만든 리듬을 살리고 우선 과제 1~2개에 집중합니다. 체력 트레이닝과 스윙 큐·드릴을 센터 안에서 적용해 반응을 확인합니다.' },
      { badge: '03 레슨 전후 같은 조건 재측정', stage: '확인', text: '골반·몸통·배트의 파워 시점과 목표 동작, 타구속도·방향 및 기존 강점을 비교해 훈련을 유지·수정합니다.' },
    ],
  },
};

const heroMediaModes = {
  official: {
    video: 'assets/baseball-center-hero-desktop-20261106.mp4',
    poster: 'assets/baseball-center-hero-desktop-poster-20261106.jpg',
    mobileVideo: 'assets/baseball-center-hero-mobile-20261106.mp4',
    mobilePoster: 'assets/baseball-center-hero-mobile-poster-20261106.jpg',
    label: '바이오모션 베이스볼 센터 소개',
    aria: '바이오모션 베이스볼 센터 소개',
    coord: '분석·자문·코칭진', contain: true,
    designPreview: true,
    // Start times in the 24-second homepage video, in reverse playback order.
    scenes: [
      { start: 18.8, title: '하남 감일센터', detail: '마운드·타석·체력 측정 공간' },
      { start: 14.4, title: '3D 타격 분석', detail: '배트 궤적과 공이 맞는 순간' },
      { start: 9.2, title: '조성훈 코치', detail: '지면반력 마운드에서 투구 측정' },
      { start: 6.6, title: '방송·언론 소개 사례 · 정튼튼', detail: 'KBS·문화일보 소개 · 화면은 연구실 시연' },
      { start: 4.6, title: '이기광 교수', detail: '국민대 연구실의 3D 동작 분석' },
      { start: 0, title: '3D 투구 분석', detail: '투구 동작과 양발 지면반력' },
    ],
  },
  tour: {
    video: 'assets/facility-tour-ko-20261106.mp4',
    poster: 'assets/facility-interior-wide.jpg',
    label: '하남 감일센터 3D 투어', aria: '하남 감일센터 3D 조감도 투어',
    coord: 'GAMIL CENTER', contain: false,
    designPreview: true,
    title: '감일센터 공간 투어', detail: '지상 2층 · 자연광과 높은 층고',
  },
  pitching: {
    video: 'assets/pitch-3d-ko-20261106.mp4',
    poster: 'assets/pitch-3d-ko-poster.jpg',
    label: '3D 투구 시각화', aria: '투구 동작 3D 시각화 예시',
    coord: 'PITCHING 3D', contain: true,
    title: '3D 투구 시각화', detail: '발에서 릴리스까지 구간별 관찰',
  },
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const userPaused = new WeakSet();
const videoButtons = new WeakMap();
const videoObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting && !userPaused.has(video) && !reducedMotion.matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, { threshold: 0.2 }) : null;

function refreshVideoButton(video) {
  const button = videoButtons.get(video);
  if (!button) return;
  const paused = video.paused;
  button.classList.toggle('is-paused', paused);
  button.setAttribute('aria-label', (video.dataset.videoLabel || '분석 예시 영상') + (paused ? ' 재생' : ' 일시정지'));
  button.querySelector('.control-label').textContent = paused ? '재생' : '일시정지';
}

function registerVideo(video, button) {
  if (!video || !button) return;
  videoButtons.set(video, button);
  video.addEventListener('play', () => refreshVideoButton(video));
  video.addEventListener('pause', () => refreshVideoButton(video));
  button.addEventListener('click', () => {
    if (video.paused) {
      userPaused.delete(video);
      video.play().catch(() => {});
    } else {
      userPaused.add(video);
      video.pause();
    }
  });
  if (reducedMotion.matches) {
    userPaused.add(video);
    video.pause();
  }
  refreshVideoButton(video);
  if (videoObserver) videoObserver.observe(video);
}

function showSport(key) {
  const data = sports[key];
  document.querySelectorAll('[data-sport]').forEach(button => {
    const selected = button.dataset.sport === key;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  const panel = document.querySelector('#analysis-panel');
  const previousVideo = panel.querySelector('video');
  if (previousVideo) {
    if (videoObserver) videoObserver.unobserve(previousVideo);
    previousVideo.pause();
  }
  panel.setAttribute('aria-labelledby', `tab-${key}`);
  panel.innerHTML = `<div class="analysis-grid">
    <figure class="analysis-stage real-report-preview">
      <div class="stage-head">
        <span>BIOMOTION BASEBALL / ${data.subtitle}</span>
      </div>
      <div class="preview-screens">
        <a href="${data.motionImage}" target="_blank" rel="noopener noreferrer"><img src="${data.motionImage}" alt="${key === 'pitching' ? '투구' : '타격'} 익명 실측 3D 스틱과 양발 지면반력 작용선" loading="lazy" width="760" height="${key === 'pitching' ? 900 : 962}"><span>3D·양발 지면반력 확대 ↗</span></a>
        <a href="${data.curvesImage}" target="_blank" rel="noopener noreferrer"><img src="${data.curvesImage}" alt="같은 시점의 ${key === 'pitching' ? '몸통–위팔' : '골반–몸통'} 경계 파워와 분절 운동에너지 곡선" loading="lazy" width="760" height="${key === 'pitching' ? 1264 : 1008}"><span>파워·에너지 곡선 확대 ↗</span></a>
      </div>
      <figcaption class="stage-caption">${data.caption}<small>리포트 구성은 측정 항목에 따라 달라집니다.</small><a href="${data.video}" target="_blank" rel="noopener noreferrer">3D 동작 시각화 영상 보기 ↗</a></figcaption>
    </figure>
    <div class="analysis-copy">
      <span class="mini-label">${data.subtitle}</span>
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <div class="triage-list">
        ${data.triage.map((t, idx) => `
          <article class="triage-item ${idx === 0 ? 'triage-keep' : idx === 1 ? 'triage-focus' : 'triage-recheck'}">
            <div class="triage-tag"><span class="triage-dot"></span><strong>${t.badge}</strong><span class="mono">${t.stage}</span></div>
            <p>${t.text}</p>
          </article>
        `).join('')}
      </div>
      <div class="analysis-cta-row">
        <a href="#contact" class="button" data-consult="${key === 'pitching' ? '투구 1회 정밀 분석 + 피드백 (단독 신청)' : '타격 패키지 — STEP 1 측정 + 피드백'}">${key === 'pitching' ? '투구 정밀 분석 상담' : '타격 정밀 분석 상담'} <span aria-hidden="true">↗</span></a>
        <a href="#services" class="text-link">전체 프로그램 보기 <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
  <div class="energy-chain-heading"><h3>함께 확인하는 5개 연결 구간</h3><span>동작 → 힘·파워 → 공·타구 결과</span></div>
  <ol class="energy-chain">${data.stages.map((st,i) => `<li><span class="mono">0${i+1}</span><h4>${st.title}</h4><p>${st.body}</p></li>`).join('')}</ol>
  <p class="analysis-scope-note">${data.scope}</p>`;
  const stageVideo = panel.querySelector('video');
  registerVideo(stageVideo, panel.querySelector('.video-control'));
  bindConsultLinks(panel);
}

document.querySelectorAll('[data-sport]').forEach(button => {
  button.addEventListener('click', () => showSport(button.dataset.sport));
  button.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const key = e.key === 'Home' ? 'pitching' : e.key === 'End' ? 'batting' : button.dataset.sport === 'pitching' ? 'batting' : 'pitching';
    showSport(key);
    document.querySelector(`#tab-${key}`).focus();
  });
});

const heroVideoEl = document.querySelector('#hero-video');
const heroMediaStage = document.querySelector('#hero-media-stage');
const heroSceneTitle = document.querySelector('#hero-scene-title');
const heroSceneDetail = document.querySelector('#hero-scene-detail');
const heroDesignNote = document.querySelector('#hero-design-note');
const mobileHero = window.matchMedia('(max-width: 680px)');
let activeHeroMode = heroMediaModes.official;

function setHeroVideoSource(data) {
  const useMobile = mobileHero.matches && data.mobileVideo;
  heroVideoEl.src = useMobile ? data.mobileVideo : data.video;
  heroVideoEl.poster = useMobile ? data.mobilePoster : data.poster;
}

if (mobileHero.matches) setHeroVideoSource(activeHeroMode);
registerVideo(heroVideoEl, document.querySelector('#hero-video-control'));

function refreshHeroScene(time = heroVideoEl.currentTime) {
  const scene = activeHeroMode.scenes?.find(({ start }) => time >= start);
  const title = scene?.title ?? activeHeroMode.title;
  const detail = scene?.detail ?? activeHeroMode.detail;
  if (heroSceneTitle.textContent !== title) heroSceneTitle.textContent = title;
  if (heroSceneDetail.textContent !== detail) heroSceneDetail.textContent = detail;
}

for (const event of ['timeupdate', 'seeked', 'loadedmetadata']) {
  heroVideoEl.addEventListener(event, () => refreshHeroScene());
}

function showHeroSport(key) {
  const video = heroVideoEl;
  const data = heroMediaModes[key] || heroMediaModes.official;
  video.pause();
  activeHeroMode = data;
  video.muted = true;
  setHeroVideoSource(data);
  video.dataset.videoLabel = data.label;
  video.setAttribute('aria-label', data.aria);
  if (heroMediaStage) {
    heroMediaStage.classList.toggle('is-contain', Boolean(data.contain));
    heroMediaStage.dataset.heroMode = key;
  }
  video.load();
  heroDesignNote.hidden = !data.designPreview;
  refreshHeroScene(0);
  document.querySelector('#hero-sport-label').textContent = data.coord;
  document.querySelectorAll('[data-hero-sport]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.heroSport === key)));
  refreshVideoButton(video);
  if (!userPaused.has(video) && !reducedMotion.matches) video.play().catch(() => {});
}

mobileHero.addEventListener('change', () => {
  if (!activeHeroMode.mobileVideo) return;
  const video = heroVideoEl;
  const time = video.currentTime;
  const wasPlaying = !video.paused;
  setHeroVideoSource(activeHeroMode);
  const source = video.src;
  video.addEventListener('loadedmetadata', () => {
    if (video.src !== source) return;
    video.currentTime = time;
    if (wasPlaying && !userPaused.has(video)) video.play().catch(() => {});
  }, { once: true });
  video.load();
});

document.querySelectorAll('[data-hero-sport]').forEach(button => button.addEventListener('click', () => showHeroSport(button.dataset.heroSport)));
showSport('pitching');

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    document.querySelectorAll('video').forEach(video => {
      userPaused.add(video);
      video.pause();
    });
  }
});

// 3. Consumer FAQ — Bullet-Point Style (개조식)
const faqs = [
  ['처음 방문할 때 무엇을 알려드리면 되나요?', '선수 구분과 포지션, 투구·타격 중 희망 분석, 현재 고민과 희망 방문 시기를 알려주세요. 종목과 목표에 맞춰 측정 범위와 준비사항을 안내합니다.'],
  ['측정 결과는 어떤 자료로 받나요?', '개인 온라인 리포트와 결과 피드백을 제공합니다. 확인된 강점과 우선 과제, 훈련에서 점검할 내용을 설명합니다. 제공 항목과 안내 일정은 프로그램 상담 시 확인합니다.'],
  ['분석만 한 번 받을 수 있나요?', '레슨 등록 없이 1회 신청 가능 · 결과 피드백과 리포트 제공'],
  ['학부모도 결과를 들을 수 있나요?', '선수와 함께 결과 설명 가능 · 연령과 종목에 따른 측정 항목 사전 안내'],
  ['레슨 전후에 무엇을 비교하나요?', '같은 조건에서 목표 동작과 구속·타구 결과, 기존 강점 비교'],
  ['시간과 비용은 어떻게 알 수 있나요?', '종목과 프로그램을 선택해 문의 · 가능 일정과 비용 개별 안내'],
];

const faqList = document.querySelector('#faq-list');
if (faqList) {
  faqList.innerHTML = faqs.map(([question, answer]) => `<details class="faq"><summary><span>${question}</span><span aria-hidden="true">+</span></summary><p style="white-space:pre-line">${answer}</p></details>`).join('');
}

// 4. Navigation & Mobile Menu
const menu = document.querySelector('.menu');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
}
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true')));
document.querySelectorAll('#navigation a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width:681px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

// 5. Consultation Mail Link
const select = document.querySelector('#consult-sport');
function updateMail() {
  const subject = '[바이오모션 베이스볼 상담] ' + select.value;
  const body = '관심 프로그램: ' + select.value + '\n선수 구분 (프로·독립리그 / 대학·고교·중학 / 유소년·학부모):\n소속 / 포지션:\n해결 희망 과제 (구속·제구·타구 속도 등):\n희망 방문 시기:\n';
  document.querySelector('#email-link').href = `mailto:happygh@kookmin.ac.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
select.addEventListener('change', updateMail);
bindConsultLinks(document);
updateMail();

// 6. Scroll Progress & Active Section Highlight
const progress = document.querySelector('#page-progress');
let scrollPending = false;
function updateProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (height > 0 ? Math.max(0, Math.min(100, window.scrollY / height * 100)) : 0) + '%';
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = entry.target.id;
      document.querySelectorAll('#navigation a').forEach(link => {
        if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main>section').forEach(section => sectionObserver.observe(section));
}

// Broadcast chapters play only after the visitor selects a scene.
document.querySelectorAll('[data-kbs-seek]').forEach(button => {
  button.addEventListener('click', () => {
    const video = document.querySelector('#jeong-kbs-video');
    if (!video) return;
    const start = Number(button.dataset.kbsSeek);
    video.currentTime = start;
    video.play().catch(() => {});
  });
});

// Verbatim broadcast captions are distinguished from scene descriptions.
const kbsCaptionCues = [
  [0, 4.5, '장면 안내', '이기광 교수와 고려대 야구부의 측정·분석 지원 현장'],
  [4.5, 10, '장면 안내', '장비를 설치하고 투구 동작과 공의 결과를 기록합니다.'],
  [10, 14.5, '장면 안내', '고려대 선수의 실제 투구 측정 장면입니다.'],
  [14.5, 24.7, '장면 안내', '이기광 교수와 고려대 코치진이 현장에서 투구를 함께 살펴봅니다.'],
  [24.7, 29.2, '방송 자막 · 이기광 교수', '바이오 메카닉스의 가장 큰 목적이 경기력 향상이거든요'],
  [29.2, 32.2, '방송 자막 · 이기광 교수', '투수한테 경기력 향상은 구속 향상이고요'],
  [32.2, 33.2, '방송 자막 · 이기광 교수', '그게 뚜렷한 목적이거든요'],
  [33.2, 35.8, '방송 자막 · 이기광 교수', '그 목적을 향해 가기 위해서'],
  [35.8, 40.5, '방송 자막 · 이기광 교수', '선수가 발휘하는 힘이 공을 던지는 곳까지 얼마나 잘 전달되는지'],
  [40.5, 43.1, '방송 자막 · 이기광 교수', '효율성을 따지거든요'],
  [43.1, 46.7, '방송 자막 · 이기광 교수', '비효율적인 요소를 바이오 메카닉스를 통해서 알아낸 다음'],
  [46.7, 51.8, '방송 자막 · 이기광 교수', '효율을 높이기 위해서 계속 자세 수정 작업을 하는 거죠'],
  [51.8, 59, '장면 안내', '여러 투구를 측정하고 동작을 확인하는 현장입니다.'],
  [59, 64, '장면 안내', '코치진과 연구진이 측정 결과를 화면으로 함께 확인합니다.'],
  [64, 69, '장면 안내', 'KBS의 바이오메카닉스 설명 화면입니다. 3D 예시 출처: NC 다이노스.'],
  [69, 69.8, '장면 안내', '이기광 교수가 정튼튼 선수 사례를 소개합니다.'],
  [69.8, 74, '방송 자막 · 이기광 교수', '몇 명 의뢰한 선수들에게 효과가 나타났는데 대표적인 선수가'],
  [74, 78.5, '방송 자막 · 이기광 교수', '작년에 여기 고려대 선수였던 정튼튼 선수입니다'],
  [78.5, 95.3, '장면 안내', '정튼튼 선수의 고려대 시절 투구 장면입니다.'],
  [95.3, 101.3, '장면 안내', '방송에서 소개한 정튼튼 선수의 프로 지명 장면입니다.'],
];
const kbsVideo = document.querySelector('#jeong-kbs-video');
if (kbsVideo) {
  const caption = document.querySelector('#kbs-large-caption');
  const kind = document.querySelector('#kbs-caption-kind');
  const updateCaption = () => {
    const cue = kbsCaptionCues.find(c => kbsVideo.currentTime >= c[0] && kbsVideo.currentTime < c[1]) || kbsCaptionCues[0];
    caption.textContent = cue[3];
    kind.textContent = cue[2];
  };
  ['timeupdate', 'seeked', 'loadedmetadata', 'ended'].forEach(event => kbsVideo.addEventListener(event, updateCaption));
  let captionTrack;
  if ('VTTCue' in window) {
    captionTrack = kbsVideo.addTextTrack('captions', '방송 자막·장면 안내', 'ko');
    kbsCaptionCues.forEach(c => captionTrack.addCue(new VTTCue(c[0], c[1], `[${c[2]}] ${c[3]}`)));
    captionTrack.mode = 'hidden';
    document.addEventListener('fullscreenchange', () => { captionTrack.mode = document.fullscreenElement === kbsVideo ? 'showing' : 'hidden'; });
    kbsVideo.addEventListener('webkitbeginfullscreen', () => { captionTrack.mode = 'showing'; });
    kbsVideo.addEventListener('webkitendfullscreen', () => { captionTrack.mode = 'hidden'; });
  }
  const fullscreen = document.querySelector('#kbs-fullscreen');
  fullscreen.hidden = !document.fullscreenEnabled && !kbsVideo.webkitEnterFullscreen;
  fullscreen.addEventListener('click', () => {
    if (kbsVideo.requestFullscreen) kbsVideo.requestFullscreen().catch(() => {});
    else if (kbsVideo.webkitEnterFullscreen) kbsVideo.webkitEnterFullscreen();
  });
  updateCaption();
}

// Closing a profile also stops its media; reopening never starts it automatically.
document.querySelectorAll('.profile-disclosure').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) detail.querySelectorAll('video').forEach(video => video.pause());
  });
});
