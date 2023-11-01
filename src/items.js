// mock items data
const items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "omena" },
  { id: 19, name: "appelsiini" },
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemsById = (req, res) => {
  // if item with id exists send it, otherwise send 404
  console.log("getItemsById", req.params);
  const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "Item not found." });
  }
};

const postItem = (req, res) => {
  console.log("new item posted", req.body);
  if (req.body.name) {
    items.push({ id: 0, name: req.body.name });
    //TODO: check akst weeks example of generating an id
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

// TODO: add deleteItem(), putItem() and routing for those in index.js

export { getItems, getItemsById, postItem };
