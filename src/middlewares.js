export const localsMiddleware = (req, res, next) => {
  // locals에 있는 element들은 views에서 접근이 가능하다.
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
