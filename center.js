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
    subtitle: 'PITCHING · 투구',
    title: '발의 움직임부터 공을 놓는 순간까지',
    description: '양발 지면반력 · 골반과 몸통의 회전 · 릴리스와 구속',
    video: 'assets/pitch-3d-ko-20261106.mp4',
    poster: 'assets/pitch-3d-ko-poster.jpg',
    caption: '투구 3D 시각화 예시 · 동작 구간에 맞춰 관찰',
    stages: ['준비', '뒷발 밀기', '앞발 착지', '몸통 회전', '릴리스', '감속'],
    triage: [
      { badge: '유지할 강점', stage: '관찰', text: '반복해서 나타나는 강점과 그때의 공 결과 확인' },
      { badge: '집중할 과제', stage: '훈련', text: '앞발 착지와 몸통 회전 등 확인한 근거로 드릴 선택' },
      { badge: '다시 확인', stage: '비교', text: '같은 조건에서 목표 동작·공 결과·기존 강점 비교' },
    ],
  },
  batting: {
    subtitle: 'BATTING · 타격',
    title: '하체 움직임부터 배트와 공이 만나는 순간까지',
    description: '양발 지면반력 · 몸통 회전과 배트 궤적 · 임팩트와 타구',
    video: 'assets/swing-3d-ko-20261106.mp4',
    poster: 'assets/swing-3d-ko-poster.jpg',
    caption: '타격 3D 시각화 예시 · 동작 구간에 맞춰 관찰',
    stages: ['준비', '뒷발 밀기', '앞발 착지', '몸통·배트 회전', '임팩트'],
    triage: [
      { badge: '유지할 강점', stage: '관찰', text: '좋은 타구에서 반복되는 스윙 특성 확인' },
      { badge: '집중할 과제', stage: '훈련', text: '착지부터 임팩트까지 확인한 근거로 드릴 선택' },
      { badge: '다시 확인', stage: '비교', text: '같은 조건에서 목표 동작·타구 결과·기존 강점 비교' },
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
    <figure class="analysis-stage">
      <div class="stage-head">
        <span>BIOMOTION BASEBALL / ${data.subtitle}</span>
      </div>
      <div class="stage-viewport"><video id="analysis-video" src="${data.video}" ${data.poster ? `poster="${data.poster}"` : ''} muted loop playsinline preload="metadata" aria-label="${key === 'pitching' ? '투구' : '타격'} 3차원 동작 시각화 예시"></video><span class="stage-media-label">3D 동작·지면반력</span><button class="video-control stage-play" aria-label="분석 예시 영상 재생"><span class="pause-icon" aria-hidden="true"></span><span class="control-label">재생</span></button></div>
      <div class="stage-events stage-events-${data.stages.length}">${data.stages.map(st => `<div><span>${st}</span></div>`).join('')}</div>
      <figcaption class="stage-caption">${data.caption}</figcaption>
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
  </div>`;
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

// Closing a profile also stops its media; reopening never starts it automatically.
document.querySelectorAll('.profile-disclosure').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) detail.querySelectorAll('video').forEach(video => video.pause());
  });
});
