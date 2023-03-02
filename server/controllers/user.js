const db = require("../models");
const { User } = db.sequelize.models;
const asyncHandler = require('express-async-handler')
const { modifyPermit } = require('../middleware/auth');

// retrouver un user via son uuid
async function getOneUser(req, res, next) {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid }, include: 'posts' });
    const { createdAt, updatedAt, password, id, ...response } = user.dataValues;
    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(404).json(err.message);
  }
};

// users
async function getAllUsers(req, res, next) {
  // conditions
  try {
    // find users and includes posts
    const users = await User.findAll({ include: "posts" });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// modifications user
const modifyUser = asyncHandler(async (req, res, next) => {
  let uuid = req.params.uuid;
  const object = JSON.stringify(req.body);
  const { firstName, lastName, biography } = JSON.parse(object);

  try {
    let imageUrl;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`;
    }

    const user = await User.findOne({ where: { uuid } })
    if (!user) throw new Error("user not found");
    modifyPermit(req, res, user.id)

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (biography) user.biography = biography;
    if (req.file) user.imageUrl = imageUrl;
    user.save()

    return res.status(200).json({ message: "user updated !" });

  } catch (error) {
    return res.status(500).json(err.message)
  }
});

// delete user
async function deleteUser(req, res, next) {
  const uuid = req.params.uuid;
  try {
    // searching user in database
    const user = await User.findOne({ where: { uuid } }).then((user) => {
      if (!user) throw new Error('Something went wrong !');
      modifyPermit(req, user.id)
    });

    // destroy data
    await user.destroy({ where: { uuid } });
    return res.status(200).json("User deleted !");

  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports = {
  deleteUser, modifyUser, getOneUser, getAllUsers
}