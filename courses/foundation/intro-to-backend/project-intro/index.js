import express from "express";
import knex from "./db.js";

const app = express();

app.use(express.static('public'));

app.get("/", async (_request, response) => {
    const users = await knex("users").select("*");
    const userCount = users.length;
    
    response.send(`
        <nav>
          <a href="/">Home</a> | 
          <a href="/contact">Contact</a> | 
          <a href="/date">Date</a> |
          <a href="/cat">Cat</a>
        </nav>
        <h1>Hello!</h1>
        <h2>This is my first foray into backend</h2>
        <p>Number of users: ${userCount}</p>
        <style>
        body {
                background: #ccc;
                font-family: Arial, sans-serif;
        }
        h1, h2, p, nav {
          text-align: center;
          color: #fff434;
          text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000,
               1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
        }
        a {
          color: #fff434;
          text-decoration: none;
          padding: 5px;
        }
        </style>
    `);
});

app.get("/date", (_request, response) => {
  const date = new Date();
  response.send(`
      <nav>
        <a href="/">Home</a> | 
        <a href="/contact">Contact</a> | 
        <a href="/date">Date</a> |
        <a href="/cat">Cat</a>
      </nav>
      <h1>${date}</h1>
            <style>
      body {
            background: #ccc;
            font-family: Arial, sans-serif;
      }
      h1, nav {
        text-align: center;
        color: #fff434;
        text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
      }
      a {
        color: #fff434;
        text-decoration: none;
        padding: 5px;
      }
      </style>
  `);
});

app.get("/contact", (_request, response) => {
  response.send(`
    <nav>
      <a href="/">Home</a> | 
      <a href="/contact">Contact</a> | 
      <a href="/date">Date</a> |
      <a href="/cat">Cat</a>
    </nav>
    <h1>Contact Information</h1>
    <p>Email: jkavanagh00@gmail.com</p>
    <p>GitHub: @jkavanagh00</p>
    <style>
      body {
        background: #ccc;
        font-family: Arial, sans-serif;
      }
      h1, p, nav {
        text-align: center;
        color: #fff434;
        text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
      }
      a {
        color: #fff434;
        text-decoration: none;
        padding: 5px;
      }
    </style>
  `);
});

app.get("/cat", (_request, response) => {
  response.send(`
    <nav>
      <a href="/">Home</a> | 
      <a href="/contact">Contact</a> | 
      <a href="/date">Date</a> |
      <a href="/cat">Cat</a>
    </nav>
    <h1>This is a cat</h1>
    <img src="https://cataas.com/cat" alt="Random cat" style="max-width: 500px; display: block; margin: 20px auto;">
    <style>
      body {
        background: #ccc;
        font-family: Arial, sans-serif;
      }
      h1, p, nav {
        text-align: center;
        color: #fff434;
        text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
      }
      a {
        color: #fff434;
        text-decoration: none;
        padding: 5px;
      }
    </style>
  `);
});

app.listen(3000, function () {
  console.log(`> Ready on http://localhost:3000`);
});