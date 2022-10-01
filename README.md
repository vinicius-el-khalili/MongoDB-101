# MongoDB 101: Nested Documents

- Documents can contain othen documents themselves

```
{
    "id":"id",
    "key1":"value1",
    "key2":"value2",
    "key3":"value3",
    "nested":[
        {"key1":"value1","key2":"value2"},
        {"key1":"value1","key2":"value2"},
        {"key1":"value1","key2":"value2"}
    ]
}
```
