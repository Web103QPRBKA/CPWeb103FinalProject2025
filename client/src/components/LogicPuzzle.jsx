import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import PuzzleGrid from "./PuzzleGrid";
import CluePanel from "./CluePanel";
import ControlPanel from "./ControlPanel";
import { validateSolution } from "./AnswerTable";
import {
	getPuzzleById,
	getCluesByGameId,
	getSolutionByGameId,
	getHintsByGameId,
} from "../services/api";
import "../css/LogicPuzzle.css";

const LogicPuzzle = () => {
	const { puzzleId } = useParams();
	console.log("Puzzle ID from URL:", puzzleId);

	const [puzzle, setPuzzle] = useState(null);
	const [clues, setClues] = useState([]);
	const [hints, setHints] = useState([]);
	const [solution, setSolution] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showHints, setShowHints] = useState(false);
	const [currentHintIndex, setCurrentHintIndex] = useState(0);
	const [gridState, setGridState] = useState(null);
	const [validationResult, setValidationResult] = useState(null);
	const [resetTrigger, setResetTrigger] = useState(0);
	const [gameStatus, setGameStatus] = useState('Not Started');
	const [score, setScore] = useState(0);
	const [baseScore, setBaseScore] = useState(0);

	// Score constants
	const SCORE_BY_DIFFICULTY = {
		easy: 1000,
		medium: 2000,
		hard: 3000
	};
	const BONUS_BY_DIFFICULTY = {
		easy: { perfect: 500, noHints: 300 },
		medium: { perfect: 1000, noHints: 600 },
		hard: { perfect: 1500, noHints: 900 }
	};
	const HINT_PENALTY = 100; // Points deducted per hint

	useEffect(() => {
		const fetchPuzzleData = async () => {
			try {
				setLoading(true);
				setError(null);

				const puzzleData = await getPuzzleById(puzzleId);
				console.log("Fetching puzzle with ID:", puzzleId);
				setPuzzle(puzzleData);

				const cluesData = await getCluesByGameId(puzzleId);
				setClues(cluesData);

				const hintsData = await getHintsByGameId(puzzleId);
				setHints(hintsData);

				const solutionData = await getSolutionByGameId(puzzleId);
				setSolution(solutionData);

				// Set base score based on difficulty
				const difficulty = puzzleData.difficulty?.toLowerCase() || 'easy';
				const initialScore = SCORE_BY_DIFFICULTY[difficulty] || SCORE_BY_DIFFICULTY.easy;
				setBaseScore(initialScore);
				setScore(initialScore); // Start with full base score
			} catch (err) {
				console.error("Error loading puzzle:", err);
				setError("Failed to load puzzle. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		if (puzzleId) {
			fetchPuzzleData();
		}
	}, [puzzleId]);

	// Update game status based on grid state and validation
	useEffect(() => {
		if (validationResult?.isCorrect) {
			setGameStatus('Solved');
		} else if (gridState?.cellStates && Object.keys(gridState.cellStates).length > 0) {
			setGameStatus('In Progress');
		} else {
			setGameStatus('Not Started');
		}
	}, [gridState, validationResult]);

	// Update score when hints are used
	useEffect(() => {
		// Deduct hint penalties from base score
		const penaltyPoints = currentHintIndex * HINT_PENALTY;
		const currentScore = Math.max(0, baseScore - penaltyPoints);
		setScore(currentScore);
	}, [currentHintIndex, baseScore]);

	const handleShowHint = () => {
		if (currentHintIndex < hints.length) {
			setShowHints(true);
			setCurrentHintIndex((prev) => prev + 1);
			// Score will be updated by the useEffect above
		}
	};

	const handleCheckAnswer = () => {
		if (!gridState || !solution) {
			setValidationResult({
				isCorrect: false,
				isComplete: false,
				errors: ['Please make some moves before checking!']
			});
			return;
		}

		const result = validateSolution(
			solution,
			gridState.cellStates,
			gridState.gridData,
		);
		
		// If puzzle is solved correctly, apply bonuses and show final score
		if (result.isCorrect && puzzle) {
			const difficulty = puzzle.difficulty?.toLowerCase() || 'easy';
			const bonuses = BONUS_BY_DIFFICULTY[difficulty] || BONUS_BY_DIFFICULTY.easy;
			const earnedBonuses = [];
			let finalScore = score; // Start with current score (base - penalties)
			
			// Perfect game bonus - check if the FINAL solution has no extra incorrect marks
			// This means the player solved it cleanly, even if they made mistakes along the way
			if (result.incorrectMarks === 0) {
				finalScore += bonuses.perfect;
				earnedBonuses.push(`Perfect Game (+${bonuses.perfect} pts)`);
			}
			
			// No hints bonus
			if (currentHintIndex === 0) {
				finalScore += bonuses.noHints;
				earnedBonuses.push(`No Hints Used (+${bonuses.noHints} pts)`);
			}
			
			// Update the score with bonuses applied
			setScore(finalScore);
			
			result.finalScore = finalScore;
			result.bonuses = earnedBonuses;
		}
		
		setValidationResult(result);
	};

	const handleReset = () => {
		setShowHints(false);
		setCurrentHintIndex(0);
		setValidationResult(null);
		setGameStatus('Not Started');
		setScore(baseScore); // Reset score to base score
		setResetTrigger((prev) => prev + 1);
	};

	const handleGridStateChange = useCallback((state) => {
		setGridState(state);
	}, []);

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
				<p>{puzzle.referenceauthor}</p>
				<span className={`difficulty-badge ${puzzle.difficulty}`}>
					{puzzle.difficulty}
				</span>
			</div>

			<div className="puzzle-layout">
				<div className="puzzle-sidebar">
					<CluePanel
						clues={clues}
						hints={
							showHints ? hints.slice(0, currentHintIndex) : []
						}
					/>
				</div>

				<div className="puzzle-main">
					<PuzzleGrid
						solution={solution}
						onGridStateChange={handleGridStateChange}
						resetTrigger={resetTrigger}
					/>

					{validationResult && (
						<div className={`validation-feedback ${validationResult.isCorrect ? 'success' : validationResult.isComplete ? 'error' : 'warning'}`}>
							<button 
								className="close-button"
								onClick={() => setValidationResult(null)}
								aria-label="Close"
							>
								×
							</button>
							
							{validationResult.isCorrect ? (
								<>
									<h3>🎉 Congratulations!</h3>
									<p>You solved the puzzle! All {validationResult.correctChecks} matches are correct!</p>
									<div className="score-breakdown">
										<p className="final-score">Final Score: <strong>{validationResult.finalScore} points</strong></p>
										{validationResult.bonuses && validationResult.bonuses.length > 0 && (
											<div className="bonuses">
												<p className="bonus-header">🌟 Bonuses Earned:</p>
												<ul>
													{validationResult.bonuses.map((bonus, idx) => (
														<li key={idx}>✨ {bonus}</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</>
							) : validationResult.isComplete ? (
								<>
									<h3>❌ Not Quite Right</h3>
									<p>
										You have {validationResult.correctChecks}/{validationResult.totalExpectedChecks} correct matches, 
										but there are {validationResult.incorrectMarks} incorrect marks.
									</p>
									<p className="hint-text">Keep trying!</p>
								</>
							) : (
								<>
									<h3>⏳ Puzzle Incomplete</h3>
									<p>
										You have {validationResult.correctChecks}/{validationResult.totalExpectedChecks} correct matches.
									</p>
									<p className="hint-text">
										You need {validationResult.totalExpectedChecks - validationResult.correctChecks} more correct matches to complete the puzzle.
									</p>
								</>
							)}
							
							{validationResult.errors && validationResult.errors.length > 0 && (
								<details className="error-details">
									<summary>Show Errors ({validationResult.errors.length})</summary>
									<ul>
										{validationResult.errors.map((error, idx) => (
											<li key={idx}>{error}</li>
										))}
									</ul>
								</details>
							)}
						</div>
					)}

					<div className="how-to-play-section">
						<h3>How to Play</h3>
						<div className="instructions">
							<ol>
								<li>Read all the clues carefully</li>
								<li>
									Click cells to mark relationships:
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

				<div className="puzzle-controls">
					<ControlPanel
						onCheckAnswer={handleCheckAnswer}
						onReset={handleReset}
						onShowHint={handleShowHint}
						hintsAvailable={currentHintIndex < hints.length}
						hintsUsed={currentHintIndex}
						totalHints={hints.length}
						gameStatus={gameStatus}
						score={score}
						hintPenalty={HINT_PENALTY}
						baseScore={baseScore}
						difficulty={puzzle?.difficulty || "easy"}
						isSolved={gameStatus === 'Solved'}
					/>
				</div>
			</div>
		</div>
	);
};

export default LogicPuzzle;
