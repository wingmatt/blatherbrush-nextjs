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
          name: action.payload.player_name,
          color: action.payload.player_color
        }
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
    prompts: []
  });
  React.useEffect(() => {
    //Initial loading here, can be async~
    const player_data = {
      player_name: localStorage.getItem("player_name"),
      player_color: "#399AAF"
    }
    dispatch({type: "SET_PLAYER_DATA", payload: player_data});
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
