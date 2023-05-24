//📚 ///////////////////////////////////////////////////////////📚//
// Theory on why this is set up the way it is here:
// https://kentcdodds.com/blog/how-to-use-react-context-effectively
//📚 ///////////////////////////////////////////////////////////📚//

import * as React from "react";
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
          id: action.payload.id,
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
    dispatch({type: "SET_PLAYER_DATA", payload: localPlayerData});
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

const localPlayerData = {
  id: typeof window !== "undefined" ? localStorage.getItem("player_id") : null,
  name: typeof window !== "undefined" ? localStorage.getItem("player_name") : null,
  color: typeof window !== "undefined" ? localStorage.getItem("player_color") : null,
}
