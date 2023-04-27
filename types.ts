interface PromptFragment {
  type: null | string,
  text: string,
  claimedBy: null | string,
  status: null | "open" | "claimed" | "submitted"
}