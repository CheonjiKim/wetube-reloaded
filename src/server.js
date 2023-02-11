import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();
const logger = morgan("dev");
app.use(logger); // 이 코드가 다른 app.use()보다 상단에 위치해야만 morgan()이 제대로 동작한다.

const userRouter = express.Router();
const removeUserCon = (req, res) => res.send("remove user");
app.use("/user", userRouter);
userRouter.get("/remove", removeUserCon);

const handleListening = () =>
  console.log(`Server listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
