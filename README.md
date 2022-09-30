# MongoDB 101: Finding Documents
```
db.<ColectionName>.find()                                       -> find 20 first documents
db.<ColectionName>.find({key1:vaue1, key2:vaue2, key3:vaue3})   -> filter documents that satisfy given key-value pairs
```
![](find_method.png)

```
db.<ColectionName>.findOne({_id:ObjectId(<IdNumber>)})          -> find document by id
```

![](findOne.png)