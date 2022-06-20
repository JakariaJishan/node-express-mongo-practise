const express = require("express");
const adminRouter = require("./routers/adminRouter");

const app = express();

app.use("/admin", adminRouter);

app.listen(3000);
