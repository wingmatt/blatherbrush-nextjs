import styles from '@/styles/WordClaims.module.css';
import WordClaim from './WordClaim';

const WordClaims = (props: any) => {
  return (
    <div role="group" className={styles.wordClaims}>
      <WordClaim type='Animal' claimed_by='' status='claimed' text='' />
      <WordClaim type='Adjective' claimed_by='' status='open' text='' />
      <WordClaim type='Adjective' claimed_by='' status='open' text='' />
      <WordClaim type='Time of Day' claimed_by='' status='open' text='' />
      <WordClaim type='Adjective' claimed_by='' status='open' text='' />
      <WordClaim type='Adjective' claimed_by='' status='open' text='' />
      <WordClaim type='Noun' claimed_by='' status='open' text='' />
    </div>
  );
};

export default WordClaims;
