import { useState, ChangeEvent } from "react";
import PromptClaim from "./PromptClaim";
import styles from "@/styles/PlayerForm.module.css";
import { useUserData } from "@/helpers/UserProvider";
import { PromptFragment, Prompt } from "../../../types";
import NameForm from "../NameForm";
import { isClaimedPrompt } from "@/helpers/promptActions";


const PlayerForm = () => {
  const {state, dispatch} = useUserData();
  const [promptSubmission, setPromptSumbission] = useState("");
  if (!state.player.id) return <NameForm/>; else return (
    <form className={styles.playerForm}>
      <h2>1 • Claim your prompt!</h2>
      <div role="group" className={styles.wordClaims}>
      {state.lobby.prompts ? state.lobby.prompts.map((promptClaim, index) => (typeof(promptClaim) !== "string") ? <PromptClaim key={index} arrayIndex={index} type={promptClaim.type} status={promptClaim.status} claimed_by={promptClaim.claimed_by}/>: ""): ""}
      </div>
      <label>
        <h2>2 • Say something cool!</h2>
        <input type="text" name="promptSubmission" value={promptSubmission} onChange={(event: ChangeEvent<HTMLInputElement>) => setPromptSumbission(event.target.value)}/>
      </label>
      <button type="submit" className="button highlight">
        3 • Send it over!
      </button>
    </form>
  );
};

export default PlayerForm;
