import { pool } from "../config/database.js";

// Getting a theme the player has chosen 
const getThemeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query('SELECT * FROM theme WHERE id = $1', [id]);

  
    res.status(200).json(results.rows[0]);
    
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getThemeById,
};