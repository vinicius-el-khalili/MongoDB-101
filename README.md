# MongoDB 101: Querying Arrays

```
db.books.find({genre:"fantasy"})                    -> find books that contain "fantasy" in its genres
db.books.find({genre:["fantasy"]})                  -> find books that only contain "fantasy" in its genres (exact match)
db.books.find({genre:{$all:["fantasy","scifi"]}})   -> find books that contain "fantasy" and "scifi" in its genres
db.books.find({"reviews.name":"luigi"})             -> nested search: find books that contain a review from luigi
```