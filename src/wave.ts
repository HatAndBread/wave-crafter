type callbackParams = {
  iteration: number;
  frequency: number;
  length: number;
  sampleTime: number;
  sineSampleAngle: number;
  sineAmplitude: number;
  sawAmplitude: number;
  triangleAmplitude: number;
  previousTriangleAmplitude: number;
  previousSawAmplitude: number;
  previousSineAmplitude: number;
  setFrequency: (num: number) => any;
  userValues: { [key: string]: any } | undefined;
};
type waveArgs = {
  length: number;
  frequency?: number;
  startAmplitude?: number;
  callback?: (params: callbackParams) => number;
  values?: { [key: string]: any };
};

class Wave {
  length: number;
  frequency: number;
  startAmplitude: number;
  userValues?: { [key: string]: any };
  callback: (params: callbackParams) => any;
  constructor(args: waveArgs) {
    this.length = args.length;
    this.frequency = args.frequency || 440;
    this.startAmplitude = args.startAmplitude || 0;
    this.callback = args.callback ? args.callback : () => randomInRange(-1, 1);
    this.userValues = args.values;
  }
  getAngularFrequency = () => this.frequency * 2 * Math.PI;
  setFrequency = (num: number) => (this.frequency = num);
  createArray = () => {
    const arr = new Float32Array(this.length);
    let previousTriangleAmplitude = this.startAmplitude;
    let previousSawAmplitude = this.startAmplitude;
    let previousSineAmplitude = this.startAmplitude;
    let ascending = true;
    for (let i = 0; i < this.length; i++) {
      const sampleTime = (i + this.startAmplitude) / 44100;
      const triangleSampleAngle = 4 / (44100 / this.frequency);
      const sawSampleAngle = triangleSampleAngle / 2;
      let sineSampleAngle = sampleTime * this.getAngularFrequency();
      let triangleAmplitude;
      let sawAmplitude;
      if (ascending && previousTriangleAmplitude + triangleSampleAngle > 1) {
        triangleAmplitude = previousTriangleAmplitude - triangleSampleAngle;
        ascending = false;
      } else if (!ascending && previousTriangleAmplitude - triangleSampleAngle < -1) {
        triangleAmplitude = previousTriangleAmplitude + triangleSampleAngle;
        ascending = true;
      } else if (ascending) {
        triangleAmplitude = previousTriangleAmplitude + triangleSampleAngle;
      } else {
        triangleAmplitude = previousTriangleAmplitude - triangleSampleAngle;
      }
      if (previousSawAmplitude + sawSampleAngle > 1) {
        sawAmplitude = -previousSawAmplitude;
      } else {
        sawAmplitude = previousSawAmplitude + sawSampleAngle;
      }
      const sineAmplitude = Math.sin(sineSampleAngle);
      arr[i] = this.callback({
        setFrequency: this.setFrequency,
        iteration: i,
        frequency: this.frequency,
        length: this.length,
        sampleTime,
        sineSampleAngle,
        previousTriangleAmplitude,
        previousSawAmplitude,
        previousSineAmplitude,
        triangleAmplitude,
        sawAmplitude,
        sineAmplitude,
        userValues: this.userValues,
      });
      previousSawAmplitude = sawAmplitude;
      previousTriangleAmplitude += ascending ? triangleSampleAngle : -triangleSampleAngle;
      previousSineAmplitude = sineAmplitude;
    }
    return arr;
  };
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
