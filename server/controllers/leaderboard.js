import { pool } from "../config/database.js";

const getLeaderboard = async (req, res) => {
  try {
    const { difficulty, limit = 20 } = req.query;
    
    let query = `
      SELECT 
        l.id,
        l.player_name as playerName,
        g.title as gameTitle,
        g.difficulty,
        l.score,
        l.time_elapsed as timeElapsed,
        l.hints_used as hintsUsed,
        l.completed_at as completedAt
      FROM leaderboard l
      INNER JOIN game g ON l.game_id = g.id
      WHERE 1=1
    `;
    const params = [];

    if (difficulty) {
      params.push(difficulty);
      query += ` AND g.difficulty = $${params.length}`;
    }

    params.push(parseInt(limit));
    query += ` ORDER BY l.score DESC, l.time_elapsed ASC LIMIT $${params.length}`;

    const results = await pool.query(query, params);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getLeaderboardByGame = async (req, res) => {
  try {
    const gameId = parseInt(req.params.gameId);
    const { limit = 10 } = req.query;

    const results = await pool.query(`
      SELECT 
        l.id,
        l.player_name as playerName,
        l.score,
        l.time_elapsed as timeElapsed,
        l.hints_used as hintsUsed,
        l.completed_at as completedAt,
        g.title as gameTitle,
        g.difficulty
      FROM leaderboard l
      INNER JOIN game g ON l.game_id = g.id
      WHERE l.game_id = $1
      ORDER BY l.score DESC, l.time_elapsed ASC
      LIMIT $2;
    `, [gameId, parseInt(limit)]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getLeaderboard,
  getLeaderboardByGame,
};