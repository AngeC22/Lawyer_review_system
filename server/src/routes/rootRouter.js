import express from "express";
import lawyerRouter from "./api/v1/lawyersRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import googlePlaceRouter from "./api/v1/googlePlaceRouter.js";
import googleMapRouter from "./api/v1/googleMapRouter.js";
import reviewRouter from "./api/v1/reviewRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/lawyers", lawyerRouter);
rootRouter.use("/api/v1/googlePlace", googlePlaceRouter);
rootRouter.use("/api/v1/googleMap", googleMapRouter);
rootRouter.use("/api/v1/review", reviewRouter);

//place your server-side routes here

export default rootRouter;
