import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import CodeEditor from '../components/editor/CodeEditor';
import { getChallenge } from '../data/challenges';
import { useAppData } from '../hooks/useAppData';
import { useToast } from '../hooks/useToast';
import { runChallengeTests } from '../utils/challengeRunner';
import { formatRelative } from '../utils/stats';

const tone = { Easy: 'success', Medium: 'warning', Hard: 'danger' };

export default function ChallengeDetail() {
  const { challengeId } = useParams();
  const challenge = getChallenge(challengeId);
  const { state, solveChallenge, updateSettings } = useAppData();
  const { pushToast } = useToast();
  const [code, setCode] = useState(challenge ? challenge.starter : '');
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setCode(challenge ? challenge.starter : '');
    setResults(null);
    setAttempts(0);
    setShowHint(false);
  }, [challenge]);

  if (!challenge) {
    return (
      <div className="page">
        <EmptyState
          icon="challenges"
          title="Challenge not found"
          description="This challenge does not exist. Browse the full challenge library to find another problem."
          action={
            <Link to="/challenges" className="btn btn--primary">
              Browse challenges
            </Link>
          }
        />
      </div>
    );
  }

  const solvedInfo = state.solvedChallenges[challenge.id];
  const solved = Boolean(solvedInfo);
  const allPassed = Boolean(results && results.ok && results.results.length > 0 && results.results.every((test) => test.passed));
  const passedCount = results && results.results ? results.results.filter((test) => test.passed).length : 0;

  const run = async () => {
    if (running) return;
    setRunning(true);
    const result = await runChallengeTests(challenge, code);
    setResults(result);
    setAttempts((value) => value + 1);
    setRunning(false);

    if (result.ok && result.results.length > 0 && result.results.every((test) => test.passed)) {
      if (solved) {
        pushToast({
          title: 'All tests passed',
          message: 'Correct solution. This challenge is already solved, so no additional XP is awarded.',
          type: 'success',
        });
      } else {
        const solveResult = solveChallenge(challenge.id);
        pushToast({
          title: 'Challenge solved',
          message: solveResult.awarded > 0
            ? `+${solveResult.awarded} XP. Your solution passed every test.`
            : 'Your solution passed every test. This challenge was already solved.',
          type: 'success',
          duration: 4500,
        });
      }
    } else if (result.ok) {
      pushToast({
        title: 'Some tests failed',
        message: `${passedCount} of ${result.results.length} tests passed. Review the output and try again.`,
        type: 'warning',
      });
    } else {
      pushToast({
        title: 'Could not run tests',
        message: result.error || 'Check your code and try again.',
        type: 'error',
      });
    }
  };

  const reset = () => {
    setCode(challenge.starter);
    setResults(null);
    pushToast({ title: 'Starter restored', message: 'The editor has been reset to the starting code.', type: 'info' });
  };

  return (
    <div className="page challenge-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/challenges">Challenges</Link>
        <Icon name="chevronRight" size={13} />
        <span aria-current="page">{challenge.title}</span>
      </nav>

      <header className="challenge-header">
        <div>
          <p className="page-eyebrow">
            {challenge.category} · {challenge.tests.length} test cases · {challenge.xp} XP
          </p>
          <h1>{challenge.title}</h1>
          <div className="lesson-header__meta">
            <span className={`badge badge--${tone[challenge.difficulty]}`}>{challenge.difficulty}</span>
            {solved ? (
              <span className="badge badge--success">
                <Icon name="check" size={13} /> Solved {formatRelative(solvedInfo.completedAt)}
              </span>
            ) : (
              <span className="badge badge--neutral">Not solved yet</span>
            )}
            {attempts > 0 ? <span className="badge badge--neutral">{attempts} run{attempts === 1 ? '' : 's'}</span> : null}
          </div>
        </div>
      </header>

      <div className="challenge-layout">
        <aside className="challenge-problem">
          <section className="panel">
            <h2>Problem</h2>
            <p>{challenge.description}</p>
            <div className="io-grid">
              <div>
                <span className="io-label">Input</span>
                <code>{challenge.input}</code>
              </div>
              <div>
                <span className="io-label">Expected output</span>
                <code>{challenge.output}</code>
              </div>
            </div>
          </section>

          <section className="panel">
            <h2>Examples</h2>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Input</th>
                    <th scope="col">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {challenge.examples.map((item, index) => (
                    <tr key={index}>
                      <td><code>{item.input}</code></td>
                      <td><code>{item.output}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <h2>Constraints</h2>
            <ul className="bullet-list">
              {challenge.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => setShowHint((value) => !value)}
              aria-expanded={showHint}
            >
              <Icon name="info" size={15} />
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            {showHint ? (
              <div className="hint-box">
                <Icon name="bolt" size={16} />
                <p>{challenge.hint}</p>
              </div>
            ) : null}
          </section>

          <section className="panel sandbox-note">
            <h2>How checking works</h2>
            <p>
              Your function is executed inside a separate Web Worker, outside the app and the page DOM. It cannot
              read localStorage or DEVVERSE data, and it is stopped after 2.5 seconds. This local runner supports
              synchronous functions only. Results are compared against the predefined test cases above.
            </p>
          </section>
        </aside>

        <div className="challenge-work">
          <CodeEditor
            id="challenge-editor"
            label="Your solution"
            language="js"
            value={code}
            onChange={setCode}
            fontSize={state.settings.editorFontSize}
            minHeight={300}
            onClear={() => setCode('')}
            actions={
              <button
                type="button"
                className="icon-button icon-button--sm"
                onClick={reset}
                aria-label="Restore starter code"
                title="Restore starter code"
              >
                <Icon name="reset" size={15} />
              </button>
            }
          />
          <div className="challenge-actions">
            <button type="button" className="btn btn--primary" onClick={run} disabled={running}>
              <Icon name="play" size={15} />
              {running ? 'Running tests...' : 'Run tests'}
            </button>
            <span className="muted small">
              {solved ? 'Solved — reruns do not award XP.' : 'First correct submission awards XP.'}
            </span>
          </div>

          <section className={`results-panel panel ${allPassed ? 'is-passed' : ''}`.trim()} aria-live="polite">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Test results</p>
                <h2>{results ? (allPassed ? 'All tests passed' : 'Test output') : 'Not run yet'}</h2>
              </div>
              {results && results.ok ? (
                <span className={`badge badge--${allPassed ? 'success' : 'warning'}`}>
                  {passedCount}/{results.results.length} passed
                </span>
              ) : null}
            </div>

            {!results ? (
              <EmptyState
                icon="terminal"
                compact
                title="Run your solution"
                description="Press Run tests to execute the function against every test case."
              />
            ) : !results.ok ? (
              <div className="error-box" role="alert">
                <Icon name="warning" size={18} />
                <div>
                  <strong>Your code could not be checked.</strong>
                  <p>{results.error}</p>
                </div>
              </div>
            ) : (
              <>
                {allPassed ? (
                  <div className="success-box">
                    <Icon name="checkCircle" size={18} />
                    <div>
                      <strong>Every test passed.</strong>
                      <p>
                        {solved
                          ? 'This challenge was already completed, so no extra XP was added.'
                          : `Your solution is correct${solvedInfo ? '' : ` and XP has been awarded.`}`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="muted small">
                    Compare the expected and actual values below. Strings are shown in JSON quotes.
                  </p>
                )}
                <ul className="test-list">
                  {results.results.map((test, index) => (
                    <li key={index} className={test.passed ? 'is-passed' : 'is-failed'}>
                      <span className="test-list__status" aria-hidden="true">
                        <Icon name={test.passed ? 'check' : 'x'} size={13} />
                      </span>
                      <div className="test-list__body">
                        <p className="test-list__title">
                          Test {index + 1}: {test.passed ? 'Passed' : 'Failed'}
                        </p>
                        <div className="test-list__values">
                          <span><span className="io-label">Input</span> <code>{test.input}</code></span>
                          <span><span className="io-label">Expected</span> <code>{test.expected}</code></span>
                          <span><span className="io-label">Actual</span> <code>{test.actual}</code></span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <div className="lab-footer-links">
            <label className="font-control font-control--inline" htmlFor="challenge-font">
              Editor size
              <input
                id="challenge-font"
                type="range"
                min="11"
                max="22"
                value={state.settings.editorFontSize}
                onChange={(event) => updateSettings({ editorFontSize: Number(event.target.value) })}
              />
              <span>{state.settings.editorFontSize}px</span>
            </label>
            <Link to="/challenges" className="btn btn--ghost btn--sm">
              All challenges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
