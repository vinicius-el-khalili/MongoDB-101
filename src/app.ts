import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connectToDB,getDB} from './db'
import { Db, WithId, Document, ObjectId } from 'mongodb';
import { request } from 'http';

//  init app
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

//  middleware

app.use(express.json())     //var e.json: (options?: bodyParser.OptionsJson | undefined) => createServer.NextHandleFunction
// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.


//  DB connection
let db:Db                   //--  The Db class is a class that represents a MongoDB Database.
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
    db.collection('books')                            
    .findOne({_id: new ObjectId(req.params.id)})      
    .then(doc=>{                                      
      res.status(200)                                 
      .json(doc)                                      
    })                                          
    .catch(err=>{
      console.log(err)
      res.status(500).json({error:"Could not fetch documents"})
    })
  } else {
    res.status(500).json({error:"Invalid id"})
  }
})

app.post('/books',(req:Request,res:Response)=>{
  const book = req.body     // json document
  db.collection('books')
  .insertOne(book)
  .then(document=>{
    console.log('book added: ',document.insertedId)
    res.status(201).json(document)
  })
  .catch(err=>{
    res.status(500).json({error:"Could not create a new document"})
  })
})

app.delete('/books/:id',(req:Request,res:Response)=>{
  if (ObjectId.isValid(req.params.id)){
    db.collection('books')                            
    .deleteOne({_id: new ObjectId(req.params.id)})      
    .then(result=>{                                      
      console.log('book deleted: ',req.params.id)
      res.status(200)                                 
      .json(result)                                      
    })                                          
    .catch(err=>{
      console.log(err)
      res.status(500).json({error:"Could not delete the document"})
    })
  } else {
    res.status(500).json({error:"Invalid id"})
  }
})