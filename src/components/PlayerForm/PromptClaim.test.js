import { render, screen } from "@testing-library/react";
import { UserProvider } from "../../helpers/UserProvider";
import userEvent from "@testing-library/user-event";
import PromptClaim from "./PromptClaim";
import { supabase } from "../../helpers/supabaseClient";
jest.mock('../../helpers/supabaseClient');

test("Prompt is selected when clicked", () => {
  render(<UserProvider><PromptClaim type="noun" claimed_by="me" status="open" /></UserProvider>);
  const prompt = screen.getByLabelText("noun");

  userEvent.click(prompt);

  expect(prompt).toHaveClass("selected");
});

test("Prompt has its type as a label", () => {
  render(<UserProvider><PromptClaim type="noun" claimed_by="me" status="open" /></UserProvider>);
  const prompt = screen.getByLabelText("noun");

  expect(prompt).toBeInTheDocument();
});
