import { PromptFragment } from "../../types";
import { useUserData } from "@/helpers/UserProvider";

const PromptFragmentHtml = (promptFragment: PromptFragment | string, index: number) => {
  if (typeof promptFragment === "string") return <span key={index}>{promptFragment}</span>;
  else {
    return (
      <div className="dynamic" key={index}>
        <span className="claimed_by">{promptFragment.claimed_by}</span>
        <span className="text">{promptFragment.text}</span>
        <span className="type">{promptFragment.type}</span>
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