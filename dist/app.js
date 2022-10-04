"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
const morgan_1 = __importDefault(require("morgan"));
//  init app
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
//  middleware
app.use(express_1.default.json()); //var e.json: (options?: bodyParser.OptionsJson | undefined) => createServer.NextHandleFunction
// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use((0, morgan_1.default)('dev'));
//  DB connection
let db; //--  The Db class is a class that represents a MongoDB Database.
(0, db_1.connectToDB)((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        });
        db = (0, db_1.getDB)();
    }
});
//  routes
app.get('/books', (req, res) => {
    const page = req.query.p || 0;
    const booksPerPage = 3;
    let books = [];
    db.collection('books')
        .find()
        .sort({ author: 1 })
        .skip(booksPerPage * Number(page))
        .limit(booksPerPage)
        .forEach(book => {
        books.push(book);
    })
        .then(() => {
        res.status(200).json(books);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Could not fetch the documents" });
    });
});
app.get('/books/:id', (req, res) => {
    if (mongodb_1.ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .findOne({ _id: new mongodb_1.ObjectId(req.params.id) })
            .then(doc => {
            res.status(200)
                .json(doc);
        })
            .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Could not fetch documents" });
        });
    }
    else {
        res.status(500).json({ error: "Invalid id" });
    }
});
app.post('/books', (req, res) => {
    const book = req.body; // json document
    db.collection('books')
        .insertOne(book)
        .then(document => {
        console.log('book added: ', document.insertedId);
        res.status(201).json(document);
    })
        .catch(err => {
        res.status(500).json({ error: "Could not create a new document" });
    });
});
app.delete('/books/:id', (req, res) => {
    if (mongodb_1.ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) })
            .then(result => {
            console.log('book deleted: ', req.params.id);
            res.status(200)
                .json(result);
        })
            .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Could not delete the document" });
        });
    }
    else {
        res.status(500).json({ error: "Invalid id" });
    }
});
app.patch('/books/:id', (req, res) => {
    const updates = req.body;
    if (mongodb_1.ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, {
            $set: updates
        })
            .then(result => {
            console.log('book updated: ', req.params.id);
            res.status(200)
                .json(result);
        })
            .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Could not update the document" });
        });
    }
    else {
        res.status(500).json({ error: "Invalid id" });
    }
});
