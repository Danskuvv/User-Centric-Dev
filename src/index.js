import express from "express";
const hostname = "127.0.0.1";
import path from "path";
import { fileURLToPath } from "url";
import { getItems } from "./items.js";
import { getItemsById } from "./items.js";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/docs", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

//dummy routing example
app.get("/kukkuu", (request, response) => {
  const myResponse = { message: "moikka" };
  response.status(200);
  response.json(myResponse);
});

//example generic items api
//get all items
app.get("/api/items", getItems);
// get items by id
app.get("/api/items/:id/", getItemsById);
//modify
app.put("/api/items");
//post
app.post("/api/items");
//Remove
app.delete("/api/items");

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
