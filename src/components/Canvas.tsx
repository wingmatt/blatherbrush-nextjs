import Image from "next/image";
import styles from "@/styles/Canvas.module.css";
import FormattedPrompt from "./FormattedPrompt";
import { useUserData } from "@/helpers/UserProvider";

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
    </section>
  );
};

export default Canvas;
