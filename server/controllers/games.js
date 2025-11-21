import { pool } from "../config/database.js";

const getAllGames = async (req, res) => {
	try {
		const results = await pool.query(
			"SELECT id, title, description, reference, author, difficulty FROM game ORDER BY id;"
		);
		res.status(200).json(results.rows);
	} catch (error) {
		console.error('Error fetching all games:', error);
		res.status(500).json({ error: 'Failed to fetch games' });
	}
};

const getGameById = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const results = await pool.query("SELECT * FROM game WHERE id = $1", [id]);
		res.status(200).json(results.rows[0]);
	} catch (error) {
		console.error(`Error fetching game ${req.params.id}:`, error);
		res.status(500).json({ error: 'Failed to fetch game' });
	}
};

const createGame = async (req, res) => {
	try {
		const { title, description, difficulty, reference, author } = req.body;
		// Input validation
		if (
			typeof title !== 'string' || !title.trim() ||
			typeof description !== 'string' || !description.trim() ||
			typeof difficulty !== 'string' || !difficulty.trim() ||
			typeof reference !== 'string' || !reference.trim() ||
			typeof author !== 'string' || !author.trim()
		) {
			return res.status(400).json({ error: "Missing or invalid required fields: title (string), description (string), difficulty (string), reference (string), author (string)" });
		}

		const results = await pool.query(
			"INSERT INTO game (title, description, difficulty, reference, author) VALUES ($1, $2, $3, $4, $5) RETURNING *",
			[title, description, difficulty, reference, author]
		);
		res.status(201).json(results.rows[0]);
	} catch (error) {
		console.error('Error creating game:', error);
		// Check for constraint violations (duplicate, foreign key, etc.)
		if (error.code === '23505' || error.code === '23503') {
			res.status(409).json({ error: 'Resource conflict: duplicate or invalid reference' });
		} else {
			res.status(500).json({ error: 'Failed to create game' });
		}
	}
};

export default {
	getAllGames,
	getGameById,
	createGame,
};
