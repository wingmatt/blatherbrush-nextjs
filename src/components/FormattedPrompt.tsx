import styles from "@/styles/FormattedPrompt.module.css"
import { PromptFragment } from "../../types";
import { useUserData } from "@/helpers/UserProvider";

const PromptFragmentHtml = (promptFragment: PromptFragment | string, index: number) => {
  if (typeof promptFragment === "string") return <span className={styles.static} key={index}>{promptFragment}</span>;
  else {
    return (
      <div className={`${styles.dynamic} txt-${promptFragment.claimed_by.color} border-${promptFragment.claimed_by.color}`} key={index}>
        <span className={styles.claimed_by}>{promptFragment.claimed_by.name}</span>
        <span className={styles.text}>{promptFragment.text}</span>
        <span className={styles.type}>{promptFragment.type}</span>
      </div>
    );
  }
};

const FormattedPrompt = () => {
  const { state } = useUserData();
  return (
    <aside>
      {state.lobby.prompts ? state.lobby.prompts.map((promptFragment, index) => PromptFragmentHtml(promptFragment, index)) : ""}
    </aside>
  )
};

export default FormattedPrompt