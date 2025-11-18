import { useRoutes, Link } from 'react-router-dom'
import Grid from './components/Grid'
import Welcome from './pages/Welcome';
import LogicPuzzle from './components/LogicPuzzle'
import Game from "./pages/Game";
import './css/App.css'

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/puzzle/:puzzleId",
      element: <LogicPuzzle />,
    },
    {
      path:"games/:id",
      element: <Game />
    }
  ]);

  return (
    <div className="App">
      <div className="header">
        <Link to="/">
          <button className="headerBtn">Explore Games</button>
        </Link>
        <Link to="/puzzle/1">
          <button className="headerBtn">Play Puzzle 1</button>
        </Link>
        <Link to="/puzzle/2">
          <button className="headerBtn">Play Puzzle 2</button>
        </Link>
        <Link to="/puzzle/3">
          <button className="headerBtn">Play Puzzle 3</button>
        </Link>
      </div>
      <main className='main-content'>{element}</main>

      <footer className="footer">
        <p>&copy; 2025 Logic Puzzle App | Q.Partee, R. Bazelais, K. Ahmar</p>
      </footer>
    </div>
  );
}

export default App
