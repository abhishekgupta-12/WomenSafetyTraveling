import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comment || []);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    useEffect(() => {
        if (post?.comment) {
            setComments(post.comment);
        }
    }, [post]);

    const handleComment = async () => {
        if (!user?.result?.name) return;

        const finalComment = `${user.result.name}: ${comment}`;

        // Dispatch the commentPost action and get the updated post
        const updatedPost = await dispatch(commentPost(finalComment, post._id));

        if (updatedPost) {
            setComments(updatedPost.comment); // Update the comments state with the new comments
            setComment(''); // Clear the comment box
            commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h5">
                        Comments
                    </Typography>
                    {comments.length > 0 ? (
                        comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>: {c.split(': ')[1]}
                            </Typography>
                        ))
                    ) : (
                        <Typography gutterBottom variant="subtitle1">
                            No comments yet!
                        </Typography>
                    )}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: "70%" }}>
                        <Typography gutterBottom variant="h6">
                            Write a Comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: "10px" }}
                            fullWidth
                            disabled={!comment.length}
                            color="primary"
                            variant="contained"
                            onClick={handleComment}
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
