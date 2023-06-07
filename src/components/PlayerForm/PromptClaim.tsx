import { Context, Player, PromptFragment } from "../../../types";
import { useState } from "react";
import { useUserData } from "@/helpers/UserProvider";
import { updatePrompt } from "@/helpers/promptActions";
import { getLobbyData } from "@/helpers/lobbyActions";
import styles from '@/styles/PromptClaim.module.css'

type PromptClaimInterface = {
  arrayIndex?: number;
  type: string;
  text?: string;
  claimed_by_id: string;
  claimed_by_color: string;
  status: "open" | "claimed" | "submitted";
}

const claimWord = async (
  state: Context,
  // TODO: Refine dispatch type
  dispatch: any,
  arrayIndex: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const player = state.player as Player;
  getLobbyData(state.lobby.code).then(async serverLobby => {
    const serverPrompt = serverLobby.prompts[arrayIndex] as PromptFragment
    if (serverPrompt.status == "open") {
      state.lobby.prompts.forEach((prompt) => {
        if (typeof(prompt) == "object" && prompt.status === "claimed" && prompt.claimed_by.id === state.player.id) {
          prompt.status = "open";
          prompt.claimed_by = {
            name: "",
            color: "",
            id: ""
          };
          prompt.text = "";
        }
      });
      const newPrompt = state.lobby.prompts[arrayIndex] as PromptFragment;
      newPrompt.status = "claimed";
      newPrompt.claimed_by = player;
      dispatch({ type: "SET_LOBBY_DATA", payload: state.lobby });
      await updatePrompt(state.lobby, newPrompt, arrayIndex);
    } else {
      dispatch({ type: "SET_LOBBY_DATA", payload: serverLobby });
    }
  })
  setLoading(false)
};

const PromptClaim = ({
  type,
  claimed_by_id,
  claimed_by_color,
  status,
  arrayIndex,
}: PromptClaimInterface) => {
  const { state, dispatch } = useUserData();
  const [loading, setLoading] = useState(false);
  const claimedByPlayer = state.player.id === claimed_by_id;
  const shouldBeDisabled =
    (status === "claimed" && !claimedByPlayer) || status === "submitted";
  return (
    <label
      className={`${styles.prompt} ${claimedByPlayer ? styles.claimedByPlayer : ""} ${
        shouldBeDisabled ? styles.shouldBeDisabled : ""
      } bg-${claimed_by_color} ${styles[status]}`}
    >
      <input
        type="radio"
        checked={claimedByPlayer}
        name="wordClaim"
        onChange={() => claimWord(state, dispatch, arrayIndex as number, setLoading)}
        value="Adjective"
        disabled={shouldBeDisabled}
      />
      {type}
    </label>
  );
};

export default PromptClaim;
