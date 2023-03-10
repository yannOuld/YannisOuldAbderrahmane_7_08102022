const db = require("../models");
const { Post, Like } = db.sequelize.models;

async function addLike(req, res, next) {
  const uuid = req.params.uuid;
  const { user_id } = req.body;

  // retrouver le post correspondant
  const post = await Post.findOne({ where: { uuid } });
  if (!post) throw new Error("Post not found");

  try {
    // trouver si un like existe déja poour le user
    const like = await Like.findOne({ where: { post_uuid: uuid } });

    // Si le like n'existe pas le crée et ajouter 1 au compteur de like du post
    if (!like || like.user_id !== user_id) {
      let newLike = await Like.create({ user_id, post_uuid: uuid });
      if (!newLike) throw new Error("Something went wrong");

      await post.increment("likesCounter", { by: 1 });

      await post.save();

      return res.status(201).json(1);
    }

    // Si le like existe le supprimé et enlever 1 au compteur de like du post
    else if (like || like.user_id == user_id) {
      await like.destroy();

      await post.decrement("likesCounter", { by: 1 });

      await post.save();

      return res.status(200).json(-1);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

async function getLikeState(req, res, next) {
  const uuid = req.params.uuid;
  const user_id = req.auth.id;
  const post = await Post.findOne({ where: { uuid } });
  if (!post) throw new Error("Post not found");
  try {
    let liked;
    const like = await Like.findOne({ where: { post_uuid: uuid } });
    if (!like || like.user_id !== user_id) {
      liked = false
    } else if (like && like.user_id == user_id) {
      liked = true
    }
    return res.status(201).json(liked);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

async function getLikes(req, res, next) {
  const uuid = req.params.uuid;

  const allLikes = await Like.findAll({
    where: { post_uuid: uuid },
    include: "user",
  }).catch(err => console.log(err));
  const likes = allLikes.filter((like) => { return like.post_uuid == uuid })
  return res.status(200).json(likes);

};

module.exports = { getLikes, getLikeState, addLike }