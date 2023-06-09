import { useUserData } from "@/helpers/UserProvider";
import PromptClaim from "./PlayerForm/PromptClaim";
import styles from "@/styles/WatchInfo.module.css"

const WatchInfo = () => {
  const { state } = useUserData();
  return (
    <>{state.lobby.phase === "suggesting" ? <aside className={styles.watchInfo}>
      <h2 className="lobby-code">
        lobby code: <span>{state.lobby.code}</span>
      </h2>
      <p>
        want in on the fun? go to blatherbrush.com and enter{" "}
        <b>{state.lobby.code}</b>, or scan the QR code with your phone
      </p>
      <h2>this round&apos;s prompts</h2>
      <div role="group" className={styles.prompts}>
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
    </aside> : ""}</>
  );
};

export default WatchInfo;
