import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddPuzzle.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const AddPuzzle = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		difficulty: 'Easy',
		reference: '',
		author: '',
	});

	const [clues, setClues] = useState(['']);
	const [hints, setHints] = useState(['']);
	const [solution, setSolution] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [existingPuzzles, setExistingPuzzles] = useState([]);

	useEffect(() => {
		const fetchExistingPuzzles = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/games`);
				if (response.ok) {
					const data = await response.json();
					setExistingPuzzles(data);
				}
			} catch (err) {
				console.error('Error fetching existing puzzles:', err);
			}
		};
		fetchExistingPuzzles();
	}, [success]); // Re-fetch when a new puzzle is successfully added

	const loadExampleData = () => {
		setFormData({
			title: 'The Mystery Mansion',
			description: `Four friends visited a mysterious mansion and each discovered a different room (library, attic, cellar, or garden). Each room contained a unique object (key, map, compass, or lantern), and each friend had a different reaction (surprised, scared, excited, or curious). From the clues below, can you determine which friend found which room, what object was in that room, and what their reaction was?`,
			difficulty: 'Medium',
			reference: 'Example Puzzle Collection - 2025',
			author: 'Dev Team',
		});

		setClues([
			'Sarah found the compass but was not in the attic.',
			'The person who was scared discovered the cellar.',
			'Mike was excited and did not find the key.',
			'The lantern was in the garden, where someone was curious.',
			'The library contained the map, but Sarah was not there.',
		]);

		setHints([
			'Sarah does not like basements.',
			'Mike loves the outdoors.',
			'The attic had the oldest item.',
		]);

		setSolution(`[
	{
		"id": 1,
		"friend": "Sarah",
		"room": "garden",
		"object": "compass",
		"reaction": "curious"
	},
	{
		"id": 2,
		"friend": "Mike",
		"room": "attic",
		"object": "key",
		"reaction": "excited"
	},
	{
		"id": 3,
		"friend": "Emma",
		"room": "cellar",
		"object": "lantern",
		"reaction": "scared"
	},
	{
		"id": 4,
		"friend": "Jake",
		"room": "library",
		"object": "map",
		"reaction": "surprised"
	}
]`);

		setSuccess('Example data loaded! You can edit it before submitting.');
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleClueChange = (index, value) => {
		const newClues = [...clues];
		newClues[index] = value;
		setClues(newClues);
	};

	const addClue = () => {
		setClues([...clues, '']);
	};

	const removeClue = (index) => {
		if (clues.length > 1) {
			setClues(clues.filter((_, i) => i !== index));
		}
	};

	const handleHintChange = (index, value) => {
		const newHints = [...hints];
		newHints[index] = value;
		setHints(newHints);
	};

	const addHint = () => {
		setHints([...hints, '']);
	};

	const removeHint = (index) => {
		if (hints.length > 1) {
			setHints(hints.filter((_, i) => i !== index));
		}
	};

	const clearForm = () => {
		setFormData({
			title: '',
			description: '',
			difficulty: 'Easy',
			reference: '',
			author: '',
		});
		setClues(['']);
		setHints(['']);
		setSolution('');
		setError('');
		setSuccess('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			// Validate inputs
			if (!formData.title || !formData.description || !formData.reference || !formData.author) {
				throw new Error('Please fill in all required fields');
			}

			const validClues = clues.filter(clue => clue.trim() !== '');
			if (validClues.length === 0) {
				throw new Error('Please add at least one clue');
			}

			const validHints = hints.filter(hint => hint.trim() !== '');
			if (validHints.length === 0) {
				throw new Error('Please add at least one hint');
			}

			if (!solution.trim()) {
				throw new Error('Please provide a solution');
			}

			let parsedSolution;
			try {
				parsedSolution = JSON.parse(solution);
			} catch {
				throw new Error('Solution must be valid JSON');
			}
			// Step 1: Create the game
			const gameResponse = await fetch(`${API_BASE_URL}/games`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!gameResponse.ok) {
				throw new Error('Failed to create game');
			}

			const newGame = await gameResponse.json();
			const gameId = newGame.id;

			// Step 2: Add clues
			const cluesResponse = await fetch(`${API_BASE_URL}/clues`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					clues: validClues,
					gameId: gameId,
				}),
			});

			if (!cluesResponse.ok) {
				throw new Error('Failed to add clues');
			}

			// Step 3: Add hints
			const hintsResponse = await fetch(`${API_BASE_URL}/hints`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					hints: validHints,
					gameId: gameId,
				}),
			});

			if (!hintsResponse.ok) {
				throw new Error('Failed to add hints');
			}

			// Step 4: Add solution
			const solutionResponse = await fetch(`${API_BASE_URL}/solutions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					solution: parsedSolution,
					gameId: gameId,
				}),
			});

			if (!solutionResponse.ok) {
				throw new Error('Failed to add solution');
			}

			setSuccess(`Puzzle "${formData.title}" created successfully with ID: ${gameId}`);
			
			// Reset form
			clearForm();

		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="add-puzzle-container">
			<h1>Add New Puzzle</h1>
			
			{error && (
				<div className="error-message" role="alert" aria-live="assertive">
					{error}
				</div>
			)}
			{success && (
				<div className="success-message" role="status" aria-live="polite">
					{success}
				</div>
			)}

			{existingPuzzles.length > 0 && (
				<div className="existing-puzzles-section">
					<h2>Existing Puzzles ({existingPuzzles.length})</h2>
					<p className="helper-text">Check this list to avoid adding duplicates</p>
					<div className="puzzles-grid">
						{existingPuzzles.map((puzzle) => (
							<div key={puzzle.id} className="puzzle-card">
								<div className="puzzle-header">
									<span className="puzzle-id">#{puzzle.id}</span>
									<span className={`difficulty-badge ${puzzle.difficulty.toLowerCase()}`}>
										{puzzle.difficulty}
									</span>
								</div>
								<h3>{puzzle.title}</h3>
								<p className="puzzle-author">by {puzzle.author}</p>
								<p className="puzzle-reference">{puzzle.reference}</p>
							</div>
						))}
					</div>
				</div>
			)}

			<form onSubmit={handleSubmit} className="puzzle-form" aria-label="Add new puzzle form">
				<fieldset className="form-section">
					<legend>Game Information</legend>
					
					<div className="form-group">
						<label htmlFor="title">Title <span aria-label="required">*</span></label>
						<input
							type="text"
							id="title"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							required
							aria-required="true"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="description">Description <span aria-label="required">*</span></label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							rows="6"
							required
							aria-required="true"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="difficulty">Difficulty <span aria-label="required">*</span></label>
						<select
							id="difficulty"
							name="difficulty"
							value={formData.difficulty}
							onChange={handleInputChange}
							required
							aria-required="true"
						>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="reference">Reference <span aria-label="required">*</span></label>
						<input
							type="text"
							id="reference"
							name="reference"
							value={formData.reference}
							onChange={handleInputChange}
							placeholder="e.g., Dell Logic Problems - Summer 2022"
							required
							aria-required="true"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="author">Author <span aria-label="required">*</span></label>
						<input
							type="text"
							id="author"
							name="author"
							value={formData.author}
							onChange={handleInputChange}
							required
							aria-required="true"
						/>
					</div>
				</fieldset>

				<fieldset className="form-section">
					<legend>Clues <span aria-label="required">*</span></legend>
					{clues.map((clue, index) => (
						<div key={index} className="dynamic-field">
							<label htmlFor={`clue-${index}`} className="visually-hidden">
								Clue {index + 1}
							</label>
							<textarea
								id={`clue-${index}`}
								value={clue}
								onChange={(e) => handleClueChange(index, e.target.value)}
								placeholder={`Clue ${index + 1}`}
								rows="3"
								aria-label={`Clue ${index + 1}`}
							/>
							<button
								type="button"
								onClick={() => removeClue(index)}
								className="remove-btn"
								disabled={clues.length === 1}
								aria-label={`Remove clue ${index + 1}`}
							>
								Remove
							</button>
						</div>
					))}
					<button type="button" onClick={addClue} className="add-btn" aria-label="Add another clue">
						+ Add Clue
					</button>
				</fieldset>

				<fieldset className="form-section">
					<legend>Hints <span aria-label="required">*</span></legend>
					{hints.map((hint, index) => (
						<div key={index} className="dynamic-field">
							<label htmlFor={`hint-${index}`} className="visually-hidden">
								Hint {index + 1}
							</label>
							<input
								type="text"
								id={`hint-${index}`}
								value={hint}
								onChange={(e) => handleHintChange(index, e.target.value)}
								placeholder={`Hint ${index + 1}`}
								aria-label={`Hint ${index + 1}`}
							/>
							<button
								type="button"
								onClick={() => removeHint(index)}
								className="remove-btn"
								disabled={hints.length === 1}
								aria-label={`Remove hint ${index + 1}`}
							>
								Remove
							</button>
						</div>
					))}
					<button type="button" onClick={addHint} className="add-btn" aria-label="Add another hint">
						+ Add Hint
					</button>
				</fieldset>

				<fieldset className="form-section">
					<legend>Solution <span aria-label="required">*</span></legend>
					<div className="form-group">
						<label htmlFor="solution" className="visually-hidden">Solution JSON</label>
						<textarea
							id="solution"
							value={solution}
							onChange={(e) => setSolution(e.target.value)}
							placeholder='[{"id": 1, "friend": "Sarah", "room": "garden", "object": "compass", "reaction": "curious"}, ...]'
							rows="8"
							required
							aria-required="true"
							aria-describedby="solution-help"
						/>
						<small id="solution-help">Enter the solution as a JSON array</small>
					</div>
				</fieldset>

				<div className="form-actions">
					<button 
						type="submit" 
						className="submit-btn" 
						disabled={loading}
						aria-disabled={loading}
					>
						{loading ? 'Creating Puzzle...' : 'Create Puzzle'}
					</button>
					<button 
						type="button" 
						onClick={loadExampleData} 
						className="example-btn"
						aria-label="Load example puzzle data to help you get started"
					>
						Load Example Data
					</button>
					<button 
						type="button" 
						onClick={clearForm} 
						className="cancel-btn"
						aria-label="Clear all form fields and reset to empty state"
					>
						Clear Form
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddPuzzle;
