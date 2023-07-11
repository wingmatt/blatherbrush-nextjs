import { useSearchParams } from "next/navigation";
import Canvas from "@/components/Canvas";
import { UserProvider } from "@/helpers/UserProvider";
import LobbyLayout from "@/components/LobbyLayout";
import WatchInfo from "@/components/WatchInfo";

export default function Home() {
  const searchParams = useSearchParams();
  return (
    <UserProvider>
      <LobbyLayout
        lobbyCode={searchParams?.get('lobbyCode') as string}
        >
        <WatchInfo />
        <Canvas displayMode="watch" />
      </LobbyLayout>
    </UserProvider>
  );
}
