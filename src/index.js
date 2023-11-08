import express from "express";
const hostname = "127.0.0.1";
import path from "path";
import { fileURLToPath } from "url";
import { deleteItem, getItems, postItem, putItem } from "./items.js";
import { getItemsById } from "./items.js";
import {
  deleteMedia,
  getMedia,
  getMediaId,
  postMedia,
  putMedia,
} from "./media.js";
import { getUsers, getUsersByID } from "./user.js";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

// render pug a file (home.pug) example
app.get("/", (req, res) => {
  // any dynamic data can be passed to the template as an object
  const values = { title: "My REST API", message: "Docs will be here!" };
  // use name of the template file without extension
  res.render("index", values);
});

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "public")));

//dummy routing example
app.get("/kukkuu", (request, response) => {
  const myResponse = { message: "moikka" };
  response.status(200);
  response.json(myResponse);
});

// Dummy example with json data
app.get("/api/resource", (req, res) => {
  const myData = {
    title: "This is an item",
    description: "Just some dummy data here",
  };
  res.json(myData);
});

//example generic items api
//get all items
app.get("/api/items", getItems);
// get items by id
app.get("/api/items/:id/", getItemsById);
//modify
app.put("/api/items/:id", putItem);
//post
app.post("/api/items", postItem); //gotta fix
//Remove
app.delete("/api/items/:id", deleteItem);

// media endpoints
app.get("/api/media", getMedia);

app.get("/api/media/:media_id", getMediaId);

app.put("/api/media/:media_id", putMedia);

app.delete("/api/media/:media_id", deleteMedia);

app.post("/api/media", postMedia);

// user endpoints
app.get("/api/user", getUsers);

app.get("/api/user/:user_id", getUsersByID);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
