import express from "express";
const app = express();

app.get("/", (_request, response) => {
  response.send(`
      <h1>Hello!</h1>
      <h2>This is my first foray into backend</h2>
      <style>
      body {
              background: #ccc;
      }
      h1, h2 {
        text-align: center;
        color: #fff434;
        text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
      }
      </style>
  `);
});

app.get("/date", (_request, response) => {
  const date = new Date();
  response.send(`
      <h1>${date}</h1>
  `);

});



app.listen(3000, function () {
  console.log(`> Ready on http://localhost:3000`);
});