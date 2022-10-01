# MongoDB 101: Updating documents



```
-- $set             -> overwrite value

db.books.updateOne({_id:ObjectId("6336275966fa4d8a46658cf6")},{$set:{genres:["Horror","Thriller"],pages:1869}})
db.books.updateMany({author:"George R. R. Martin"},{$set:{genres:["Fantasy","Drama"]}})

- $inc              -> increment value

db.books.updateOne({_id:ObjectId("633653c5318975100ed95e7c")},{$inc:{pages:2}})
db.books.updateOne({_id:ObjectId("633653c5318975100ed95e7c")},{$inc:{pages:-2}})

- $pull/$push       -> pop/append value

db.books.updateOne({_id:ObjectId("63360c96b55f7155a553b959")},{$pull:{genres:"Absurdist fiction"}})
db.books.updateOne({_id:ObjectId("63360c96b55f7155a553b959")},{$push:{genres:"Fantasy"}})

- $pull/$push       -> pop/append multiple values

db.books.updateOne({_id:ObjectId("63360c96b55f7155a553b959")},{$push:{genres:{$each:["1","2"]}}})
db.books.updateOne({_id:ObjectId("63360c96b55f7155a553b959")},{$pull:{genres:{$in:["1","2"]}}})
```
