import { pool } from "../config/database.js";

const getLeaderboard = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT 
        p.playerName,
        g.title as gameTitle,
        gp.score,
        gp.correctGuesses,
        gp.incorrectGuesses,
        gp.isCompleted
      FROM gameplayer gp
      INNER JOIN player p ON gp.playerId = p.id
      INNER JOIN game g ON gp.gameId = g.id
      WHERE gp.isCompleted = true
      ORDER BY gp.score DESC, gp.correctGuesses DESC
      LIMIT 20;
    `);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getLeaderboardByGame = async (req, res) => {
  try {
    const gameId = parseInt(req.params.gameId);
    const results = await pool.query(`
      SELECT 
        p.playerName,
        gp.score,
        gp.correctGuesses,
        gp.incorrectGuesses
      FROM gameplayer gp
      INNER JOIN player p ON gp.playerId = p.id
      WHERE gp.gameId = $1 AND gp.isCompleted = true
      ORDER BY gp.score DESC, gp.correctGuesses DESC
      LIMIT 10;
    `, [gameId]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getLeaderboard,
  getLeaderboardByGame,
};