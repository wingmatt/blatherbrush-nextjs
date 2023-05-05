import { useState } from "react";
import PromptClaim from "./Prompt/PromptClaim";
import styles from "@/styles/PlayerForm.module.css";
import { useUserData } from "@/helpers/UserProvider";
import { PromptFragment, Prompt } from "../../types";

const claimablePrompts = (fullPrompt: Prompt) => {
  return fullPrompt.filter((prompt: PromptFragment | string) => (typeof prompt !== "string")) as PromptFragment[]
}

const PlayerForm = () => {
  const {state} = useUserData();
  const [form, setForm] = useState({
    data: {},
  });
  return (
    <form className={styles.playerForm}>
      <h2>1 • Claim your word!</h2>
      {claimablePrompts(state.prompts).map((promptClaim) => <PromptClaim key={promptClaim.id} type={promptClaim.type} status={promptClaim.status} claimed_by={promptClaim.claimed_by}/>)}
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
