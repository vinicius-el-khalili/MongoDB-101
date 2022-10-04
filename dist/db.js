"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connectToDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongo_access_string = process.env.MONGODB;
console.log(mongo_access_string);
let dbConnection;
const connectToDB = (callback) => {
    mongodb_1.MongoClient.connect(mongo_access_string)
        .then((client) => {
        dbConnection = client.db();
        return callback();
    })
        .catch(err => {
        console.log(err);
        return callback(err);
    });
};
exports.connectToDB = connectToDB;
const getDB = () => dbConnection;
exports.getDB = getDB;
