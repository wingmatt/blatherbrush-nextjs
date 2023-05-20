import Head from 'next/head'
import { Abel } from 'next/font/google'
import Title from '@/components/Title'
import StartForm from '@/components/StartForm'

const abel = Abel({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Blatherbrush</title>
        <meta name="description" content="Make wacky art with your brush buddies!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={` ${abel.className}`}>
        <Title/>
        <StartForm/>
      </main>
    </>
  )
}
