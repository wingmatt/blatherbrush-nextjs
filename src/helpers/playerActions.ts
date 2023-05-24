import { insertAndReturn } from "@/helpers/supabaseClient";
import { Lobby, Player, PromptFragment } from "../../types";
import { updateLobby } from "./lobbyActions";

// Get player data from ID

type createPlayerParams = {
  name: Player["name"],
  color: Player["color"]
}
//📚 ///////////////////////////////////////////////////////////📚//
// Supabase INSERT API:
// https://supabase.com/docs/reference/javascript/insert
//📚 ///////////////////////////////////////////////////////////📚//
// Create new player
export const createPlayer = async (player: createPlayerParams): Promise<Player> => {
  const newPlayerData = {
    name: player.name,
    color: player.color
  }

  return await insertAndReturn("player", newPlayerData) as Player;
}

//📚 ///////////////////////////////////////////////////////////📚//
// Supabase UPDATE API:
// https://supabase.com/docs/reference/javascript/update
//📚 ///////////////////////////////////////////////////////////📚//
// Update player (name, color) based on ID
export const updatePlayer = async ( newPlayerData: Player, lobby: Lobby, dispatch: any) => {
  // Find all prompts claimed by this player and update their claimed_by data
  const updatedPrompts = lobby.prompts.filter((prompt) => {
    return (typeof prompt !== 'string' && prompt.claimed_by.id === newPlayerData.id)
  }) as PromptFragment[]
  updatedPrompts.forEach(prompt => prompt.claimed_by = newPlayerData)
  // Send this update, update the lobby data to reflect new player data
  dispatch({type: "UPDATE_LOBBY_DATA", payload: lobby});
  await updateLobby(lobby);
}

// Delete player?