import styles from '@/styles/WordClaims.module.css';

const WordClaims = (props: any) => {
  return (
    <div role="group" className={styles.wordClaims}>
      <label>
        <input type="radio" name="wordClaim" value="Animal" />
        Animal
      </label>
      <label>
        <input type="radio" name="wordClaim" value="Adjective" />
        Adjective
      </label>
      <label>
        <input type="radio" name="wordClaim" value="Adjective" />
        Adjective
      </label>
      <label>
        <input type="radio" name="wordClaim" value="Time of Day" />
        Time of Day
      </label>
      <label>
        <input type="radio" name="wordClaim" value="Adjective" />
        Adjective
      </label>
      <label>
        <input type="radio" name="wordClaim" value="Adjective" />
        Adjective
      </label>
      <label>
        <input type="radio" name="wordClaim" value="Noun" />
        Noun
      </label>
    </div>
  );
};

export default WordClaims;
