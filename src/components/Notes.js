import { useEffect } from 'preact/hooks';
//import saw from '../data/waves/saw';
import trombone from '../data/waves/trombone';
import styles from './Notes.module.css';

const notes = {
  0: 'C4',
  1: 'C#4',
  2: 'D4',
  3: 'D#4',
  4: 'E4',
  5: 'F4',
  6: 'F#4',
  7: 'G4',
  8: 'G#4',
  9: 'A4',
  10: 'A#4',
  11: 'B4',
  12: 'C5',
};

export default function Notes() {
  useEffect(() => {
    console.log('effect');
    //playTone();
  });

  return (
    <div className={styles.notes}>
      {Object.entries(notes).reverse().map(([index, name]) => (
        <button key={index} onClick={() => playTone(index)}>{name}</button>
      ))}
    </div>
  );
}

function playTone(noteIndex) {
  const step = Math.pow(2, 1/12);
  const ratio = Math.pow(step, noteIndex - 9);
  const freq = 440 * ratio;
  console.log('step', step, ratio, freq);
  const AudioContext = window.AudioContext;
  const ac = new AudioContext();
  const osc = ac.createOscillator();

  //const real = [1, .4, 0, 0.2, 0.1];
  //const imag = [0, 1, 0, 0, 0.2];
  const data = trombone;
  const wave = ac.createPeriodicWave(data.real, data.imag);

  osc.setPeriodicWave(wave);
  osc.connect(ac.destination);
  osc.frequency.value = freq;

  osc.start();
  osc.stop(1);
}
