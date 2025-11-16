import { pool } from "../config/database.js";


const getAllGames = async (req, res) => {
  try {
    const results = await pool.query("SELECT title, referenceAuthor, difficulty FROM game;");
    res.status(200).json(results.rows);
  }
  catch (error) {
    res.status(409).json({ error: error.message });
  };
};

// Getting a game the player has chosen
const getGameById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("SELECT * FROM game WHERE id = $1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getAllGames,
  getGameById,
};
