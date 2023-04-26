import { useEffect, useState } from "react";
import WordClaims from "./WordClaims";
import styles from "@/styles/PlayerForm.module.css";

const PlayerForm = () => {
  const [form, setForm] = useState({
    data: {},
  });
  return (
    <form className={styles.playerForm}>
      <WordClaims />
      <label>
        <h2>2 • What&apos;s the word?</h2>
        <input type="text" name="wordSubmission" />
      </label>
      <button type="submit" className="button highlight">
        3 • Submit
      </button>
    </form>
  );
};

export default PlayerForm;
