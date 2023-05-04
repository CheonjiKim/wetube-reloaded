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
    console.log("First");
    const videos = await Video.find({});
    console.log("Second");
    return res.render("home", {pageTitle: "Home", videos: videos});
  } catch {
    return res.render("server-error");
  }
};

export const watch = (req, res) => {
  const id = req.params.id; // another equivalent code for this line -> const { id } = req.params;
  return res.render("watch", {
    pageTitle: `Watching`,
  });
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  res.render("Edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  console.log(title);
  return res.redirect(`/videos/`);
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "Upload a Video"});
};

export const postUpload = (req, res) => {
  const {title, description, hashtags} = req.body;
  console.log(title, description, hashtags);
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map(word => `#${word}`),
    meta: {
      views:0,
      rating: 0,
    },
  })
  console.log(video);
  return res.redirect("/");
};
