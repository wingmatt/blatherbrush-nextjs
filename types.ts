export interface Lobby {
  id?: string;
  created_at?: string;
  code: string;
  phase: "suggesting" | "generating" | "finished";
  artUrl?: string | null;
  prompts: (string | PromptFragment)[];
}

export interface Player {
  id: string;
  name: string;
  color: string;
}
export interface PromptFragment {
  arrayIndex?: number;
  type: string;
  text?: string;
  claimed_by: Player;
  status: "open" | "claimed" | "submitted";
}

export type Prompt = (PromptFragment | string)[];

export type Context = {
  lobby: Lobby,
  player: Player
}
export interface Props {
  children: React.ReactNode;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

export interface ReducerState {
  player: Player;
  lobby: Lobby;
  prompts: PromptFragment[];
}