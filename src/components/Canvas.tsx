import Image from "next/image";
import styles from "@/styles/Canvas.module.css";
import FormattedPrompt from "./FormattedPrompt";
import { useUserData } from "@/helpers/UserProvider";
import { resetLobby } from "@/helpers/lobbyActions";

const Canvas = (props: { prompt: string; url: string }) => {
  const {state} = useUserData()
  return (
    <section>
      <Image
        className={styles.canvas}
        src={state.lobby.artUrl ? state.lobby.artUrl : "https://via.placeholder.com/1024"}
        width="1024"
        height="1024"
        alt={props.prompt}
      />
      {(state.lobby.phase === "generating" || "finished") ? <FormattedPrompt/> : ""}
      {(state.lobby.phase === "finished") ? <button className="button" onClick={() => resetLobby(state.lobby.code)}>Play Again</button> : ""}
    </section>
  );
};

export default Canvas;
