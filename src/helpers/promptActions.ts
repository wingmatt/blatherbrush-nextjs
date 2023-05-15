import { supabase } from "@/helpers/supabaseClient";
import { Lobby, Player, PromptFragment, Prompt } from "../../types";

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
  return possiblePrompts[randomIndex];
};

const possiblePrompts: Prompt[] = [
  [
    "The majestic",
    {
      type: "animal",
      claimed_by: {
        id: "",
        name: "",
        color: ""
      },
      status: "open",
      text: "",
    },
    "soared through the sky, its",
    {
      type: "adjective",
      claimed_by: {
        id: "",
        name: "",
        color: ""
      },
      status: "open",
      text: "",
    },
    "wings shimmering in the",
    {
      type: "time of day",
      claimed_by: {
        id: "",
        name: "",
        color: ""
      },
      status: "open",
      text: "",
    },
    "light."
  ],
];

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

export const compilePrompt = (prompts: Prompt): string => {
  return prompts
    .reduce((compiledPrompt: string, prompt): string => {
      typeof prompt !== "string"
        ? (compiledPrompt += prompt.text)
        : (compiledPrompt += prompt);
      compiledPrompt += " ";
      return compiledPrompt;
    }, "")
    .trim();
};
