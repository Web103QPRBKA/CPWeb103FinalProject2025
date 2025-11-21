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

export default {
  getHintsById,
};
