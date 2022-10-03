# MongoDB 101: Cursors and Fetching Data

- Class FindCursor -> https://mongodb.github.io/node-mongodb-native/4.0/classes/findcursor.html
- Interface Document -> https://mongodb.github.io/node-mongodb-native/4.0/interfaces/document.html

```
db = getDB()
let books: WithId<Document>[] = []
  db.collection('books')
  .find()                     //Collection<Document>.find(): FindCursor<WithId<Document>>
  .sort({ author: 1})         //FindCursor<WithId<Document>>.sort(sort: Sort, direction?: SortDirection | undefined): FindCursor<WithId<Document>>
  .forEach(book=>{            //book: WithId<Document>
    books.push(book)
  })
```