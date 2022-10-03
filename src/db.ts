import { MongoClient } from "mongodb";
let dbConnection:any;
const connectToDB:Function = (callback:Function)=>{
    MongoClient.connect('mongodb://localhost:27017/bookstore')
    .then((client)=>{
        dbConnection = client.db()
        return callback()
    })
    .catch(err=>{
        console.log(err)
        return callback(err)
    })
};
const getDB:Function=()=>dbConnection;
export{connectToDB,getDB}