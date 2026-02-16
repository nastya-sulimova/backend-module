const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const query = parsedUrl.query;

  if (query.users !== undefined) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  }

  if (query.hello !== undefined) {
    if (query.hello === "") {
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain");
      response.write("Enter a name");
      response.end();
      return;
    } else {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, ${query.hello}`);
      response.end();
      return;
    }
  }

  if (Object.keys(query).length === 0) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
    response.end();
    return;
  }

  response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.setHeader("Content-Type", "text/plain");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
