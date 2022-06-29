const Course = require("../models/Course");
const User = require('../models/User')

const createCourse = async (req, res) => {
  try {
    const {name,tema} = req.body;
    const {userId} = req;
    const course = new Course({name,tema,owner:userId})
    console.log(req)
    course.save()

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getCourse = async (req, res) => {
  try {
    const { courseId: courseId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ msg: `No course with id : ${courseId}` });
    }
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
  
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { courseId: courseId } = req.params;
    const course = await Course.findOneAndDelete({ _id: courseId });
    if (!course) {
      return res.status(404).json({ msg: `No course with id : ${courseId}` });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourse
}
