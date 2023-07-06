import User from "../models/User";
import bcrypt from "bcrypt";
import session from "express-session";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async (req, res) => {
    console.log(req.body);
    const {name, email, username, password, password2, location} = req.body;
    const pageTitle = "join";

    if (password !== password2) {
        return res.status(400).render("join", { 
            pageTitle,
            errorMessage: "Password confirmation does not match."});
    }

    const exists = await User.exists({ $or: [ { username }, { email } ] });
    if (exists) {
        return res.status(400).render("join", { 
            pageTitle,
            errorMessage: "The username/email is already taken."});
    }
    try {
        await User.create({
        name,
        email,
        username,
        password, 
        location,   
    });
    return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
          pageTitle: "Login",
          errorMessage: error._message,
        });
      }
};

export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "The username does not exist."});
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "Incorrect password."});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"});

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See user");
