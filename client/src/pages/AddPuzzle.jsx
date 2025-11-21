import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddPuzzle.css';

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
			}			// Step 1: Create the game
			const gameResponse = await fetch('http://localhost:3001/api/games', {
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
			const cluesResponse = await fetch('http://localhost:3001/api/clues', {
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
			const hintsResponse = await fetch('http://localhost:3001/api/hints', {
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
			const solutionResponse = await fetch('http://localhost:3001/api/solutions', {
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
			
			{error && <div className="error-message">{error}</div>}
			{success && <div className="success-message">{success}</div>}

			<form onSubmit={handleSubmit} className="puzzle-form">
				<div className="form-section">
					<h2>Game Information</h2>
					
					<div className="form-group">
						<label htmlFor="title">Title *</label>
						<input
							type="text"
							id="title"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="description">Description *</label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							rows="6"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="difficulty">Difficulty *</label>
						<select
							id="difficulty"
							name="difficulty"
							value={formData.difficulty}
							onChange={handleInputChange}
							required
						>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="reference">Reference *</label>
						<input
							type="text"
							id="reference"
							name="reference"
							value={formData.reference}
							onChange={handleInputChange}
							placeholder="e.g., Dell Logic Problems - Summer 2022"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="author">Author *</label>
						<input
							type="text"
							id="author"
							name="author"
							value={formData.author}
							onChange={handleInputChange}
							required
						/>
					</div>
				</div>

				<div className="form-section">
					<h2>Clues</h2>
					{clues.map((clue, index) => (
						<div key={index} className="dynamic-field">
							<textarea
								value={clue}
								onChange={(e) => handleClueChange(index, e.target.value)}
								placeholder={`Clue ${index + 1}`}
								rows="3"
							/>
							<button
								type="button"
								onClick={() => removeClue(index)}
								className="remove-btn"
								disabled={clues.length === 1}
							>
								Remove
							</button>
						</div>
					))}
					<button type="button" onClick={addClue} className="add-btn">
						+ Add Clue
					</button>
				</div>

				<div className="form-section">
					<h2>Hints *</h2>
					{hints.map((hint, index) => (
						<div key={index} className="dynamic-field">
							<input
								type="text"
								value={hint}
								onChange={(e) => handleHintChange(index, e.target.value)}
								placeholder={`Hint ${index + 1}`}
							/>
							<button
								type="button"
								onClick={() => removeHint(index)}
								className="remove-btn"
								disabled={hints.length === 1}
							>
								Remove
							</button>
						</div>
					))}
					<button type="button" onClick={addHint} className="add-btn">
						+ Add Hint
					</button>
				</div>

				<div className="form-section">
					<h2>Solution *</h2>
					<div className="form-group">
						<label htmlFor="solution">Solution JSON *</label>
						<textarea
							id="solution"
							value={solution}
							onChange={(e) => setSolution(e.target.value)}
							placeholder='[{"id": 1, "friend": "Lisa", "firstScoop": "fudge ripple", "secondScoop": "cookie dough"}]'
							rows="8"
							required
						/>
						<small>Enter the solution as a JSON array</small>
					</div>
				</div>

				<div className="form-actions">
					<button type="submit" className="submit-btn" disabled={loading}>
						{loading ? 'Creating Puzzle...' : 'Create Puzzle'}
					</button>
					<button type="button" onClick={loadExampleData} className="example-btn">
						Load Example Data
					</button>
					<button type="button" onClick={clearForm} className="cancel-btn">
						Clear Form
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddPuzzle;
