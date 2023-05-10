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
  const newPrompt = state.lobby.prompts[arrayIndex] as PromptFragment;
  newPrompt.status = "claimed";
  newPrompt.claimed_by = state.player.id as string;
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
        onChange={() => claimWord(state, dispatch, arrayIndex)}
        value="Adjective"
        disabled={shouldBeDisabled}
      />
      {type}
    </label>
  );
};

export default PromptClaim;
