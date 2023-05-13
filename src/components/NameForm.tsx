import { useState } from "react";
import { useUserData } from "@/helpers/UserProvider";
import { createPlayer } from "@/helpers/playerActions";
import styles from "@/styles/NameForm.module.css"

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
        <label>
          <input
            type="radio"
            name="color"
            value="red"
            onChange={(event) => handleChange(event)}
          />{" "}
          Red
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="orange"
            onChange={(event) => handleChange(event)}
          />{" "}
          Orange
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="yellow"
            onChange={(event) => handleChange(event)}
          />{" "}
          Yellow
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="green"
            onChange={(event) => handleChange(event)}
          />{" "}
          Green
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="blue"
            onChange={(event) => handleChange(event)}
          />{" "}
          Blue
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="indigo"
            onChange={(event) => handleChange(event)}
          />{" "}
          Indigo
        </label>
        <label>
          <input
            type="radio"
            name="color"
            value="violet"
            onChange={(event) => handleChange(event)}
          />{" "}
          Violet
        </label>
      </fieldset>
      <button type="submit" className={`button bg-${form.color}`} >
        Join Game
      </button>
    </form>
  );
};

export default NameForm;
