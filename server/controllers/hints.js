import { pool } from "../config/database.js";

const getHintsById = async (req, res) => {
  try {
const id = parseInt(req.params.id);
const results = await pool.query("SELECT * FROM hint WHERE gameId = $1", [id]);
res.status(200).json(results.rows);
  } catch (error) {
res.status(409).json({ error: error.message });
  }
};

const createHints = async (req, res) => {
  try {
    const { hints, gameId } = req.body;
    const insertedHints = [];
    for (const hintText of hints) {
      const result = await pool.query(
        'INSERT INTO hint (hint, gameId) VALUES ($1, $2) RETURNING *',
        [hintText, gameId]
      );
      insertedHints.push(result.rows[0]);
    }
    res.status(201).json(insertedHints);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getHintsById,
  createHints,
};
