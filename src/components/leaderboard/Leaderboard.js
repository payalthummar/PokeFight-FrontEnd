import axios from "axios";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const leaderboardURL = `${process.env.REACT_APP_API_ENDPOINT}/game/leaderboard/top/5`;

  useEffect(() => {
    const getLeaderboard = () => {
      axios.get(leaderboardURL).then((res) => {
        setLeaderboard(res.data);
        console.log(res.data);
      });
    };
    getLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table id="top5">
        <tr>
          <th> Name </th>
          <th> Score </th>
        </tr>
        {leaderboard.players?.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.score}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Leaderboard;
