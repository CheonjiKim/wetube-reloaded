import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); 
app.use(logger); // 이 코드가 다른 app.use()보다 상단에 위치해야만 morgan()이 제대로 동작한다.
app.use(express.urlencoded({extended: true})); // This code makes Express understand HTML forms and values.

app.use(session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube"}),
    })
);

// app.use((req, res, next) => {
//     req.sessionStore.all((error, sesstions) => {
//         console.log(req.session);
//         next();
//     });
// });

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/user", userRouter);  
app.use("/videos", videoRouter);

export default app;

