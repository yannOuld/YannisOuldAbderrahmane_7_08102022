const db = require("../models");
const { Comment, Post } = db.sequelize.models;
const { modifyPermit } = require('../middleware/auth');
const asyncHandler = require('express-async-handler')

// crée un commentaire
const createComment = asyncHandler(async (req, res, next) => {
  const { content, owner_id } = req.body;
  const post_uuid = req.params.uuid;

  // retrouver le post correspondant
  const post = await Post.findOne({ where: { uuid: post_uuid } });
  if (!post) throw new Error("Post not found");

  if (owner_id !== req.auth.id) throw new Error("Wrong user");


  try {
    const comment = await Comment.create({
      content,
      post_uuid,
      owner_id,
    })
    if (!comment) throw new Error("le commentaire n'a pas pu etre crée");
    post.increment("commentsCounter", { by: 1 })

    return res.status(201).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// trouver tout les commentaires
async function getAllComment(req, res, next) {
  const post_uuid = req.params.uuid;

  // parametrages de recherche
  const options = {
    where: { post_uuid },
    include: ["owner"],
    order: [["createdAt"]],
  };

  // retrouver tout les commmentaires d'un post avec les options en parametres
  try {
    const comments = await Comment.findAll(options);

    if (!comments) throw new Error("Les commentaires n'ont pas être trouvés !");

    return res.status(200).json(comments);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// supprimer un commentaire
async function deleteComment(req, res, next) {
  const id = req.params.id;

  try {
    const comment = await Comment.findOne({ where: { id } })
    if (!comment) throw new Error("I have the high ground Anakin !");
    modifyPermit(req, res, comment.owner_id)
    comment.destroy();
    return res.status(200).json("comment deleted !");
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports = { deleteComment, createComment, getAllComment }