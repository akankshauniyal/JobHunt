// controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { author, title, description, link } = req.body;
  try {
    const post = new Post({ author, title, description, link });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
};
