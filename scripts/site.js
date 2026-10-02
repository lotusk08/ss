import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { icon, noteIcon } from '../src/icons/index.js';

const here = fileURLToPath(new URL('..', import.meta.url));
const out = join(here, '_site');
const origin = 'https://style.stevehoang.com';
const read = (path) => readFile(join(here, path), 'utf8');

const PRIVATE = [
  ['domaine/regular-italic.woff2', 'domaine-display-narrow/svn-domaine-display-narrow-regular-italic.woff2'],
  ['domaine/semibold-italic.woff2', 'domaine-display-narrow/svn-domaine-display-narrow-semibold-italic.woff2'],
  ['hnn/hnn-latin-400-normal.woff2', 'hnn/hnn-latin-400-normal.woff2'],
  ['hnn/hnn-vietnamese-400-normal.woff2', 'hnn/hnn-vietnamese-400-normal.woff2'],
  ['hnn/hnn-latin-700-normal.woff2', 'hnn/hnn-latin-700-normal.woff2'],
  ['hnn/hnn-vietnamese-700-normal.woff2', 'hnn/hnn-vietnamese-700-normal.woff2']
];

const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const VIETNAMESE = 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB';

async function privateFonts() {
  const local = process.env.SS_PRIVATE_FONTS;
  const got = [];
  for (const [to, from] of PRIVATE) {
    try {
      const bytes = local
        ? await readFile(join(local, from))
        : Buffer.from(await (await fetch(`https://stevehoang.com/assets/fonts/${from}`, { signal: AbortSignal.timeout(8000) })).arrayBuffer());
      if (bytes.length < 1000) throw new Error('too small');
      await mkdir(dirname(join(out, 'fonts', to)), { recursive: true });
      await writeFile(join(out, 'fonts', to), bytes);
      got.push(to);
    } catch (error) {
      console.warn(`private font ${from} not available (${error.message}); its fallback is used`);
    }
  }
  return got;
}

function privateFaces(got) {
  const has = (file) => got.includes(file);
  const faces = [];
  if (has('domaine/regular-italic.woff2')) faces.push(`@font-face{font-family:'Domaine Display Narrow';font-style:italic;font-weight:400;font-display:swap;src:url('fonts/domaine/regular-italic.woff2') format('woff2')}`);
  if (has('domaine/semibold-italic.woff2')) faces.push(`@font-face{font-family:'Domaine Display Narrow';font-style:italic;font-weight:600;font-display:swap;src:url('fonts/domaine/semibold-italic.woff2') format('woff2')}`);
  for (const weight of [400, 700]) {
    const local = weight === 700 ? "local('Helvetica Neue Bold'), local('HelveticaNeue-Bold')" : "local('Helvetica Neue'), local('HelveticaNeue')";
    for (const [script, range] of [['latin', LATIN], ['vietnamese', VIETNAMESE]]) {
      const file = `hnn/hnn-${script}-${weight}-normal.woff2`;
      const src = has(file) ? `${local}, url('fonts/${file}') format('woff2')` : local;
      faces.push(`@font-face{font-family:'Helvetica Neue';font-style:normal;font-weight:${weight};font-display:swap;src:${src};unicode-range:${range}}`);
    }
  }
  return faces.join('\n');
}

const MODULES = [
  ['palette', 'src/palette.js'],
  ['scale', 'src/scale.js'],
  ['line', 'src/icons/line.js'],
  ['solid', 'src/icons/solid.js'],
  ['icons', 'src/icons/index.js'],
  ['mode', 'js/mode.js'],
  ['motion', 'js/motion.js'],
  ['swap', 'js/swap.js'],
  ['art', 'js/art.js']
];

const byFile = Object.fromEntries(MODULES.map(([name, file]) => [basename(file), name]));

const importsOf = (source) =>
  source.replace(/^import \{([^}]+)\} from '([^']+)';$/gm, (_, names, path) => `const {${names}} = __${byFile[basename(path)]};`);

async function bundle() {
  const parts = [];
  for (const [name, file] of MODULES) {
    let source = await read(file);
    const exported = [
      ...[...source.matchAll(/^export (?:async )?(?:function|const|let) (\w+)/gm)].map((m) => m[1]),
      ...[...source.matchAll(/^export \{([^}]+)\};?$/gm)].flatMap((m) => m[1].split(',').map((s) => s.trim()))
    ];
    source = importsOf(source).replace(/^export \{[^}]+\};?$/gm, '').replace(/^export /gm, '');
    parts.push(`const __${name} = (() => {\n${source}\nreturn { ${exported.join(', ')} };\n})();`);
  }
  const main = importsOf(await read('site/main.js'));
  return `(() => {\n${parts.join('\n')}\n${main}\n})();`;
}

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const INDEXNOW_KEY = '8377fd6fb3355efd33cc91255debed31';
const PAGES = ['/', '/llms.txt', '/llms-full.txt', '/readme.md', '/mapping.md', '/skill.md', '/tokens.json'];

async function indexNow() {
  if ((process.env.WORKERS_CI_BRANCH ?? process.env.CF_PAGES_BRANCH) !== 'main') return;
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(origin).host,
        key: INDEXNOW_KEY,
        keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
        urlList: PAGES.map((path) => `${origin}${path}`)
      }),
      signal: AbortSignal.timeout(8000)
    });
    console.log(`IndexNow: ${response.status}`);
  } catch (error) {
    console.warn(`IndexNow not reached (${error.message})`);
  }
}

const LANGS = { shell: 'Shell', css: 'CSS', js: 'JavaScript', html: 'HTML' };

async function page(fonts) {
  const signature = (await read('img/signature.svg')).match(/<path[^>]+\/>/)[0];
  const css = [
    await read('dist/ss.css'),
    (await read('css/fonts.css')).replaceAll("url('../fonts/", "url('fonts/"),
    privateFaces(fonts),
    (await read('css/base.css')).replaceAll("url('../img/grain.png')", "url('img/grain.png')"),
    await read('css/icons.css'),
    await read('css/ui.css'),
    await read('css/syntax.css'),
    await read('css/motion.css'),
    await read('site/site.css')
  ].join('\n');
  const preload = fonts.includes('domaine/regular-italic.woff2')
    ? '<link rel="preload" href="/fonts/domaine/regular-italic.woff2" as="font" type="font/woff2" crossorigin>'
    : '';
  return (await read('site/index.html'))
    .replace('<!--preload-->', preload)
    .replace('<!--css-->', () => `<style>\n${css}</style>`)
    .replace('<!--js-->', () => `<script>\n${js}</script>`)
    .replace('<!--include:signature-->', signature)
    .replace(/<!--icon:([\w-]+):(\w+)(?::([\w-]+))?-->/g, (_, name, set, className) => icon(name, { set, className: className ?? '' }))
    .replace(/<!--note:(\w+)-->/g, (_, type) => noteIcon(type))
    .replace(/<!--code:(\w+):([\s\S]*?)-->/g, (_, lang, code) =>
      `<div class="ss-code"><div class="ss-code-head">${icon('code', { set: 'solid' })}${LANGS[lang] ?? lang}<button type="button" aria-label="Copy code">${icon('clone', { set: 'solid' })}</button></div><pre><code>${escape(code)}</code></pre></div>`
    )
    .replace('<time>2026</time>', `<time>${new Date().getFullYear()}</time>`);
}

let js = '';

const llms = (readme) => `# Steve's Style

> The design system of Steve Hoang's products (stevehoang.com, write, Think Why?, Think tree, IO): colour tokens on two surfaces (Paper for reading, Desk for working) and two lights (blue by day, ember by night), type, 117 icons, notes, controls, canvas art and motion, published as the \`ss\` package (\`npm i github:lotusk08/ss\`).

Use the roles, never raw colours. Paper is \`<html data-surface="paper">\`; Desk is the default. Mode is \`data-mode="light|dark"\` on \`<html>\`, following the system until the reader picks the other.

## Docs

- [Guide](${origin}/readme.md): philosophy, palette, type, icons, layout, motion, how to use it
- [Mapping](${origin}/mapping.md): each SS token beside its name in each product
- [Claude skill](${origin}/skill.md): how to design in SS, with references on [typography](${origin}/skills/ss/references/typography.md), [colour](${origin}/skills/ss/references/color-systems.md), [layout](${origin}/skills/ss/references/layouts-ux.md), [motion](${origin}/skills/ss/references/motion-design.md), [CSS](${origin}/skills/ss/references/css-techniques.md), [WebGL](${origin}/skills/ss/references/webgl-3d.md) and [studios](${origin}/skills/ss/references/studios-philosophy.md)
- [Everything in one file](${origin}/llms-full.txt)

## Tokens

- [tokens.json](${origin}/tokens.json): every value, both surfaces, both lights
- [ss.css](${origin}/ss.css): the tokens as CSS custom properties
- [tailwind.css](${origin}/tailwind.css): a Tailwind v4 theme
- [ss.scss](${origin}/ss.scss): SCSS variables and maps

## Icons

- [Solid sprite](${origin}/icons/solid.svg): 50 Font Awesome Free icons
- [Line sprite](${origin}/icons/line.svg): 67 line icons on a 24px grid

## Source

- [GitHub](https://github.com/lotusk08/ss)
${readme.match(/## Philosophy[\s\S]*?(?=\n## Surfaces)/)?.[0] ? `\n${readme.match(/## Philosophy[\s\S]*?(?=\n## Surfaces)/)[0].trim()}\n` : ''}`;

const robots = `User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

const sitemap = (today) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES
  .map((path) => `  <url><loc>${origin}${path}</loc><lastmod>${today}</lastmod>${path === '/' ? `<image:image><image:loc>${origin}/og.png</image:loc></image:image>` : ''}</url>`)
  .join('\n')}
</urlset>
`;

const headers = `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/inter-display/*
  Access-Control-Allow-Origin: *

/fonts/newsreader/*
  Access-Control-Allow-Origin: *

/fonts/jetbrains-mono/*
  Access-Control-Allow-Origin: *

/icons/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=86400

/img/*
  Cache-Control: public, max-age=2592000

/ss.css
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=3600

/tailwind.css
  Access-Control-Allow-Origin: *

/tokens.json
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=3600

/*.md
  Content-Type: text/markdown; charset=utf-8
  Access-Control-Allow-Origin: *

/*.txt
  Content-Type: text/plain; charset=utf-8
  Access-Control-Allow-Origin: *
`;

export async function build() {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const dir of ['inter-display', 'newsreader', 'jetbrains-mono']) {
    await cp(join(here, 'fonts', dir), join(out, 'fonts', dir), { recursive: true });
  }
  const fonts = await privateFonts();
  js = await bundle();
  await mkdir(join(out, 'img'), { recursive: true });
  await cp(join(here, 'img/grain.png'), join(out, 'img/grain.png'));
  await cp(join(here, 'img/signature.svg'), join(out, 'img/signature.svg'));
  for (const file of ['favicon.svg', 'favicon-dark.svg', 'apple-touch-icon.png', 'og.png', `${INDEXNOW_KEY}.txt`]) {
    await cp(join(here, 'site', file), join(out, file)).catch(() => {});
  }
  await cp(join(here, 'dist/icons'), join(out, 'icons'), { recursive: true });
  for (const file of ['ss.css', 'tokens.json', 'tailwind.css', 'ss.scss']) await cp(join(here, 'dist', file), join(out, file));
  const readme = await read('README.md');
  const mapping = await read('MAPPING.md');
  const skill = await read('skills/ss/SKILL.md');
  await writeFile(join(out, 'readme.md'), readme);
  await writeFile(join(out, 'mapping.md'), mapping);
  await writeFile(join(out, 'skill.md'), skill);
  await cp(join(here, 'skills'), join(out, 'skills'), { recursive: true });
  await writeFile(join(out, 'llms.txt'), llms(readme));
  await writeFile(join(out, 'llms-full.txt'), `${readme}\n\n---\n\n${mapping}\n\n---\n\n${skill}`);
  await writeFile(join(out, 'robots.txt'), robots);
  await writeFile(join(out, 'sitemap.xml'), sitemap(new Date().toISOString().slice(0, 10)));
  await writeFile(join(out, '_headers'), headers);
  await writeFile(join(out, 'index.html'), await page(fonts));
  const files = await readdir(out, { recursive: true });
  return { files: files.length, fonts };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { files, fonts } = await build();
  await indexNow();
  console.log(`wrote _site: ${files} files${fonts.length ? `, private fonts: ${fonts.length}` : ''}`);
}
