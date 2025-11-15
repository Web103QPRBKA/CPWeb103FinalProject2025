import express from "express";
import "./config/dotenv.js";
import cors from "cors";

import cluesRoutes from "./routes/clues.js";
import hintRoutes from "./routes/hints.js";
import solutionRoute from "./routes/solutions.js"
import themeRoute from "./routes/theme.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/clues", cluesRoutes);
app.use("/api/hints", hintRoutes);
app.use("/api/solutions", solutionRoute);
app.use("/api/theme", themeRoute)


app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1 style="text-align: center; margin-top: 50px;">SERVER IS RUNNING!</h1>`
    );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
