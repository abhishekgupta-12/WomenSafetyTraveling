import express from 'express';
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT;
      const total = await PostMessage.countDocuments({});
      const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
      res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
  } catch (error) {
      res.status(404).json({ message: error.message});
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i');

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  // const { id: _id } = req.params;
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const updatedPost = {post, _id: id};
  await PostMessage.findByIdAndUpdate(id, updatePost, {new: true});
  /*
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  */
  res.json(updatedPost);
};



export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully." });
}



export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated!' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  try {
    const post = await PostMessage.findById(id);

    if (!post) {
      return res.status(404).send(`No post found with id: ${id}`);
    }

    const index = post.likes.findIndex((userId) => userId === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((userId) => userId !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error in likePost:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    // Validate input
    if (!value || typeof value !== 'string') {
      return res.status(400).json({ message: 'Invalid comment value' });
    }

    // Find the post
    const post = await PostMessage.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add the new comment to the post's comment array
    post.comment.push(value);

    // Save the updated post
    const updatedPost = await post.save();

    // Return the updated post
    res.json(updatedPost);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Something went wrong' });
  }
};
