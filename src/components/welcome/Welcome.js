import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../leaderboard/Leaderboard";

function Welcome({ setPlayerID, setScore }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    setError(null);

    const response = await fetch("http://localhost:3080/game/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

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
      <div className="welcome">
        <h3 className="mint">Welcome to our game zone</h3>
      </div>

      <div className="playerForm">
        <h4>Please enter your name</h4>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <button
          type="submit"
          className="playbtn"
          id="play"
          onClick={submitHandler}
        >
          Let's play
        </button>

        {error && <div className="error">{error}</div>}
      </div>
      <Leaderboard />
    </div>
  );
}

export default Welcome;
