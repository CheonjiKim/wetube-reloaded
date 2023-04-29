const videos = [
  {
    title: "vid1",
    rating: 5,
    comments: 10,
    createdAt: "21 minutes ago",
    views: 12334,
    id: 0,
  },
  {
    title: "vid2",
    rating: 4.5,
    comments: 130,
    createdAt: "2 minutes ago",
    views: 1234,
    id: 1,
  },
  {
    title: "vid3",
    rating: 2,
    comments: 10,
    createdAt: "23 minutes ago",
    views: 0,
    id: 2,
  },
];

export const trending = (req, res) =>
  res.render("home", {
    pageTitle: "Comes from your controller",
    videos: videos,
  });

export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.send("Edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete video");
