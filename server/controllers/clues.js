import { pool } from "../config/database.js";

const getCluesById = async (req, res) => {
  try {
const id = parseInt(req.params.id);
const results = await pool.query('SELECT * FROM clue WHERE gameId = $1', [id]);
res.status(200).json(results.rows)
  } catch (error) {
res.status(409).json({ error: error.message });
  }
};

const createClues = async (req, res) => {
  try {
    const { clues, gameId } = req.body;
    const insertedClues = [];
    for (const clueText of clues) {
      const result = await pool.query(
        'INSERT INTO clue (clue, gameId) VALUES ($1, $2) RETURNING *',
        [clueText, gameId]
      );
      insertedClues.push(result.rows[0]);
    }
    res.status(201).json(insertedClues);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getCluesById,
  createClues,
};
