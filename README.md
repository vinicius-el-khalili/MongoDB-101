# MongoDB 101: Adding new documents

```
db use <CollectionName>                         ->  Access collection
db.<CollectionName>.insertOne({..})             ->  Insert one document
db.<CollectionName>.insertMany({..},{..},{..})  ->  Insert a group of documents
```