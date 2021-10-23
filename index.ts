import Wave from './src/wave';

const a = new Wave({
  length: 2000,
  callback: (params) => {
    console.log(params);
    return params.iteration;
  },
  values: { stuff: 1 },
});

a.createArray();
