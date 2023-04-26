import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Title from '@/components/Title'
import Canvas from '@/components/Canvas'
import WordClaims from '@/components/WordClaims'

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
        <Title/>
        <form>
          <WordClaims />
          <label>2 • What&apos;s the word?</label>
          <input type="text" name="wordSubmission" />
          <button type="submit">3 • Submit</button>
        </form>
        <Canvas url="no" prompt="no"/>
        <p>This is the prompt</p>
      </main>
    </>
  )
}
