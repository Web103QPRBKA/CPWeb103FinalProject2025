import { pool } from "./database.js";
import dotenv from "dotenv";
// import "./dotenv.js";
dotenv.config({ path: "../.env" });

import { playersData } from "../data/player.js";

const createPlayersTable = async () => {
  const createPlayersTableQuery = `
  DROP TABLE IF EXISTS player CASCADE;

  CREATE TABLE IF NOT EXISTS player (
    id SERIAL PRIMARY KEY,
    playerName VARCHAR(255) NOT NULL,
    currentGame INT,
    gameTheme INT
  );
`;

  try {
    const PlayerRes = await pool.query(createPlayersTableQuery);
    console.log("🎉 Players table created successfully.", PlayerRes);
  } catch (error) {
    console.error("⚠️ Error creating Players table:", error);
  }
};

const seedPlayersTable = async () => {
  await createPlayersTable()
  playersData.forEach((player) => {
    const insertQuery = {
      text: 'INSERT INTO player (playerName, currentGame, gameTheme) VALUES($1, $2, $3)'
    }
    const values = [
      player.playerName,
      player.currentGame,
      player.gameTheme
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log(`⚠️ Error inserting player: ${player.playerName}`, err);
        return
      }
      console.log(`✅ ${player.playerName} added successfully`);
    })

  })
}

seedPlayersTable();

