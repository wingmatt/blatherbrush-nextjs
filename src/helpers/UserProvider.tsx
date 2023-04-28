import * as React from "react";
import { supabase } from "./supabaseClient";
import { ReducerState, ReducerAction, Props, Lobby, PromptFragment, Player } from "../../types";

const UserContext = React.createContext<
  { state: ReducerState; dispatch: (action: ReducerAction) => void } | undefined
>(undefined);

function userDataReducer(state: ReducerState, action: ReducerAction): any {
  switch (action.type) {
    // Insert Dispatch Actions here~
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function UserProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(userDataReducer, {
    //Initial preload state here~
  });
  React.useEffect(() => {
    //Initial loading here, can be async~
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
