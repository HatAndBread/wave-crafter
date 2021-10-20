import { ToneAudioBuffer } from 'tone';

type waveArgs = { length: number; frequency?: number };

class Wave {
  length: number;
  frequency?: number;
  constructor(args: waveArgs) {
    this.length = args.length;
    this.frequency = args.frequency || 440;
  }
  setFrequency = (num: number) => (this.frequency = num);
  createArray = () => {
    const arr = new Float32Array(this.length);
    let frequency = randomIntInRange(30, 1000);
    let angularFrequency = frequency * 2 * Math.PI;
    for (let i = 0; i < this.length; i++) {
      const sampleTime = i / 44100;
      let sampleAngle = sampleTime * angularFrequency;
      sampleAngle += randomInRange(-0.1, 0.1);
      arr[i] = Math.sin(sampleAngle);
    }
    return arr;
  };
  createAudioBuffer = (f32arr: Float32Array) => new ToneAudioBuffer().fromArray(f32arr);
  getAudioBuffer = () => this.createAudioBuffer(this.createArray());
}

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
const randomIntInRange = (min: number, max: number) => Math.floor(randomInRange(min, max));
const oneOutOf = (num: number) => !Math.floor(Math.random() * num);
const repeat = (howManyTimes: number, callback: () => any) => {
  return (callback: () => any) => {
    for (let i = 0; i < howManyTimes; i++) {
      callback();
    }
  };
};

export default Wave;
