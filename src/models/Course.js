const { Schema, model } = require('mongoose')

const CourseSchema = Schema(
  {
    name: { type: String, required: true },
    tema: { type: String, required: true },
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
    ],
    contenido: {
      type: [
        {
          link: { type: String, required: true },
          name: { type: String, required: true }
        }
      ],
      default: []
    },
    comentarios: {
      type: [
        {
          autor: { type: String, required: true },
          texto: { type: String, required: true },
          fecha: { type: Date, required: true }
        }
      ],
      default: []
    }
  },
  { versionKey: false }
)

CourseSchema.methods.toJSON = function () {
  const { _id, ...course } = this.toObject()
  course.courseId = _id
  return course
}

module.exports = model('Course', CourseSchema)
