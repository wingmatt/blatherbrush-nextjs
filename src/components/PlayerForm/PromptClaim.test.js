import { render, screen } from "@testing-library/react";
import { UserProvider } from "../../helpers/UserProvider";
import mockProviderState from '../../helpers/__mocks__/mockProviderState.json';
import userEvent from "@testing-library/user-event";
import PromptClaim from "./PromptClaim";
import { supabase } from "../../helpers/supabaseClient";
jest.mock('../../helpers/supabaseClient');


test("Prompt has its type as a label", () => {
  render(<UserProvider><PromptClaim type="noun" claimed_by_id="" status="open" /></UserProvider>);
  const prompt = screen.getByLabelText("noun");

  expect(prompt).toBeInTheDocument();
});
