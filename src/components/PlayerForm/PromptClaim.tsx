import { Context, PromptFragment } from "../../../types";
import { useUserData } from "@/helpers/UserProvider";
import { updatePrompt } from "@/helpers/promptActions";
import styles from '@/styles/PromptClaim.module.css'

const claimWord = async (
  state: Context,
  // TODO: Refine dispatch type
  dispatch: any,
  arrayIndex: number
) => {
  const player_id = state.player.id as string;
  state.lobby.prompts.forEach((prompt) => {
    if (typeof(prompt) == "object" && prompt.status === "claimed" && prompt.claimed_by === player_id) {
      prompt.status = "open";
      prompt.claimed_by = "";
    }
  });
  const newPrompt = state.lobby.prompts[arrayIndex] as PromptFragment;
  newPrompt.status = "claimed";
  newPrompt.claimed_by = player_id;
  await updatePrompt(state.lobby, newPrompt, arrayIndex).then((updatedLobby) =>
    dispatch({ type: "SET_LOBBY_DATA", payload: updatedLobby })
  );
};

const PromptClaim = ({
  type,
  claimed_by,
  status,
  arrayIndex,
}: PromptFragment) => {
  const { state, dispatch } = useUserData();
  const claimedByPlayer = state.player.id === claimed_by;
  const shouldBeDisabled =
    (status === "claimed" && !claimedByPlayer) || status === "submitted";
  return (
    <label
      className={`${styles.prompt} ${claimedByPlayer ? styles.claimedByPlayer : ""} ${
        shouldBeDisabled ? styles.shouldBeDisabled : ""
      } ${styles[status]}`}
    >
      <input
        type="radio"
        checked={claimedByPlayer}
        name="wordClaim"
        onChange={() => claimWord(state, dispatch, arrayIndex as number)}
        value="Adjective"
        disabled={shouldBeDisabled}
      />
      {type}
    </label>
  );
};

export default PromptClaim;
