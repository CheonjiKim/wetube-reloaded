import mongoose from "mongoose";

// 우리가 다룰 영상의 형태를 미리 구성해놓은 것이다.
// Java의 Interface와 비슷한 개념인것 같다.
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{type: String}],
    meta: {
        views:Number,
        rating: Number,
    },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;

