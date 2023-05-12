import { ReactNode } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useEffect } from 'react'
import { getLobbyData, subscribeToLobbyUpdates } from '@/helpers/lobbyActions'
import { useUserData } from '@/helpers/UserProvider'

const inter = Inter({ subsets: ["latin"] });

type LobbyLayoutProps = {
  lobbyCode: string,
  children: ReactNode
}

const LobbyLayout = ({lobbyCode, children}: LobbyLayoutProps) => {
  const {state, dispatch} = useUserData();
  useEffect(()=> {
    getLobbyData(lobbyCode).then(lobbyData => {
      console.log(lobbyData);
      dispatch({type: "SET_LOBBY_DATA", payload: lobbyData})
      subscribeToLobbyUpdates(lobbyCode, dispatch);
    });
  }, [dispatch, lobbyCode])
  return (
    <>
      <Head>
        <title>Blatherbrush</title>
        <meta
          name="description"
          content="Make wacky art with your brush buddies!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={` ${inter.className} ${state.lobby.phase}`}>{children}</main>
    </>
  );
};

export default LobbyLayout;
