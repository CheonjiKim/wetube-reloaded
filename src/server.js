
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); 
app.use(logger); // 이 코드가 다른 app.use()보다 상단에 위치해야만 morgan()이 제대로 동작한다.
app.use(express.urlencoded({extended: true})); // This code makes Express understand HTML forms and values.
app.use("/", globalRouter);
app.use("/user", userRouter);  
app.use("/videos", videoRouter);

export default app;

