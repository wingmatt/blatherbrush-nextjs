import * as React from "react";
import { supabase } from "./supabaseClient";
import { ReducerState, ReducerAction, Props, Lobby, PromptFragment, Player } from "../../types";

const UserContext = React.createContext<
  { state: ReducerState; dispatch: (action: ReducerAction) => void } | undefined
>(undefined);

function userDataReducer(state: ReducerState, action: ReducerAction): any {
  switch (action.type) {
    case "SET_PLAYER_DATA":
      return {
        ...state,
        player: {
          name: action.payload.name,
          color: action.payload.color
        }
      }
    case "SET_LOBBY_DATA":
      return {
        ...state,
        lobby: action.payload
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function UserProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(userDataReducer, {
    lobby: "",
    player: "",
  });
  React.useEffect(() => {
    //Initial loading here, can be async~
    dispatch({type: "SET_PLAYER_DATA", payload: playerDemoData});
    dispatch({type:"SET_LOBBY_DATA", payload: lobbyDemoData});
  }, []);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
}

function useUserData() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserData };

// Test Data below

const playerDemoData = {
  name: typeof window !== "undefined" ? localStorage.getItem("player_name") : null,
  color: "#399AAF"
}

const lobbyDemoData = {
  id: "12345",
  code: "RX59",
  created_at: "A time",
  phase: "suggesting",
  artUrl: null,
  prompts: [
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
}