import Video from "../models/Video";

/*
// 6.11 에서 Model.find()함수를 callback을 이용하여 구현하려고 했으나
// 더 이상 callback을 지원하지 않는다고 한다.
// 다음 코드는 callback을 사용한 코드이다. 
export const home = (req, res) =>{
  Video.find({}, (error, videos) =>{
    console.log("errors", error);
    console.log("videos", videos);
  })
  return res.render("home", {pageTitle: "Home", videos: videos})
};
*/
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({createdAt:"desc"});
    //console.log(videos);
    return res.render("home", { pageTitle: "Home", videos: videos });
  } catch {
    return res.render("server-error");
  }
};
// ES6
export const watch = async (req, res) => {
  const id = req.params.id; // another equivalent code for this line -> const { id } = req.params;
  const video = await Video.findById(id);
  //console.log(video);
  if (!video) {
    // 에러가 발생하는 경우를 처리하는 if문
    return res.render("404", { pageTitle: "Video Not Found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  if (!video) {
    // 에러가 발생하는 경우를 처리하는 if문
    return res.render("404", { pageTitle: "Video Not Found." });
  }
  res.render("Edit", { pageTitle: `Edit ${video.title}`, video: video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    // 에러가 발생하는 경우를 처리하는 if문
    return res.render("404", { pageTitle: "Video Not Found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload a Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload a Video",
      errorMsg: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const {keyword} = req.query;
  let videos = [];
  if ( keyword ) {
      videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"), // 정규식으로 검색 대상을 다양하게 설정할 수 있다.
      },
    });
  }
  return res.render("search", {pageTitle: "Search", videos});
};
