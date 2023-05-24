//📚 ///////////////////////////////////////////////////////////📚//
// Using NextJS dynamic routes to handle lobby code pages:
// https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
//📚 ///////////////////////////////////////////////////////////📚//

import { useRouter } from 'next/router'
import Title from '@/components/Title'
import Canvas from '@/components/Canvas'
import { UserProvider } from '@/helpers/UserProvider'
import LobbyLayout from '@/components/LobbyLayout'
import WatchInfo from '@/components/WatchInfo'

export default function Home() {
  const router = useRouter()
  return (
    <UserProvider>
      <LobbyLayout lobbyCode={router.isReady ? router.query.lobbyCode as string : ''}>
        <WatchInfo/>
        <Canvas />
      </LobbyLayout>
    </UserProvider>
  )
}
