import { useState, ChangeEvent, FormEvent } from "react";
import PromptClaim from "./PromptClaim";
import styles from "@/styles/PlayerForm.module.css";
import { useUserData } from "@/helpers/UserProvider";
import { PromptFragment, Prompt } from "../../../types";
import NameForm from "../NameForm";
import { getClaimedPrompt, isClaimedPrompt } from "@/helpers/promptActions";
import { updateLobby, maybeGeneratingPhase } from "@/helpers/lobbyActions";

const PlayerForm = () => {
  const { state, dispatch } = useUserData();
  const [promptSubmission, setPromptSumbission] = useState("");
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const player_id = state.player.id as string;
    const claimed_prompt = state.lobby.prompts.find((prompt) =>
      isClaimedPrompt(prompt, player_id)
    ) as PromptFragment;
    claimed_prompt.text = promptSubmission;
    claimed_prompt.status = "submitted";
    dispatch({ type: "SET_LOBBY_DATA", payload: state.lobby });
    setPromptSumbission("");
    await updateLobby(state.lobby).then(async (newLobbyData) => {
      await maybeGeneratingPhase(newLobbyData, dispatch);
    });
  };
  if (!state.player.id) return <NameForm />;
  else if (state.lobby.phase === "suggesting")
    return (
      <form
        className={styles.playerForm}
        onSubmit={(event: FormEvent) => handleSubmit(event)}
      >
        <h2>1 • Claim your prompt!</h2>
        <div role="group" className={styles.wordClaims}>
          {state.lobby.prompts
            ? state.lobby.prompts.map((promptClaim, index) =>
                typeof promptClaim !== "string" ? (
                  <PromptClaim
                    key={index}
                    arrayIndex={index}
                    type={promptClaim.type}
                    status={promptClaim.status}
                    claimed_by_color={promptClaim.claimed_by.color}
                    claimed_by_id={promptClaim.claimed_by.id}
                  />
                ) : (
                  ""
                )
              )
            : ""}
        </div>
        {getClaimedPrompt(state.lobby.prompts, state.player.id) ?
        <>
          <label>
            <h2>2 • Type a fun {getClaimedPrompt(state.lobby.prompts, state.player.id)?.type}!</h2>
            <input
              type="text"
              name="promptSubmission"
              value={promptSubmission}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPromptSumbission(event.target.value)
              }
            />
          </label>
          <button type="submit" className={`button bg-${state.player.color}`}>
            3 • Send it over!
          </button>
        </>: ""}
      </form>
    );
  else return <></>;
};

export default PlayerForm;
