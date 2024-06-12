import express from "express";
import { initialize } from "express-openapi";
import fs from "fs";
import path from "path";
import { getFibonacciByNImpl } from "./routes/fib/controller";

const app = express();
const port = 8000;

initialize({
  app: app,
  apiDoc: fs.readFileSync(path.join(__dirname, "../swagger.yaml"), "utf8"),
  validateApiDoc: true,
  errorMiddleware: (err, req, res, next) => {
    switch (err.status) {
      case 400:
        //When the query parameter is not matched
        res.status(400).json({
          status: 400,
          message: "Bad Request.",
        });
        break;
      default:
        res.status(500).json({
          status: 500,
          message: "Internal Server Error.",
        });
        break;
    }
  },
  operations: {
    getFibonacciByN: getFibonacciByNImpl,
  },
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Found.",
  });
});

//Start server
app.listen(port);
console.log(`Listening on port ${port}`);
