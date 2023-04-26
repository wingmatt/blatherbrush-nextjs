import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Canvas.module.css";

const Canvas = (props: { prompt: string; url: string }) => {
  const [url, setUrl] = useState("https://via.placeholder.com/1024");
  return <Image className={styles.canvas} src={url} width="1024" height="1024" alt={props.prompt} />;
};

export default Canvas;