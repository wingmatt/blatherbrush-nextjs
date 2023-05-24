import { supabase, insertAndReturn } from "@/helpers/supabaseClient";
import { Lobby } from "../../types";
import { compilePrompt, moderatePrompt, randomNewPrompt } from "./promptActions";

export const getLobbyData = async (
  lobbyCode: string
): Promise<Lobby | ErrorEvent> => {
  try {
    let { data, error, status } = await supabase
      .from("lobby")
      .select(`code, phase, artUrl, prompts`)
      .eq("code", lobbyCode)
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

// Get the most chaotic bit of the current time, and turn it into a unique set of 4 letters/numbers
const newLobbyCode = (): string =>
  Date.now().toString(36).slice(-4).toUpperCase();
//📚 ///////////////////////////////////////////////////////////📚//
// Supabase INSERT API:
// https://supabase.com/docs/reference/javascript/insert
//📚 ///////////////////////////////////////////////////////////📚//
export const createLobby = async (playerName: string): Promise<Lobby> => {
  const newLobbyData = {
    code: newLobbyCode(),
    phase: "suggesting",
    prompts: randomNewPrompt(),
  };

  return await insertAndReturn("lobby", newLobbyData) as Lobby;
};
//📚 ///////////////////////////////////////////////////////////📚//
// Supabase UPDATE API:
// https://supabase.com/docs/reference/javascript/update
//📚 ///////////////////////////////////////////////////////////📚//
export const updateLobby = async(lobbyData: Lobby): Promise<Lobby> => {
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
}
//📚 ///////////////////////////////////////////////////////////📚//
// Supabase DELETE API:
// https://supabase.com/docs/reference/javascript/delete
//📚 ///////////////////////////////////////////////////////////📚//
export const deleteLobby = async (
  lobbyCode: string
): Promise<Lobby | ErrorEvent> => {
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

export const resetLobby = async (lobbyCode: Lobby["code"]): Promise<Lobby> => {
  const freshLobby: Lobby = {
    code: lobbyCode,
    phase: "suggesting",
    prompts: randomNewPrompt(),
    artUrl: null
  }
  return await updateLobby(freshLobby);
}

export const maybeGeneratingPhase = async (lobbyData: Lobby, dispatch: any) => {
  // Check if all prompts are submitted
  const allPromptsSubmitted = !(lobbyData.prompts.find((prompt) => (typeof prompt === "object" && prompt.status !== "submitted")))
  console.log(allPromptsSubmitted)
  if (allPromptsSubmitted) {
    // TODO: Send data to OpenAI here.
    lobbyData.phase = "generating";
    dispatch({type: "SET_LOBBY_DATA", payload: lobbyData});
    await updateLobby(lobbyData);
    const compiledPrompt = compilePrompt(lobbyData.prompts);
    moderatePrompt(compiledPrompt).then(async flagged => {
      if (!flagged) {
        // When the call to OpenAI completes, update the lobby with the art URL and update lobby to be in the "finished" phase.
        await fetch("/api/get-openai-img", {
          method: "POST",
          body: compiledPrompt
        }).then(async (response) => {
          const artUrl = await response.text();
          lobbyData.artUrl = artUrl;
        });
        lobbyData.phase = "finished";
        await updateLobby(lobbyData);
      }
      else {
        lobbyData.artUrl = "/img/sad-robot.jpg";
        lobbyData.phase = "finished";
        lobbyData.prompts = ["your prompt offended the art robot. congratulations — you collectively disgusted a machine"]
        await updateLobby(lobbyData);
      }
    })
  }
}

//📚 ///////////////////////////////////////////////////////////📚//
// Supabase subscriptions API:
// https://supabase.com/docs/reference/javascript/subscribe
//
// We're using postgres_changes, here's a guide on that:
// https://supabase.com/docs/guides/realtime/extensions/postgres-changes
//📚 ///////////////////////////////////////////////////////////📚//
export const subscribeToLobbyUpdates = async (lobbyCode: Lobby["code"], dispatch: any) => {
  const channel = supabase
  .channel('lobbyUpdates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'lobby',
      filter: `code=eq.${lobbyCode}`,
    },
    (updatedLobby) => dispatch({type: "SET_LOBBY_DATA", payload: updatedLobby.new})
  )
  .subscribe()
}