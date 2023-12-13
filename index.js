const express = require("express");
const cors = require("cors");
const db = require("./app/config/db.config");
const app = express();
const routes = require("./app/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger-output.json");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./app/schema/user.schema");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authMiddleware = require("./app/middleware/auth.middleware");
const http = require("http");
const socketIo = require("socket.io");
const SocketManager = require("./app/libs/SocketManager");

dotenv.config();

const PORT = process.env.PORT || 4500;
const crosOptions = {
  origin: "*",
};

app.use(cors(crosOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>SMA API Version 1.0</h1>");
});

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  if (userId.trim()) {
    SocketManager.addUser(userId, socket);
  }
  socket.on("disconnect", () => {
    SocketManager.removeUser(userId);
  });
});


app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
  "/api/graphql",
  authMiddleware,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// Connect to the database and start the server
db()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB: " + error);
  });

module.exports = app;
