// mock data for assignment, could be placed to separate json-file too.
const mediaItems = [
  {
    media_id: 9632,
    filename: "ffd8.jpg",
    filesize: 887574,
    title: "Favorite drink",
    description: "",
    user_id: 1606,
    media_type: "image/jpeg",
    created_at: "2023-10-16T19:00:09.000Z",
  },
  {
    media_id: 9626,
    filename: "dbbd.jpg",
    filesize: 60703,
    title: "Miika",
    description: "My Photo",
    user_id: 3671,
    media_type: "image/jpeg",
    created_at: "2023-10-13T12:14:26.000Z",
  },
  {
    media_id: 9625,
    filename: "2f9b.jpg",
    filesize: 30635,
    title: "Aksux",
    description: "friends",
    user_id: 260,
    media_type: "image/jpeg",
    created_at: "2023-10-12T20:03:08.000Z",
  },
  {
    media_id: 9592,
    filename: "f504.jpg",
    filesize: 48975,
    title: "Desert",
    description: "",
    user_id: 3609,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:59:05.000Z",
  },
  {
    media_id: 9590,
    filename: "60ac.jpg",
    filesize: 23829,
    title: "Basement",
    description: "Light setup in basement",
    user_id: 305,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:56:41.000Z",
  },
];

const getMedia = (req, res) => {
  res.json(mediaItems);
};

const getMediaId = (req, res) => {
  // if media with id exists send it, otherwise send 404
  console.log("getMediaById", req.params);
  const item = mediaItems.find(
    (element) => element.media_id == req.params.media_id
  );
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "Item not found." });
  }
};

const putMedia = (req, res) => {
  console.log("media item updated", req.body);
  const itemId = Number(req.params.media_id); // convert id to number
  const itemIndex = mediaItems.findIndex((item) => item.media_id === itemId);

  if (itemIndex !== -1) {
    // If the item exists, update it
    mediaItems[itemIndex] = { ...mediaItems[itemIndex], ...req.body };
    res.sendStatus(200);
  } else {
    // If the item does not exist, send an error
    res.status(404).send("Media item not found");
  }
};

const deleteMedia = (req, res) => {
  console.log("media item deleted", req.body);
  const itemId = Number(req.params.media_id); // convert id to number
  const itemIndex = mediaItems.findIndex((item) => item.media_id === itemId);

  if (itemIndex !== -1) {
    // If the item exists, delete it
    mediaItems.splice(itemIndex, 1);
    res.sendStatus(200);
  } else {
    // If the item does not exist, send an error
    res.status(404).send("Media item not found");
  }
};

const postMedia = (req, res) => {
  console.log("new media item posted", req.body);
  const { filename, title, description, user_id, media_type } = req.body;
  if (filename && title && description && user_id && media_type) {
    // Find the maximum id in the mediaItems array
    const maxId = mediaItems.reduce(
      (max, item) => Math.max(max, item.media_id),
      0
    );
    // Add the new item with an id that is one greater than the maximum
    mediaItems.push({
      media_id: maxId + 1,
      filename,
      title,
      description,
      user_id,
      media_type,
    });
    res.sendStatus(201);
  } else {
    res.status(400).send("All fields are required");
  }
};

export { getMedia, getMediaId, putMedia, deleteMedia, postMedia };
