const express = require("express");
const adminRouter = require("./routers/adminRouter");
const publicRoute = require("./routers/publicRouter");

const app = express();

app.use("/admin", adminRouter);
app.use('/', publicRoute)
app.listen(3000);
