# MongoDB 101: Setup

#### Install MongoDB locally

- MongoDB -> https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

- Compass -> https://www.mongodb.com/try/download/compass

- Useful setup commands

```
sudo systemctl start mongod     -> Start mongod process
sudo systemctl daemon-reload    -> In case it fails to start mongod.service
sudo systemctl status mongod    -> Verify that MongoDB has started successfully
sudo systemctl stop mongod      -> Stop mongod process
sudo systemctl restart mongod   -> Restart mongod process
mongosh                         -> Shell
```