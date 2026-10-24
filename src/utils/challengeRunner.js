function deepEqual(a, b) {
  if (a === b) return true;
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((value, index) => deepEqual(value, b[index]));
  }
  if (typeof a === 'object') {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key]));
  }
  return false;
}

function safeDisplay(value) {
  try {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) return String(value);
    return serialized.length > 300 ? `${serialized.slice(0, 297)}...` : serialized;
  } catch (error) {
    return String(value);
  }
}

const workerSource = `
self.onmessage = function (event) {
  var data = event.data || {};
  var source = data.source;
  var functionName = data.functionName;
  var tests = data.tests || [];

  function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) return true;
    if (typeof a !== typeof b) return false;
    if (a === null || b === null) return false;
    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; i += 1) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }
    if (typeof a === 'object') {
      var aKeys = Object.keys(a);
      var bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      for (var j = 0; j < aKeys.length; j += 1) {
        var key = aKeys[j];
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (!deepEqual(a[key], b[key])) return false;
      }
      return true;
    }
    return false;
  }

  function display(value) {
    try {
      var serialized = JSON.stringify(value);
      if (serialized === undefined) return String(value);
      return serialized.length > 300 ? serialized.slice(0, 297) + '...' : serialized;
    } catch (error) {
      return String(value);
    }
  }

  try {
    if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(functionName)) {
      throw new Error('Invalid challenge function name');
    }
    var factory = new Function(source + '\\nreturn typeof ' + functionName + ' === "function" ? ' + functionName + ' : undefined;');
    var fn = factory();
    if (typeof fn !== 'function') {
      self.postMessage({
        ok: false,
        error: 'Define a function named "' + functionName + '".',
        results: []
      });
      return;
    }

    var results = [];
    for (var index = 0; index < tests.length; index += 1) {
      var test = tests[index];
      var args = test.args || [];
      var inputLabel = display(args);
      try {
        var actual = fn.apply(null, args);
        var passed = deepEqual(actual, test.expected);
        results.push({
          index: index,
          passed: passed,
          input: inputLabel,
          expected: display(test.expected),
          actual: display(actual)
        });
      } catch (error) {
        results.push({
          index: index,
          passed: false,
          input: inputLabel,
          expected: display(test.expected),
          actual: 'Threw: ' + (error && error.message ? error.message : String(error))
        });
      }
    }
    self.postMessage({ ok: true, results: results });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: (error && error.message) ? error.message : String(error),
      results: []
    });
  }
};
`;

export function runChallengeTests(challenge, source, timeout = 2500) {
  return new Promise((resolve) => {
    let worker;
    let url;
    let settled = false;
    let timer;

    const finish = (payload) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (worker) worker.terminate();
      if (url) URL.revokeObjectURL(url);
      resolve(payload);
    };

    try {
      const blob = new Blob([workerSource], { type: 'text/javascript' });
      url = URL.createObjectURL(blob);
      worker = new Worker(url);
      timer = setTimeout(() => {
        finish({
          ok: false,
          error: 'Time limit reached. Check for an infinite loop or very slow code.',
          results: [],
          timedOut: true,
        });
      }, timeout);
      worker.onmessage = (event) => finish(event.data);
      worker.onerror = (event) => {
        finish({
          ok: false,
          error: event.message || 'The isolated test runner failed.',
          results: [],
        });
      };
      worker.postMessage({
        source,
        functionName: challenge.functionName,
        tests: challenge.tests,
      });
    } catch (error) {
      finish({
        ok: false,
        error: 'Your browser could not start the isolated test runner.',
        results: [],
      });
    }
  });
}

export { deepEqual, safeDisplay };
