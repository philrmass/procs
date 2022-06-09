import { useState } from 'preact/hooks';
import Notes from './Notes';
import Wave from './Wave';
import styles from './Home.module.css';
import { version } from '../../package.json';

//??? create audio context here
//??? change waveData to wave
export default function Home () {
  const [waveData, setWaveData] = useState(null);
  //const version = '0.0.0';

  return (
    <div className={styles.main}>
      <Wave waveData={waveData} setWaveData={setWaveData} />
      <Notes waveData={waveData} />
      <span className={styles.version}>{`v${version}`}</span>
    </div>
  );
}
