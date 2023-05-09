import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Title from '@/components/Title'
import Canvas from '@/components/Canvas'
import PlayerForm from '@/components/PlayerForm/PlayerForm'
import { getLobbyData } from '@/helpers/lobbyActions'
import LobbyLayout from '@/components/LobbyLayout'


export default function PlayLobby() {
  useEffect(()=> {
    
  }, [])
  const router = useRouter()
  const lobbyCode = router.query.lobbyCode as string;
  return (
    <LobbyLayout>
      <Title/>
      <PlayerForm/>
      <Canvas url="no" prompt="no"/>
    </LobbyLayout>
  )
}
