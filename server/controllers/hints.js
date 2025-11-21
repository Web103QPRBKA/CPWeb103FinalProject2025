import { pool } from "../config/database.js";

const getHintsById = async (req, res) => {
	try {
const id = parseInt(req.params.id);
const results = await pool.query("SELECT * FROM hint WHERE gameId = $1", [id]);
res.status(200).json(results.rows);
	} catch (error) {
console.error(`Error fetching hints for game ${req.params.id}:`, error);
res.status(500).json({ error: 'Failed to fetch hints' });
	}
};

const createHints = async (req, res) => {
	try {
		const { hints, gameId } = req.body;
		if (!Array.isArray(hints) || hints.length === 0) {
			return res.status(400).json({ error: "No hints provided" });
		}
		// Build the VALUES clause dynamically
		const valuesClause = hints.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ');
		const values = hints.flatMap(hintText => [hintText, gameId]);
		const query = `INSERT INTO hint (hint, gameId) VALUES ${valuesClause} RETURNING *`;
		const result = await pool.query(query, values);
		res.status(201).json(result.rows);
	} catch (error) {
		console.error('Error creating hints:', error);
		// Check for constraint violations (duplicate, foreign key, etc.)
		if (error.code === '23505' || error.code === '23503') {
			res.status(409).json({ error: 'Resource conflict: duplicate or invalid reference' });
		} else {
			res.status(500).json({ error: 'Failed to create hints' });
		}
	}
};

export default {
	getHintsById,
	createHints,
};
