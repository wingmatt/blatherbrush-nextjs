import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Title from '@/components/Title'
import Canvas from '@/components/Canvas'
import PromptClaim from "@/components/PlayerForm/PromptClaim";
import { UserProvider } from '@/helpers/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const lobbyCode = router.query.lobbyCode as string;
  return (
    <UserProvider>
      <Head>
        <title>Blatherbrush</title>
        <meta name="description" content="Make wacky art with your brush buddies!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={` ${inter.className}`}>
        <Title/>
        <aside>
          <h2 className="lobby-code"> Lobby Code: <span>{lobbyCode}</span></h2>
          <PromptClaims/>
        </aside>
        <Canvas/>
        <p>Waiting for words...</p>
      </main>
    </UserProvider>
  )
}
