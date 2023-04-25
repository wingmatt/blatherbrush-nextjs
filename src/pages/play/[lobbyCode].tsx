import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Title from '@/components/Title'

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
          <fieldset>
            <legend>1 • Claim your word!</legend>
            <label><input type="radio" name="wordClaim" value="Animal"/>Animal</label>
            <label><input type="radio" name="wordClaim" value="Adjective"/>Adjective</label>
            <label><input type="radio" name="wordClaim" value="Adjective"/>Adjective</label>
            <label><input type="radio" name="wordClaim" value="Time of Day"/>Time of Day</label>
            <label><input type="radio" name="wordClaim" value="Adjective"/>Adjective</label>
            <label><input type="radio" name="wordClaim" value="Adjective"/>Adjective</label>
            <label><input type="radio" name="wordClaim" value="Noun"/>Noun</label>
          </fieldset>
          <label>2 • What&apos;s the word?</label>
          <input type="text" name="wordSubmission" />
          <button type="submit">3 • Submit</button>
        </form>
        <Image alt="Blank Canvas" src="https://via.placeholder.com/1024" width="512" height="512" />
        <p>This is the prompt</p>
      </main>
    </>
  )
}
