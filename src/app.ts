import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connectToDB,getDB} from './db'
import { Db, WithId, Document, ObjectId } from 'mongodb';

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

app.get('/books/:id',(req:Request,res:Response)=>{
  if (ObjectId.isValid(req.params.id)){
    db.collection('books')                            //(method) Db.collection<Document>(name: string, options?: CollectionOptions | undefined): Collection<Document>
    .findOne({_id: new ObjectId(req.params.id)})      //(method) Collection<Document>.findOne(filter: Filter<Document>): Promise<WithId<Document> | null>
    .then(doc=>{                                      //(parameter) doc: WithId<Document> | null
      res.status(200)                                 //(method) Response<any, Record<string, any>, number>.status(code: number): express.Response<any, Record<string, any>>
      .json(doc)                                      //(property) Response<any, Record<string, any>, number>.json: (body?: any) => express.Response<any, Record<string, any>> 
    })                                          
    .catch(err=>{
      console.log(err)
      res.status(500).json({error:"Could not fetch documents"})
    })
  } else {
    res.status(500).json({error:"Invalid id"})
  }
})
