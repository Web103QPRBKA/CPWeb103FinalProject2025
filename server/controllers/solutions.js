import { pool } from "../config/database.js";

// Getting a solution that belongs to a certain game
const getSolutionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query('SELECT solution FROM solutions WHERE gameId = $1', [id]);

  
    res.status(200).json(results.rows[0]);
    
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getSolutionById,
};