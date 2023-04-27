import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Title from '@/components/Title'
import StartForm from '@/components/StartForm'

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
        <StartForm/>
      </main>
    </>
  )
}
