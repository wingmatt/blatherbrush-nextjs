'use client'

import Head from 'next/head'
import { Abel } from 'next/font/google'
import Title from '@/components/Title'
import StartForm from '@/components/StartForm'
import '../styles/globals.css';

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
      <main className={abel.className}>
        <Title/>
        <p className='text-center span-2'>fill in the blanks with your friends — we&apos;ll fill out the canvas with your ideas</p>
        <p className='text-center span-2'>for when you&apos;re desperate to see what a surrealist unicorn made of yarn would look like, but magritte is unavailable</p>
        <StartForm/>
      </main>
    </>
  )
}
