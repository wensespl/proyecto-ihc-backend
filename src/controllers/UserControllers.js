const User = require('../models/User')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getUser = async (req, res) => {
  try {
    const { userId: userId } = req.params
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ msg: `No user with id : ${userId}` })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllUsers,
  getUser
}
