export interface Lobby {
  id?: string;
  created_at?: string;
  code: string;
  phase: "suggesting" | "generating" | "finished";
  artUrl?: string;
  prompts: (string | PromptFragment)[];
}

export interface Player {
  name: string;
  color: string;
}
export interface PromptFragment {
  id?: string;
  type: string;
  text?: string;
  claimed_by: string;
  status: "open" | "claimed" | "submitted";
}

export type Prompt = (PromptFragment | string)[];

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