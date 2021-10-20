"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wave_1 = __importDefault(require("./src/wave"));
var a = new wave_1.default({ length: 2000 });
console.log(a.createArray());
