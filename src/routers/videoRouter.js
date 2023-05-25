import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

// ([0-9a-f]{24})
// 위 정규식은 0부터 9까지와 a부터 f까지 이루어지고 길이가 24인 값을 의미한다.
// 정규식은 개발에서 많이 쓰이기 때문에 공부해두는 것이 좋다.
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit);
videoRouter.post("/:id([0-9a-f]{24})/edit", postEdit);
videoRouter.get("/upload", getUpload);
videoRouter.post("/upload", postUpload);

export default videoRouter;
