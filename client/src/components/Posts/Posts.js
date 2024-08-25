import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import PostSkeleton from "../skelton/PostSkeleton";

const Post = React.lazy(() => import('./Post/Post')); // Lazy load the Post component

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) {
    return 'No Posts!';
  }

  return isLoading ? (
    <PostSkeleton />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Suspense fallback={<CircularProgress />}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Suspense>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
