const express = require("express");
const apiRouter = require("./routers/api.router");
const { handleServerErrors, handlePsqlErrors, handleCustomErrors } = require("./controllers/errors.controllers");
const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
    res.status(404).send({ msg: "Path not found" });
});

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)


module.exports = app;
