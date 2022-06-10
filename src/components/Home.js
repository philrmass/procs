import { useState } from 'preact/hooks';
import Keyboard from './Keyboard';
import Wave from './Wave';
import styles from './Home.module.css';
import { version } from '../../package.json';

//??? create audio context here
//??? change waveData to wave
export default function Home () {
  const [waveData, setWaveData] = useState(null);

  return (
    <div className={styles.main}>
      <Wave waveData={waveData} setWaveData={setWaveData} />
      <Keyboard waveData={waveData} />
      <div className={styles.version}>{`v${version}`}</div>
    </div>
  );
}
