import React, { useEffect, useRef, useState } from 'react';
import { Paper, Typography, Divider, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import Post from '../skelton/Post.jsx';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({
        search: 'none',
        tags: post?.tags.join(',')
      }));
    }
  }, [post, dispatch]);

  const handleAvatarClick = () => {
    setIsClicked(true);
  };

  const handleCloseModal = () => {
    setIsClicked(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <Post />
      </Paper>
    );
  }

  if (!post) return null;

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  const openPost = (id) => navigate(`/posts/${id}`);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography
            variant="h6"
            style={{
              fontWeight: "bold",
              display: 'flex',
              alignItems: 'center',
              marginBottom: "1rem"
            }}
          >
          <Avatar
        src={post.creator?.picturePath ? `/images/${post.creator.picturePath}` : '/path/to/default/avatar'}
        alt={post.creator?.name || 'Anonymous'}
        style={{
          marginRight: '1rem',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onClick={handleAvatarClick}
      />
      {isClicked && (
        <div className={classes.modalOverlay} onClick={handleCloseModal}>
          <div className={classes.modalContent} ref={modalRef}>
            <img
              src={post.creator?.picturePath ? `/images/${post.creator.picturePath}` : '/path/to/default/avatar'}
              alt={post.creator?.name || 'Anonymous'}
              className={classes.modalImage}
            />
          </div>
        </div>
      )}
            {post.creator?.name || 'Anonymous'}
          </Typography>
          <Divider />
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag}`).join(' ')}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography gutterBottom variant="body1" component="div" style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h7" style={{ fontWeight: "bold", color: "blue", marginRight: "8px" }}>
              Safety Rating:
            </Typography>
            {[1, 2, 3, 4, 5].map((value) => (
              <span key={value}>
                {post.rating >= value ? (
                  <StarIcon color="primary" />
                ) : (
                  <StarBorderIcon color="primary" />
                )}
              </span>
            ))}
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title || 'Post image'}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, creator, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {creator?.name || 'Anonymous'}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes ? likes.length : 0}
                  </Typography>
                  <img
                    src={selectedFile}
                    alt={title || 'Recommended post image'}
                    width="200px"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
