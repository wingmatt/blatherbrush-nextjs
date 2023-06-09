import { useRouter } from "next/router";
import Canvas from "@/components/Canvas";
import PlayerForm from "@/components/PlayerForm/PlayerForm";
import LobbyLayout from "@/components/LobbyLayout";

import { UserProvider } from "@/helpers/UserProvider";

export default function PlayLobby() {
  const router = useRouter();
  if (router.isReady)
    return (
      <UserProvider>
        <LobbyLayout
          lobbyCode={router.isReady ? (router.query.lobbyCode as string) : ""}
        >
          <PlayerForm />
          <Canvas displayMode="play" />
        </LobbyLayout>
      </UserProvider>
    );
  else
    return (
      <UserProvider>
        <span>loading...!</span>
      </UserProvider>
    );
}
