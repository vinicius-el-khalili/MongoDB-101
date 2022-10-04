# MongoDB 101: Finding single documents


```
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
```