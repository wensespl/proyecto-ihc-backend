const Course = require('../models/Course')
const User = require('../models/User')

const createCourse = async (req, res) => {
  try {
    const { name, tema } = req.body
    const { userId } = req

    const course = new Course({ name, tema, owner: userId })
    course.save()

    res.status(201).json({ ok: true, course })
  } catch (error) {
    res.status(500).json({ ok: false, msg: error })
  }
}

const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const course = await Course.findOne({ _id: courseId })

    if (!course) {
      return res
        .status(404)
        .json({ ok: false, msg: `No course with id : ${courseId}` })
    }
    res.status(201).json({ ok: true, course })
  } catch (error) {
    res.status(500).json({ ok: false, msg: error })
  }
}

const getAllMyCourses = async (req, res) => {
  try {
    const { userId } = req
    const { role } = req.user
    var courses
    if (role === 'PROFESOR_ROLE') {
      courses = await Course.find({ owner: userId })
    } else {
      courses = await Course.find({ alumnos: { $in: [userId] } })
    }

    res.status(200).json({ ok: true, courses })
  } catch (error) {
    res.status(500).json({ ok: false, msg: error })
  }
}

const getAllCourses = async (req, res) => {
  try {
    const { userId } = req
    const courses = await Course.find({ alumnos: { $nin: [userId] } })

    res.status(200).json({ ok: true, courses })
  } catch (error) {
    res.status(500).json({ ok: false, msg: error })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const course = await Course.findOneAndDelete({ _id: courseId })
    if (!course) {
      return res
        .status(404)
        .json({ ok: false, msg: `No course with id : ${courseId}` })
    }
    res.status(200).json({ ok: true, course })
  } catch (error) {
    res.status(500).json({ ok: false, msg: error })
  }
}

const subirVideo = async (req, res) => {
  try {
    const { courseId } = req.params
    const course = await Course.findOneAndUpdate({ _id: courseId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!course) {
      return res
        .status(404)
        .json({ ok: false, msg: `No course with id : ${courseId}` })
    }
    res.status(200).json({ ok: true, course })
  } catch (error) {
    res.status(500).json({ ok: false, msg: error })
  }
}

const addUserToCourse = async (req, res) => {
  try {
    const { userId } = req
    const { courseId } = req.body
    var course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { alumnos: userId } },
      {
        new: true,
        runValidators: true
      }
    )
    if (!course) {
      return res
        .status(404)
        .json({ msg: `No course with id :  ${courseId}`, ok: false })
    }
    res.status(200).json({ ok: true, course })
  } catch (error) {
    res.status(500).json({ ok: false, msg: error })
  }
}

module.exports = {
  addUserToCourse,
  createCourse,
  deleteCourse,
  getAllMyCourses,
  getAllCourses,
  getCourse,
  subirVideo
}
