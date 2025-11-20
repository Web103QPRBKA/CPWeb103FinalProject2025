# 💡 Logic Puzzle App

CodePath WEB103 Final Project

Designed and developed by: Q.Partee, R. Bazelais, K. Ahmar

![Screenshot](https://github.com/user-attachments/assets/ec68a1fe-ba06-4dfd-810b-0b7dfecab703)

🔗 Link to deployed app: n/a

## About

Description and Purpose
The “Logic Puzzle” web application is an interactive browser-based game designed to challenge players’ problem-solving skills. It features a clean, user-friendly interface, accessible puzzles, helpful hints, and answer validation. The project showcases our skills in front-end web development with an accessible and responsive design for all devices and backend functionality to store user progress and puzzle settings.

### App Evaluation

Web: How uniquely web is the product experience? It's designed for quick, focused gameplay, perfect while you are waiting for an appt, in line, airport, etc. Feels more natural on touchscreens. Responsive animations when complete a level to make it more engaging.

Story: How compelling is the story around this app once completed? You can test your logical thinking while having fun doing it.

Market: How large or unique is the market for this app? Massive brainteaser gaming market and large niche for logic puzzle games e.g. Brainzilla, Math is Fun, Puzzle Dell Puzzles.

Habit Usage most likely daily or few times a week, possible d/t chasing better scores and more difficult challenges.

Scope: How well-formed is the scope for this app? V1 Would provide a simple easy game with basic scale progression, keep track of score/level, screen for winning and losing. V2 Adds on hard mode (more complex puzzles), possible sounds/animation when complete a stage or level. V3 Adds on a timers(9 secs) for each move, possible additional puzzle themes.

### Inspiration
We’re a team that loves making people think and have fun while they do it. One of us is all about designing cool game worlds and mechanics, and the other can’t resist a good logic puzzle. Together, we want to create games that spark curiosity, challenge the brain, and give players that “aha!” moment that keeps them coming back for more.

### Tech Stack

Frontend: Vite, ReactJS, Typescript/JavaScript, Css

Backend: PostgreSQL, NodeJS, Express, TypeScript/JavaScript, Render

### Game Features

✅ 1. A player can read details about the games and choose a game they would like to play.

Video-walkthrough for feature 1.

<https://github.com/user-attachments/assets/6c185ae9-23e5-4702-a61b-165331ce89a3>

Video-walkthrough for feature 2.
✅ 2. A player can start a new game without logging in and  A player can read the rules of the game to know how to play.

<https://github.com/user-attachments/assets/03c11f57-d9d7-4348-905f-3f0d839dbb1f>

Video-walkthrough for feature 3.
✅ 3. A player can see the clues for the game and A player can get hints when stuck on an answer.

<https://github.com/user-attachments/assets/13bf3c02-3659-42c3-938a-fe314fa17738>

Video-walkthrough for features 4 and 5.
✅ 4. A player can changes to their answers.
✅ 5. A player can see how many hints they used up.

<https://github.com/user-attachments/assets/2313b56c-8f5a-417c-b811-dc7e1b938de5>

Video-walkthrough for features 6 and 7.
✅ 6. A player can  check if they have answers correct.
✅ 7. A player can track puzzle progress and A player can see their score.

<https://github.com/user-attachments/assets/6910634e-2acc-4ea3-8703-d21f3a2e579a>

Video-walkthrough for features 8.
✅ 8. A player can reset the puzzle if the was to start over.

<https://github.com/user-attachments/assets/02910ce9-2e43-4726-9587-2bf4cf006a79>

Video-walkthrough for feature 9.
✅ 9. A player gets a congratulations message when completes the game.

<https://github.com/user-attachments/assets/63b2b5da-dfbc-4af5-b075-307c46cc9d57>

### Baseline Features

✅ Baseline Features (MUST complete ALL) Complete all of the baseline features. These features use the core skills developed in this course, including designing a database schema, creating a server, and connecting a frontend to the server.

- [x] The web app includes an Express backend app and a React frontend app.
- [x] The web app includes dynamic routes for both frontend and backend apps.
-[] The web app is deployed on Render with all pages and features working.

Backend Features
- [x] The web app implements at least one of each of the following database relationship in Postgres:
- [x] one-to-many
- [x] many-to-many with a join table
- [x] The web app implements a well-designed RESTful API that:
- [x] supports all four main request types for a single entity (ex. tasks in a to-do list app): GET, POST, PATCH, and DELETE
- [x] the user can view items, such as players, games, hints, clues
- [x] the user can create a new item, such as a account
- [x] the user can update an existing item by changing some or all of its values, such as changing the name of profile
- [x] the user can delete an existing item, such as a profile
- [x] Implements proper naming conventions for routes. The web app includes the ability to reset the database to its default state.

**Frontend Features**

- [x] The web app implements at least one redirection, where users are able to navigate to a new page with a new URL within the app
- [x] The web app implements at least one interaction that the user can initiate and complete on the same page without navigating to a new page.
- [x] The web app uses dynamic frontend routes created with React Router.
- [x] The web app uses hierarchically designed React components:
- [x] Components are broken down into categories, including page and component types.
- [x] Corresponding container components and presenter components as appropriate.
- [ ] The project is deployed on Render with all pages and features that are visible to the user are working as intended.

## Custom Features

Choose at least two custom features to include in your app. These features will make your app stand out with a more custom look and functionality.

- [x] The web app gracefully handles errors.
- [x] The web app includes a one-to-one database relationship.
- [x] The web app includes a unique field within the join table.

## Stretch Features

- [x] Show a spinner while a page or page element is loading

<https://github.com/user-attachments/assets/0ad7332b-ffda-43e0-9494-902092e0fdbd>


## Installation Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/downloads)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Web103QPRBKA/CPWeb103FinalProject2025.git
cd CPWeb103FinalProject2025
```

### Step 2: Set Up PostgreSQL Database

1. Create a new PostgreSQL database:

   ```bash
   psql -U postgres
   CREATE DATABASE logic_puzzle_db;
   \q
   ```

2. Note your PostgreSQL credentials (username, password, host, port, database name)

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory with your PostgreSQL credentials:

```bash
PGUSER=your_postgres_username
PGPASSWORD=your_postgres_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=logic_puzzle_db
```

**Important:** Replace the placeholder values with your actual PostgreSQL credentials.

### Step 4: Install Dependencies

Install all required dependencies for both client and server:

```bash
npm run install-all
```

Or manually install for each part:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
cd ..
```

### Step 5: Initialize the Database

Run the database reset script to create tables and seed initial data:

```bash
cd server
npm run reset
cd ..
```

This will create the following tables:

- `theme` - Game themes and color schemes
- `player` - Player accounts and preferences
- `game` - Available logic puzzles
- `gameplayer` - Player game progress and scores
- `solutions` - Puzzle solutions
- `clue` - Game clues
- `hint` - Available hints for each game

### Step 6: Start the Development Server

From the root directory, run:

```bash
npm run dev
```

This command will concurrently start:

- **Frontend (Vite)** on `http://localhost:5173`
- **Backend (Express)** on `http://localhost:3000` (or your configured port)

### Step 7: Access the Application

Open your browser and navigate to:

```text
http://localhost:5173
```

You should see the Logic Puzzle App welcome page!

### Alternative: Start Servers Separately

If you need to run the client and server separately:

**Terminal 1 - Backend:**

```bash
cd server
npm start
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

### Troubleshooting

**Database Connection Issues:**

- Verify PostgreSQL is running: `pg_isready`
- Check your `.env` file has correct credentials
- Ensure the database exists: `psql -U postgres -l`

**Port Already in Use:**

- Change the Vite port in `client/vite.config.js`
- Check if another process is using port 3000 or 5173

**Module Not Found Errors:**

- Delete `node_modules` folders and `package-lock.json` files
- Run `npm run install-all` again

**Database Reset:**

If you need to reset the database to its initial state:

```bash
cd server
npm run reset
```

### Production Build

To create a production build of the frontend:

```bash
cd client
npm run build
```

The optimized files will be in the `client/dist` directory.

## Deployment to Production

### Prerequisites for Deployment

- A Netlify account for frontend hosting
- A Render account for backend hosting (or Railway/Heroku)
- PostgreSQL database (Render provides free PostgreSQL databases)
- GitHub repository

### Deploy to Netlify + Render

#### 1. Deploy the Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `logic-puzzle-db`
   - **Database**: `logic_puzzle_db`
   - **User**: (auto-generated)
   - **Region**: Choose closest to your users
   - **Plan**: Free or Starter
4. Click "Create Database"
5. Copy the **Internal Database URL** (starts with `postgres://`)

#### 2. Deploy the Backend (Render)

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `logic-puzzle-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or Starter
4. Add Environment Variables (click "Advanced" → "Add Environment Variable"):

   ```env
   NODE_ENV=production
   PGUSER=(from database credentials)
   PGPASSWORD=(from database credentials)
   PGHOST=(from database internal URL)
   PGPORT=5432
   PGDATABASE=logic_puzzle_db
   PORT=3001
   CLIENT_URL=(your Netlify frontend URL - add after frontend deployment)
   ```

5. Click "Create Web Service"
6. After deployment, run the database reset:
   - Go to the Shell tab in your web service
   - Run: `cd config && node reset.js`
7. **Copy your backend URL** (e.g., `https://logic-puzzle-api.onrender.com`)

#### 3. Update API URL in Frontend

Before deploying to Netlify, update the API base URL:

1. Open `client/src/services/api.js`
2. Update the base URL to your Render backend URL:

   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://logic-puzzle-api.onrender.com';
   ```

3. Or create `client/.env.production`:

   ```env
   VITE_API_URL=https://logic-puzzle-api.onrender.com
   ```

#### 4. Deploy the Frontend (Netlify)

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
5. Click "Deploy site"
6. **Copy your Netlify URL** (e.g., `https://your-app.netlify.app`)

#### 5. Update Backend CORS Configuration

1. Go back to Render dashboard → Your backend service
2. Update Environment Variables:
   - Set `CLIENT_URL` to your Netlify URL (e.g., `https://your-app.netlify.app`)
3. Save - the service will automatically redeploy

### Environment Variables Reference

Create a `.env` file in the `server` directory based on `.env.example`:

```bash
# Database Configuration
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGHOST=your_database_host
PGPORT=5432
PGDATABASE=logic_puzzle_db

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (for CORS)
CLIENT_URL=https://your-app.netlify.app
```

### Post-Deployment Checklist

- [ ] Database is running and accessible on Render
- [ ] Backend API is deployed on Render and responding at `/` endpoint
- [ ] Database tables are created (run `npm run reset` via Render shell)
- [ ] Frontend is deployed on Netlify
- [ ] Frontend API URL is configured to point to Render backend
- [ ] Backend CORS CLIENT_URL is set to Netlify URL
- [ ] All environment variables are set correctly
- [ ] Test all game features in production

### Troubleshooting Deployment

**Backend won't start:**

- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure database URL is correct

**Database connection errors:**

- Use the Internal Database URL for backend connection
- Verify PGHOST, PGPORT, PGUSER, PGPASSWORD are correct
- Check if database is running

**CORS errors:**

- Update CLIENT_URL in backend environment variables to match Netlify URL
- Ensure URL includes protocol (https://)
- Redeploy backend after updating

**Frontend can't reach backend:**

- Update API base URL in `client/src/services/api.js` or `client/.env.production`
- Check backend service is running on Render
- Verify API routes are accessible
- Check browser console for network errors

