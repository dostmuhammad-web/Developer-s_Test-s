export function basicFormat(source) {
  if (!source) return '';
  return source
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*\n/, '')
    .trimEnd();
}

export function makePreviewDoc({ html, css, js }) {
  const token =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `t-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const safeCss = String(css || '').replace(/<\/style/gi, '<\\/style');
  const safeJs = JSON.stringify(String(js || '')).replace(/<\/script/gi, '<\\/script');

  const bootstrap = `
(function () {
  var TOKEN = ${JSON.stringify(token)};
  function serialize(value) {
    try {
      if (typeof value === 'string') return value;
      if (value instanceof Error) return value.message;
      if (typeof value === 'undefined') return 'undefined';
      if (typeof value === 'function') return '[function ' + (value.name || 'anonymous') + ']';
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }
  function send(type, args) {
    try {
      parent.postMessage({
        __devverse: TOKEN,
        type: type,
        args: Array.prototype.map.call(args, serialize)
      }, '*');
    } catch (error) {}
  }
  ['log', 'warn', 'error', 'info'].forEach(function (method) {
    var original = console[method];
    console[method] = function () {
      send(method, arguments);
      if (original) original.apply(console, arguments);
    };
  });
  window.addEventListener('error', function (event) {
    send('error', [event.message + (event.lineno ? ' (line ' + event.lineno + ')' : '')]);
  });
  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason;
    send('error', ['Unhandled promise rejection: ' + (reason && reason.message ? reason.message : reason)]);
  });
  window.__DEVVERSE_TOKEN__ = TOKEN;
})();
`;

  return {
    token,
    doc: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>${safeCss}</style>
<script>${bootstrap}</script>
</head>
<body>
${String(html || '')}
<script>
(function () {
  try {
    (new Function(${safeJs}))();
  } catch (error) {
    var token = window.__DEVVERSE_TOKEN__;
    parent.postMessage({
      __devverse: token,
      type: 'error',
      args: [error && error.message ? error.message : String(error)]
    }, '*');
  }
})();
</script>
</body>
</html>`,
  };
}
