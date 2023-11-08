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

export { getUsers, getUsersByID };
