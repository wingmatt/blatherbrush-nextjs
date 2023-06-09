import Image from "next/image";
import styles from "@/styles/Canvas.module.css";
import FormattedPrompt from "./FormattedPrompt";
import { useUserData } from "@/helpers/UserProvider";
import { resetLobby } from "@/helpers/lobbyActions";
import { compilePrompt } from "@/helpers/promptActions";
import LobbyQR from "./LobbyQR";

type CanvasProps = {
  displayMode: string
}

const Canvas = ({displayMode}: CanvasProps) => {
  const { state } = useUserData();
  return (
    <section className={`${styles.canvas} ${displayMode}`}>
      {state.lobby.phase !== "suggesting" ? (
        <Image
          className={styles.canvas}
          src={
            state.lobby.artUrl
              ? state.lobby.artUrl
              : ""
          }
          width="1024"
          height="1024"
          alt={state.lobby.artUrl ? compilePrompt(state.lobby.prompts) : ""}
        />
      ) : (
        <LobbyQR />
      )}
      {state.lobby.phase === "generating" ? (
        <h2 className={styles.generatingText}>
          Our top artbots are &ldquo;painting&rdquo; your commission now!
          <br />
          Here&apos;s the prompt you provided:
        </h2>
      ) : (
        ""
      )}
      {state.lobby.phase === "generating" ||
      state.lobby.phase === "finished" ? (
        <FormattedPrompt />
      ) : (
        ""
      )}
      {state.lobby.phase === "finished" ? (
        <button className="button play-again" onClick={() => resetLobby(state.lobby.code)}>
          Play Again
        </button>
      ) : (
        ""
      )}
    </section>
  );
};

export default Canvas;
