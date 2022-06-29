const { Router } = require('express')

const {
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourse
  } = require('../controllers/CourseControllers')

const { fieldValidator } = require('../middlewares/fieldValidator')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.route('/').get([validateJWT],getAllCourses).post([validateJWT],createCourse)
router.route('/:courseId').get([validateJWT],getCourse).delete([validateJWT],deleteCourse)

module.exports = router
