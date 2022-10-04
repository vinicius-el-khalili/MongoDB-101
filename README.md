# MongoDB 101: MongoDB Atlas

- .env: insert access key
```
MONGODB="mongodb+srv://<USERNAME>:<PASSWORD>@<DATABASE>.stuff.mongodb.net/stuff"
```
- db.ts: apply access key
```
import { Db, MongoClient } from "mongodb"
import dotenv from 'dotenv' //  ----------------------------------------------*
dotenv.config()
const mongo_access_string:string = process.env.MONGODB! 
console.log(mongo_access_string)    //  --------------------------------------*
let dbConnection:Db;
type ConnectToDB = (callback:Function)=>void
const connectToDB:ConnectToDB = (callback:Function)=>{             
    MongoClient.connect(mongo_access_string)    //  --------------------------*
    .then((client)=>{
        dbConnection = client.db()
        return callback()
    })
    .catch(err=>{
        console.log(err)
        return callback(err)
    })
};
type GetDB = () => Db
const getDB:GetDB=()=>dbConnection;
export{connectToDB,getDB}
```
