import { useState } from "react";
import styles from "@/styles/StartForm.module.css"

const StartForm = () => {
  const [form, setForm] = useState({});
  return (
    <form className={styles.start}>
      <h2>What&apos;s your name?</h2>
      <input type="text" name="playerName" />
      <h2>Lobby Code?</h2>
      <div>
        <input type="text" name="lobbyCode" />
        <button type="submit" id="joinLobby" className="button highlight">
          Join
        </button>
      </div>
      <span>-OR-</span>
      <button type="button" id="hostLobby" className="button">
        Host
      </button>
    </form>
  );
};

export default StartForm;
