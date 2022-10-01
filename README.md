# MongoDB 101: $in/$nin

- Use $in to check for documents where one of its properties has a list of possible values

```
- Using $or/$nor
db.books.find({$or:[{rating:8},{rating:9},rating:{10}]})    -> $or
db.books.find({$nor:[{rating:8},{rating:9},rating:{10}]})   -> $nor
```
```
db.books.find({ rating: {$in: [8,9,10]}})
db.books.find({ rating: {$nin: [8,9,10]}})
```