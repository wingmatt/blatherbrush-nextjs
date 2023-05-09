import { PropsWithChildren  } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { UserProvider } from '@/helpers/UserProvider'

const inter = Inter({ subsets: ['latin'] })

const LobbyLayout = ({children}: PropsWithChildren) => {
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
        {children}
      </main>
    </UserProvider>
  )
}

export default LobbyLayout