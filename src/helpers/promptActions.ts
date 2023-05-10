import { supabase } from "@/helpers/supabaseClient";
import { Lobby, PromptFragment, Prompt } from "../../types";

// Update a prompt claim: its claim, status, and/or text
export const updatePrompt = async (lobbyData: Lobby, newPrompt: PromptFragment, newPromptIndex: number): Promise<Lobby> => {
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
      return data;
    } else throw error;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

// Select a blank prompt for a new lobby round from an array of possible prompts
export const randomNewPrompt  = ():Prompt => {
  const randomIndex = Math.floor(Math.random() * possiblePrompts.length);
  return possiblePrompts[randomIndex];
};

const possiblePrompts: Prompt[] = [
  [
    "The majestic",
    {
      type: "animal",
      claimed_by: "",
      status: "open",
      text: "",
    },
    "soared through the sky, its",
    {
      type: "adjective",
      claimed_by: "",
      status: "open",
      text: "",
    },
    "wings shimmering in the",
    {
      type: "time of day",
      claimed_by: "",
      status: "open",
      text: "",
    },
    "light. It was pretty",
    {
      type: "adjective",
      claimed_by: "",
      status: "open",
      text: "",
    },
  ],
];
