const express = require("express");
const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter");
const mwConfig = require("./data/mwConfig");

const PORT = 9090;
const server = express();

mwConfig(server);

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));