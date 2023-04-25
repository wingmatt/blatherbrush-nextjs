import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const lobbyCode = router.query.lobbyCode as string;
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
        <h1>Blatherbrush</h1>
        <h2 className="lobby-code"> Lobby Code: <span>{lobbyCode}</span></h2>
        <ul className='word-list'>
          <li>Animal</li>
          <li>Adjective</li>
          <li>Adjective</li>
          <li>Time of Day</li>
          <li>Adjective</li>
          <li>Adjective</li>
          <li>Noun</li>
        </ul>
        <Image alt="Blank Canvas" src="https://via.placeholder.com/1024" width="512" height="512" />
        <p>This is the prompt</p>
      </main>
    </>
  )
}
