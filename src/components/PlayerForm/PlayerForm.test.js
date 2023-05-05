import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlayerForm from "./PlayerForm";
import {UserProvider} from "../../helpers/UserProvider"
import {jest} from '@jest/globals';

const testPrompt = [
  "The majestic",
  {
    type: "animal",
    claimed_by: "",
    status: "open",
    text: ""
  },
  "soared through the sky, its",
  {
    type: "adjective",
    claimed_by: "",
    status: "open",
    text: ""
  },
  "wings shimmering in the",
  {
    type: "time of day",
    claimed_by: "",
    status: "open",
    text: ""
  },
  "light."
]

test("claimablePrompts correctly filters full prompt", () => {
  jest.mock('../../helpers/UserProvider', ()=> {
    useUserData: () => {
      return {prompts: testPrompt}
    }
  })
  render(<UserProvider><PlayerForm/></UserProvider>)
  const promptClaims = screen.getByRole("radio");
  expect(promptClaims).length.toBe(3);
})