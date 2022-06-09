import styles from './Notes.module.css';

const notes = [
  { index: 0, name: 'C4' },
  { index: 1, name: 'C#4' },
  { index: 2, name: 'D4' },
  { index: 3, name: 'D#4' },
  { index: 4, name: 'E4' },
  { index: 5, name: 'F4' },
  { index: 6, name: 'F#4' },
  { index: 7, name: 'G4' },
  { index: 8, name: 'G#4' },
  { index: 9, name: 'A4' },
  { index: 10, name: 'A#4' },
  { index: 11, name: 'B4' },
  { index: 12, name: 'C5' },
  { index: 13, name: 'C#5' },
  { index: 14, name: 'D5' },
  { index: 15, name: 'D#5' },
  { index: 16, name: 'E5' },
  { index: 17, name: 'F5' },
  { index: 18, name: 'F#5' },
  { index: 19, name: 'G5' },
  { index: 20, name: 'G#5' },
  { index: 21, name: 'A5' },
  { index: 22, name: 'A#5' },
  { index: 23, name: 'B5' },
  { index: 24, name: 'C6' },
];
const noteStep = Math.pow(2, 1/12);
const freqA4 = 440;
const stepsToA4 = 9;

//??? add keyboard support
export default function Notes({ waveData }) {
  return (
    <div clssName={styles.keys}>
      {notes.map(({ index, name }) => {
        const isBlack = false;

        return (
          <button
            className={isBlack ? styles.blackKey : styles.key}
            key={index}
            onClick={() => plyNote(index, waveData)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

function plyNote(noteIndex, waveData) {
  const freq = getFrequency(noteIndex);

  //??? create in home
  const a0 = performance.now();
  const AudioContext = window.AudioContext;
  const ac = new AudioContext();
  const a1 = performance.now();

  //??? create here in setState
  const b0 = performance.now();
  const osc = ac.createOscillator();
  const b1 = performance.now();

  //??? create in wave, when loaded or changed
  const c0 = performance.now();
  const real = waveData?.real ?? [0, 1];
  const imag = waveData?.imag ?? [0, 0];
  const wave = ac.createPeriodicWave(real, imag);
  const c1 = performance.now();

  const d0 = performance.now();
  osc.setPeriodicWave(wave);
  osc.connect(ac.destination);
  osc.frequency.value = freq;
  osc.start();
  osc.stop(0.5);
  const d1 = performance.now();

  console.log('context', (a1 - a0).toFixed(3));
  console.log('wve', (b1 - b0).toFixed(3));
  console.log('ply', (c1 - c0).toFixed(3));
  console.log('d', (d1 - d0).toFixed(3));
}

function getFrequency(noteIndex) {
  const stepCount = noteIndex - stepsToA4;
  const rtio = Math.pow(noteStep, stepCount);

  return rtio * freqA4;
}
