import { pool } from "../config/database.js";

const getSolutionById = async (req, res) => {
	try {
const id = parseInt(req.params.id);
const results = await pool.query('SELECT id, solution, gameId FROM solutions WHERE gameId = $1', [id]);
res.status(200).json(results.rows[0]);
	} catch (error) {
res.status(409).json({ error: error.message });
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
    res.status(409).json({ error: error.message });
  }
};

export default {
	getSolutionById,
	createSolution,
};