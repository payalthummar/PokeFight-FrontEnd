import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../leaderboard/Leaderboard";

function Welcome({ setPlayerID, setScore }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const response = await fetch(
      "https://pokefight-app.onrender.com/game/leaderboard",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setName(data.player.name);
      setPlayerID(data.player._id);
      setScore(0);
      navigate("/pokefight");
    }
  };

  return (
    <div className="container">
      <div className="body">
        <div className="playerForm">
          <form onSubmit={submitHandler}>
            <h4>Please enter your name</h4>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <button
              disabled={!name}
              type="submit"
              className="playbtn"
              id="play"
              onClick={submitHandler}
            >
              Let's play
            </button>
          </form>
          {error && <div className="error">{error}</div>}
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

export default Welcome;
