import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PuzzleGrid from './PuzzleGrid';
import CluePanel from './CluePanel';
import ControlPanel from './ControlPanel';
import AnswerTable from './AnswerTable';
import { getPuzzleById, getCluesByGameId, getSolutionByGameId, getHintsByGameId } from '../services/api';
import '../css/LogicPuzzle.css';

const LogicPuzzle = () => {
  const { puzzleId } = useParams();
  
  const [puzzle, setPuzzle] = useState(null);
  const [clues, setClues] = useState([]);
  const [hints, setHints] = useState([]);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
const fetchPuzzleData = async () => {
  try {
setLoading(true);
setError(null);

const puzzleData = await getPuzzleById(puzzleId);
setPuzzle(puzzleData);

const cluesData = await getCluesByGameId(puzzleId);
setClues(cluesData);

const hintsData = await getHintsByGameId(puzzleId);
setHints(hintsData);

const solutionData = await getSolutionByGameId(puzzleId);
setSolution(solutionData);
  } catch (err) {
console.error('Error loading puzzle:', err);
setError('Failed to load puzzle. Please try again.');
  } finally {
setLoading(false);
  }
};

if (puzzleId) {
  fetchPuzzleData();
}
  }, [puzzleId]);

  const handleShowHint = () => {
if (currentHintIndex < hints.length) {
  setShowHints(true);
  setCurrentHintIndex(prev => prev + 1);
}
  };

  const handleCheckAnswer = () => {
// Answer checking functionality to be implemented
  };

  const handleReset = () => {
setShowHints(false);
setCurrentHintIndex(0);
  };

  if (loading) {
return (
  <div className="logic-puzzle loading">
<div className="spinner">Loading puzzle...</div>
  </div>
);
  }

  if (error) {
return (
  <div className="logic-puzzle error">
<h2>Error</h2>
<p>{error}</p>
  </div>
);
  }

  if (!puzzle) {
return (
  <div className="logic-puzzle error">
<h2>Puzzle Not Found</h2>
<p>The requested puzzle could not be found.</p>
  </div>
);
  }

  return (
<div className="logic-puzzle">
  <div className="puzzle-header">
<h2>{puzzle.title}</h2>
<p className="puzzle-description">{puzzle.description}</p>
<span className={`difficulty-badge ${puzzle.difficulty}`}>
  {puzzle.difficulty}
</span>
  </div>

  <div className="puzzle-layout">
<div className="puzzle-sidebar">
  <CluePanel 
clues={clues} 
hints={showHints ? hints.slice(0, currentHintIndex) : []}
  />
</div>

<div className="puzzle-main">
  <PuzzleGrid solution={solution} />
  
  <AnswerTable solution={solution} />
</div>

<div className="puzzle-controls">
  <ControlPanel
onCheckAnswer={handleCheckAnswer}
onReset={handleReset}
onShowHint={handleShowHint}
hintsAvailable={currentHintIndex < hints.length}
hintsUsed={currentHintIndex}
totalHints={hints.length}
  />
</div>
  </div>
</div>
  );
};

export default LogicPuzzle;
