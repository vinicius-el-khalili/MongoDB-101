# MongoDB 101: DELETE Requests

#### Handle DELETE request

```
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
```

#### Check

- DELETE

![](screenshots/delete.png)
