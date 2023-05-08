import { supabase, insertAndReturn } from "@/helpers/supabaseClient";
import { Player } from "../../types";

// Get player data from ID

// Create new player
export const createPlayer = async (player: Player) => {
  const newPlayerData = {
    name: player.name,
    color: player.color
  }

  return await insertAndReturn("player", newPlayerData) as Player;
}

// Update player (name, color) based on ID

// Delete player?