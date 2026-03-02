const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");

const app = express();
const PORT = 4000;

// Simple test log
console.log("Starting GraphQL server...");

// Schema
const schema = buildSchema(`
  type Screen {
    id: ID!
    name: String!
  }

  type Query {
    screen(id: ID!): Screen
  }
`);

const root = {
  screen: ({ id }) => ({ id: "1", name: "Lobby Screen" }),
};

// GraphQL route
app.use("/graphql", createHandler({ schema, rootValue: root }));

// IMPORTANT: store server reference
const server = app.listen(PORT, () => {
  console.log(`GraphQL Server running at http://localhost:${PORT}/graphql`);
});

// Catch errors
server.on("error", (err) => {
  console.error("Server error:", err);
});

// Prevent silent exit
process.on("exit", (code) => {
  console.log("Process exited with code:", code);
});