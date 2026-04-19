#!/usr/bin/env node
/*
 * build-index.js
 *  posts/ 폴더의 모든 .md 파일을 스캔하여
 *  각 파일의 frontmatter에서 메타데이터를 추출한 뒤
 *  posts.js (window.BBL_POSTS 배열)를 생성합니다.
 *
 *  이 스크립트는 Netlify 배포 시 자동 실행됩니다.
 *  (netlify.toml의 [build] command에 지정됨)
 *
 *  로컬에서도 수동 실행 가능:
 *    node build-index.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_FILE = path.join(__dirname, 'posts.js');

/**
 * 간단한 frontmatter 파서
 * YAML 전체가 아니라 "key: value" 한 줄씩만 처리합니다.
 * 문자열은 따옴표 감싸기를 선택적으로 허용합니다.
 */
function parseFrontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const meta = {};
  lines.forEach(line => {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) return;
    let val = m[2].trim();
    val = val.replace(/^["'](.*)["']$/, '$1');
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    meta[m[1]] = val;
  });
  return meta;
}

function escape(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function buildIndex() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('posts/ 디렉터리를 찾을 수 없습니다.');
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'));

  const posts = [];
  files.forEach(f => {
    const fullPath = path.join(POSTS_DIR, f);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const meta = parseFrontmatter(raw);

    if (meta.draft === true) {
      console.log('  [skip draft] ' + f);
      return;
    }

    const slug = f.replace(/\.md$/, '');
    posts.push({
      id: slug,
      title: meta.title || slug,
      summary: meta.summary || '',
      date: meta.date || '',
      category: meta.category || '일반',
      author: meta.author || 'BBL',
      readTime: meta.readTime || '5분',
      cover: meta.cover || null,
      url: 'post.html?slug=' + slug
    });
  });

  // 날짜 내림차순(최신이 앞에) 정렬
  posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));

  // posts.js 생성
  const header =
    '/* ==========================================================================\n' +
    ' * BBL 연구 노트 — 글 목록 (자동 생성)\n' +
    ' * 이 파일은 build-index.js가 posts/*.md를 스캔해서 자동으로 만듭니다.\n' +
    ' * 직접 수정하지 마세요. 관리자 페이지(/admin/)에서 글을 편집해 주세요.\n' +
    ' * 생성 시각: ' + new Date().toISOString() + '\n' +
    ' * ========================================================================== */\n\n';

  const body = 'window.BBL_POSTS = [\n' +
    posts.map(p =>
      '  {\n' +
      '    id: "' + escape(p.id) + '",\n' +
      '    title: "' + escape(p.title) + '",\n' +
      '    summary: "' + escape(p.summary) + '",\n' +
      '    date: "' + escape(p.date) + '",\n' +
      '    category: "' + escape(p.category) + '",\n' +
      '    author: "' + escape(p.author) + '",\n' +
      '    readTime: "' + escape(p.readTime) + '",\n' +
      '    cover: ' + (p.cover ? '"' + escape(p.cover) + '"' : 'null') + ',\n' +
      '    url: "' + escape(p.url) + '"\n' +
      '  }'
    ).join(',\n') +
    '\n];\n';

  fs.writeFileSync(OUTPUT_FILE, header + body, 'utf-8');
  console.log('✓ posts.js 생성 완료 — ' + posts.length + '개 글 인덱싱');
  posts.forEach(p => console.log('  · [' + p.date + '] ' + p.title));
}

buildIndex();
