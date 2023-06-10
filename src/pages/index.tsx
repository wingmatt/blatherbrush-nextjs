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
        <p className='text-center span-2'>fill in the blanks with your friends — we'll fill out the canvas with your ideas</p>
        <p className='text-center span-2'>churn out horrifying blends of collaborative creativity and soulless depiction as quickly as you can all type</p>
        <StartForm/>
      </main>
    </>
  )
}
