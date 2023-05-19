import styles from "@/styles/FormattedPrompt.module.css"
import { PromptFragment } from "../../types";
import { useUserData } from "@/helpers/UserProvider";
import { maybeGeneratingPhase } from "@/helpers/lobbyActions";

const maybeTrimPrompt = (prompt: string) => {
  // Strings will start with "-" if there's meant to be no space between them and the last prompt.
  // If that's present, we need to trim the leading space and remove the character from the string before adding to the full prompt
  if (prompt[0] === "-") {
    return prompt.slice(1);
  } else return prompt;
}

const PromptFragmentHtml = (promptFragment: PromptFragment | string, index: number) => {
  if (typeof promptFragment === "string") return <span className={styles.static} key={index}>{maybeTrimPrompt(promptFragment)}</span>;
  else {
    return (
      <div className={`${styles.dynamic}  border-${promptFragment.claimed_by.color}`} key={index}>
        <span className={`${styles.claimed_by} bg-${promptFragment.claimed_by.color}`}>{promptFragment.claimed_by.name}</span>
        <span className={`${styles.text} bg-${promptFragment.claimed_by.color}`}>{promptFragment.text}</span>
        <span className={`${styles.type} bg-${promptFragment.claimed_by.color}`}>{promptFragment.type}</span>
      </div>
    );
  }
};

const FormattedPrompt = () => {
  const { state, dispatch } = useUserData();
  return (
    <aside className={styles.formattedPrompt}>
      {state.lobby.prompts ? state.lobby.prompts.map((promptFragment, index) => PromptFragmentHtml(promptFragment, index)) : ""}
    </aside>
  )
};

export default FormattedPrompt