const { Router } = require('express')

const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  getAllMyCourses,
  subirVideo,
  addUserToCourse
} = require('../controllers/CourseControllers')

const { fieldValidator } = require('../middlewares/fieldValidator')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.use(validateJWT)

router.route('/').get(getAllCourses).post(createCourse)
router.route('/user').get(getAllMyCourses).put(addUserToCourse)
router.route('/:courseId').get(getCourse).delete(deleteCourse).put(subirVideo)

module.exports = router
