import Wave from './src/wave.js';

const btn = document.getElementById('btn');
const snd2 = document.getElementById('snd-2');
let audioContextIsReady = false;
const players = [];

const createWave = (callback, playerNum) => {
  const wave = new Wave({
    length: 4000000,
    callback: callback,
    values: { stuff: 1 },
  });
  const arr = wave.createArray();
  const buffer = new Tone.ToneAudioBuffer().fromArray(arr);
  players[playerNum].buffer = buffer;
  players[playerNum].start();
};
btn.addEventListener('click', () => {
  if (audioContextIsReady) {
    createWave((p) => {
      const negative = () => [-1, 1][Math.floor(Math.random() * 2)];
      p.setFrequency(p.frequency + 0.02 * negative());
      return p.triangleAmplitude;
    }, 0);
  } else {
    audioContextIsReady = true;
    btn.innerText = 'Play sound';
    for (let i = 0; i < 3; i++) {
      players.push(new Tone.Player().toDestination());
    }
  }
});

snd2.addEventListener('click', () => {
  if (audioContextIsReady) {
    createWave((p) => {
      const negative = () => [-1, 1][Math.floor(Math.random() * 2)];
      p.setFrequency(p.frequency + 0.02 * negative());
      return p.sawAmplitude;
    }, 1);
  }
});
