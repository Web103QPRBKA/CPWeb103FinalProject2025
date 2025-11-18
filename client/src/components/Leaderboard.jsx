import { useState, useEffect } from "react";
import { getLeaderboard } from "../services/api";
import "../css/Leaderboard.css";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard();
        setLeaders(data);
      } catch (err) {
        setError("Failed to load leaderboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <p className="red-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h2 className="center-align">🏆 Leaderboard</h2>
      <p className="center-align grey-text">Top puzzle solvers</p>
      
      {leaders.length === 0 ? (
        <p className="center-align">No completed games yet. Be the first!</p>
      ) : (
        <table className="striped highlight responsive-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Game</th>
              <th>Score</th>
              <th>Correct</th>
              <th>Incorrect</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={index}>
                <td>
                  <strong>
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && `#${index + 1}`}
                  </strong>
                </td>
                <td>{leader.playername}</td>
                <td>{leader.gametitle}</td>
                <td><strong>{leader.score}</strong></td>
                <td className="green-text">{leader.correctguesses}</td>
                <td className="red-text">{leader.incorrectguesses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;