import styles from './Keyboard.module.css';
import cn from 'classnames';

const keyIndices = {
  KeyQ: -4,
  KeyA: -3,
  KeyW: -2,
  KeyS: -1,
  KeyD: 0,
  KeyR: 1,
  KeyF: 2,
  KeyT: 3,
  KeyG: 4,
  KeyH: 5,
  KeyU: 6,
  KeyJ: 7,
  KeyI: 8,
  KeyK: 9,
  KeyO: 10,
  KeyL: 11,
  Semicolon: 12,
  BracketLeft: 13,
  Quote: 14,
};
const noteStep = Math.pow(2, 1/12);
const freqA4 = 440;
const stepsToA4 = 9;

export default function Keyboard({ ac, waveData }) {
  const notes = getNotes([-1, 0, 1]);

  const handleKey = (e) => {
    const index = keyIndices[e.code];
    if (typeof index === 'number') {
      playNote(ac, waveData, index);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.keys} tabIndex='0' onKeyDown={handleKey}>
        {notes.map(({ index, note, sharp, octave, offset }) => {
          const classes = cn(styles.key, { [styles.black]: sharp });
          const blackStyle = { left: `calc(${offset} * var(--key-width) - 0.5 * var(--black-width))` };

          return (
            <div
              className={classes}
              style={sharp ? blackStyle : null}
              key={index}
              onClick={() => playNote(ac, waveData, index)}
            >
              <span>
                <span>{note}</span>
                <sup>{sharp ? '#' : ''}</sup>
                <sub>{octave}</sub>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getNotes(octaveIndices) {
  const octave = [
    { index: 0, note: 'C', octave: 4 },
    { index: 1, note: 'C', sharp: true, octave: 4 },
    { index: 2, note: 'D', octave: 4 },
    { index: 3, note: 'D', sharp: true, octave: 4 },
    { index: 4, note: 'E', octave: 4 },
    { index: 5, note: 'F', octave: 4 },
    { index: 6, note: 'F', sharp: true, octave: 4 },
    { index: 7, note: 'G', octave: 4 },
    { index: 8, note: 'G', sharp: true, octave: 4 },
    { index: 9, note: 'A', octave: 4 },
    { index: 10, note: 'A', sharp: true, octave: 4 },
    { index: 11, note: 'B', octave: 4 },
  ];

  const all = octaveIndices.reduce((all, octaveIndex) => {
    const notes = octave.map((note) => {
      const index = note.index + 12 * octaveIndex;
      const octave = note.octave + octaveIndex;

      return {
        ...note,
        index,
        octave,
      };
    });
    return [...all, ...notes];
  }, []);

  let next = 0;
  return all.map((note) => {
    const offset = next;
    next += note.sharp ? 0 : 1;

    return {
      ...note,
      offset,
    };
  });
}

function playNote(ac, waveData, noteIndex) {
  const freq = getFrequency(noteIndex);

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
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.5);
  const d1 = performance.now();

  console.log(`PLAY (${freq.toFixed(3)})`);
  console.log(' osc', (b1 - b0).toFixed(3));
  console.log(' wave', (c1 - c0).toFixed(3));
  console.log(' play', (d1 - d0).toFixed(3));
}

function getFrequency(noteIndex) {
  const stepCount = noteIndex - stepsToA4;
  const rtio = Math.pow(noteStep, stepCount);

  return rtio * freqA4;
}
