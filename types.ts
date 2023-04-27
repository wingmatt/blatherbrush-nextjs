interface Lobby {
  id: string;
  created_at: string;
  code: string;
  phase: "suggesting" | "generating" | "finished";
  artUrl?: string;
  sentence: (string | PromptFragment)[];
}
interface PromptFragment {
  type: string;
  text: string;
  claimedBy: string;
  status: "open" | "claimed" | "submitted";
}

interface Player {
  name: string;
  color: string;
}