import { supabase } from "@/helpers/supabaseClient";
import { Player } from "../../types";

// Get player data from ID

// Create new player
export const createPlayer = async (player: Player) => {
  const newPlayerData = {
    name: player.name,
    color: player.color
  }

  try {
    let { data, error, status } = await supabase
      .from("lobby")
      .insert(newPlayerData)
      .select()
      .single();
    console.log(data, status);
    if (error && status !== 406) {
      throw error;
    }
    if (data && status === 201) {
      return data as Player;
    } else throw error;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

// Update player (name, color) based on ID

// Delete player?