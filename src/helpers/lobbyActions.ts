import { supabase } from "@/helpers/supabaseClient";

export const getLobbyData = async (lobbyCode: string) => {
  try {
    let { data, error, status } = await supabase
      .from("lobby")
      .select(`code, phase, artUrl, sentence`)
      .eq("code", lobbyCode);

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
};

// Get the most chaotic bit of the current time, and turn it into a unique set of 4 letters/numbers
const newLobbyCode = (): string => Date.now().toString(36).slice(-4);

export const createLobby = async (playerName: string) => {
  try {
    const lobbyCode = newLobbyCode();
    let { data, error, status } = await supabase
      .from("lobby")
      .insert({
        code: lobbyCode,
        phase: "suggesting",
        // TODO: Sort this BUSINESS out!!!
        sentence: "",
      })
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
};

export const deleteLobby = async (lobbyCode: string) => {
  try {
    let { data, error, status } = await supabase
      .from("lobby")
      .delete()
      .eq("code", lobbyCode);

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
};