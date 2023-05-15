import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Title from '@/components/Title'
import Canvas from '@/components/Canvas'
import { UserProvider } from '@/helpers/UserProvider'
import LobbyLayout from '@/components/LobbyLayout'
import WatchInfo from '@/components/WatchInfo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const lobbyCode = router.query.lobbyCode as string;
  return (
    <UserProvider>
      <LobbyLayout lobbyCode={router.isReady ? router.query.lobbyCode as string : ''}>
      <Title/>
        <WatchInfo/>
        <Canvas />
      </LobbyLayout>
    </UserProvider>
  )
}
