import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Title from '@/components/Title'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Blatherbrush</title>
        <meta name="description" content="Make wacky art with your brush buddies!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={` ${inter.className}`}>
        <Title/>
        <form>
          <h2>What&apos;s your name?</h2>
          <input type="text" name="playerName" />
          <h2>Lobby Code?</h2>
          <div>
            <input type="text" name="lobbyCode" />
            <button type="submit" id="joinLobby" className="button highlight">Join</button>
          </div>
          <div>
            <span>-OR-</span>
            <button type="button" id="hostLobby" className="button">Host</button>
          </div>
        </form>
      </main>
    </>
  )
}
