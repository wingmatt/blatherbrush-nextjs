import { useSearchParams  } from "next/navigation";
import Canvas from "@/components/Canvas";
import PlayerForm from "@/components/PlayerForm/PlayerForm";
import LobbyLayout from "@/components/LobbyLayout";

import { UserProvider } from "@/helpers/UserProvider";

export default function PlayLobby() {
  const searchParams = useSearchParams();
  return (
    <UserProvider>
      <LobbyLayout
        lobbyCode={searchParams?.get('lobbyCode') as string}
      >
        <PlayerForm />
        <Canvas displayMode="play" />
      </LobbyLayout>
    </UserProvider>
  );
}
