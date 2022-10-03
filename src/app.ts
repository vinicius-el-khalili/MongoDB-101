import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connectToDB,getDB} from './db'
import { connect } from 'http2';

//  init app
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

//  DB connection
let db
connectToDB((err:any)=>{
  if (!err){
    app.listen(port,()=>{
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    })
    db = getDB()
  }
})

//  routes
app.get('/books', (req: Request, res: Response) => {
  res.send({mssg:'welcome to the API'});
});

