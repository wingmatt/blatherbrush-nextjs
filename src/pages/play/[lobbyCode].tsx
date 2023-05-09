import { useRouter } from 'next/router'
import Title from '@/components/Title'
import Canvas from '@/components/Canvas'
import PlayerForm from '@/components/PlayerForm/PlayerForm'
import LobbyLayout from '@/components/LobbyLayout'

import { UserProvider } from "@/helpers/UserProvider";



export default function PlayLobby() {
  const router = useRouter()
  const lobbyCode = router.query.lobbyCode as string;
  return (
    <UserProvider>
      <LobbyLayout lobbyCode={lobbyCode}>
        <Title/>
        <PlayerForm/>
        <Canvas url="no" prompt="no"/>
      </LobbyLayout>
    </UserProvider>
  )
}
