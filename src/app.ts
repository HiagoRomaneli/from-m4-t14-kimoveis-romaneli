import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { usersRoutes } from "./routers/users.routesr";
import { loginRoutes } from "./routers/login.routers";
import { categoriesRoutes } from "./routers/category.routers";
import { realEstateRoutes } from "./routers/realEstate.routers";
import { schedulesRoutes } from "./routers/schedules.routers";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrors);

export default app;
