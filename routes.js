"use strict";

const express = require("express");

// Set up the router instance
const router = express.Router();

// GET USER
router.get("/users", (req, res) => {
  return res
    .status(200)
    .json({ message: "Succesful GET" })
    .end();
});

// POST USER
router.post("/users", (req, res) => {
  return res
    .status(201)
    .json({ message: "Succesful POST" })
    .end();
});

// GET ALL COURSES
router.get("/courses", (req, res) => {
  return res
    .status(200)
    .json({ message: "Succesful POST" })
    .end();
});

// GET COURSE
router.get("/courses:id", (req, res) => {
  return res
    .status(200)
    .json({ message: "Succesful GET Course" })
    .end();
});

// POST COURSE
router.post("/courses", (req, res) => {
  return res.status(201).end();
});

// PUT COURSE
router.put("/courses:id", (req, res) => {
  return res.status(204).end();
});

// DELETE COURSE
router.delete("/courses:id", (req, res) => {
  return res.status(204).end();
});

module.exports = router;
