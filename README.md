# MongoDB 101: Connecting to MongoDB

```
// DB connection
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
```

```
//  DB connection @ app
import {connectToDB,getDB} from './db'
let db
connectToDB((err:any)=>{
  if (!err){
    app.listen(port,()=>{
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    })
    db = getDB()
  }
})
```