import { useState } from "react";
import PromptClaim from "./PromptClaim";
import styles from "@/styles/PlayerForm.module.css";
import { useUserData } from "@/helpers/UserProvider";
import { PromptFragment, Prompt } from "../../../types";
import NameForm from "../NameForm";
import { isClaimedPrompt } from "@/helpers/promptActions";


const PlayerForm = () => {
  const {state, dispatch} = useUserData();
  const [form, setForm] = useState({
    data: {},
    promptSubmission: ""
  });
  const updatePromptText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(event.target.value);
    const player_id = state.player.id as string;
    const claimed_prompt = state.lobby.prompts.find(prompt => isClaimedPrompt(prompt, player_id)) as PromptFragment
    claimed_prompt.text = event.target.value;
    dispatch({type: "SET_LOBBY_DATA", payload: state.lobby})
  };
  if (!state.player.id) return <NameForm/>; else return (
    <form className={styles.playerForm}>
      <h2>1 • Claim your prompt!</h2>
      <div role="group" className={styles.wordClaims}>
      {state.lobby.prompts ? state.lobby.prompts.map((promptClaim, index) => (typeof(promptClaim) !== "string") ? <PromptClaim key={index} arrayIndex={index} type={promptClaim.type} status={promptClaim.status} claimed_by={promptClaim.claimed_by}/>: ""): ""}
      </div>
      <label>
        <h2>2 • Say something cool!</h2>
        <input type="text" name="promptSubmission" value={form.promptSubmission} onChange={(event) => updatePromptText(event)}/>
      </label>
      <button type="submit" className="button highlight">
        3 • Send it over!
      </button>
    </form>
  );
};

export default PlayerForm;
