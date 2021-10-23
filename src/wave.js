var Wave = /** @class */ (function () {
    function Wave(args) {
        var _this = this;
        this.getAngularFrequency = function () { return _this.frequency * 2 * Math.PI; };
        this.setFrequency = function (num) { return (_this.frequency = num); };
        this.createArray = function () {
            var arr = new Float32Array(_this.length);
            var previousTriangleAmplitude = _this.startAmplitude;
            var previousSawAmplitude = _this.startAmplitude;
            var previousSineAmplitude = _this.startAmplitude;
            var ascending = true;
            for (var i = 0; i < _this.length; i++) {
                var sampleTime = (i + _this.startAmplitude) / 44100;
                var triangleSampleAngle = (4 * _this.maxAmplitude) / (44100 / _this.frequency);
                var sawSampleAngle = triangleSampleAngle / 2;
                var sineSampleAngle = sampleTime * _this.getAngularFrequency();
                var triangleAmplitude = void 0;
                var sawAmplitude = void 0;
                if (ascending && previousTriangleAmplitude + triangleSampleAngle > _this.maxAmplitude) {
                    triangleAmplitude = previousTriangleAmplitude - triangleSampleAngle;
                    ascending = false;
                }
                else if (!ascending && previousTriangleAmplitude - triangleSampleAngle < -_this.maxAmplitude) {
                    triangleAmplitude = previousTriangleAmplitude + triangleSampleAngle;
                    ascending = true;
                }
                else if (ascending) {
                    triangleAmplitude = previousTriangleAmplitude + triangleSampleAngle;
                }
                else {
                    triangleAmplitude = previousTriangleAmplitude - triangleSampleAngle;
                }
                if (previousSawAmplitude + sawSampleAngle > _this.maxAmplitude) {
                    sawAmplitude = -previousSawAmplitude;
                }
                else {
                    sawAmplitude = previousSawAmplitude + sawSampleAngle;
                }
                var sineAmplitude = Math.sin(sineSampleAngle) * _this.maxAmplitude;
                arr[i] = _this.callback({
                    setFrequency: _this.setFrequency,
                    iteration: i,
                    frequency: _this.frequency,
                    length: _this.length,
                    sampleTime: sampleTime,
                    sineSampleAngle: sineSampleAngle,
                    previousTriangleAmplitude: previousTriangleAmplitude,
                    previousSawAmplitude: previousSawAmplitude,
                    previousSineAmplitude: previousSineAmplitude,
                    triangleAmplitude: triangleAmplitude,
                    sawAmplitude: sawAmplitude,
                    sineAmplitude: sineAmplitude,
                    userValues: _this.userValues,
                    maxAmplitude: _this.maxAmplitude,
                });
                previousSawAmplitude = sawAmplitude;
                previousTriangleAmplitude += ascending ? triangleSampleAngle : -triangleSampleAngle;
                previousSineAmplitude = sineAmplitude;
            }
            return arr;
        };
        this.length = args.length;
        this.frequency = args.frequency || 440;
        this.startAmplitude = args.startAmplitude || 0;
        this.maxAmplitude = args.maxAmplitude || 1;
        this.callback = args.callback ? args.callback : function () { return randomInRange(-1, 1); };
        this.userValues = args.values;
    }
    return Wave;
}());
var randomInRange = function (min, max) { return Math.random() * (max - min) + min; };
var randomIntInRange = function (min, max) { return Math.floor(randomInRange(min, max)); };
var oneOutOf = function (num) { return !Math.floor(Math.random() * num); };
var repeat = function (howManyTimes, callback) {
    return function (callback) {
        for (var i = 0; i < howManyTimes; i++) {
            callback();
        }
    };
};
export default Wave;
