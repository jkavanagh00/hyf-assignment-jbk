import fs from "fs";

fs.readFile("../week1/data/orders.json", { encoding: "utf8" }, function (error, data) {
  if (error) {
    console.error(error);
    return;
  }
  const array = JSON.parse(data);
  console.log(array.length);
});