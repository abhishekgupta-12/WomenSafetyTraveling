import React from 'react';
import { Container, Typography, Box, Grid, Skeleton, Paper } from '@mui/material';

const Post = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} >
        {/* Left-Aligned Skeletons */}
        <Grid item xs sx={{marginTop:3}}>
          {/* Post Title Skeleton */}
          <Skeleton variant="text" width="20%" height={50} />

          {/* Post Tags Skeleton */}
          <Skeleton variant="text" width="10%" height={20} />

          {/* Post Content Skeleton */}
          <Skeleton variant="text" width="70%" height={20} />
          <Skeleton variant="text" width="70%" height={20} />

        </Grid>

        {/* Right-Aligned Paper with Skeleton */}
        <Grid item sx={{ height: 250, width: 300 ,marginTop:0}}>
          <Paper variant="outlined" sx={{height:'18rem'}}>
            <Grid container  alignItems="center" sx={{ padding: 2 }}>
              
              <Grid item xs>
                <Skeleton variant="text" width="100%" height={290} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Comments Section */}
      <Box mt={1} sx={{marginTop:-10}}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>

        {/* Comment List Skeleton */}
        <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2,width:540 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Skeleton variant="circular" width={40} height={40} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="text" width="40%" height={20} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Post;
