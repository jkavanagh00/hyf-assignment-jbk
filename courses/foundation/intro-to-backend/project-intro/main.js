const filesystem = require("fs/promises");
const express = require("express");
const bodyParser = require("body-parser");

const knexLibrary = require("knex");

const knex = knexLibrary({
    client: "sqlite3",
    connection: {
        filename: "test.sqlite3",
    },
});

async function getFile() {
    const fileContent = await filesystem.readFile("test.txt", "utf-8");
    return fileContent;
}

// main();

const app = express();
app.use(bodyParser.json());

app.get("/", (request, response) => {
    console.log("recived a request");
    response.send("this is from my / route");
});

app.get("/file", async (request, response) => {
    const fileContent = await filesystem.readFile("test.txt", "utf-8");
    response.send(fileContent);
});

app.get("/cat", (request, response) => {
    const fileContent = "catPic.jpg";
    response.send(fileContent);
});

app.get("/hello", (request, response) => {
    const username = request.query.name;
    if (username === "pass") {
        response.send(`this is from my hello routes ${username}`);
    } else {
        response.send("you cannot acccess this");
    }
});

app.get("/users", async (req, res) => {
    const result = await knex.raw("SELECT * FROM users");
    res.send(result);
});

app.get("/random-number", async (req, res) => {
    const result = Math.random();
    res.send(result);
})

app.post("/create", async function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    await knex.raw(`insert into users (name,password) values('${name}', '${password}')`)
    res.send("user created");
});

app.post("/new-table", async (req, res) => {
    const table = req.query.table;
    await knex.raw(`create table ${table}(name varchar(255), password varchar(255))`)
    res.send(`created table: ${table}`);
})

const port = 3000;
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log(`server is ready and running in port ${port}`);
});