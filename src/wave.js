"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tone_1 = require("tone");
var Wave = /** @class */ (function () {
    function Wave(args) {
        var _this = this;
        this.createArray = function () {
            var arr = new Float32Array(_this.length);
            var frequency = randomIntInRange(30, 1000);
            var angularFrequency = frequency * 2 * Math.PI;
            for (var i = 0; i < _this.length; i++) {
                var sampleTime = i / 44100;
                var sampleAngle = sampleTime * angularFrequency;
                sampleAngle += randomInRange(-0.1, 0.1);
                arr[i] = Math.sin(sampleAngle);
            }
            return arr;
        };
        this.createAudioBuffer = function (f32arr) { return new tone_1.ToneAudioBuffer().fromArray(f32arr); };
        this.getAudioBuffer = function () { return _this.createAudioBuffer(_this.createArray()); };
        this.length = args.length;
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
exports.default = Wave;
