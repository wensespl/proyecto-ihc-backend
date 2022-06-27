const { Schema, model } = require('mongoose')

const UserSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: 'ALUMNO_ROLE',
      enum: ['ALUMNO_ROLE', 'PROFESOR_ROLE']
    }
  },
  { versionKey: false }
)

UserSchema.methods.toJSON = function () {
  const { password, _id, ...user } = this.toObject()
  user.userId = _id
  return user
}

module.exports = model('User', UserSchema)
