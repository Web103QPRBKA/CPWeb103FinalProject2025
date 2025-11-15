import { pool } from "./database.js";
import dotenv from "dotenv";
// import "./dotenv.js";
dotenv.config({ path: "../.env" });

import { themesData } from "../data/theme.js";
import { playersData } from "../data/player.js";
import { gamesData } from "../data/game.js";
import { gamesPlayersData } from "../data/gamePlayer.js";

const createThemesTable = async () => {
  const createThemesTableQuery = `
  DROP TABLE IF EXISTS theme CASCADE;

  CREATE TABLE IF NOT EXISTS theme (
    id SERIAL PRIMARY KEY,
    themeName VARCHAR(100),
    emoji VARCHAR(10),
    backgroundColor VARCHAR(10),
    description text
  );
`;

  try {
    const ThemeRes = await pool.query(createThemesTableQuery);
    console.log("🎉 Themes table created successfully.", ThemeRes);
  } catch (error) {
    console.error("⚠️ Error creating Themes table:", error);
  }
};

const createPlayersTable = async () => {
  const createPlayersTableQuery = `
  DROP TABLE IF EXISTS player CASCADE;

  CREATE TABLE IF NOT EXISTS player (
    id SERIAL PRIMARY KEY,
    playerName VARCHAR(255) NOT NULL,
    currentGame INT,
    playerThemeId INT NOT NULL DEFAULT 1,
    FOREIGN KEY (playerThemeId) REFERENCES theme(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  );
`;

  try {
    const PlayerRes = await pool.query(createPlayersTableQuery);
    console.log("🎉 Player table created successfully.", PlayerRes);
  } catch (error) {
    console.error("⚠️ Error creating Players table:", error);
  }
};

const createGamesTable = async () => {
  const createGamesTableQuery = `
  DROP TABLE IF EXISTS game CASCADE;

  CREATE TABLE IF NOT EXISTS game (
  id SERIAL PRIMARY KEY,
  title VARCHAR (100) NOT NULL,
  description text NOT NULL,
  difficulty VARCHAR(10),
  referenceAuthor VARCHAR (100) NOT NULL
  );
  `;

  try {
    const gameRes = await pool.query(createGamesTableQuery);
    console.log("🎉 Game table created successfully.", gameRes);
  } catch (error) {
    console.error("⚠️ Error creating Games table:", error);
  }
};

const createGamesPlayersTable = async () => {
  const createGamesPlayersTableQuery = `
  DROP TABLE IF EXISTS gameplayer CASCADE;
  
  CREATE TABLE IF NOT EXISTS gameplayer (
    playerId INT NOT NULL,
    gameId INT NOT NULL,
    dateStarted TIMESTAMP,
    lastPlayed TIMESTAMP,
    isCompleted BOOLEAN,
    incorrectGuesses INT DEFAULT 0,
    correctGuesses INT DEFAULT 0,
    score INT DEFAULT 0,
    PRIMARY KEY (playerId, gameId),
    FOREIGN KEY (playerId) REFERENCES player(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (gameId) REFERENCES game(id) ON DELETE CASCADE ON UPDATE CASCADE
  );
  `;

  try {
    const gamePlayerRes = await pool.query(createGamesPlayersTableQuery);
    console.log("🎉 GamesPlayers table created successfully.", gamePlayerRes);
  } catch (error) {
    console.error("⚠️ Error creating GamesPlayers table:", error);
  }
};

const seedThemesTable = async () => {
  await createThemesTable();
  themesData.forEach((theme) => {
    const insertQuery = {
      text: "INSERT INTO theme (themeName, emoji, backgroundColor, description) VALUES($1, $2, $3, $4)",
    };
    const values = [
      theme.themeName,
      theme.emoji,
      theme.backgroundColor,
      theme.description,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log(`⚠️ Error inserting theme: ${theme.themeName}`, err);
        return;
      }
      console.log(`✅ ${theme.themeName} added successfully`);
    });
  });
};

const seedPlayersTable = async () => {
  await createPlayersTable();
  playersData.forEach((player) => {
    const insertQuery = {
      text: "INSERT INTO player (playerName, currentGame, playerThemeId) VALUES($1, $2, $3)",
    };
    const values = [
      player.playerName,
      player.currentGame,
      player.playerThemeId,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log(`⚠️ Error inserting player: ${player.playerName}`, err);
        return;
      }
      console.log(`✅ ${player.playerName} added successfully`);
    });
  });
};

const seedGamesTable = async () => {
  await createGamesTable();
  gamesData.forEach((game) => {
    const insertQuery = {
      text: "INSERT INTO game (title, description, difficulty, referenceAuthor) VALUES ($1, $2, $3, $4);",
    };
    const values = [
      game.title,
      game.description,
      game.difficulty,
      game.referenceAuthor,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log(`⚠️ Error inserting game: ${game.title}`, err);
        return;
      }
      console.log(`✅ ${game.title} added successfully`);
    });
  });
};

const seedGamesPlayersTable = async () => {
  await createGamesPlayersTable();
  gamesPlayersData.forEach((gamePlayer) => {
    const insertQuery = {
      text: " INSERT INTO gameplayer (playerId,gameId, dateStarted, lastPlayed, isCompleted, incorrectGuesses, correctGuesses, score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    };
    const values = [
      gamePlayer.playerId,
      gamePlayer.gameId,
      gamePlayer.dateStarted,
      gamePlayer.lastPlayed,
      gamePlayer.isCompleted,
      gamePlayer.incorrectGuesses,
      gamePlayer.correctGuesses,
      gamePlayer.score,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log(
          `⚠️ Error inserting gamesplayers: ${gamePlayer.playerId},${gamePlayer.gameId} `,
          err
        );
        return;
      }
      console.log(
        `✅ ${gamePlayer.playerId},${gamePlayer.gameId} added successfully`
      );
    });
  });
};

const seedTables = async () => {
  try {
    console.log("Seeding database...");
    await seedThemesTable();
    await seedPlayersTable();
    await seedGamesTable();
    await seedGamesPlayersTable();
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedTables();
// seedThemesTable();
// seedPlayersTable();
