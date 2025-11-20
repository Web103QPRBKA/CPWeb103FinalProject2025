import express from "express";
import "./config/dotenv.js";
import { validateEnv } from "./config/validateEnv.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import cluesRoutes from "./routes/clues.js";
import hintRoutes from "./routes/hints.js";
import solutionRoute from "./routes/solutions.js";
import themeRoute from "./routes/themes.js";
import gamesRoute from "./routes/games.js";
import playersRoutes from "./routes/players.js";
import leaderboardRoute from "./routes/leaderboard.js";

// Validate environment variables
validateEnv();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting - limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/clues", cluesRoutes);
app.use("/api/hints", hintRoutes);
app.use("/api/solutions", solutionRoute);
app.use("/api/themes", themeRoute);
app.use("/api/games", gamesRoute);
app.use("/api/players", playersRoutes);
app.use("/api/leaderboard", leaderboardRoute);

app.get("/", (req, res) => {
  res
.status(200)
.send(
  `<h1 style="text-align: center; margin-top: 50px;">SERVER IS RUNNING!</h1>`
);
});

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
