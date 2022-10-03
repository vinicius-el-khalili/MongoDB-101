# MongoDB 101: Connecting to MongoDB
-> https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/
```
// Connecting
import { Db, MongoClient } from "mongodb";
let dbConnection:Db;
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
```

```
//  DB connection @ app
import {connectToDB,getDB} from './db'
import { Db } from 'mongodb';
let db:Db
connectToDB((err:any)=>{
  if (!err){
    app.listen(port,()=>{
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    })
    db = getDB()
  }
})
```