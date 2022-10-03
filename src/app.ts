import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connectToDB,getDB} from './db'
import { Db, WithId, Document } from 'mongodb';

//  init app
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

//  DB connection
let db:Db                   //The Db class is a class that represents a MongoDB Database.
connectToDB((err:any)=>{    //ConnectToDB(callback: Function): void
  if (!err){
    app.listen(port,()=>{
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    })
    db = getDB()
  }
})
//  routes
app.get('/books', (req: Request, res: Response) => {
  let books: WithId<Document>[] = []
  db.collection('books')
  .find()                     //Collection<Document>.find(): FindCursor<WithId<Document>>
  .sort({ author: 1})         //FindCursor<WithId<Document>>.sort(sort: Sort, direction?: SortDirection | undefined): FindCursor<WithId<Document>>
  .forEach(book=>{            //book: WithId<Document>
    books.push(book)
  })
  .then(()=>{
    res.status(200).json(books)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).json(
      {error:"Could not fetch the documents"}
    )
  })
});

