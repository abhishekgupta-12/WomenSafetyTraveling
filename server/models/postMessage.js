import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  comment: { type: [String], default: [] },
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
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
