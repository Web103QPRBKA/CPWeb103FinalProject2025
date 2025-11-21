import { pool } from "../config/database.js";

const getCluesById = async (req, res) => {
	try {
const id = parseInt(req.params.id);
const results = await pool.query('SELECT * FROM clue WHERE gameId = $1', [id]);
res.status(200).json(results.rows)
	} catch (error) {
console.error(`Error fetching clues for game ${req.params.id}:`, error);
res.status(500).json({ error: 'Failed to fetch clues' });
	}
};

const createClues = async (req, res) => {
	try {
		const { clues, gameId } = req.body;
		// Build bulk insert query
		const valuesClause = clues.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ');
		const values = clues.flatMap(clueText => [clueText, gameId]);
		const query = `INSERT INTO clue (clue, gameId) VALUES ${valuesClause} RETURNING *`;
		const result = await pool.query(query, values);
		res.status(201).json(result.rows);
	} catch (error) {
		console.error('Error creating clues:', error);
		// Check for constraint violations (duplicate, foreign key, etc.)
		if (error.code === '23505' || error.code === '23503') {
			res.status(409).json({ error: 'Resource conflict: duplicate or invalid reference' });
		} else {
			res.status(500).json({ error: 'Failed to create clues' });
		}
	}
};

export default {
	getCluesById,
	createClues,
};
