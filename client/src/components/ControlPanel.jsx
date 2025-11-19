import { useState } from "react";
import "../css/ControlPanel.css";

const ControlPanel = ({
	onCheckAnswer,
	onReset,
	onShowHint,
	hintsAvailable,
	hintsUsed,
	totalHints,
	gameStatus = "Not Started",
	score = 0,
	hintPenalty = 10,
	baseScore = 0,
	difficulty = "easy",
	isSolved = false,
}) => {
	const [showConfirmReset, setShowConfirmReset] = useState(false);
	
	// Calculate max possible score (base + perfect bonus + no hints bonus)
	const BONUS_BY_DIFFICULTY = {
		easy: { perfect: 500, noHints: 300 },
		medium: { perfect: 1000, noHints: 600 },
		hard: { perfect: 1500, noHints: 900 }
	};
	const bonuses = BONUS_BY_DIFFICULTY[difficulty?.toLowerCase()] || BONUS_BY_DIFFICULTY.easy;
	const maxScore = baseScore + bonuses.perfect + bonuses.noHints;

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
					disabled={isSolved}>
					<span className="button-icon">✓</span>
					Check Answer
				</button>

				<button
					className="control-button secondary"
					onClick={onShowHint}
					disabled={!hintsAvailable || isSolved}>
					<span className="button-icon">💡</span>
					Get Hint ({hintsUsed}/{totalHints})
				</button>

				{!showConfirmReset ? (
					<button
						className="control-button danger"
						onClick={handleReset}>
						<span className="button-icon">↺</span>
						Reset Grid
					</button>
				) : (
					<div className="confirm-reset">
						<p>Are you sure you want to reset?</p>
						<div className="confirm-buttons">
							<button
								className="control-button danger-confirm"
								onClick={handleReset}>
								Yes, Reset
							</button>
							<button
								className="control-button secondary-small"
								onClick={handleCancelReset}>
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
						<span className="stat-label">Score:</span>
						<span className="stat-value score-value">
							{score} pts
							{maxScore > 0 && (
								<span className="max-score"> / {maxScore} max</span>
							)}
						</span>
					</div>
					<div className="stat-item">
						<span className="stat-label">Hints Used:</span>
						<span className="stat-value">
							{hintsUsed} / {totalHints}
							{hintsUsed > 0 && (
								<span className="penalty-text">
									{" "}
									(-{hintsUsed * hintPenalty} pts)
								</span>
							)}
						</span>
					</div>
					<div className="stat-item">
						<span className="stat-label">Status:</span>
						<span
							className={`stat-value status-${gameStatus.toLowerCase().replace(" ", "-")}`}>
							{gameStatus}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ControlPanel;
