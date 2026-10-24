export const courses = [
  {
    id: 'html-fundamentals',
    title: 'HTML Fundamentals',
    description: 'Build the structure of every web page with semantic, accessible HTML.',
    level: 'Beginner',
    duration: '2h 10m',
    badge: 'HTML',
    accent: '#f97316',
    lessons: [
      {
        id: 'html-1',
        title: 'How the Web Works',
        minutes: 14,
        objectives: ['Understand the request/response cycle', 'Recognize the three core web languages'],
        sections: [
          {
            title: 'From URL to page',
            body: 'When you type an address, the browser resolves the domain to an IP address, opens a connection, and sends an HTTP request. The server responds with a document, usually HTML. The browser then parses that document and requests any linked CSS, JavaScript, images, and fonts. Only after those resources arrive can the page render completely.',
          },
          {
            title: 'Three languages, three jobs',
            body: 'HTML describes structure and meaning. CSS controls presentation. JavaScript adds behavior. Keeping these responsibilities separate makes a project easier to maintain, test, and make accessible.',
          },
        ],
        code: {
          lang: 'html',
          source: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>My first page</title>\n  </head>\n  <body>\n    <h1>Hello, web!</h1>\n  </body>\n</html>',
        },
        practice: {
          prompt: 'Create a valid HTML document with the language set to English, a meta charset declaration, and an h1 that says "Hello, web!".',
          hint: 'Every document needs doctype, html, head, and body.',
          solution: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>My first page</title>\n  </head>\n  <body>\n    <h1>Hello, web!</h1>\n  </body>\n</html>',
        },
        quiz: {
          question: 'Which language is responsible for the structure and meaning of a page?',
          options: ['CSS', 'HTML', 'JavaScript', 'SQL'],
          answer: 1,
          explanation: 'HTML provides the document structure and semantic meaning.',
        },
      },
      {
        id: 'html-2',
        title: 'Semantic Structure',
        minutes: 18,
        objectives: ['Use landmark elements', 'Understand why semantic tags matter'],
        sections: [
          {
            title: 'Landmarks instead of div soup',
            body: 'Elements such as header, nav, main, section, article, aside, and footer describe the role of each region. Screen readers let users jump between these landmarks, and search engines understand the page better. Use div only when no semantic element fits.',
          },
          {
            title: 'One main, one h1',
            body: 'A page should normally contain a single main element and a single h1. Headings must form a logical outline: h1, then h2 for major sections, then h3 for subsections. Never choose a heading level because of its default size; choose it for meaning and style it with CSS.',
          },
        ],
        code: {
          lang: 'html',
          source: '<header>\n  <nav aria-label="Primary">\n    <a href="#courses">Courses</a>\n  </nav>\n</header>\n<main>\n  <h1>Learning dashboard</h1>\n  <section aria-labelledby="recent">\n    <h2 id="recent">Recent lessons</h2>\n    <p>Keep building your streak.</p>\n  </section>\n</main>\n<footer>© 2026 DEVVERSE</footer>',
        },
        practice: {
          prompt: 'Build a page with a header containing a nav, a main with one h1 and one section, and a footer.',
          hint: 'Each landmark wraps related content.',
          solution: '<header>\n  <nav aria-label="Primary"><a href="/">Home</a></nav>\n</header>\n<main>\n  <h1>My Page</h1>\n  <section>\n    <h2>About</h2>\n  </section>\n</main>\n<footer>© 2026</footer>',
        },
        quiz: {
          question: 'Which element represents the dominant content of a page?',
          options: ['section', 'article', 'main', 'aside'],
          answer: 2,
          explanation: 'main holds the primary content and should appear once per page.',
        },
      },
      {
        id: 'html-3',
        title: 'Forms and Inputs',
        minutes: 20,
        objectives: ['Connect labels to inputs', 'Use native validation attributes'],
        sections: [
          {
            title: 'Labels are not optional',
            body: 'Every input needs an accessible name. The most reliable method is a label element tied to the input id with the for attribute. Placeholders disappear when users type and are not a replacement for a label. Use fieldset and legend to group related controls such as radio buttons.',
          },
          {
            title: 'Native validation first',
            body: 'Attributes like type="email", required, minlength, min, and max give instant, accessible validation without JavaScript. JavaScript validation is still useful for custom rules and better messages, but it should complement the native behavior rather than replace it.',
          },
        ],
        code: {
          lang: 'html',
          source: '<form action="/subscribe" method="post">\n  <label for="email">Email address</label>\n  <input\n    id="email"\n    name="email"\n    type="email"\n    autocomplete="email"\n    required\n  />\n  <label>\n    <input type="checkbox" name="news" />\n    Send me weekly updates\n  </label>\n  <button type="submit">Subscribe</button>\n</form>',
        },
        practice: {
          prompt: 'Create a form with a labelled email field, a required password field of at least 8 characters, and a submit button.',
          hint: 'Use minlength and autocomplete attributes.',
          solution: '<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" required />\n  <label for="password">Password</label>\n  <input id="password" type="password" minlength="8" required />\n  <button type="submit">Create account</button>\n</form>',
        },
        quiz: {
          question: 'What is the best way to give an input an accessible name?',
          options: ['A placeholder', 'A label linked with for and id', 'A title attribute only', 'A nearby paragraph'],
          answer: 1,
          explanation: 'A programmatically linked label is announced reliably by assistive technology.',
        },
      },
      {
        id: 'html-4',
        title: 'Images, Media and Accessibility',
        minutes: 16,
        objectives: ['Write meaningful alt text', 'Load media responsibly'],
        sections: [
          {
            title: 'Alt text that helps',
            body: 'Alternative text describes the purpose of an image in context. Decorative images should use alt="" so screen readers skip them. Avoid phrases such as "image of" because assistive technology already announces that. For charts, summarize the key insight rather than listing pixels.',
          },
          {
            title: 'Performance attributes',
            body: 'Always set width and height on images to reserve layout space and prevent content jumps. Use loading="lazy" for below-the-fold images and provide captions or transcripts for audio and video. Modern formats such as WebP and AVIF reduce transfer size without visible quality loss.',
          },
        ],
        code: {
          lang: 'html',
          source: '<figure>\n  <img\n    src="dashboard.webp"\n    alt="Progress chart showing four completed lessons this week"\n    width="640"\n    height="360"\n    loading="lazy"\n  />\n  <figcaption>Weekly learning progress</figcaption>\n</figure>\n<img src="divider.svg" alt="" />',
        },
        practice: {
          prompt: 'Add a figure with an informative image of a code editor, a caption, explicit dimensions, and lazy loading. Then add a decorative divider with alt="".',
          hint: 'The figure wraps the image and the figcaption.',
          solution: '<figure>\n  <img src="editor.webp" alt="Code editor showing a JavaScript function" width="800" height="450" loading="lazy" />\n  <figcaption>The challenge editor</figcaption>\n</figure>\n<img src="divider.svg" alt="" />',
        },
        quiz: {
          question: 'How should a purely decorative image be handled?',
          options: ['Give it a long alt description', 'Use alt="" so it is ignored', 'Remove the src', 'Add a title attribute'],
          answer: 1,
          explanation: 'Empty alt text marks the image as decorative for assistive technology.',
        },
      },
    ],
  },
  {
    id: 'css-fundamentals',
    title: 'CSS Fundamentals',
    description: 'Style accessible interfaces with the cascade, box model, and modern layout tools.',
    level: 'Beginner',
    duration: '2h 25m',
    badge: 'CSS',
    accent: '#3b82f6',
    lessons: [
      {
        id: 'css-1',
        title: 'Selectors and the Cascade',
        minutes: 18,
        objectives: ['Understand specificity', 'Write maintainable selectors'],
        sections: [
          {
            title: 'How conflicts are resolved',
            body: 'When multiple rules target an element, the browser compares importance, specificity, and source order. Inline styles beat ids, ids beat classes and attributes, and classes beat element selectors. Use low-specificity class selectors so styles remain predictable and easy to override.',
          },
          {
            title: 'Inheritance and custom properties',
            body: 'Font and color properties inherit by default; box properties do not. Custom properties inherit too, which makes them ideal design tokens. Define them on :root and override them within a component when needed.',
          },
        ],
        code: {
          lang: 'css',
          source: ':root {\n  --brand: #7c5cff;\n  --text: #e7e9f3;\n}\n\n.button {\n  background: var(--brand);\n  color: var(--text);\n  border: 0;\n  border-radius: 10px;\n  padding: 0.7rem 1.1rem;\n}\n\n.button:hover {\n  filter: brightness(1.1);\n}',
        },
        practice: {
          prompt: 'Define two custom properties for a background and text color, then style a .card with padding, a border radius, and those colors.',
          hint: 'Declare tokens on :root and consume them with var().',
          solution: ':root {\n  --surface: #171a2b;\n  --text: #e7e9f3;\n}\n.card {\n  background: var(--surface);\n  color: var(--text);\n  padding: 24px;\n  border-radius: 16px;\n}',
        },
        quiz: {
          question: 'Which selector has the highest specificity among these?',
          options: ['.nav a', '#header', 'nav a', '[aria-current="page"]'],
          answer: 1,
          explanation: 'An id selector has higher specificity than classes, attributes, or elements.',
        },
      },
      {
        id: 'css-2',
        title: 'The Box Model',
        minutes: 20,
        objectives: ['Control sizing with box-sizing', 'Use logical spacing'],
        sections: [
          {
            title: 'Content, padding, border, margin',
            body: 'Every element is a box. By default, width applies to the content box, so padding and borders make the element wider than its declared width. Setting box-sizing: border-box on everything makes width include padding and border, which is far easier to reason about.',
          },
          {
            title: 'Margins, collapsing and logical properties',
            body: 'Vertical margins between block siblings can collapse, which surprises many developers. Use flex or grid gap for predictable spacing. Prefer logical properties such as margin-inline, padding-block, and inset-inline-start so layouts adapt to writing direction.',
          },
        ],
        code: {
          lang: 'css',
          source: '*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n.card {\n  max-width: 420px;\n  padding-block: 1.5rem;\n  padding-inline: 1.25rem;\n  border: 1px solid #2a2f45;\n  border-radius: 16px;\n  margin-inline: auto;\n}',
        },
        practice: {
          prompt: 'Apply border-box sizing globally and style .panel with 2rem block padding, 1.5rem inline padding, and a visible border.',
          hint: 'Use the universal selector for border-box.',
          solution: '*, *::before, *::after { box-sizing: border-box; }\n.panel {\n  padding-block: 2rem;\n  padding-inline: 1.5rem;\n  border: 1px solid #2a2f45;\n}',
        },
        quiz: {
          question: 'With box-sizing: border-box, what does width: 300px include?',
          options: ['Content only', 'Content and padding', 'Content, padding and border', 'Margin and border only'],
          answer: 2,
          explanation: 'Border-box width includes content, padding, and border.',
        },
      },
      {
        id: 'css-3',
        title: 'Flexbox and Grid',
        minutes: 24,
        objectives: ['Choose between flexbox and grid', 'Build responsive card layouts'],
        sections: [
          {
            title: 'Flexbox for one dimension',
            body: 'Flexbox distributes items along a single axis. Use display: flex with gap for toolbars and rows, then align-items and justify-content to position items. Setting flex: 1 on a child lets it grow to fill remaining space.',
          },
          {
            title: 'Grid for two dimensions',
            body: 'CSS Grid aligns rows and columns at the same time. repeat(auto-fit, minmax(240px, 1fr)) creates a responsive card grid without media queries. Both layout modes can be combined; an outer grid can hold cards whose internals use flexbox.',
          },
        ],
        code: {
          lang: 'css',
          source: '.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1rem;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  padding: 1.25rem;\n}\n\n.card__footer {\n  margin-top: auto;\n}',
        },
        practice: {
          prompt: 'Create a responsive grid of cards with a minimum width of 260px and a one-rem gap. Give each card flex column layout and push its footer to the bottom.',
          hint: 'Combine auto-fit with minmax, and margin-top: auto inside the card.',
          solution: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1rem;\n}\n.card { display: flex; flex-direction: column; }\n.card footer { margin-top: auto; }',
        },
        quiz: {
          question: 'Which layout is the better default for a responsive grid of cards?',
          options: ['Flex row with wrapping', 'CSS Grid with auto-fit and minmax', 'Absolute positioning', 'Floats'],
          answer: 1,
          explanation: 'Grid auto-fit with minmax creates a robust responsive card grid.',
        },
      },
      {
        id: 'css-4',
        title: 'States, Transitions and Focus',
        minutes: 16,
        objectives: ['Style interactive states', 'Never remove focus outlines'],
        sections: [
          {
            title: 'Every interactive state matters',
            body: 'Users need feedback for hover, active, focus-visible, disabled, and invalid states. Transitions should be short, around 150 to 250 milliseconds, and animate properties such as opacity and transform rather than layout properties like width.',
          },
          {
            title: 'Visible focus is accessibility',
            body: 'Never remove outlines without a replacement. Use :focus-visible to show a strong ring for keyboard users while avoiding a ring on mouse clicks. Reduce motion for users who request it with a prefers-reduced-motion media query.',
          },
        ],
        code: {
          lang: 'css',
          source: '.button {\n  transition: transform 160ms ease, background-color 160ms ease;\n}\n\n.button:hover {\n  background: #8f74ff;\n}\n\n.button:active {\n  transform: translateY(1px);\n}\n\n.button:focus-visible {\n  outline: 3px solid #67e8f9;\n  outline-offset: 3px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .button { transition: none; }\n}',
        },
        practice: {
          prompt: 'Add hover, active, and keyboard-only focus styles to a .link, plus a reduced-motion override.',
          hint: 'Use :focus-visible and prefers-reduced-motion.',
          solution: '.link { transition: color 160ms ease; }\n.link:hover { color: #8f74ff; }\n.link:active { opacity: 0.8; }\n.link:focus-visible { outline: 3px solid #67e8f9; outline-offset: 3px; }\n@media (prefers-reduced-motion: reduce) { .link { transition: none; } }',
        },
        quiz: {
          question: 'Which pseudo-class shows focus only for keyboard-style interaction?',
          options: [':focus', ':hover', ':focus-visible', ':active'],
          answer: 2,
          explanation: 'focus-visible matches when the browser determines focus should be visibly indicated.',
        },
      },
    ],
  },
  {
    id: 'responsive-web-design',
    title: 'Responsive Web Design',
    description: 'Make one interface feel native on phones, tablets, and large monitors.',
    level: 'Beginner',
    duration: '1h 35m',
    badge: 'RWD',
    accent: '#06b6d4',
    lessons: [
      {
        id: 'rwd-1',
        title: 'Mobile-First Strategy',
        minutes: 16,
        objectives: ['Write mobile-first media queries', 'Set a usable viewport'],
        sections: [
          {
            title: 'Start with the smallest screen',
            body: 'Mobile-first CSS defines the base layout for narrow screens, then adds enhancements at larger breakpoints with min-width media queries. This keeps the essential experience lightweight and forces you to prioritise content.',
          },
          {
            title: 'The viewport meta tag',
            body: 'Without <meta name="viewport" content="width=device-width, initial-scale=1">, mobile browsers use a wide virtual viewport and zoom the page out. With it, width percentages map to the real screen width. Avoid maximum-scale restrictions that block pinch zoom.',
          },
        ],
        code: {
          lang: 'css',
          source: '.sidebar { display: none; }\n\n@media (min-width: 1024px) {\n  .sidebar {\n    display: flex;\n    width: 260px;\n  }\n\n  .content {\n    margin-inline-start: 260px;\n  }\n}',
        },
        practice: {
          prompt: 'Hide a .nav on small screens and display it at 768px and above. Give .main a left margin only at that breakpoint.',
          hint: 'Write the base styles first, then use min-width.',
          solution: '.nav { display: none; }\n@media (min-width: 768px) {\n  .nav { display: flex; }\n  .main { margin-left: 240px; }\n}',
        },
        quiz: {
          question: 'What does a mobile-first stylesheet use for larger screens?',
          options: ['max-width queries', 'min-width queries', 'Only JavaScript', 'Separate HTML files'],
          answer: 1,
          explanation: 'Mobile-first enhancement uses min-width breakpoints.',
        },
      },
      {
        id: 'rwd-2',
        title: 'Fluid Layout and Typography',
        minutes: 18,
        objectives: ['Use relative units', 'Constrain readable line length'],
        sections: [
          {
            title: 'Units that adapt',
            body: 'rem scales with the root font size and respects user preferences. Percentages and fr units fill available space. ch units are useful for line length. clamp() smoothly scales values between a minimum and maximum, for example font-size: clamp(1.5rem, 4vw, 2.5rem).',
          },
          {
            title: 'Comfortable reading',
            body: 'Keep body text between roughly 45 and 75 characters per line. Use max-width: 65ch on article content. Ensure tap targets are at least 44 by 44 CSS pixels and avoid font sizes below 16px for body copy.',
          },
        ],
        code: {
          lang: 'css',
          source: '.hero__title {\n  font-size: clamp(2rem, 6vw, 4rem);\n  line-height: 1.1;\n}\n\n.prose {\n  max-width: 65ch;\n  font-size: 1rem;\n  line-height: 1.7;\n}\n\n.button {\n  min-height: 44px;\n  padding-inline: 1rem;\n}',
        },
        practice: {
          prompt: 'Create a .title that scales from 1.75rem to 3rem using clamp, and a .prose block limited to 70 characters wide.',
          hint: 'clamp(min, preferred, max).',
          solution: '.title { font-size: clamp(1.75rem, 5vw, 3rem); }\n.prose { max-width: 70ch; line-height: 1.7; }',
        },
        quiz: {
          question: 'Which CSS function creates fluid type between two limits?',
          options: ['calc()', 'var()', 'clamp()', 'minmax()'],
          answer: 2,
          explanation: 'clamp(min, preferred, max) keeps a value within a range.',
        },
      },
      {
        id: 'rwd-3',
        title: 'Responsive Navigation Patterns',
        minutes: 20,
        objectives: ['Build an accessible mobile menu', 'Manage focus and scroll locking'],
        sections: [
          {
            title: 'A drawer with real semantics',
            body: 'A mobile menu needs a real button with aria-expanded and aria-controls. When open, the menu should be reachable by keyboard, Escape should close it, and focus should return to the trigger. The overlay must not trap users permanently.',
          },
          {
            title: 'Respect the viewport',
            body: 'Use 100dvh rather than 100vh on mobile so browser chrome does not clip content. Lock background scrolling while a full-screen drawer is open, and ensure the layout never creates horizontal overflow. Break long words only inside code panels.',
          },
        ],
        code: {
          lang: 'css',
          source: '.drawer {\n  position: fixed;\n  inset-block: 0;\n  inset-inline-start: 0;\n  width: min(320px, 85vw);\n  height: 100dvh;\n  overflow-y: auto;\n  transform: translateX(-100%);\n  transition: transform 200ms ease;\n}\n\n.drawer.is-open {\n  transform: translateX(0);\n}\n\nbody.drawer-open {\n  overflow: hidden;\n}',
        },
        practice: {
          prompt: 'Style a full-height drawer that is at most 320px wide but never wider than 85 percent of the screen, with a slide transition.',
          hint: 'Use min(), 100dvh, and translateX.',
          solution: '.drawer {\n  position: fixed;\n  inset: 0 auto 0 0;\n  width: min(320px, 85vw);\n  height: 100dvh;\n  transform: translateX(-100%);\n  transition: transform 200ms ease;\n}\n.drawer.open { transform: none; }',
        },
        quiz: {
          question: 'Which attribute should a hamburger button expose to describe menu state?',
          options: ['aria-hidden', 'aria-expanded', 'role="menu" only', 'tabindex="-1"'],
          answer: 1,
          explanation: 'aria-expanded communicates whether the controlled menu is open.',
        },
      },
    ],
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Learn values, control flow, functions, and the building blocks of programs.',
    level: 'Beginner',
    duration: '2h 40m',
    badge: 'JS',
    accent: '#facc15',
    lessons: [
      {
        id: 'js-1',
        title: 'Values, Variables and Types',
        minutes: 20,
        objectives: ['Use let and const correctly', 'Understand primitive types and coercion'],
        sections: [
          {
            title: 'Bindings with intent',
            body: 'Use const for bindings that never need reassignment and let when they do. Avoid var in modern code because it is function-scoped and hoisted in a confusing way. JavaScript has seven primitive types: string, number, bigint, boolean, undefined, null, and symbol.',
          },
          {
            title: 'Loose versus strict equality',
            body: 'The double equals operator performs type coercion, so "5" == 5 is true. Prefer triple equals unless you deliberately need null and undefined treated together. typeof null returns "object", a historical bug you should simply remember.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const language = "JavaScript";\nlet level = 1;\nlevel += 1;\n\nconsole.log(typeof language); // "string"\nconsole.log(typeof level); // "number"\nconsole.log(typeof null); // "object"\n\nconsole.log("5" === 5); // false\nconsole.log(Number("5") === 5); // true',
        },
        practice: {
          prompt: 'Declare a constant name, a mutable score starting at 0, add 10 points, and log both values with their types.',
          hint: 'Use const for name, let for score, and typeof.',
          solution: 'const name = "Sam";\nlet score = 0;\nscore += 10;\nconsole.log(name, typeof name);\nconsole.log(score, typeof score);',
        },
        quiz: {
          question: 'What does typeof null return?',
          options: ['"null"', '"undefined"', '"object"', '"boolean"'],
          answer: 2,
          explanation: 'typeof null returns "object" due to a long-standing language quirk.',
        },
      },
      {
        id: 'js-2',
        title: 'Conditions and Logic',
        minutes: 22,
        objectives: ['Write clear if statements', 'Use logical operators and truthiness'],
        sections: [
          {
            title: 'Truthy and falsy values',
            body: 'Falsy values are false, 0, -0, 0n, "", null, undefined, and NaN. Everything else is truthy, including empty arrays and objects. Rely on explicit comparisons when the difference matters, and use ?? instead of || when zero or an empty string is a valid fallback value.',
          },
          {
            title: 'Guard clauses and switch',
            body: 'Return early to keep nested conditions shallow. Use switch for a fixed set of discrete values, and remember that each case needs break or return to avoid fall-through. A ternary is fine for a simple either/or expression, not for complex branching.',
          },
        ],
        code: {
          lang: 'js',
          source: 'function accessLabel(role) {\n  if (!role) return "Guest";\n  if (role === "admin") return "Full access";\n\n  switch (role) {\n    case "editor":\n      return "Can edit content";\n    case "viewer":\n      return "Read only";\n    default:\n      return "Unknown role";\n  }\n}\n\nconst volume = 0;\nconsole.log(volume || 10); // 10\nconsole.log(volume ?? 10); // 0',
        },
        practice: {
          prompt: 'Write grade(score) returning "A" for 90+, "B" for 80+, "C" for 70+, and "F" otherwise. Use guard clauses.',
          hint: 'Order checks from highest to lowest.',
          solution: 'function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "F";\n}',
        },
        quiz: {
          question: 'Which value is truthy?',
          options: ['0', '""', '[]', 'NaN'],
          answer: 2,
          explanation: 'Empty arrays are objects and therefore truthy.',
        },
      },
      {
        id: 'js-3',
        title: 'Loops and Iteration',
        minutes: 20,
        objectives: ['Choose the right loop', 'Use break and continue safely'],
        sections: [
          {
            title: 'for, for...of, and while',
            body: 'Use a classic for loop when you need an index. Prefer for...of for iterating values in arrays, strings, and other iterables. Use while when the number of iterations is unknown. Object iteration uses Object.entries or Object.keys because objects are not iterable directly.',
          },
          {
            title: 'Avoid off-by-one errors',
            body: 'The condition in a for loop is checked before each iteration. Starting at 0 and using index < length visits every item exactly once. Break exits the loop immediately; continue skips the rest of the current iteration. Infinite loops freeze the page, so make sure the condition can eventually fail.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const scores = [72, 95, 88, 61];\nlet total = 0;\n\nfor (const score of scores) {\n  if (score < 0) continue;\n  total += score;\n}\n\nfor (let i = 0; i < scores.length; i += 1) {\n  if (scores[i] > 90) {\n    console.log("High score at index", i);\n    break;\n  }\n}\n\nconsole.log(total / scores.length);',
        },
        practice: {
          prompt: 'Write sumEven(numbers) that adds only even numbers using a for...of loop.',
          hint: 'Check number % 2 === 0 before adding.',
          solution: 'function sumEven(numbers) {\n  let total = 0;\n  for (const number of numbers) {\n    if (number % 2 === 0) total += number;\n  }\n  return total;\n}',
        },
        quiz: {
          question: 'Which loop is best for visiting every value in an array when you do not need the index?',
          options: ['for (let i = 0; ...)', 'for...of', 'while (true)', 'do...while'],
          answer: 1,
          explanation: 'for...of reads values directly and avoids manual index management.',
        },
      },
      {
        id: 'js-4',
        title: 'Errors and Debugging',
        minutes: 18,
        objectives: ['Read error messages', 'Handle expected failures with try/catch'],
        sections: [
          {
            title: 'Read the stack trace',
            body: 'A TypeError usually means you accessed a property of null or undefined. A ReferenceError means the identifier is not defined. The stack trace lists the call path; start at the top line that points to your own file.',
          },
          {
            title: 'Fail predictably',
            body: 'Wrap operations that can throw, such as JSON.parse or fetch, in try/catch. Handle only errors you can meaningfully recover from. Throw new Error with a clear message for invalid input. In development, console.error preserves the stack; in production, report errors to a logging service.',
          },
        ],
        code: {
          lang: 'js',
          source: 'function parseSettings(raw) {\n  try {\n    const value = JSON.parse(raw);\n    if (typeof value !== "object" || value === null) {\n      throw new Error("Settings must be an object");\n    }\n    return value;\n  } catch (error) {\n    console.error("Invalid settings:", error.message);\n    return {};\n  }\n}\n\nconsole.log(parseSettings("{\\"theme\\":\\"dark\\"}"));\nconsole.log(parseSettings("not json"));',
        },
        practice: {
          prompt: 'Write safeParse(text, fallback) that returns parsed JSON or the fallback when parsing fails.',
          hint: 'Wrap JSON.parse in try/catch and return fallback in catch.',
          solution: 'function safeParse(text, fallback) {\n  try {\n    return JSON.parse(text);\n  } catch (error) {\n    return fallback;\n  }\n}',
        },
        quiz: {
          question: 'Which error occurs when calling a property on undefined?',
          options: ['SyntaxError', 'ReferenceError', 'TypeError', 'RangeError'],
          answer: 2,
          explanation: 'Accessing a property of undefined throws a TypeError.',
        },
      },
    ],
  },
  {
    id: 'javascript-dom',
    title: 'JavaScript DOM',
    description: 'Select, update, and respond to real page elements without a framework.',
    level: 'Intermediate',
    duration: '1h 45m',
    badge: 'DOM',
    accent: '#a78bfa',
    lessons: [
      {
        id: 'dom-1',
        title: 'Selecting and Updating Elements',
        minutes: 20,
        objectives: ['Use querySelector safely', 'Update text and attributes'],
        sections: [
          {
            title: 'Query once, store the reference',
            body: 'querySelector returns the first matching element or null. querySelectorAll returns a static NodeList, which supports forEach. Cache element references instead of querying inside loops or event handlers. Use textContent for plain text and setAttribute for attributes.',
          },
          {
            title: 'Do not build HTML from raw input',
            body: 'Setting innerHTML with user input creates cross-site scripting holes. Create elements with createElement and textContent, or sanitize with a trusted library. If markup is truly static and owned by you, innerHTML is acceptable.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const title = document.querySelector("#title");\nconst list = document.querySelector("#list");\n\ntitle.textContent = "Updated heading";\ntitle.dataset.state = "ready";\n\nconst item = document.createElement("li");\nitem.textContent = "New item";\nlist.append(item);\n\nconsole.log(document.querySelectorAll(".item").length);',
        },
        practice: {
          prompt: 'Select the element with id "message", change its text, add a class "visible", and set aria-live to "polite".',
          hint: 'Use textContent, classList, and setAttribute.',
          solution: 'const message = document.querySelector("#message");\nmessage.textContent = "Saved!";\nmessage.classList.add("visible");\nmessage.setAttribute("aria-live", "polite");',
        },
        quiz: {
          question: 'What does querySelector return when no element matches?',
          options: ['An empty array', 'undefined', 'null', 'A SyntaxError'],
          answer: 2,
          explanation: 'querySelector returns null when nothing matches.',
        },
      },
      {
        id: 'dom-2',
        title: 'Events and Delegation',
        minutes: 22,
        objectives: ['Attach event listeners', 'Use delegation for dynamic lists'],
        sections: [
          {
            title: 'Events bubble',
            body: 'Most events bubble from the target up through ancestors. A single listener on a container can handle clicks from many children by inspecting event.target.closest(selector). This is called event delegation and works for elements added later.',
          },
          {
            title: 'Prevent behaviour deliberately',
            body: 'Call event.preventDefault() to stop default browser behavior such as form submission or link navigation. Remove listeners with removeEventListener when the same function reference is available. Clean up listeners when a component unmounts.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const list = document.querySelector("#todo-list");\n\nlist.addEventListener("click", (event) => {\n  const button = event.target.closest("button[data-id]");\n  if (!button) return;\n  const item = button.closest("li");\n  item.remove();\n  console.log("Removed", button.dataset.id);\n});\n\nconst form = document.querySelector("#todo-form");\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const input = form.elements.title;\n  console.log(input.value.trim());\n});',
        },
        practice: {
          prompt: 'Add a click listener to a container that toggles the class "done" on the closest list item when a button inside is clicked.',
          hint: 'Use event.target.closest("li") and classList.toggle.',
          solution: 'container.addEventListener("click", (event) => {\n  const button = event.target.closest("button");\n  if (!button) return;\n  const item = button.closest("li");\n  if (item) item.classList.toggle("done");\n});',
        },
        quiz: {
          question: 'Why does event delegation work for elements added after the listener is attached?',
          options: ['The browser reattaches listeners automatically', 'Events bubble to the stable parent', 'The listener is cloned', 'MutationObserver handles it'],
          answer: 1,
          explanation: 'Events from new children bubble up to the existing parent listener.',
        },
      },
      {
        id: 'dom-3',
        title: 'Forms and Local State',
        minutes: 20,
        objectives: ['Read form values correctly', 'Render UI from state'],
        sections: [
          {
            title: 'Controlled UI in vanilla JavaScript',
            body: 'Keep a source-of-truth array or object in a variable, update it in event handlers, then re-render the affected DOM region. Handlers should describe an intent such as addTodo or toggleTodo rather than mutating the DOM in several places.',
          },
          {
            title: 'Forms and accessibility',
            body: 'Always prevent the default submit for client-side forms unless you want navigation. Trim user input, validate it, and show errors next to the field with aria-describedby. Use form.elements or new FormData to read values reliably.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const state = { todos: [] };\nconst list = document.querySelector("#list");\n\nfunction render() {\n  list.replaceChildren();\n  for (const todo of state.todos) {\n    const li = document.createElement("li");\n    li.textContent = todo.title;\n    list.append(li);\n  }\n}\n\nfunction addTodo(title) {\n  const clean = title.trim();\n  if (!clean) return;\n  state.todos.push({ id: Date.now(), title: clean, done: false });\n  render();\n}\n\nrender();',
        },
        practice: {
          prompt: 'Write renderCount(count) that replaces the contents of #count with a paragraph showing "Items: N".',
          hint: 'Create a p, set textContent, and replaceChildren.',
          solution: 'function renderCount(count) {\n  const target = document.querySelector("#count");\n  const p = document.createElement("p");\n  p.textContent = `Items: ${count}`;\n  target.replaceChildren(p);\n}',
        },
        quiz: {
          question: 'What is a safe way to insert untrusted user text into the DOM?',
          options: ['innerHTML', 'document.write', 'textContent', 'insertAdjacentHTML'],
          answer: 2,
          explanation: 'textContent treats input as text and does not parse HTML.',
        },
      },
    ],
  },
  {
    id: 'arrays-and-objects',
    title: 'JavaScript Arrays and Objects',
    description: 'Organize data and transform it with the array methods used daily.',
    level: 'Intermediate',
    duration: '2h 5m',
    badge: 'DATA',
    accent: '#34d399',
    lessons: [
      {
        id: 'arr-1',
        title: 'Array Methods That Matter',
        minutes: 24,
        objectives: ['Chain map, filter, and reduce', 'Know when a method mutates'],
        sections: [
          {
            title: 'Transform, select, combine',
            body: 'map creates a new array of the same length. filter keeps items that pass a test. reduce folds an array into one value. Chaining them keeps transformations readable: filter the data, map it into the shape you need, then reduce if necessary.',
          },
          {
            title: 'Mutation traps',
            body: 'push, pop, shift, unshift, splice, sort, and reverse mutate the original array. slice, concat, map, and filter do not. sort compares values as strings by default, so always provide a comparator for numbers. Copy before sorting when the original order matters.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const scores = [72, 95, 88, 61];\n\nconst passed = scores.filter((score) => score >= 70);\nconst curved = passed.map((score) => score + 5);\nconst total = curved.reduce((sum, score) => sum + score, 0);\n\nconsole.log(passed); // [72, 95, 88]\nconsole.log(curved); // [77, 100, 93]\nconsole.log(total / curved.length);\n\nconst sorted = [...scores].sort((a, b) => a - b);\nconsole.log(scores[0], sorted[0]);',
        },
        practice: {
          prompt: 'Given prices, return the total of all prices above 10, rounded to two decimals.',
          hint: 'Filter, then reduce.',
          solution: 'function expensiveTotal(prices) {\n  const total = prices\n    .filter((price) => price > 10)\n    .reduce((sum, price) => sum + price, 0);\n  return Math.round(total * 100) / 100;\n}',
        },
        quiz: {
          question: 'Which method returns a new array with the same number of elements?',
          options: ['filter', 'reduce', 'map', 'find'],
          answer: 2,
          explanation: 'map transforms each element and returns an array of equal length.',
        },
      },
      {
        id: 'arr-2',
        title: 'Objects and Destructuring',
        minutes: 20,
        objectives: ['Read and update object properties', 'Use destructuring defaults'],
        sections: [
          {
            title: 'Objects are keyed data',
            body: 'Access properties with dot notation when the key is known, and brackets when it is dynamic. Object.keys, Object.values, and Object.entries convert objects into iterable data. Spread creates a shallow copy, which is enough for flat objects but not for nested structures.',
          },
          {
            title: 'Destructuring and defaults',
            body: 'Destructuring extracts values into variables. Defaults apply only when a value is undefined, not when it is null. Rename with { name: userName }. Nested destructuring is convenient but keep it shallow for readability.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const user = { id: 7, name: "Ada", plan: "pro" };\nconst { name, plan = "free", email = "none" } = user;\n\nconst updated = { ...user, plan: "team" };\n\nfor (const [key, value] of Object.entries(updated)) {\n  console.log(key, value);\n}\n\nconsole.log(name, plan, email);\nconsole.log(updated);',
        },
        practice: {
          prompt: 'Write describe({ name, age }) returning "Name is N years old", with age defaulting to 0.',
          hint: 'Destructure in the parameter list with a default.',
          solution: 'function describe({ name = "Anonymous", age = 0 }) {\n  return `${name} is ${age} years old`;\n}',
        },
        quiz: {
          question: 'When does a destructuring default value apply?',
          options: ['When the value is null', 'When the value is undefined', 'When the value is falsy', 'Always'],
          answer: 1,
          explanation: 'Defaults apply only when the extracted value is undefined.',
        },
      },
      {
        id: 'arr-3',
        title: 'Nested Data Without Mutating',
        minutes: 22,
        objectives: ['Update nested objects immutably', 'Use find and findIndex'],
        sections: [
          {
            title: 'Why immutability matters',
            body: 'React and other UI systems compare references to decide what changed. Mutating an array in place leaves the reference unchanged, so the UI may not update. Create new arrays and objects at each level you change.',
          },
          {
            title: 'Updating a list of objects',
            body: 'Use map with an id check to update one item, filter to remove it, and spread to append. find returns the first match or undefined; findIndex returns its position. Always handle the not-found case explicitly.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const tasks = [\n  { id: 1, title: "Learn JS", done: false },\n  { id: 2, title: "Build UI", done: false },\n];\n\nconst toggled = tasks.map((task) =>\n  task.id === 1 ? { ...task, done: !task.done } : task\n);\n\nconst removed = toggled.filter((task) => task.id !== 2);\nconst found = removed.find((task) => !task.done);\n\nconsole.log(removed);\nconsole.log(found?.title);',
        },
        practice: {
          prompt: 'Write rename(items, id, title) returning a new array where the matching item has the new title.',
          hint: 'Use map and spread.',
          solution: 'function rename(items, id, title) {\n  return items.map((item) =>\n    item.id === id ? { ...item, title } : item\n  );\n}',
        },
        quiz: {
          question: 'What does find return when nothing matches?',
          options: ['null', 'undefined', 'An empty object', 'It throws'],
          answer: 1,
          explanation: 'find returns undefined when no element passes the test.',
        },
      },
    ],
  },
  {
    id: 'functions-and-scope',
    title: 'Functions and Scope',
    description: 'Write predictable functions and understand how scope and closures work.',
    level: 'Intermediate',
    duration: '1h 30m',
    badge: 'FN',
    accent: '#f472b6',
    lessons: [
      {
        id: 'fn-1',
        title: 'Parameters, Defaults and Pure Functions',
        minutes: 18,
        objectives: ['Design clear function signatures', 'Prefer pure functions'],
        sections: [
          {
            title: 'One job per function',
            body: 'A function should do one thing and do it well. Prefer returning a value over mutating an argument. Defaults make optional parameters explicit. A rest parameter collects remaining arguments into an array.',
          },
          {
            title: 'Purity and side effects',
            body: 'A pure function returns the same output for the same input and has no observable side effects. Pure functions are easier to test and reuse. Side effects such as network calls and DOM updates belong at the edges of your application.',
          },
        ],
        code: {
          lang: 'js',
          source: 'function subtotal(items, taxRate = 0) {\n  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);\n  return Math.round(total * (1 + taxRate) * 100) / 100;\n}\n\nfunction sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}\n\nconsole.log(subtotal([{ price: 10, qty: 2 }], 0.1));\nconsole.log(sum(1, 2, 3));',
        },
        practice: {
          prompt: 'Write discounted(price, percent = 0) that returns the price after a percentage discount, rounded to two decimals.',
          hint: 'Multiply by (1 - percent / 100).',
          solution: 'function discounted(price, percent = 0) {\n  return Math.round(price * (1 - percent / 100) * 100) / 100;\n}',
        },
        quiz: {
          question: 'Which property does a pure function have?',
          options: ['It logs to console', 'It always mutates input', 'Same input produces same output', 'It must be async'],
          answer: 2,
          explanation: 'Pure functions are deterministic and free of side effects.',
        },
      },
      {
        id: 'fn-2',
        title: 'Scope and Hoisting',
        minutes: 18,
        objectives: ['Distinguish block and function scope', 'Understand temporal dead zone'],
        sections: [
          {
            title: 'Where variables live',
            body: 'let and const are block-scoped, while var is function-scoped. A block is any pair of braces, including an if or for body. Inner scopes can read outer variables but not vice versa. Shadowing an outer variable with an inner declaration is legal but often confusing.',
          },
          {
            title: 'Hoisting',
            body: 'Function declarations are fully hoisted and can be called before their definition. let and const declarations are hoisted but stay in a temporal dead zone until initialised, so accessing them early throws a ReferenceError. var is hoisted and initialised to undefined.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const theme = "dark";\n\nfunction readTheme() {\n  return theme;\n}\n\n{\n  const theme = "light";\n  console.log(theme); // light\n}\n\nconsole.log(readTheme()); // dark\nconsole.log(typeof later); // undefined\nvar later = 1;\n\nfunction hoisted() {\n  return "works";\n}\nconsole.log(hoisted());',
        },
        practice: {
          prompt: 'Predict what logs: const value = 1; function show() { console.log(value); } { const value = 2; show(); } show();',
          hint: 'Closures capture where the function was defined.',
          solution: 'function show() {\n  console.log(value);\n}\nconst value = 1;\n{\n  const value = 2;\n  show(); // 1 - show closes over the outer value\n}\nshow(); // 1',
        },
        quiz: {
          question: 'What happens when you access a let variable before its declaration in the same scope?',
          options: ['It is undefined', 'It throws a ReferenceError', 'It returns null', 'It is hoisted with 0'],
          answer: 1,
          explanation: 'The variable is in the temporal dead zone and throws until initialised.',
        },
      },
      {
        id: 'fn-3',
        title: 'Closures in Practice',
        minutes: 20,
        objectives: ['Explain lexical closure', 'Avoid stale-state bugs'],
        sections: [
          {
            title: 'A function remembers its scope',
            body: 'A closure is a function plus the lexical environment where it was created. Even after the outer function returns, the inner function keeps access to its variables. This powers factories, memoization, and private state.',
          },
          {
            title: 'The loop variable trap',
            body: 'Callbacks created with var in a loop all close over the same variable, so they see its final value. Declaring the loop variable with let creates a fresh binding per iteration. This is one of the most common interview questions and real bugs.',
          },
        ],
        code: {
          lang: 'js',
          source: 'function createCounter() {\n  let count = 0;\n  return {\n    increment() {\n      count += 1;\n      return count;\n    },\n    reset() {\n      count = 0;\n    },\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment());\nconsole.log(counter.increment());\ncounter.reset();\nconsole.log(counter.increment());',
        },
        practice: {
          prompt: 'Write once(fn) that returns a wrapper invoking fn only on its first call and returning undefined afterwards.',
          hint: 'Keep a boolean in the closure.',
          solution: 'function once(fn) {\n  let called = false;\n  return function (...args) {\n    if (called) return undefined;\n    called = true;\n    return fn(...args);\n  };\n}',
        },
        quiz: {
          question: 'What does a closure keep access to?',
          options: ['Only global variables', 'The scope where it was defined', 'The scope where it is called', 'Nothing after the outer function returns'],
          answer: 1,
          explanation: 'Closures capture their lexical environment.',
        },
      },
    ],
  },
  {
    id: 'async-javascript',
    title: 'Async JavaScript',
    description: 'Coordinate timers, promises, and network requests without blocking the UI.',
    level: 'Intermediate',
    duration: '1h 40m',
    badge: 'ASYNC',
    accent: '#2dd4bf',
    lessons: [
      {
        id: 'async-1',
        title: 'The Event Loop and Promises',
        minutes: 22,
        objectives: ['Understand the call stack and task queue', 'Create and consume promises'],
        sections: [
          {
            title: 'One thread, many tasks',
            body: 'JavaScript runs on a single call stack. Timers, network responses, and user events are queued and executed when the stack is empty. Promise callbacks go into the microtask queue, which runs before the next macrotask such as a timer.',
          },
          {
            title: 'Promises represent future values',
            body: 'A promise is pending, fulfilled, or rejected. Attach handlers with then and catch, or use async/await. Promise.all waits for all promises and rejects if any fail. Promise.allSettled waits for all outcomes without rejecting.',
          },
        ],
        code: {
          lang: 'js',
          source: 'console.log("1");\n\nsetTimeout(() => console.log("2"), 0);\n\nPromise.resolve().then(() => console.log("3"));\n\nconsole.log("4");\n// 1, 4, 3, 2\n\nasync function fetchUser(id) {\n  const response = await fetch(`/api/users/${id}`);\n  if (!response.ok) throw new Error("Request failed");\n  return response.json();\n}',
        },
        practice: {
          prompt: 'Write wait(ms) returning a promise that resolves after the given number of milliseconds.',
          hint: 'Wrap setTimeout in new Promise.',
          solution: 'function wait(ms) {\n  return new Promise((resolve) => {\n    setTimeout(resolve, ms);\n  });\n}',
        },
        quiz: {
          question: 'Which queue runs first after the current call stack empties?',
          options: ['Timer queue', 'Microtask queue', 'Render queue', 'Network queue'],
          answer: 1,
          explanation: 'Microtasks such as promise callbacks run before timers.',
        },
      },
      {
        id: 'async-2',
        title: 'async and await',
        minutes: 20,
        objectives: ['Write readable async flows', 'Handle errors with try/catch'],
        sections: [
          {
            title: 'Syntactic sugar with real rules',
            body: 'An async function always returns a promise. await pauses the function until the promise settles, but does not block the main thread. Sequential awaits run one after another; use Promise.all when requests are independent to run them concurrently.',
          },
          {
            title: 'Error handling',
            body: 'A rejected awaited promise throws inside the async function. Wrap it in try/catch to recover. Do not swallow errors silently; log or surface a useful message. For parallel work, Promise.all rejects on the first failure, so catch per request when partial success matters.',
          },
        ],
        code: {
          lang: 'js',
          source: 'async function loadProfile(id) {\n  try {\n    const [user, posts] = await Promise.all([\n      fetch(`/api/users/${id}`).then((r) => r.json()),\n      fetch(`/api/users/${id}/posts`).then((r) => r.json()),\n    ]);\n    return { user, posts };\n  } catch (error) {\n    console.error("Could not load profile", error);\n    return null;\n  }\n}',
        },
        practice: {
          prompt: 'Write getTitles(urls) that fetches all URLs concurrently and returns an array of titles from the JSON responses.',
          hint: 'Map URLs to fetch promises and await Promise.all.',
          solution: 'async function getTitles(urls) {\n  const responses = await Promise.all(urls.map((url) => fetch(url)));\n  const data = await Promise.all(responses.map((response) => response.json()));\n  return data.map((item) => item.title);\n}',
        },
        quiz: {
          question: 'What does an async function always return?',
          options: ['The raw value', 'A promise', 'undefined', 'A callback'],
          answer: 1,
          explanation: 'Returned values are wrapped in a resolved promise.',
        },
      },
      {
        id: 'async-3',
        title: 'Fetching Data Safely',
        minutes: 20,
        objectives: ['Check HTTP status codes', 'Cancel and debounce requests'],
        sections: [
          {
            title: 'fetch does not reject on 404',
            body: 'fetch only rejects on network failure. A 404 or 500 still resolves, so check response.ok and handle status codes explicitly. Parse JSON in its own try/catch because an invalid body throws. Always show loading and error states in the UI.',
          },
          {
            title: 'Race conditions',
            body: 'When a search field triggers requests, an older response may arrive after a newer one. Use AbortController to cancel the previous request, or track a request id and ignore stale results. Debouncing input reduces the number of requests.',
          },
        ],
        code: {
          lang: 'js',
          source: 'let controller;\n\nasync function search(query) {\n  controller?.abort();\n  controller = new AbortController();\n\n  try {\n    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {\n      signal: controller.signal,\n    });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } catch (error) {\n    if (error.name === "AbortError") return [];\n    console.error(error);\n    return [];\n  }\n}',
        },
        practice: {
          prompt: 'Write loadJSON(url) that fetches a URL, throws a clear error for non-2xx responses, and returns parsed JSON.',
          hint: 'Check response.ok, then call response.json().',
          solution: 'async function loadJSON(url) {\n  const response = await fetch(url);\n  if (!response.ok) {\n    throw new Error(`Request failed with status ${response.status}`);\n  }\n  return response.json();\n}',
        },
        quiz: {
          question: 'When does fetch reject its promise?',
          options: ['On every 404', 'On any 4xx or 5xx', 'Only on network failure or abort', 'When JSON is invalid'],
          answer: 2,
          explanation: 'HTTP error statuses resolve normally; fetch rejects on network-level failures.',
        },
      },
    ],
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Think in components, render data declaratively, and build your first real interface.',
    level: 'Intermediate',
    duration: '2h 30m',
    badge: 'REACT',
    accent: '#38bdf8',
    lessons: [
      {
        id: 'react-1',
        title: 'Components and JSX',
        minutes: 22,
        objectives: ['Write a function component', 'Understand JSX rules'],
        sections: [
          {
            title: 'Components are functions',
            body: 'A React component is a JavaScript function that returns UI. Component names start with a capital letter so JSX can distinguish them from HTML tags. Components must return a single root node, which is often an empty fragment.',
          },
          {
            title: 'JSX is expression syntax',
            body: 'JSX looks like HTML but compiles to function calls. Use className instead of class, htmlFor instead of for, and curly braces for expressions. Every element must close, and adjacent elements need a wrapper or fragment.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function Badge({ label, tone = "neutral" }) {\n  return <span className={`badge badge--${tone}`}>{label}</span>;\n}\n\nfunction App() {\n  const user = { name: "Ada" };\n  return (\n    <main>\n      <h1>Welcome, {user.name}</h1>\n      <Badge label="Pro" tone="success" />\n    </main>\n  );\n}\n\nexport default App;',
        },
        practice: {
          prompt: 'Write a Greeting component that accepts a name prop and renders an h2 saying "Hello, name".',
          hint: 'Destructure props in the parameter list.',
          solution: 'function Greeting({ name }) {\n  return <h2>Hello, {name}</h2>;\n}\n\nexport default Greeting;',
        },
        quiz: {
          question: 'Why must component names begin with a capital letter?',
          options: ['React enforces a naming convention randomly', 'JSX treats lowercase names as DOM tags', 'It improves performance', 'It enables TypeScript'],
          answer: 1,
          explanation: 'Capitalised names tell JSX to render a component rather than an HTML tag.',
        },
      },
      {
        id: 'react-2',
        title: 'Rendering Lists and Conditionals',
        minutes: 20,
        objectives: ['Render arrays with stable keys', 'Choose readable conditional patterns'],
        sections: [
          {
            title: 'Keys identify list items',
            body: 'When you map data to elements, each element needs a key that is stable across renders. Use a database id, never the array index when items can reorder. Keys are used by React to match elements and preserve state correctly.',
          },
          {
            title: 'Conditional rendering',
            body: 'Use the ternary operator for either/or UI, the logical AND for optional UI, and early returns for larger branches. Be careful with && when the left side can be 0, because 0 renders. Explicit comparisons avoid surprises.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function LessonList({ lessons, loading }) {\n  if (loading) return <p>Loading lessons...</p>;\n  if (lessons.length === 0) return <p>No lessons yet.</p>;\n\n  return (\n    <ul>\n      {lessons.map((lesson) => (\n        <li key={lesson.id}>\n          {lesson.title}\n          {lesson.done ? <span> — complete</span> : null}\n        </li>\n      ))}\n    </ul>\n  );\n}',
        },
        practice: {
          prompt: 'Render a list of tags with stable keys, and show "No tags" when the array is empty.',
          hint: 'Check length before mapping.',
          solution: 'function Tags({ tags }) {\n  if (tags.length === 0) return <p>No tags</p>;\n  return (\n    <ul>\n      {tags.map((tag) => <li key={tag.id}>{tag.name}</li>)}\n    </ul>\n  );\n}',
        },
        quiz: {
          question: 'Which key is safest for a reorderable list?',
          options: ['Array index', 'Random number each render', 'Stable item id', 'Item title'],
          answer: 2,
          explanation: 'Stable ids let React track items correctly when order changes.',
        },
      },
      {
        id: 'react-3',
        title: 'Props and Component Composition',
        minutes: 20,
        objectives: ['Pass data and callbacks', 'Use the children prop'],
        sections: [
          {
            title: 'Props flow down',
            body: 'Props are read-only inputs. A child must not mutate props; instead, it calls a callback provided by the parent. Pass only the data a component needs, and keep prop names descriptive. Spreading arbitrary props into DOM elements can leak invalid attributes.',
          },
          {
            title: 'Composition over configuration',
            body: 'The children prop lets a component wrap arbitrary content. Specialised components can be built by composing smaller ones. Avoid giant components with dozens of boolean props; extract meaningful pieces instead.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function Panel({ title, children, onClose }) {\n  return (\n    <section className="panel">\n      <header>\n        <h2>{title}</h2>\n        <button onClick={onClose} aria-label="Close panel">Close</button>\n      </header>\n      <div>{children}</div>\n    </section>\n  );\n}\n\nfunction App() {\n  return (\n    <Panel title="Progress" onClose={() => console.log("closed")}>\n      <p>Four of eight lessons completed.</p>\n    </Panel>\n  );\n}',
        },
        practice: {
          prompt: 'Create a Card component that accepts title, children, and onSelect, rendering a button labelled title.',
          hint: 'Render children below the header.',
          solution: 'function Card({ title, children, onSelect }) {\n  return (\n    <article>\n      <button onClick={onSelect}>{title}</button>\n      <div>{children}</div>\n    </article>\n  );\n}',
        },
        quiz: {
          question: 'What is the correct way for a child to change parent data?',
          options: ['Mutate the prop object', 'Call a callback passed as a prop', 'Edit parent state directly', 'Use a global variable'],
          answer: 1,
          explanation: 'Props are read-only; callbacks communicate changes upward.',
        },
      },
      {
        id: 'react-4',
        title: 'Thinking in React',
        minutes: 18,
        objectives: ['Break a UI into a component tree', 'Place state at the right level'],
        sections: [
          {
            title: 'Start from the mockup',
            body: 'Draw boxes around distinct UI regions, name them, and arrange them into a tree. Identify the minimal state: data that changes over time and cannot be derived. Search text and filters are state; filtered results are derived.',
          },
          {
            title: 'Lift state when sharing',
            body: 'If two siblings need the same state, move it to their closest common ancestor and pass it down with callbacks. Avoid duplicating derived data in state because it can drift out of sync. Compute derived values during render.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function SearchableList({ items }) {\n  const [query, setQuery] = useState("");\n  const visible = items.filter((item) =>\n    item.title.toLowerCase().includes(query.toLowerCase())\n  );\n\n  return (\n    <div>\n      <label htmlFor="search">Search</label>\n      <input\n        id="search"\n        value={query}\n        onChange={(event) => setQuery(event.target.value)}\n      />\n      <p>{visible.length} results</p>\n    </div>\n  );\n}',
        },
        practice: {
          prompt: 'Given a list of products and a search input, describe which values should be state and which derived.',
          hint: 'Only the query needs state.',
          solution: 'Only the search query should live in state. The filtered product list is derived from products plus query during render. Products themselves come from props or data loading, not duplicated state.',
        },
        quiz: {
          question: 'Where should state live when two sibling components need it?',
          options: ['In each sibling', 'In their closest common ancestor', 'In a module variable', 'In the DOM'],
          answer: 1,
          explanation: 'Lifting shared state to the nearest common ancestor keeps components in sync.',
        },
      },
    ],
  },
  {
    id: 'react-components-props',
    title: 'React Components and Props',
    description: 'Design reusable, accessible components with clear contracts.',
    level: 'Intermediate',
    duration: '1h 30m',
    badge: 'CMP',
    accent: '#818cf8',
    lessons: [
      {
        id: 'cmp-1',
        title: 'Reusable Component APIs',
        minutes: 18,
        objectives: ['Design simple prop APIs', 'Provide sensible defaults'],
        sections: [
          {
            title: 'One clear reason to exist',
            body: 'A reusable component solves one visual or behavioral problem. Its props should describe intent, not implementation details. Prefer a small number of meaningful variants over many independent booleans.',
          },
          {
            title: 'Defaults and validation',
            body: 'Default parameters keep call sites short. In plain JavaScript, document the expected prop types and guard against missing data. Components should not crash when an optional list is undefined; fall back to an empty array.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function StatCard({ label, value, hint, tone = "brand" }) {\n  return (\n    <article className={`stat-card stat-card--${tone}`}>\n      <p className="stat-card__label">{label}</p>\n      <p className="stat-card__value">{value}</p>\n      {hint ? <p className="stat-card__hint">{hint}</p> : null}\n    </article>\n  );\n}\n\n<StatCard label="Total XP" value={1250} hint="Level 6" />;',
        },
        practice: {
          prompt: 'Create a Button component with variant ("primary" or "ghost"), disabled, and children props.',
          hint: 'Use a default parameter for variant.',
          solution: 'function Button({ variant = "primary", disabled = false, children, ...rest }) {\n  return (\n    <button className={`btn btn--${variant}`} disabled={disabled} {...rest}>\n      {children}\n    </button>\n  );\n}',
        },
        quiz: {
          question: 'Which prop API is usually better?',
          options: ['10 boolean props', 'A small variant prop with named values', 'Passing entire global state', 'No props at all'],
          answer: 1,
          explanation: 'A compact variant API communicates intent and avoids impossible combinations.',
        },
      },
      {
        id: 'cmp-2',
        title: 'Controlled Components',
        minutes: 20,
        objectives: ['Control inputs with state', 'Share input state with a parent'],
        sections: [
          {
            title: 'Value plus onChange',
            body: 'A controlled input receives its value from React state and reports changes through onChange. This makes validation and derived UI predictable. Never set value without onChange unless the input is intentionally read-only.',
          },
          {
            title: 'Forms and submission',
            body: 'Handle submit on the form and call event.preventDefault(). Collect values on submit or keep them in state as the user types. Give each field a label and an error message tied with aria-describedby when validation fails.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function EmailField({ value, onChange, error }) {\n  const id = "email";\n  return (\n    <div className="field">\n      <label htmlFor={id}>Email</label>\n      <input\n        id={id}\n        type="email"\n        value={value}\n        onChange={(event) => onChange(event.target.value)}\n        aria-invalid={Boolean(error)}\n        aria-describedby={error ? "email-error" : undefined}\n      />\n      {error ? <p id="email-error" role="alert">{error}</p> : null}\n    </div>\n  );\n}',
        },
        practice: {
          prompt: 'Write a controlled select for difficulty with value and onChange props and three options.',
          hint: 'The select value comes from props.',
          solution: 'function DifficultySelect({ value, onChange }) {\n  return (\n    <label>\n      Difficulty\n      <select value={value} onChange={(e) => onChange(e.target.value)}>\n        <option value="easy">Easy</option>\n        <option value="medium">Medium</option>\n        <option value="hard">Hard</option>\n      </select>\n    </label>\n  );\n}',
        },
        quiz: {
          question: 'What two props make a text input controlled?',
          options: ['defaultValue and ref', 'value and onChange', 'name and id', 'placeholder and required'],
          answer: 1,
          explanation: 'React drives the value and receives updates through onChange.',
        },
      },
      {
        id: 'cmp-3',
        title: 'Accessible Interactive Components',
        minutes: 20,
        objectives: ['Use native elements first', 'Manage ARIA only when needed'],
        sections: [
          {
            title: 'Native is accessible by default',
            body: 'Buttons respond to keyboard activation, links navigate, and inputs expose value semantics. A clickable div must manually recreate all of that. Prefer a button for actions and an anchor for navigation.',
          },
          {
            title: 'Custom widgets',
            body: 'For tabs, accordions, and dialogs, follow established ARIA authoring practices: roles, states, keyboard interaction, and focus management. A modal should trap focus, close on Escape, and restore focus to the trigger when dismissed.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function Accordion({ items }) {\n  const [openId, setOpenId] = useState(null);\n\n  return items.map((item) => {\n    const open = openId === item.id;\n    return (\n      <div key={item.id}>\n        <h3>\n          <button\n            aria-expanded={open}\n            aria-controls={`panel-${item.id}`}\n            onClick={() => setOpenId(open ? null : item.id)}\n          >\n            {item.title}\n          </button>\n        </h3>\n        <div id={`panel-${item.id}`} hidden={!open}>\n          {item.content}\n        </div>\n      </div>\n    );\n  });\n}',
        },
        practice: {
          prompt: 'Describe the required behavior of an accessible modal dialog.',
          hint: 'Think focus, keyboard, and labels.',
          solution: 'An accessible dialog needs role="dialog" and aria-modal="true", an accessible name via aria-labelledby, focus moved into the dialog, focus trapped while open, Escape to close, and focus restored to the trigger. Background scroll should be locked and the dialog must be usable by keyboard.',
        },
        quiz: {
          question: 'Which element should you use for an action that opens a menu?',
          options: ['div', 'span', 'button', 'a without href'],
          answer: 2,
          explanation: 'A button provides keyboard activation and correct semantics.',
        },
      },
    ],
  },
  {
    id: 'react-state-hooks',
    title: 'React State and Hooks',
    description: 'Manage state, side effects, and shared context with the core React hooks.',
    level: 'Intermediate',
    duration: '2h 15m',
    badge: 'HOOKS',
    accent: '#e879f9',
    lessons: [
      {
        id: 'hooks-1',
        title: 'useState in Depth',
        minutes: 22,
        objectives: ['Update state correctly', 'Use functional updates'],
        sections: [
          {
            title: 'State updates are asynchronous',
            body: 'Calling setState schedules a render; the variable does not change immediately. When the next value depends on the previous one, use a functional updater: setCount((count) => count + 1). Calling setCount(count + 1) twice in one handler still increments once.',
          },
          {
            title: 'Objects and arrays',
            body: 'React compares state by reference. Return a new object or array when updating: setUser((user) => ({ ...user, name: "Ada" })). Never mutate state directly. Keep state minimal and derive everything else during render.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'function Counter() {\n  const [count, setCount] = useState(0);\n\n  function incrementTwice() {\n    setCount((value) => value + 1);\n    setCount((value) => value + 1);\n  }\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={incrementTwice}>Add two</button>\n    </div>\n  );\n}',
        },
        practice: {
          prompt: 'Add a toggleItem(items, id) updater that returns a new array with the matching item toggled.',
          hint: 'Use map inside the functional updater.',
          solution: 'setItems((items) =>\n  items.map((item) =>\n    item.id === id ? { ...item, done: !item.done } : item\n  )\n);',
        },
        quiz: {
          question: 'Why should two increments in one handler use functional updates?',
          options: ['It is shorter', 'Both use the same stale state value otherwise', 'It triggers two renders intentionally', 'React requires it always'],
          answer: 1,
          explanation: 'Functional updates receive the latest queued value.',
        },
      },
      {
        id: 'hooks-2',
        title: 'useEffect and Cleanup',
        minutes: 24,
        objectives: ['Create effects for external systems', 'Clean up subscriptions'],
        sections: [
          {
            title: 'Effects synchronize with the outside world',
            body: 'Use useEffect for things outside React: timers, event listeners, document title, or fetching. An effect runs after render. The dependency array controls when it re-runs; omit it to run after every render, or use [] to run once after mount.',
          },
          {
            title: 'Always clean up',
            body: 'Return a cleanup function to remove listeners, clear timers, and abort requests. In development, effects run twice under StrictMode to expose missing cleanup. Ignoring that warning often causes duplicate subscriptions in production.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'useEffect(() => {\n  document.title = `${count} clicks`;\n}, [count]);\n\nuseEffect(() => {\n  function onKeyDown(event) {\n    if (event.key === "Escape") setOpen(false);\n  }\n  window.addEventListener("keydown", onKeyDown);\n  return () => window.removeEventListener("keydown", onKeyDown);\n}, []);\n\nuseEffect(() => {\n  const timer = setTimeout(() => setVisible(false), 3000);\n  return () => clearTimeout(timer);\n}, []);',
        },
        practice: {
          prompt: 'Write an effect that listens for window resize and cleans up the listener.',
          hint: 'Return a cleanup function.',
          solution: 'useEffect(() => {\n  function onResize() {\n    setWidth(window.innerWidth);\n  }\n  window.addEventListener("resize", onResize);\n  return () => window.removeEventListener("resize", onResize);\n}, []);',
        },
        quiz: {
          question: 'What does an empty dependency array do?',
          options: ['Runs the effect after every render', 'Runs once after mount', 'Prevents the effect', 'Runs before render'],
          answer: 1,
          explanation: 'An empty dependency array runs the effect once after the initial render.',
        },
      },
      {
        id: 'hooks-3',
        title: 'useMemo, useCallback and Refs',
        minutes: 20,
        objectives: ['Avoid unnecessary work', 'Access DOM nodes and mutable values with refs'],
        sections: [
          {
            title: 'Measure before optimizing',
            body: 'useMemo caches a computed value and useCallback caches a function identity. They help when a calculation is expensive or a memoized child depends on reference equality. Adding them everywhere makes code noisier and can cost more than it saves.',
          },
          {
            title: 'Refs are not state',
            body: 'useRef returns a mutable object that persists across renders. Changing .current does not trigger a render. Use refs for DOM access, timers, and previous values. Do not read or write refs during render unless you are initialising them.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'const inputRef = useRef(null);\nconst renderCount = useRef(0);\nrenderCount.current += 1;\n\nconst visibleTasks = useMemo(\n  () => tasks.filter((task) => !task.done),\n  [tasks]\n);\n\nconst handleSelect = useCallback((id) => {\n  setSelectedId(id);\n}, []);\n\nfunction focusSearch() {\n  inputRef.current?.focus();\n}\n\n<input ref={inputRef} aria-label="Search" />;',
        },
        practice: {
          prompt: 'Use a ref to focus an input when a button is clicked without using state.',
          hint: 'Create the ref, attach it, and call focus in the handler.',
          solution: 'const inputRef = useRef(null);\n\nfunction focus() {\n  inputRef.current?.focus();\n}\n\n<>\n  <input ref={inputRef} aria-label="Name" />\n  <button onClick={focus}>Focus name</button>\n</>;',
        },
        quiz: {
          question: 'What happens when you change ref.current?',
          options: ['The component re-renders', 'Nothing renders automatically', 'React throws', 'The effect runs'],
          answer: 1,
          explanation: 'Ref mutations do not trigger renders.',
        },
      },
      {
        id: 'hooks-4',
        title: 'Context and Custom Hooks',
        minutes: 22,
        objectives: ['Share data without prop drilling', 'Extract reusable hook logic'],
        sections: [
          {
            title: 'Context for app-wide concerns',
            body: 'Context is useful for theme, authentication, and settings. It is not a replacement for all state management. A context value that changes frequently re-renders every consumer, so keep it small and combine it with memoization when needed.',
          },
          {
            title: 'Custom hooks',
            body: 'A custom hook is a function starting with "use" that calls other hooks. It shares logic, not state; each call gets its own state. Extract a hook when the same effect and state pattern appears in multiple components.',
          },
        ],
        code: {
          lang: 'jsx',
          source: 'const ThemeContext = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("dark");\n  const value = useMemo(() => ({ theme, setTheme }), [theme]);\n  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;\n}\n\nfunction useTheme() {\n  const context = useContext(ThemeContext);\n  if (!context) throw new Error("useTheme must be used inside ThemeProvider");\n  return context;\n}\n\nfunction useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    try {\n      return JSON.parse(localStorage.getItem(key)) ?? initial;\n    } catch {\n      return initial;\n    }\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}',
        },
        practice: {
          prompt: 'Write a useToggle(initial = false) hook returning the value and a toggle function.',
          hint: 'Use useState with a functional updater.',
          solution: 'function useToggle(initial = false) {\n  const [value, setValue] = useState(initial);\n  const toggle = useCallback(() => setValue((v) => !v), []);\n  return [value, toggle];\n}',
        },
        quiz: {
          question: 'Which naming rule applies to custom hooks?',
          options: ['They must end with Hook', 'They must start with use', 'They must be lowercase', 'Any name works'],
          answer: 1,
          explanation: 'The use prefix lets React lint rules enforce hook rules.',
        },
      },
    ],
  },
  {
    id: 'frontend-project-building',
    title: 'Frontend Project Building',
    description: 'Plan, build, test, and ship a complete frontend project with confidence.',
    level: 'Advanced',
    duration: '2h 10m',
    badge: 'SHIP',
    accent: '#fb923c',
    lessons: [
      {
        id: 'proj-1',
        title: 'Planning and Architecture',
        minutes: 22,
        objectives: ['Write a useful project brief', 'Choose a folder structure'],
        sections: [
          {
            title: 'Define the smallest valuable version',
            body: 'Write down the user problem, the three main user flows, and what is explicitly out of scope. A short brief prevents scope creep. Build one vertical slice end to end before polishing any single screen.',
          },
          {
            title: 'Structure follows responsibilities',
            body: 'Group files by feature as the app grows: components, pages, hooks, utils, and data. Keep data access in one place. Avoid creating folders for a single file unless the boundary is real. Naming should reveal intent, not history.',
          },
        ],
        code: {
          lang: 'text',
          source: 'Brief\n- Problem: learners cannot practice JS in the browser\n- Flows: open challenge, write solution, run tests, see result\n- Out of scope: accounts, payments, multiplayer\n\nStructure\nsrc/\n  components/   reusable UI\n  pages/        route screens\n  hooks/        shared behavior\n  data/         static content\n  utils/        pure helpers',
        },
        practice: {
          prompt: 'Write a three-line brief for a habit tracker: the problem, one core flow, and one out-of-scope item.',
          hint: 'Keep it specific and short.',
          solution: 'Problem: users forget to track daily habits.\nCore flow: add a habit, mark it done for today, see a weekly streak.\nOut of scope: social sharing and notifications in v1.',
        },
        quiz: {
          question: 'What should you build first in a new project?',
          options: ['Every page as a static mockup', 'One complete vertical slice', 'All settings screens', 'A design system with 50 components'],
          answer: 1,
          explanation: 'An end-to-end slice validates the architecture and core value early.',
        },
      },
      {
        id: 'proj-2',
        title: 'State, Persistence and Failure',
        minutes: 22,
        objectives: ['Design a storage boundary', 'Handle corrupted data'],
        sections: [
          {
            title: 'One storage module',
            body: 'Centralise localStorage access in a module with load, save, and reset functions. Components should call semantic actions, not read raw keys. Include a schema version so migrations are possible later.',
          },
          {
            title: 'Assume data will be corrupted',
            body: 'Always wrap JSON.parse in try/catch. Validate imported data and fall back to defaults. Show the user a recovery message and offer export or reset. Never let one bad value crash the entire application.',
          },
        ],
        code: {
          lang: 'js',
          source: 'const KEY = "app.state.v1";\n\nexport function load() {\n  try {\n    const raw = localStorage.getItem(KEY);\n    if (!raw) return defaults();\n    const parsed = JSON.parse(raw);\n    return { ...defaults(), ...parsed };\n  } catch {\n    return defaults();\n  }\n}\n\nexport function save(state) {\n  try {\n    localStorage.setItem(KEY, JSON.stringify(state));\n    return { ok: true };\n  } catch {\n    return { ok: false, message: "Storage is unavailable" };\n  }\n}',
        },
        practice: {
          prompt: 'Write safeRead(key, fallback) that returns parsed JSON or the fallback without throwing.',
          hint: 'try/catch around parse.',
          solution: 'function safeRead(key, fallback) {\n  try {\n    const raw = localStorage.getItem(key);\n    if (!raw) return fallback;\n    return JSON.parse(raw);\n  } catch {\n    return fallback;\n  }\n}',
        },
        quiz: {
          question: 'Why include a schema version in local storage?',
          options: ['To compress data', 'To support safe migrations later', 'To encrypt values', 'To speed up parsing'],
          answer: 1,
          explanation: 'A version lets future code detect and migrate older data shapes.',
        },
      },
      {
        id: 'proj-3',
        title: 'Testing and Shipping',
        minutes: 20,
        objectives: ['Test critical user flows', 'Ship with a review checklist'],
        sections: [
          {
            title: 'Test behavior, not implementation',
            body: 'Focus tests on what a user can do: create an item, submit a form, see an error. Pure utility functions are cheap to test and catch most logic errors. Manually test the critical path at the smallest supported viewport.',
          },
          {
            title: 'A pre-ship checklist',
            body: 'Run the production build, check console errors, verify every link and button, test empty states, refresh with saved data, and confirm keyboard navigation. Review the diff for accidental logging, secrets, and dead code.',
          },
        ],
        code: {
          lang: 'text',
          source: 'Pre-ship checklist\n[ ] npm run build succeeds\n[ ] No console errors on main routes\n[ ] Saved data survives refresh\n[ ] Empty states are usable\n[ ] Keyboard navigation works\n[ ] 320px layout has no horizontal overflow\n[ ] Export/import validates input\n[ ] No secrets or debug logs',
        },
        practice: {
          prompt: 'List three critical flows you would test before shipping a learning platform.',
          hint: 'Think about the core value and data safety.',
          solution: '1. Complete a lesson and verify XP and progress survive a refresh.\n2. Solve a challenge, submit a wrong answer, then a correct one and verify no duplicate XP.\n3. Create, edit, reload, and delete a project with confirmation.',
        },
        quiz: {
          question: 'Which test gives the best confidence for the least effort?',
          options: ['Pixel-perfect snapshot of every page', 'Critical user flow plus pure logic tests', 'Testing private function names', 'Screenshot of the code editor'],
          answer: 1,
          explanation: 'Critical flows plus pure logic catch the failures that actually block users.',
        },
      },
    ],
  },
  {
    id: 'algorithm-fundamentals',
    title: 'Algorithm Fundamentals',
    description: 'Build a problem-solving process and recognize classic patterns.',
    level: 'Beginner',
    duration: '2h 20m',
    badge: 'ALGO',
    accent: '#f87171',
    lessons: [
      {
        id: 'algo-1',
        title: 'A Repeatable Problem-Solving Process',
        minutes: 20,
        objectives: ['Restate a problem precisely', 'Test edge cases before coding'],
        sections: [
          {
            title: 'Understand before you code',
            body: 'Restate the input, output, and constraints in your own words. Work through one small example by hand. Write down edge cases: empty input, one item, duplicates, negative numbers, and very large values. Only then choose an approach.',
          },
          {
            title: 'Complexity is about growth',
            body: 'Big O describes how work grows as input grows. O(1) is constant, O(n) grows linearly, O(n log n) is typical for efficient sorting, and O(n squared) comes from nested loops over the same data. Constants matter in practice, but growth decides scalability.',
          },
        ],
        code: {
          lang: 'js',
          source: '// Problem: return the largest value in an array\n// Inputs: numbers (may be empty)\n// Output: number | null\n// Constraints: do not mutate input\n\nfunction max(numbers) {\n  if (numbers.length === 0) return null;\n  let best = numbers[0];\n  for (const number of numbers) {\n    if (number > best) best = number;\n  }\n  return best;\n}\n\nconsole.log(max([3, 9, 2])); // 9',
        },
        practice: {
          prompt: 'For "count how many words in a sentence", list the input, output, and two edge cases.',
          hint: 'Think about empty strings and extra spaces.',
          solution: 'Input: a string sentence.\nOutput: number of words.\nEdge cases: empty or whitespace-only string returns 0; multiple consecutive spaces should not create empty words.',
        },
        quiz: {
          question: 'What does O(n) mean?',
          options: ['The algorithm takes n seconds', 'Work grows linearly with input size', 'The algorithm uses n variables', 'It always runs once'],
          answer: 1,
          explanation: 'Big O describes growth relative to input size.',
        },
      },
      {
        id: 'algo-2',
        title: 'Two Pointers and Sliding Window',
        minutes: 22,
        objectives: ['Use two pointers on sorted data', 'Maintain a window over a sequence'],
        sections: [
          {
            title: 'Two pointers',
            body: 'With sorted data, one pointer at each end can find pairs or reverse arrays in linear time. Move the pointer that improves the current sum. This replaces a nested loop and reduces O(n squared) to O(n).',
          },
          {
            title: 'Sliding window',
            body: 'A window is a contiguous range that expands and shrinks. To find the longest substring without repeating characters, expand the right edge, and while the window is invalid, move the left edge. Track the best length seen.',
          },
        ],
        code: {
          lang: 'js',
          source: 'function hasPairSum(sorted, target) {\n  let left = 0;\n  let right = sorted.length - 1;\n  while (left < right) {\n    const sum = sorted[left] + sorted[right];\n    if (sum === target) return true;\n    if (sum < target) left += 1;\n    else right -= 1;\n  }\n  return false;\n}\n\nconsole.log(hasPairSum([1, 2, 4, 7], 6)); // true',
        },
        practice: {
          prompt: 'Write longestUnique(text) returning the length of the longest substring without repeating characters.',
          hint: 'Use a Set and a left pointer.',
          solution: 'function longestUnique(text) {\n  const seen = new Set();\n  let left = 0;\n  let best = 0;\n  for (let right = 0; right < text.length; right += 1) {\n    while (seen.has(text[right])) {\n      seen.delete(text[left]);\n      left += 1;\n    }\n    seen.add(text[right]);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}',
        },
        quiz: {
          question: 'What precondition makes the two-pointer pair-sum pattern work?',
          options: ['The array is sorted', 'The array has duplicates', 'The array is empty', 'The array contains strings'],
          answer: 0,
          explanation: 'Sorted order lets you decide which pointer to move.',
        },
      },
      {
        id: 'algo-3',
        title: 'Frequency Maps and Sets',
        minutes: 20,
        objectives: ['Count occurrences efficiently', 'Trade space for time'],
        sections: [
          {
            title: 'Hash maps turn search into lookup',
            body: 'A Map or plain object stores counts by key in average O(1) lookup time. Counting characters, finding duplicates, and grouping items all use this pattern. A Set answers "have I seen this?" quickly.',
          },
          {
            title: 'The space tradeoff',
            body: 'Frequency maps use O(k) extra space for k distinct values. That is usually a good trade for removing a nested loop. Remember that object keys are strings; use Map when keys may be objects or when insertion order matters in a specific way.',
          },
        ],
        code: {
          lang: 'js',
          source: 'function firstDuplicate(items) {\n  const seen = new Set();\n  for (const item of items) {\n    if (seen.has(item)) return item;\n    seen.add(item);\n  }\n  return null;\n}\n\nfunction charCount(text) {\n  const counts = new Map();\n  for (const char of text) {\n    counts.set(char, (counts.get(char) || 0) + 1);\n  }\n  return counts;\n}\n\nconsole.log(firstDuplicate([5, 1, 3, 1, 5])); // 1\nconsole.log([...charCount("aab")]);',
        },
        practice: {
          prompt: 'Write areAnagrams(a, b) that compares character counts, ignoring case and spaces.',
          hint: 'Normalize with toLowerCase and replace, then compare Maps.',
          solution: 'function areAnagrams(a, b) {\n  const normalize = (text) => text.toLowerCase().replace(/\\s/g, "");\n  const left = normalize(a);\n  const right = normalize(b);\n  if (left.length !== right.length) return false;\n  const counts = new Map();\n  for (const c of left) counts.set(c, (counts.get(c) || 0) + 1);\n  for (const c of right) {\n    if (!counts.get(c)) return false;\n    counts.set(c, counts.get(c) - 1);\n  }\n  return true;\n}',
        },
        quiz: {
          question: 'What is the average time complexity of a Map lookup?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          answer: 0,
          explanation: 'Hash-based maps provide average constant-time lookups.',
        },
      },
      {
        id: 'algo-4',
        title: 'Recursion and Problem Breakdown',
        minutes: 22,
        objectives: ['Write a base case and recursive step', 'Avoid repeated work'],
        sections: [
          {
            title: 'Recursion needs a stopping point',
            body: 'A recursive function solves a smaller version of the same problem and combines the result. Every recursive function needs a base case that returns without calling itself. Without it, the call stack grows until the engine throws a RangeError.',
          },
          {
            title: 'Memoization',
            body: 'Naive recursion can repeat the same subproblems exponentially. Memoization caches results by input. Fibonacci without caching is O(2^n); with a cache it becomes O(n) time and O(n) space. Iterative solutions often use less memory.',
          },
        ],
        code: {
          lang: 'js',
          source: 'function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfunction fibonacci(n, cache = new Map()) {\n  if (n <= 1) return n;\n  if (cache.has(n)) return cache.get(n);\n  const value = fibonacci(n - 1, cache) + fibonacci(n - 2, cache);\n  cache.set(n, value);\n  return value;\n}\n\nconsole.log(factorial(5)); // 120\nconsole.log(fibonacci(30)); // 832040',
        },
        practice: {
          prompt: 'Write a recursive sumArray(numbers) that returns 0 for an empty array.',
          hint: 'Base case: length 0. Recursive step: first plus sum of the rest.',
          solution: 'function sumArray(numbers) {\n  if (numbers.length === 0) return 0;\n  return numbers[0] + sumArray(numbers.slice(1));\n}',
        },
        quiz: {
          question: 'What happens without a base case in recursion?',
          options: ['It returns 0', 'The call stack overflows', 'It becomes iterative', 'JavaScript optimizes it'],
          answer: 1,
          explanation: 'Endless recursive calls exhaust the call stack.',
        },
      },
    ],
  },
];

export const allLessons = courses.flatMap((course) =>
  course.lessons.map((lesson) => ({
    ...lesson,
    courseId: course.id,
    courseTitle: course.title,
    accent: course.accent,
  }))
);

export const getCourse = (courseId) => courses.find((course) => course.id === courseId) || null;

export const getLesson = (courseId, lessonId) => {
  const course = getCourse(courseId);
  if (!course) return null;
  const lesson = course.lessons.find((item) => item.id === lessonId);
  return lesson ? { ...lesson, courseId: course.id, courseTitle: course.title } : null;
};

export const totalLessons = allLessons.length;
