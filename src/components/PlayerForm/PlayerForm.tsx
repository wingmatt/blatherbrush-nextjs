import { useState } from "react";
import PromptClaim from "./PromptClaim";
import styles from "@/styles/PlayerForm.module.css";
import { useUserData } from "@/helpers/UserProvider";
import { PromptFragment, Prompt } from "../../../types";
import NameForm from "../NameForm";

const claimablePrompts = (fullPrompt: Prompt) => {
  return fullPrompt.filter((prompt: PromptFragment | string) => (typeof prompt !== "string")) as PromptFragment[]
}

const PlayerForm = () => {
  const {state} = useUserData();
  const [form, setForm] = useState({
    data: {},
  });

  if (!state.player.id) return <NameForm/>; else return (
    <form className={styles.playerForm}>
      <h2>1 • Claim your word!</h2>
      <div role="group" className={styles.wordClaims}>
      {state.lobby.prompts ? state.lobby.prompts.map((promptClaim, index) => (typeof(promptClaim) !== "string") ? <PromptClaim key={index} arrayIndex={index} type={promptClaim.type} status={promptClaim.status} claimed_by={promptClaim.claimed_by}/>: ""): ""}
      </div>
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
