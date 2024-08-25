import React from 'react';
import { Card, CardContent, Skeleton, Grid,ButtonBase } from '@mui/material';
import useStyles from "./styles";

const PostSkeleton = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className={classes.card} raised elevation={6}>
                        <ButtonBase className={classes.cardActions} disabled>
                            <CardContent>
                                <Skeleton variant="rectangular" className={classes.skeletonRectangular}height={200} width="380%"  />
                              
                                <div className={classes.details}>
                                    <Skeleton variant="text" height={20} width="50%" />
                                </div>
                                <Skeleton variant="text" height={20} width="180%" />
                                <Skeleton variant="text" height={20} width="180%" />
                            </CardContent>
                        </ButtonBase>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PostSkeleton;
