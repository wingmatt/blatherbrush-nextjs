import { supabase, insertAndReturn } from "@/helpers/supabaseClient";
import { Player } from "../../types";

// Get player data from ID

type createPlayerParams = {
  name: Player["name"],
  color: Player["color"]
}

// Create new player
export const createPlayer = async (player: createPlayerParams) => {
  const newPlayerData = {
    name: player.name,
    color: player.color
  }

  return await insertAndReturn("player", newPlayerData) as Player;
}

// Update player (name, color) based on ID

// Delete player?