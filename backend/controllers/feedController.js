const Post = require('../models/Post.model')
const User = require('../models/User.model')

module.exports = {
  createPost: async (req, res) => {
    const post = await Post.create({
      user: req.user.id,
      content: req.body.content,
      media: req.body.media,
      university: req.user.university,
    })
    res.status(201).json(post)
  },

  getFeed: async (req, res) => {
    // Get user's connections
    const user = await User.findById(req.user.id).populate('connections')
    const connectionIds = user.connections.map((conn) => conn._id)

    // Get posts from connections and university
    const posts = await Post.find({
      $or: [
        { user: { $in: [req.user.id, ...connectionIds] } },
        { university: req.user.university },
      ],
    })
      .sort('-createdAt')
      .populate('user', 'name avatarUrl role')
      .populate('comments.user', 'name avatarUrl')

    res.json(posts)
  },

  likePost: async (req, res) => {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user.id } },
      { new: true }
    )
    res.json(post)
  },

  addComment: async (req, res) => {
    const comment = {
      user: req.user.id,
      text: req.body.text,
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    ).populate('comments.user', 'name avatarUrl')

    res.json(post)
  },
}
