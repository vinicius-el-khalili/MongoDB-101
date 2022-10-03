import { Db, MongoClient } from "mongodb";
let dbConnection:Db;
type ConnectToDB = (callback:Function)=>void
const connectToDB:ConnectToDB = (callback:Function)=>{             
    MongoClient.connect('mongodb://localhost:27017/bookstore')  //MongoClient.connect(url: string): Promise<MongoClient>
    .then((client)=>{                                           //(parameter) client: MongoClient
        dbConnection = client.db()                              //(method) MongoClient.db(dbName?: string | undefined, options?: DbOptions | undefined): Db
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