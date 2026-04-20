// i18n.js — translation dictionary + runtime helper
// Usage: window.T('key') returns current locale string. Use window.setLocale('en') to switch.

(function () {
  const DICT = {
    ko: {
      // NAV
      'nav.01': '랩 소개',
      'nav.02': '분석 시스템',
      'nav.03': '분석 서비스',
      'nav.04': '리포트',
      'nav.05': '연구 노트',
      'nav.06': '후기',
      'nav.07': '예약',
      'nav.08': 'Q&A',
      'nav.cta': '상담 신청',

      // HERO
      'hero.tag': 'BBL · BIOMOTION BASEBALL LAB',
      'hero.coord': 'KOOKMIN UNIV. · BIOMECHANICS LAB',
      'hero.h1.line1': '감(感)의',
      'hero.h1.line2': '시대는',
      'hero.h1.line3': '끝났다.',

      // Hero headline variants — switch via Tweaks `heroHeadline`
      'hero.v.feel.1': '감(感)의', 'hero.v.feel.2': '시대는', 'hero.v.feel.3': '끝났다.',
      'hero.v.data.1': '데이터는', 'hero.v.data.2': '거짓말을', 'hero.v.data.3': '하지 않는다.',
      'hero.v.measure.1': '측정되지 않으면', 'hero.v.measure.2': '개선되지', 'hero.v.measure.3': '않는다.',
      'hero.v.key.1': '보이지 않던', 'hero.v.key.2': '실력의 열쇠를', 'hero.v.key.3': '찾아낸다.',
      'hero.v.body.1': '몸의 언어를', 'hero.v.body.2': '숫자로', 'hero.v.body.3': '읽는다.',
      'hero.v.science.1': '과학이', 'hero.v.science.2': '이기는 야구를', 'hero.v.science.3': '만든다.',
      'hero.lead': '국민대 바이오메카닉스 30년의 연구가, 이제 실험실을 나와 마운드와 타석 위에 섭니다. 3D 모션캡쳐 · 포스플레이트 · 볼 트래킹이 한 번의 투구와 한 번의 스윙에서 감(感)이 놓친 결정적 1%를 측정합니다.',
      'hero.cta.about': 'BBL 소개 보기',
      'hero.cta.services': '분석 서비스 소개',
      'hero.session': 'SESSION-0438 · BOX-R · 240Hz',
      'hero.kseq': 'KINEMATIC SEQUENCE',
      'hero.release': '스윙 임팩트 · IMPACT T-0.02s',
      'hero.equipment': 'EQUIPMENT',
      'hero.scroll': 'SCROLL',

      // ABOUT
      'about.label': 'ABOUT BBL',
      'about.h2.1': '데이터보다,',
      'about.h2.2': '처방을 드립니다.',
      'about.lead.1': '측정은 누구나 할 수 있습니다. 해석은 다릅니다.',
      'about.lead.2': 'BBL은 30년간 쌓인 바이오메카닉스 연구로, 숫자 뒤의 ‘왜’를 읽어냅니다.',
      'about.lead.3': '그래서 기록지 한 장이 아닌, 무엇을 어떻게 바꿀지 구체적인 처방으로 돌려드립니다.',
      'about.stat.1': '스포츠 바이오메카닉스 연구',
      'about.stat.2': '국내 최초 야구 바이오메카닉스',
      'about.stat.3': 'MLB·Driveline급 장비',
      'about.stat.4': '국내 유일 연구 기반 센터',
      'about.unity.k': 'UNITY · 통합 운영',
      'about.unity.title': '측정 · 해석 · 처방을 한 팀이 책임지는 국내 유일의 랩.',

      // SYSTEM
      'system.label': 'ANALYSIS SYSTEM',
      'system.h2.1': 'BBL 3단계 분석.',
      'system.h2.2': '원인에서 처방까지.',
      'system.kseq.label': 'KINEMATIC SEQUENCE',
      'system.kseq.title': '키네마틱 시퀀스. 몸 전체가 만들어내는 속도의 지도.',
      'system.kseq.note': '골반 → 몸통 → 팔 → 손 순으로 각속도 피크가 전달되어야 최적의 에너지 전달이 일어납니다. 순서가 깨지면 구속 손실과 부상 위험이 증가합니다.',
      'system.equip.k': 'EQUIPMENT · 장비 구성',
      'system.equip.d': 'MLB 연구소와 동일한 수준의 측정 체인 (10종+)',

      // SERVICES
      'services.label': 'SERVICES & PRICING',
      'services.h2': 'BBL 분석 서비스.',
      'services.toggle.ind': '👤 개인',
      'services.toggle.team': '👥 단체 (10명+)',
      'services.reserve': '예약 문의',
      'services.spec': '분석 서비스 세부내용 · 상세 비교표',
      'services.vat': '* 모든 가격은 VAT 포함입니다. 단체 팀 분석은 별도 상담이 필요합니다.',

      // REPORT
      'report.label': 'DELIVERY',
      'report.h2.1': '분석 결과는',
      'report.h2.2': '이렇게 전달됩니다.',
      'report.ch1.tag': 'CHANNEL 01 · 당일',
      'report.ch1.title': '현장에서 바로 피드백',
      'report.ch1.desc': '측정이 끝나는 그 자리에서, 모션 영상과 키네마틱 시퀀스를 선수와 함께 읽어 내려갑니다. 오늘 무엇을 바꿔야 하는지부터 함께 정리합니다.',
      'report.ch2.tag': 'CHANNEL 02 · 24h 이내',
      'report.ch2.title': '공식 리포트 전달',
      'report.ch2.desc': '24시간 이내, 국민대 바이오메카닉스 랩 공식 리포트가 이메일과 BBL 허브 앱으로 도착합니다. 다음 세션까지의 행동 계획이 함께 포함됩니다.',
      'report.note': '※ 아래는 기본 바이오메카닉스 리포트의 예시입니다. 분석 목적과 서비스에 따라 구성 항목이 달라질 수 있습니다.',

      // RESEARCH NOTES
      'research.label': 'RESEARCH NOTES',
      'research.h2.1': '연구 노트.',
      'research.h2.2': '현장에서 길어 올린 통찰.',
      'research.lead': '랩 연구실에서 현장으로 이어지는 바이오메카닉스 인사이트 — 논문·세션 기록·코칭 노트.',
      'research.readtime': '분 읽기',
      'research.viewall': '전체 노트 보기',

      // TESTIMONIALS
      'testi.label': 'TESTIMONIALS',
      'testi.h2.1': '선수와 지도자의',
      'testi.h2.2': '이야기.',
      'testi.lead': '현장에서 측정-피드백-개선을 거친 선수·코치들의 목소리.',

      // BOOKING
      'book.label': 'BOOKING',
      'book.h2.1': '측정 세션',
      'book.h2.2': '예약하기.',
      'book.lead': '희망 날짜와 시간을 선택하면 24시간 이내에 담당자가 확정 연락을 드립니다.',
      'book.step1': '서비스 선택',
      'book.step2': '날짜 · 시간',
      'book.step3': '연락처 확정',
      'book.service': '분석 서비스',
      'book.duration': '소요 시간',
      'book.slots': '시간 선택',
      'book.confirm': '예약 신청하기',
      'book.confirmed': '예약 신청이 접수되었습니다. 24시간 이내 연락드립니다.',
      'book.morning': '오전',
      'book.afternoon': '오후',
      'book.evening': '저녁',
      'book.notes': '측정 당일 운동복·스파이크·개인 배트/글러브 지참, 측정 전 과도한 웨이트 지양.',

      // FAQ
      'faq.label': 'Q&A',
      'faq.h2': '자주 묻는 질문.',

      // CONTACT
      'contact.label': 'CONTACT',
      'contact.h2.1': 'BBL에 문의하기.',
      'contact.h2.2': '24시간 이내 답변.',
      'contact.lead': '어떤 문의든 환영합니다 — 선수 개인 및 학부모 상담 / 중·고·대학 팀, KBO 선수와 팀 정기 계약 문의.',
      'contact.name': '이름',
      'contact.email': '이메일',
      'contact.phone': '연락처',
      'contact.type': '문의 유형',
      'contact.msg': '문의 내용',
      'contact.select': '선택해주세요',
      'contact.type.1': '투수 바이오메카닉스 예약',
      'contact.type.2': '타자 바이오메카닉스 예약',
      'contact.type.3': '팀 분석 서비스 (프로/대학/고교)',
      'contact.type.4': '시즌 정기 계약',
      'contact.type.5': '학부모 상담',
      'contact.type.6': '기타 문의',
      'contact.msg.ph': '포지션 · 학년 · 희망 일정 등 자유롭게 작성해 주세요',
      'contact.send': '문의 보내기',
      'contact.sent': '접수 완료 ✓',

      // FOOTER
      'footer.tag': 'BioMotion Baseball Lab (BBL)',
      'footer.meta': '㈜ 바이오모션 · 국민대학교 · 서울 성북구 정릉로 77\n측정 · 해석 · 처방 — 30년의 연구를, 마운드와 타석 위에서.',
      'footer.site': 'SITE',
      'footer.contact': 'CONTACT',
      'footer.reply': '24시간 이내 답변',
    },

    en: {
      // NAV
      'nav.01': 'About',
      'nav.02': 'System',
      'nav.03': 'Services',
      'nav.04': 'Report',
      'nav.05': 'Notes',
      'nav.06': 'Voices',
      'nav.07': 'Book',
      'nav.08': 'FAQ',
      'nav.cta': 'Get in touch',

      // HERO
      'hero.tag': 'BBL · BIOMOTION BASEBALL LAB',
      'hero.coord': 'KOOKMIN UNIV. · BIOMECHANICS LAB',
      'hero.h1.line1': 'The era of',
      'hero.h1.line2': 'gut feel',
      'hero.h1.line3': 'is over.',

      // Hero headline variants
      'hero.v.feel.1': 'The era of', 'hero.v.feel.2': 'gut feel', 'hero.v.feel.3': 'is over.',
      'hero.v.data.1': 'Data', 'hero.v.data.2': 'does not', 'hero.v.data.3': 'lie.',
      'hero.v.measure.1': 'What is not measured', 'hero.v.measure.2': 'cannot be', 'hero.v.measure.3': 'improved.',
      'hero.v.key.1': 'We uncover', 'hero.v.key.2': 'the invisible keys', 'hero.v.key.3': 'to performance.',
      'hero.v.body.1': 'We read the body', 'hero.v.body.2': 'in', 'hero.v.body.3': 'numbers.',
      'hero.v.science.1': 'Science builds', 'hero.v.science.2': 'winning', 'hero.v.science.3': 'baseball.',
      'hero.lead': 'Thirty years of Kookmin biomechanics research, now stepping out of the lab and onto the mound and the plate. 3D motion capture, force plates, and ball tracking measure the decisive 1% that instinct misses — in every pitch, every swing.',
      'hero.cta.about': 'About BBL',
      'hero.cta.services': 'See services',
      'hero.session': 'SESSION-0438 · BOX-R · 240Hz',
      'hero.kseq': 'KINEMATIC SEQUENCE',
      'hero.release': 'Swing impact · T-0.02s',
      'hero.equipment': 'EQUIPMENT',
      'hero.scroll': 'SCROLL',

      // ABOUT
      'about.label': 'ABOUT BBL',
      'about.h2.1': 'Beyond data,',
      'about.h2.2': 'we give a prescription.',
      'about.lead.1': 'Anyone can measure. Interpretation is the difference.',
      'about.lead.2': 'Thirty years of biomechanics research at BBL read the ‘why’ behind every number.',
      'about.lead.3': 'You leave with a specific prescription — not a comparison chart, but exactly what to change, and how.',
      'about.stat.1': 'Years of biomechanics research',
      'about.stat.2': 'Years leading baseball biomechanics in Korea',
      'about.stat.3': 'MLB · Driveline-grade instruments',
      'about.stat.4': 'Only research-based center in Korea',
      'about.unity.k': 'UNITY · Integrated Operation',
      'about.unity.title': 'The only lab in Korea where measurement, interpretation, and prescription are owned by a single team.',

      // SYSTEM
      'system.label': 'ANALYSIS SYSTEM',
      'system.h2.1': 'BBL 3-step analysis.',
      'system.h2.2': 'From cause to prescription.',
      'system.kseq.label': 'KINEMATIC SEQUENCE',
      'system.kseq.title': 'Kinematic sequence. The map of speed the whole body builds.',
      'system.kseq.note': 'Angular velocity must peak in order — pelvis → torso → arm → hand — for optimal energy transfer. Break the order and you lose velocity and risk injury.',
      'system.equip.k': 'EQUIPMENT',
      'system.equip.d': 'The same measurement chain as top MLB labs (10+ instruments)',

      // SERVICES
      'services.label': 'SERVICES & PRICING',
      'services.h2': 'BBL analysis services.',
      'services.toggle.ind': '👤 Individual',
      'services.toggle.team': '👥 Team (10+)',
      'services.reserve': 'Inquire',
      'services.spec': 'Detailed comparison table',
      'services.vat': '* All prices include VAT. Team analysis requires a separate consultation.',

      // REPORT
      'report.label': 'DELIVERY',
      'report.h2.1': 'How results',
      'report.h2.2': 'are delivered.',
      'report.ch1.tag': 'CHANNEL 01 · Same day',
      'report.ch1.title': 'On-field feedback',
      'report.ch1.desc': 'Right where capture ends, we walk through the motion video and kinematic sequence with the athlete — starting from what to change, today.',
      'report.ch2.tag': 'CHANNEL 02 · Within 24h',
      'report.ch2.title': 'Official report',
      'report.ch2.desc': 'Within 24 hours, the official Kookmin Biomechanics Lab report lands in your inbox and the BBL Hub app — bundled with an action plan to the next session.',
      'report.note': '* Below is a sample of the baseline biomechanics report. Items vary by analysis goal and service tier.',

      // RESEARCH NOTES
      'research.label': 'RESEARCH NOTES',
      'research.h2.1': 'Research notes.',
      'research.h2.2': 'Insights from lab to field.',
      'research.lead': 'Biomechanics insights that travel from the lab to the field — papers, session records, coaching notes.',
      'research.readtime': 'min read',
      'research.viewall': 'See all notes',

      // TESTIMONIALS
      'testi.label': 'TESTIMONIALS',
      'testi.h2.1': 'From the athletes',
      'testi.h2.2': 'and coaches.',
      'testi.lead': 'Voices from players and coaches who went through measure → feedback → change with BBL.',

      // BOOKING
      'book.label': 'BOOKING',
      'book.h2.1': 'Book a session.',
      'book.h2.2': '',
      'book.lead': 'Pick a date and time — our team confirms within 24 hours.',
      'book.step1': 'Select service',
      'book.step2': 'Date · time',
      'book.step3': 'Contact',
      'book.service': 'Analysis service',
      'book.duration': 'Duration',
      'book.slots': 'Time slots',
      'book.confirm': 'Request booking',
      'book.confirmed': 'Your booking request was received. We will get back within 24h.',
      'book.morning': 'Morning',
      'book.afternoon': 'Afternoon',
      'book.evening': 'Evening',
      'book.notes': 'Bring workout gear, spikes and personal bat/glove. Avoid heavy lifting before the session.',

      // FAQ
      'faq.label': 'Q&A',
      'faq.h2': 'Frequently asked.',

      // CONTACT
      'contact.label': 'CONTACT',
      'contact.h2.1': 'Reach out.',
      'contact.h2.2': 'Reply within 24h.',
      'contact.lead': 'All inquiries welcome — individual athletes, parents, school and university teams, KBO players and full-season contracts.',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.type': 'Inquiry type',
      'contact.msg': 'Message',
      'contact.select': 'Please select',
      'contact.type.1': 'Pitching biomechanics',
      'contact.type.2': 'Hitting biomechanics',
      'contact.type.3': 'Team analysis (pro / college / HS)',
      'contact.type.4': 'Season contract',
      'contact.type.5': 'Parent consultation',
      'contact.type.6': 'Other',
      'contact.msg.ph': 'Position, level, preferred schedule — anything is fine.',
      'contact.send': 'Send inquiry',
      'contact.sent': 'Received ✓',

      // FOOTER
      'footer.tag': 'BioMotion Baseball Lab (BBL)',
      'footer.meta': 'BioMotion Inc. · Kookmin University · 77 Jeongneung-ro, Seongbuk-gu, Seoul\nMeasure · interpret · prescribe — 30 years of research, now on the mound and the plate.',
      'footer.site': 'SITE',
      'footer.contact': 'CONTACT',
      'footer.reply': 'Reply within 24h',
    }
  };

  let LOCALE = (typeof window !== 'undefined' && window.TWEAKS && window.TWEAKS.locale) || 'ko';
  const subscribers = new Set();

  window.T = function (key) {
    return (DICT[LOCALE] && DICT[LOCALE][key]) || (DICT.ko[key]) || key;
  };
  window.currentLocale = function () { return LOCALE; };
  window.setLocale = function (loc) {
    if (LOCALE === loc) return;
    LOCALE = loc;
    document.documentElement.lang = loc;
    subscribers.forEach(fn => fn(loc));
  };
  window.onLocaleChange = function (fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  };
  // useT hook: forces re-render on locale change
  window.useT = function () {
    const [, tick] = React.useState(0);
    React.useEffect(() => {
      return window.onLocaleChange(() => tick(x => x + 1));
    }, []);
    return window.T;
  };
})();
