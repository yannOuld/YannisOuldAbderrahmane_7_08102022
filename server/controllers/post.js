const { sequelize } = require("../models");
const db = require("../models");
const { Post } = db.sequelize.models;
const { modifyPermit } = require('../middleware/auth');


// crée un Post
async function createPost(req, res, next) {
  const object = JSON.stringify(req.body);
  const { title, content, owner_id } = JSON.parse(object);

  if (owner_id != req.auth.id) throw new Error("Wrong user");

  let imageUrl;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  try {
    let post = await Post.create({
      title,
      content,
      imageUrl,
      owner_id,
    })
    if (!post) throw new Error("le post n'as pas pu être créee !");


    return res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

async function getOnePost(req, res, next) {
  const uuid = req.params.uuid;

  try {
    const post = await Post.findOne({ where: { uuid }, include: "owner" });
    if (!post) throw new Error("post introuvable");
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

async function getAllPosts(req, res, next) {
  try {
    const posts = await Post.findAll({
      include: "owner",
      order: ["createdAt"],
    });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

async function deletePost(req, res, next) {
  try {
    const uuid = req.params.uuid;

    const post = await Post.findOne({ where: { uuid }, include: "owner" })
    if (!post) throw new Error("Something went wrong !");
    modifyPermit(req, res, post.owner_id)
    post.destroy()
    return res.status(200).json("post deleted !");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

async function modifyPost(req, res, next) {
  let uuid = req.params.uuid;
  const { content, title } = req.body;

  const post = await Post.findOne({ where: { uuid }, include: "owner" })
  if (!post) throw new Error("post not found");
  modifyPermit(req, res, post.owner_id);
  post.title = title;
  post.content = content;
  post
    .save()
    .then(() => res.status(201).json(post))
    .catch((err) => res.status(500).json(err.message));

};

module.exports = { modifyPost, deletePost, getAllPosts, getOnePost, createPost }