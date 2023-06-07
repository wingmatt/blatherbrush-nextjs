import { useState, ChangeEvent, FormEvent } from "react";
import PromptClaim from "./PromptClaim";
import styles from "@/styles/PlayerForm.module.css";
import { useUserData } from "@/helpers/UserProvider";
import { PromptFragment } from "../../../types";
import NameForm from "../NameForm";
import { getClaimedPrompt, isClaimedPrompt, moderatePrompt } from "@/helpers/promptActions";
import { getLobbyData, updateLobby, maybeGeneratingPhase } from "@/helpers/lobbyActions";

const PlayerForm = () => {
  const { state, dispatch } = useUserData();
  const [promptSubmission, setPromptSumbission] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const handleBlur = async () => {
    moderatePrompt(promptSubmission).then(flagged => setIsFlagged(flagged))
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    moderatePrompt(promptSubmission).then(async flagged => {
      setLoading(true);
      setIsFlagged(flagged);
      if (!flagged) {
        const player_id = state.player.id as string;
        getLobbyData(state.lobby.code).then(async serverLobby => {
          const claimed_prompt = serverLobby.prompts.find((prompt) =>
            isClaimedPrompt(prompt, player_id)
          ) as PromptFragment;
          claimed_prompt.text = promptSubmission;
          claimed_prompt.status = "submitted";
          dispatch({ type: "SET_LOBBY_DATA", payload: state.lobby });
          setPromptSumbission("");
          await updateLobby(serverLobby).then(async (newLobbyData) => {
            await maybeGeneratingPhase(newLobbyData, dispatch);
          });
        })
      }
      setLoading(false);
    });
  };
  if (!state.player.id) return <NameForm />;
  else if (state.lobby.phase === "suggesting")
    return (
      <form
        className={styles.playerForm}
        onSubmit={(event: FormEvent) => handleSubmit(event)}
      >
        <h2>1 • claim your prompt</h2>
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
            <h2>2 • type a fun {getClaimedPrompt(state.lobby.prompts, state.player.id)?.type}</h2>
            <input
              type="text"
              name="promptSubmission"
              value={promptSubmission}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPromptSumbission(event.target.value)
              }
              onBlur={()=> handleBlur()}
            />
          </label>
          {isFlagged ? <><button className="button" onClick={()=> {setPromptSumbission(""); setIsFlagged(false);}}>no thanks. try again</button><p>the robots think you&apos;re being inappropriate</p></> : <button type="submit" className={`button bg-${state.player.color}`}>
            {loading ? "sending..." : "3 • send it over"}
          </button>}
        </>: ""}
      </form>
    );
  else return <></>;
};

export default PlayerForm;
