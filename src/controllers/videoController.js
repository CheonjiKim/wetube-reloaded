
export const home = (req, res) =>
  res.render("home", {
    pageTitle: "Comes from your controller",
  });

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
  const {title} = req.body;
  return res.redirect("/");
};
