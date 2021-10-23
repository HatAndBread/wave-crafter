import Wave from './src/wave';
var a = new Wave({
    length: 2000,
    callback: function (params) {
        console.log(params);
        return params.iteration;
    },
    values: { stuff: 1 },
});
a.createArray();
