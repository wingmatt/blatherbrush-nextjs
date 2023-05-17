import { useState } from "react";
import { useUserData } from "@/helpers/UserProvider";
import { createPlayer } from "@/helpers/playerActions";
import ColorSelector from "./ColorSelector";
import styles from "@/styles/NameForm.module.css"

const availableColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet"
]

const NameForm = () => {
  const { state, dispatch } = useUserData();
  const [form, setForm] = useState({
    id: state.player.id,
    name: state.player.name,
    color: state.player.color,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form
      id="nameForm"
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();
        createPlayer({
          name: form.name,
          color: form.color,
        }).then((response) => {
          dispatch({ type: "SET_PLAYER_DATA", payload: response });
          localStorage.setItem("player_name", response.name);
          localStorage.setItem("player_color", response.color);
          localStorage.setItem("player_id", response.id || "");
        });
      }}
    >
      <label>
        What&apos;s your name?
        <input
          type="text"
          name="name"
          required
          onChange={(event) => handleChange(event)}
        />
      </label>
      <fieldset>
        <legend>Pick a color</legend>
        {availableColors.map((color, index) => <ColorSelector key={index} className={styles.colorSelector} color={color} onChange={(event) => handleChange(event)}/>)}
        {form.name === "Matt!" ?
        <ColorSelector className={styles.colorSelector} color="indigo" onChange={(event) => handleChange(event)}/>: ""}
      </fieldset>
      <button type="submit" className={`button bg-${form.color}`} >
        Join Game
      </button>
    </form>
  );
};

export default NameForm;
