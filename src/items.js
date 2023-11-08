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

const putItem = (req, res) => {
  console.log("item updated", req.body);
  const itemId = Number(req.params.id); // convert id to number
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    // If the item exists, update it
    items[itemIndex] = { id: itemId, name: req.body.name };
    res.sendStatus(200);
  } else {
    // If the item does not exist, add it
    items.push({ id: itemId, name: req.body.name });
    res.sendStatus(201);
  }
};

const deleteItem = (req, res) => {
  console.log("item deleted", req.body);
  const itemId = Number(req.params.id); // convert id to number
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    // If the item exists, delete it
    items.splice(itemIndex, 1);
    res.sendStatus(200);
  } else {
    // If the item does not exist, send an error
    res.status(404).send("Item not found");
  }
};

// TODO: add deleteItem(), putItem() and routing for those in index.js

export { getItems, getItemsById, postItem, putItem, deleteItem };
