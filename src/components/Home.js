import { useState } from 'preact/hooks';
import Keyboard from './Keyboard';
import Wave from './Wave';
import styles from './Home.module.css';
import { version } from '../../package.json';

export default function Home () {
  const AudioContext = window ? window.AudioContext : null;
  const [wave, setWave] = useState(null);
  const [ac] = useState(new AudioContext());

  return (
    <div className={styles.main}>
      <Wave ac={ac} setWave={setWave} />
      <Keyboard ac={ac} wave={wave} />
      <div className={styles.version}>{`v${version}`}</div>
    </div>
  );
}
