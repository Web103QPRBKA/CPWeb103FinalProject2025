import { pool } from "./database.js";
import dotenv from "dotenv";
// import "./dotenv.js";
dotenv.config({ path: "../.env" });

import { playersData } from "../data/player.js";
import { themesData } from "../data/theme.js";

const createThemesTable = async () => {
  const createThemesTableQuery = `
  DROP TABLE IF EXISTS theme CASCADE;

  CREATE TABLE IF NOT EXISTS theme (
    id SERIAL PRIMARY KEY,
    themeName VARCHAR(100),
    emoji VARCHAR(10),
    backgroundColor VARCHAR(10),
    description TEXT
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

const seedTables = async () => {
  try {
    console.log("Seeding database...");
    await seedThemesTable();
    await seedPlayersTable();
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedTables();
// seedThemesTable();
// seedPlayersTable();

