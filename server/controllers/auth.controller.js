import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";

const signup = async (req, res) => { 
  try { 
    const userExists = await User.findOne({ email: req.body.email }); 
    if (userExists) return res.status(403).json({ error: "Email is already used" }); 
    const user = new User(req.body); await user.save(); 
    res.status(200).json({ message: "Signup successful! Please sign in." }); 
  } catch (err) { res.status(400).json({ error: "Could not sign up user" }); } };

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "signed out",
  });
};
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};
const isAdmin = async (req, res, next) => {
  try {
    // Prefer role from JWT if present
    if (req.auth && req.auth.role === "admin") return next();

    // Fallback: look up user by id from token and check role in DB
    if (!req.auth || !req.auth._id) {
      return res.status(401).json({ error: "Unauthorized: missing auth payload" });
    }
    const user = await User.findById(req.auth._id).select("role");
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Admin resource. Access denied." });
    }
    return next();
  } catch (e) {
    return res.status(500).json({ error: "Server error verifying admin role" });
  }
};
export default { signin, signout,signup, requireSignin, hasAuthorization, isAdmin };
