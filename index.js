const express = require("express");
const cors = require("cors");
const db = require("./app/config/db.config");
const app = express();
const routes = require("./app/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger-output.json");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./app/schema/test.schema");
const root = require("./app/resolver/test.resolver");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4500;
const crosOptions = {
  origin: "*"
};
app.use(cors(crosOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {4
  res.send("<h1>SMA API Version 1.0</h1>");
});
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

db()
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });
  })
  .catch((error) => {
    console.log("Error is connecting in DB" + error);
  });

  module.exports =app