import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WordClaim from "./PromptClaim";

test("Prompt is selected when clicked", () => {
  render(<WordClaim type="Noun" claimed_by="me" status="open" />);
  const prompt = screen.getByLabelText("Noun");

  userEvent.click(prompt);

  expect(prompt).toHaveClass("selected");
});

test("Prompt has its type as a label", () => {
  render(<WordClaim type="noun" claimed_by="me" status="open" />);
  const prompt = screen.getByLabelText("noun");

  expect(prompt).toBeInTheDocument();
});
