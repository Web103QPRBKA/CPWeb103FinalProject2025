import { useState } from 'react';
import '../css/ControlPanel.css';

const ControlPanel = ({ 
  onCheckAnswer, 
  onReset, 
  onShowHint, 
  hintsAvailable,
  hintsUsed,
  totalHints 
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleReset = () => {
if (showConfirmReset) {
  onReset();
  setShowConfirmReset(false);
} else {
  setShowConfirmReset(true);
}
  };

  const handleCancelReset = () => {
setShowConfirmReset(false);
  };

  return (
<div className="control-panel">
  <h3>Game Controls</h3>

  <div className="control-section">
<h4>Actions</h4>

<button 
  className="control-button primary"
  onClick={onCheckAnswer}
>
  <span className="button-icon">✓</span>
  Check Answer
</button>

<button 
  className="control-button secondary"
  onClick={onShowHint}
  disabled={!hintsAvailable}
>
  <span className="button-icon">💡</span>
  Get Hint ({hintsUsed}/{totalHints})
</button>

{!showConfirmReset ? (
  <button 
className="control-button danger"
onClick={handleReset}
  >
<span className="button-icon">↺</span>
Reset Grid
  </button>
) : (
  <div className="confirm-reset">
<p>Are you sure you want to reset?</p>
<div className="confirm-buttons">
  <button 
className="control-button danger-confirm"
onClick={handleReset}
  >
Yes, Reset
  </button>
  <button 
className="control-button secondary-small"
onClick={handleCancelReset}
  >
Cancel
  </button>
</div>
  </div>
)}
  </div>

  <div className="control-section">
<h4>Progress</h4>
<div className="progress-stats">
  <div className="stat-item">
<span className="stat-label">Hints Used:</span>
<span className="stat-value">{hintsUsed} / {totalHints}</span>
  </div>
  <div className="stat-item">
<span className="stat-label">Status:</span>
<span className="stat-value">In Progress</span>
  </div>
</div>
  </div>

  <div className="control-section">
<h4>How to Play</h4>
<div className="instructions">
  <ol>
<li>Read all the clues carefully</li>
<li>Click cells to mark relationships:
  <ul>
<li>✓ for "Yes" (matches)</li>
<li>✗ for "No" (doesn't match)</li>
  </ul>
</li>
<li>Use logic to eliminate possibilities</li>
<li>Get hints if you're stuck</li>
<li>Check your answer when complete</li>
  </ol>
</div>
  </div>
</div>
  );
};

export default ControlPanel;
