const { Router } = require('express')

const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  getAllMyCourses
} = require('../controllers/CourseControllers')

const { fieldValidator } = require('../middlewares/fieldValidator')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.use(validateJWT)

router.route('/').get(getAllCourses).post(createCourse)
router.route('/user').get(getAllMyCourses)
router.route('/:courseId').get(getCourse).delete(deleteCourse)

module.exports = router