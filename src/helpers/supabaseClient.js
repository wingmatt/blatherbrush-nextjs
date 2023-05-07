import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const insertAndReturn = async (table, newData) => {
  try {
    let { data, error, status } = await supabase
      .from(table)
      .insert(newData)
      .select()
      .single();
    console.log(data, status);
    if (error && status !== 406) {
      throw error;
    }
    if (data && status === 201) {
      return data;
    } else throw error;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}