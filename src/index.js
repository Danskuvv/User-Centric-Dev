import http from "http";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  //Content-Type header to JSON for all responses
  res.setHeader("Content-Type", "application/json");

  //JSON object esimerkki
  const data = { message: "Welcome to my REST API!" };

  //Handle different HTTP methods & endpoints.
  if (req.method === "GET" && req.url === "/data") {
    //read data from the server
    res.writeHead(200);
    res.end(JSON.stringify(data));
  } else if (req.method === "POST" && req.url === "/data") {
    //post data to the server
    res.writeHead(201); // Use 201 Created for successful POST
    res.end(JSON.stringify({ message: "Data created successfully" }));
  } else if (req.method === "DELETE" && req.url === "/data") {
    // Delete data
    // For testing error response, you can simply return a 500 status code
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  } else if (req.method === "PUT" && req.url === "/data") {
    // Modify something
    // For testing error response, you can return a 400 Bad Request
    res.writeHead(400);
    res.end(JSON.stringify({ message: "Bad Request" }));
  } else {
    // Send a 404 response for non-existing resources
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Resource not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
