import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlayerForm from "./PlayerForm";
import {UserProvider} from "../../helpers/UserProvider"
import {jest} from '@jest/globals';
import { supabase } from "../../helpers/supabaseClient";
jest.mock('../../helpers/supabaseClient');

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
const mockProviderState = {
    state: {prompts: testPrompt}
  }

