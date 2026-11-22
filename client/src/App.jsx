import { useState } from 'react';
import './App.css';

const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_URL = RAW_API_URL.replace(/\/+$/, '');

// 3x3 grid dot positions (1-9) for standard dice numbers 1-6
const DICE_DOT_MAP = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9]
};

function DiceFace({ value, isRolling }) {
  const activeDots = DICE_DOT_MAP[value] || DICE_DOT_MAP[1];

  return (
    <div
      className={`dice-face ${isRolling ? 'shaking' : ''}`}
      aria-label={`Dice showing ${value || 1}`}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pos) => (
        <div key={pos} className="dice-cell">
          {activeDots.includes(pos) && <span className="dice-dot" />}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [currentRoll, setCurrentRoll] = useState(1);
  const [history, setHistory] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [error, setError] = useState(null);

  const handleRollDice = async () => {
    if (isRolling) return;

    setIsRolling(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/roll`);
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
      const data = await response.json();
      if (typeof data.result !== 'number') {
        throw new Error('Invalid response from dice API');
      }

      setCurrentRoll(data.result);
      setHistory((prev) => [data.result, ...prev].slice(0, 10));
    } catch (err) {
      setError(`Failed to roll dice: ${err.message}. Make sure backend is running on ${API_URL}`);
    } finally {
      setIsRolling(false);
    }
  };

  return (
    <div className="app-container">
      <main className="card">
        <header className="header">
          <h1 className="title">Dice Roller</h1>
          <p className="subtitle">
            Powered by the{' '}
            <a
              href="https://www.npmjs.com/package/naman-dice"
              target="_blank"
              rel="noopener noreferrer"
              className="package-link"
            >
              naman-dice
            </a>{' '}
            npm package
          </p>
        </header>

        <section className="dice-stage">
          <DiceFace value={currentRoll} isRolling={isRolling} />
          <div className="current-number">
            {isRolling ? 'Rolling...' : `Rolled: ${currentRoll}`}
          </div>
        </section>

        <div className="actions">
          <button
            type="button"
            className="roll-btn"
            onClick={handleRollDice}
            disabled={isRolling}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        <section className="history-section">
          <h2 className="history-title">Last rolls</h2>
          {history.length === 0 ? (
            <p className="history-empty">No rolls yet. Click &quot;Roll Dice&quot; to begin!</p>
          ) : (
            <div className="history-list">
              {history.map((num, idx) => (
                <span
                  key={`${idx}-${num}`}
                  className={`history-badge ${idx === 0 ? 'badge-latest' : ''}`}
                >
                  {num}
                </span>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
