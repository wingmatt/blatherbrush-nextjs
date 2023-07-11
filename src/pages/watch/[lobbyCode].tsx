import { useRouter } from "next/navigation";
import Canvas from "@/components/Canvas";
import { UserProvider } from "@/helpers/UserProvider";
import LobbyLayout from "@/components/LobbyLayout";
import WatchInfo from "@/components/WatchInfo";

export default function Home() {
  const router = useRouter();
  return (
    <UserProvider>
      <LobbyLayout
        lobbyCode={router.isReady ? (router.query.lobbyCode as string) : ""}
      >
        <WatchInfo />
        <Canvas displayMode="watch" />
      </LobbyLayout>
    </UserProvider>
  );
}
