import { PromptFragment } from "../../types";
import { SetStateAction, useEffect, useState } from "react";

const claimWord = (event: React.ChangeEvent<HTMLInputElement>, setSelected: React.Dispatch<React.SetStateAction<boolean>>) => {
  // set this word to "selected" by the device's player, locally and on supabase
  // claim this word by th
  setSelected(true);
}
const WordClaim = ({type, claimed_by, status}: PromptFragment) => {
  const [selected, setSelected] = useState(false)
  const [classes, setClasses] = useState("");
  const [disabled, setDisabled] = useState(false)
  const player_id = "YES";
  useEffect(()=> {
    if (status !== "open") {
      if ((selected)) {
        setClasses("word highlight");
      }
      else  {
        setClasses("word disabled")
        setDisabled(true);
      }
    }
  }, [selected, status])
  return (
    <label className={classes}  >
      <input type="radio" checked={selected} name="wordClaim" onChange={(event) => claimWord(event, setSelected)} value="Adjective" disabled={disabled} />
      {type}
    </label>
  )
}

export default WordClaim