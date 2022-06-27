const { Schema, model } = require('mongoose')

const CourseSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El curso debe tener un Profesor']
    },
    alumnos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { versionKey: false }
)

CourseSchema.methods.toJSON = function () {
  const { _id, ...course } = this.toObject()
  course.courseId = _id
  return course
}

module.exports = model('Course', CourseSchema)
