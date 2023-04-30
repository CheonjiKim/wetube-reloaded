let videos = [
  {
    title: "vid1",
    rating: 5,
    comments: 10,
    createdAt: "21 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "vid2",
    rating: 4.5,
    comments: 130,
    createdAt: "2 minutes ago",
    views: 1234,
    id: 2,
  },
  {
    title: "vid3",
    rating: 2,
    comments: 10,
    createdAt: "23 minutes ago",
    views: 0,
    id: 3,
  },
];

export const trending = (req, res) =>
  res.render("home", {
    pageTitle: "Comes from your controller",
    videos: videos,
  });

export const watch = (req, res) => {
  const id = req.params.id; // another equivalent code for this line -> const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", {
    pageTitle: `Watching ${video.title}`,
    video: video,
  });
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];

  res.render("Edit", { pageTitle: `Editing: ${video.title}`, video: video });
};
export const postEdit = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  console.log(title);
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "Upload a Video"});
};

export const postUpload = (req, res) => {
  const {title} = req.body;
  const newVideo = {
    title: title,
    rating: 0,
    comments: 0,
    createdAt: "Just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
