"use strict";

const express = require("express");

// imports the sequelize models
const models = require("./models");

// Get references to our models
const User = models.User;
const Course = models.Course;

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
  Course.findAll().then(courses => {
    return res
      .json(courses)
      .status(200)
      .end();
  });
});

// GET COURSE
router.get("/courses/:id", (req, res) => {
  Course.findByPk(req.params.id).then(course => {
    return res
      .json(course)
      .status(200)
      .end();
  });
});

// POST COURSE
router.post("/courses", (req, res) => {
  console.log(req.body);
  Course.create(req.body).then(course => {
    return res
      .location(`/api/courses/${course.id}`)
      .status(201)
      .end();
  });
});

// PUT COURSE
router.put("/courses/:id", (req, res) => {
  Course.findByPk(req.params.id).then(course => {
    if (course) {
      course.update(req.body);
      return res.status(204).end();
    } else {
      res.send(404);
    }
  });
});

// DELETE COURSE
router.delete("/courses/:id", (req, res) => {
  return res.status(204).end();
});

module.exports = router;
