import users from "./mock-data/users.json" assert { type: "json" };

const getUsers = (req, res) => {
  res.json(users);
};

const getUsersByID = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.user_id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    res.json({ message: "User not found." });
  }
};

const postUser = (req, res) => {
  console.log("new user posted", req.body);
  const { username, email, password } = req.body;
  if (username && email && password) {
    // Find the maximum id in the users array or assign 0 if the array is empty
    const maxId =
      users.length > 0
        ? users.reduce((max, user) => Math.max(max, user.user_id), 0)
        : 0;
    // Add the new user with an id that is one greater than the maximum
    users.push({
      user_id: maxId + 1,
      username,
      email,
      password,
    });
    res.sendStatus(201);
  } else {
    res.status(400).send("All fields are required");
  }
};

const putUser = (req, res) => {
  console.log("user updated", req.body);
  const userId = Number(req.params.user_id); // convert id to number
  const userIndex = users.findIndex((user) => user.user_id === userId);

  if (userIndex !== -1) {
    // If the user exists, update it
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.sendStatus(200);
  } else {
    // If the user does not exist, send an error
    res.status(404).send("User not found");
  }
};

const deleteUser = (req, res) => {
  console.log("user deleted", req.body);
  const userId = Number(req.params.user_id); // convert id to number
  const userIndex = users.findIndex((user) => user.user_id === userId);

  if (userIndex !== -1) {
    // If the user exists, delete it
    users.splice(userIndex, 1);
    res.sendStatus(200);
  } else {
    // If the user does not exist, send an error
    res.status(404).send("User not found");
  }
};

export { getUsers, getUsersByID, postUser, putUser, deleteUser };
