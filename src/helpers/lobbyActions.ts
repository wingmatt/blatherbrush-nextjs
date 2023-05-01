import { supabase } from '@/helpers/supabaseClient'

const getLobbyData = async (lobbyCode: string) => {
  try {
    let { data, error, status } = await supabase
      .from("lobby")
      .select(`code, phase, artUrl, sentence`)
      .eq('code', lobbyCode);

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

export default getLobbyData