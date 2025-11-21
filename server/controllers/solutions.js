import { pool } from "../config/database.js";

const getSolutionById = async (req, res) => {
	try {
const id = parseInt(req.params.id);
const results = await pool.query('SELECT id, solution, gameId FROM solutions WHERE gameId = $1', [id]);
res.status(200).json(results.rows[0]);
	} catch (error) {
console.error(`Error fetching solution for game ${req.params.id}:`, error);
res.status(500).json({ error: 'Failed to fetch solution' });
	}
};

const createSolution = async (req, res) => {
	try {
		const { solution, gameId } = req.body;
		const results = await pool.query(
			'INSERT INTO solutions (solution, gameId) VALUES ($1, $2) RETURNING *',
			[JSON.stringify(solution), gameId]
		);
		res.status(201).json(results.rows[0]);
	} catch (error) {
		console.error('Error creating solution:', error);
		// Check for constraint violations (duplicate, foreign key, etc.)
		if (error.code === '23505' || error.code === '23503') {
			res.status(409).json({ error: 'Resource conflict: duplicate or invalid reference' });
		} else {
			res.status(500).json({ error: 'Failed to create solution' });
		}
	}
};

export default {
	getSolutionById,
	createSolution,
};