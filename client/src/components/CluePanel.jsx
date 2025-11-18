import { useState } from 'react';
import '../css/CluePanel.css';

const CluePanel = ({ clues = [], hints = [] }) => {
  const [activeTab, setActiveTab] = useState('clues');

  return (
<div className="clue-panel">
  <div className="panel-tabs">
<button 
  className={`tab-button ${activeTab === 'clues' ? 'active' : ''}`}
  onClick={() => setActiveTab('clues')}
>
  Clues ({clues.length})
</button>
<button 
  className={`tab-button ${activeTab === 'hints' ? 'active' : ''}`}
  onClick={() => setActiveTab('hints')}
>
  Hints ({hints.length})
</button>
  </div>

  <div className="panel-content">
{activeTab === 'clues' && (
  <div className="clues-section">
<h3>Clues</h3>
{clues.length > 0 ? (
  <ul className="clues-list">
{clues.map((clue, index) => (
  <li key={clue.id || index} className="clue-item">
<span className="clue-number">{index + 1}.</span>
<span className="clue-text">{clue.clue}</span>
  </li>
))}
  </ul>
) : (
  <p className="no-data">No clues available for this puzzle.</p>
)}
  </div>
)}

{activeTab === 'hints' && (
  <div className="hints-section">
<h3>Hints</h3>
{hints.length > 0 ? (
  <div className="hints-list">
{hints.map((hint, index) => (
  <div key={hint.id || index} className="hint-item">
<div className="hint-header">
  <span className="hint-badge">Hint {index + 1}</span>
</div>
<p className="hint-text">{hint.hint}</p>
  </div>
))}
  </div>
) : (
  <div className="no-hints">
<p>No hints revealed yet.</p>
<p className="hint-tip">Use the "Get Hint" button when you need help!</p>
  </div>
)}
  </div>
)}
  </div>
</div>
  );
};

export default CluePanel;
