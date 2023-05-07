import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import styles from "@/styles/StartForm.module.css";
import { Player } from "../../types";

import { createLobby } from "@/helpers/lobbyActions";

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  form: { player_name: string; lobby_code: string },
  router: NextRouter
) => {
  event.preventDefault();

  router.push({
    pathname: "play/[lobbyCode]",
    query: { lobbyCode: form.lobby_code },
  });
};

const hostLobby = async (player_name: Player['name'], router: NextRouter) => {
  await createLobby(player_name).then((response)=> {
    router.push({
      pathname: "play/[lobbyCode]",
      query: { lobbyCode: response.code },
    });
  });
}

const StartForm = () => {
  const [form, setForm] = useState({
    player_name: "",
    lobby_code: "",
  });
  useEffect(() => {
    localStorage.setItem("player_name", form.player_name);
  }, [form.player_name]);
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form
      className={styles.start}
      onSubmit={(event) => handleSubmit(event, form, router)}
    >
      <h2>What&apos;s your name?</h2>
      <input
        type="text"
        name="player_name"
        value={form.player_name}
        onChange={(event) => handleChange(event)}
      />
      <h2>Lobby Code?</h2>
      <div>
        <input
          type="text"
          name="lobby_code"
          value={form.lobby_code}
          maxLength={4}
          onChange={(event) => handleChange(event)}
        />
        <button type="submit" id="joinLobby" className="button highlight">
          Join
        </button>
      </div>
      <span>-OR-</span>
      <button type="button" id="hostLobby" onClick={() => hostLobby(form.player_name, router)} className="button">
        Host
      </button>
    </form>
  );
};

export default StartForm;
