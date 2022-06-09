import styles from './Wave.module.css';
//??? load a json with file loader, some hardcoded
import saw from '../data/waves/saw';
import trombone from '../data/waves/trombone';

//??? create wave here
export default function Wave({ waveData, setWaveData }) {
  return (
    <div className={styles.main}>
      <button onClick={() => setWaveData(saw)}>saw</button>
      <button onClick={() => setWaveData(trombone)}>trombone</button>
      <button onClick={() => setWaveData(null)}>clear</button>
    </div>
  );
}
