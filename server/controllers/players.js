import { pool } from "../config/database.js";


const createPlayer = async (req, res) => {
  try {
    const { playerName, gameId, playerTheme } = req.body
    const results = await pool.query(
      "INSERT INTO player (playerName, currentGame, playerThemeId)  VALUES ($1, $2, $3)  RETURNING id",
      [playerName, gameId, playerTheme]
    );

    const playerId = results.rows[0].id;

    await pool.query('INSERT INTO gamePlayer (playerId, gameId, isCompleted) VALUES ($1, $2, FALSE)', 
      [playerId, gameId]
    )

    return res.status(201).json({ message: "Player and game details added successfully"})
  }
  catch (error) {
    res.status(409).json({ error: error.message });
  };
};


const getAllPlayers = async (req, res) => {
  try {
    const results = await pool.query(`SELECT p.playerName, gp.score FROM player p INNER JOIN gameplayer gp ON p.id = 
      gp.playerid AND p.currentgame = gp.gameid;`);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// // Getting a player and current game
const getPlayerGameById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(`SELECT p.id, p.playerName, p.currentGame, gp.score, gp.isCompleted FROM 
      player p INNER JOIN gameplayer gp ON (p.id = gp.playerId AND p.currentGame = gp.gameId) WHERE id = $1;`, [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { playerName } = req.body;
    const id = parseInt(req.params.id);

    const results = await pool.query(
      "UPDATE player SET playerName = $1 WHERE id = $2 RETURNING *",
      [playerName, id]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("DELETE FROM player WHERE id=$1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createPlayer,
  getAllPlayers,
  getPlayerGameById,
  updatePlayer,
  deletePlayer,
};