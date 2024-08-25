import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  comment: { type: [String], default: [] }, // Consider changing to an array of objects if you need more details
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] }, // Stores user IDs who liked the post
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
