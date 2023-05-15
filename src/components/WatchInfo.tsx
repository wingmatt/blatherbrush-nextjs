import { useUserData } from "@/helpers/UserProvider";
import PromptClaim from "./PlayerForm/PromptClaim";

const WatchInfo = () => {
  const { state } = useUserData();
  return (
    <aside>
      <h2 className="lobby-code">
        {" "}
        Lobby Code: <span>{state.lobby.code}</span>
      </h2>
      <div role="group" className="">
        {state.lobby.prompts
          ? state.lobby.prompts.map((promptClaim, index) =>
              typeof promptClaim !== "string" ? (
                <PromptClaim
                  key={index}
                  arrayIndex={index}
                  type={promptClaim.type}
                  status={promptClaim.status}
                  claimed_by_id={promptClaim.claimed_by.id}
                  claimed_by_color={promptClaim.claimed_by.color}
                />
              ) : (
                ""
              )
            )
          : ""}
      </div>
    </aside>
  );
};

export default WatchInfo