import { useEffect, useState } from 'preact/hooks';
import styles from './Wave.module.css';
//??? load a json with file loader, save in local storage, list by last used
import saw from '../data/waves/saw';
import trombone from '../data/waves/trombone';

export default function Wave({ ac, setWave }) {
  const [waveData, setWaveData] = useState(null);

  useEffect(() => {
    const real = waveData?.real ?? [0, 1];
    const imag = waveData?.imag ?? [0, 0];
    setWave(ac.createPeriodicWave(real, imag));
    console.log('setWave');
  }, [ac, setWave, waveData]);

  // ??? display editable waveData
  return (
    <div className={styles.main}>
      <button onClick={() => setWaveData(saw)}>saw</button>
      <button onClick={() => setWaveData(trombone)}>trombone</button>
      <button onClick={() => setWaveData(null)}>clear</button>
    </div>
  );
}
