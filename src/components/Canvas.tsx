import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Canvas.module.css";
import FormattedPrompt from "./FormattedPrompt";

const Canvas = (props: { prompt: string; url: string }) => {
  const [url, setUrl] = useState("https://via.placeholder.com/1024");
  return (
    <section>
      <Image
        className={styles.canvas}
        src={url}
        width="1024"
        height="1024"
        alt={props.prompt}
      />
      <FormattedPrompt/>
    </section>
  );
};

export default Canvas;
