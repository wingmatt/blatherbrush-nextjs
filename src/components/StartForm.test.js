import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StartForm from './StartForm'
import {jest} from '@jest/globals';
import mockProviderState from '../helpers/__mocks__/mockProviderState.json';
import {createLobby} from '../helpers/lobbyActions'
import { supabase } from "../helpers/supabaseClient";
jest.mock('../helpers/supabaseClient');
jest.mock("next/router", () => ({
  useRouter() {
      return {
          route: "/",
          pathname: "",
          query: "",
          asPath: "",
      };
  },
}));

test("Start form has a text input", () => {
  jest.fn('../helpers/lobbyActions', () => ({
    createLobby: jest.fn(mockProviderState.lobby)
  }));

  render(<StartForm/>);
  const input = screen.getByRole('textbox');

  expect(input).toBeInTheDocument();
})