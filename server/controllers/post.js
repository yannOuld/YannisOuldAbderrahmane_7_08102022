const { sequelize } = require("../models");
const db = require("../models");
const { Post } = db.sequelize.models;
const { modifyPermit } = require('../middleware/auth');


// crée un Post
async function createPost(req, res, next) {
  // recupération du body de la requete
  const object = JSON.stringify(req.body);
  const { title, content, owner_id } = JSON.parse(object);

  // vérifier si l'identifiant correspond à un admin
  if (owner_id != req.auth.id) throw new Error("Wrong user");

  let imageUrl;

  // vérifier si il y a un fichier et transformer la requete en object JSON
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`;
  }

  // crée  le Post dans la base de donnée avec l'id du user
  try {
    let post = await Post.create({
      title,
      content,
      imageUrl,
      owner_id,
    }).catch((err) => {
      throw new Error("le post n'as pas pu être créee !");
    });

    return res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// récupérer un Post grace à l'uuid et le model user
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

// récupérer tout les Posts d'un user
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

// supprimé un Post
async function deletePost(req, res, next) {
  try {
    // recupération de l'id
    const uuid = req.params.uuid;

    // retrouver le Post
    const post = await Post.findOne({ where: { uuid } }).then(
      (post) => {
        if (!post) throw new Error("Something went wrong !");
        modifyPermit(post.owner_id)
      }
    );

    // supprimé le post
    await post.destroy();
    return res.status(200).json("post deleted !");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

async function modifyPost(req, res, next) {
  let uuid = req.params.uuid;

  const { content, title } = req.body;

  Post.findOne({ where: { uuid }, include: "owner" }).then((post) => {
    if (!post) throw new Error("post not found");
    modifyPermit(post.owner_id);
    post.title = title;
    post.content = content;
    post
      .save()
      .then(() => res.status(201).json(post))
      .catch((err) => res.status(500).json(err.message));
  });
};

module.exports = { modifyPost, deletePost, getAllPosts, getOnePost, createPost }