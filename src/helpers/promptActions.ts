import { supabase } from "@/helpers/supabaseClient";
import { Lobby, Player, PromptFragment, Prompt } from "../../types";

import possiblePrompts from "./prompts.json"

// Update a prompt claim: its claim, status, and/or text
export const updatePrompt = async (
  lobbyData: Lobby,
  newPrompt: PromptFragment,
  newPromptIndex: number
): Promise<Lobby> => {
  lobbyData.prompts[newPromptIndex] = newPrompt;
  try {
    let { data, error, status } = await supabase
      .from("lobby")
      .update(lobbyData)
      .eq("code", lobbyData.code)
      .select()
      .single();
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data as Lobby;
    } else throw error;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

// Select a blank prompt for a new lobby round from an array of possible prompts
export const randomNewPrompt = (): Prompt => {
  const randomIndex = Math.floor(Math.random() * possiblePrompts.length);
  return possiblePrompts[randomIndex] as Prompt;
};
export const isClaimedPrompt = (
  prompt: PromptFragment | string,
  player_id: Player["id"]
): Boolean => {
  return (
    typeof prompt == "object" &&
    prompt.status === "claimed" &&
    prompt.claimed_by.id === player_id
  );
};

export const getClaimedPrompt = (prompts: Prompt, player_id: Player["id"]): PromptFragment => {
  return prompts.find((prompt) => isClaimedPrompt(prompt, player_id)) as PromptFragment;
}

export const compilePrompt = (prompts: Prompt): string => {
  return prompts
    .reduce((compiledPrompt: string, prompt): string => {
      if (typeof prompt !== "string") {
        (compiledPrompt += prompt.text);
      } else {
        // Strings will start with "-" if there's meant to be no space between them and the last prompt.
        // If that's present, we need to trim the leading space and remove the character from the string before adding to the full prompt
        if (prompt[0] === "-") {
          compiledPrompt = compiledPrompt.trim();
          compiledPrompt += prompt.slice(1);
        } else compiledPrompt += prompt;
      }
      compiledPrompt += " "
      return compiledPrompt;
    }, "")
    .trim();
};
