import React, { useState } from 'react';
import { Paper, Typography, Avatar, Box, TextField, Button, IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import FlexBetween from '../components/FlexBetween';
import { updateUser } from '../api'; // Import the updateUser function
import { UPDATE_USER } from '../constants/actionTypes'; // Import the action type for user update

const UserWidget = ({ onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPicture, setNewPicture] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const numberOfPosts = useSelector((state) => state.posts.length);
    const dispatch = useDispatch();

    const handleNameChange = (e) => setNewName(e.target.value);
    const handlePictureChange = (e) => setNewPicture(e.target.files[0]);

    const handleSubmit = async () => {
        const formData = new FormData();
        if (newName) formData.append('name', newName);
        if (newPicture) formData.append('picture', newPicture);
    
        try {
            console.log("Form Data:", formData); // Debugging line to inspect formData
            const response = await updateUser.updateUser(formData);
            console.log('Update response:', response.data); // Debugging line
    
            // Update local storage and Redux store
            localStorage.setItem('profile', JSON.stringify({ ...user, result: response.data }));
            dispatch({ type: UPDATE_USER, payload: response.data });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    

    return (
        <Paper style={{ padding: '1rem', position: 'absolute', top: '60px', right: '20px', width: '250px', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    src={user?.result.picturePath ? `/images/${user.result.picturePath}` : '/path/to/defaultAvatar.png'}
                    alt={user?.result.name}
                    style={{ marginRight: '1rem' }}
                />
                <Typography variant="h6">{user?.result.name}</Typography>
                <IconButton onClick={() => setIsEditing(!isEditing)} style={{ marginLeft: 'auto' }}>
                    <EditIcon />
                </IconButton>
            </div>

            {!isEditing ? (
                <>
                    <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
                        Number of Posts: {numberOfPosts}
                    </Typography>

                    <Box p="1rem 0">
                        <FlexBetween mb="0.5rem">
                            <Typography color="textSecondary">Who's viewed your profile</Typography>
                            <Typography color="textSecondary" fontWeight="500">
                                50
                            </Typography>
                        </FlexBetween>
                        <FlexBetween>
                            <Typography color="textSecondary">Impressions of your post</Typography>
                            <Typography color="textSecondary" fontWeight="500">
                                50
                            </Typography>
                        </FlexBetween>
                    </Box>
                </>
            ) : (
                <Box p="1rem 0">
                    <TextField
                        label="New Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newName}
                        onChange={handleNameChange}
                    />
                    <input
                        type="file"
                        onChange={handlePictureChange}
                        style={{ marginTop: '0.5rem' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: '0.5rem' }}
                    >
                        Save Changes
                    </Button>
                </Box>
            )}

            <Button onClick={onClose} style={{ marginTop: '1rem' }}>Close</Button>
        </Paper>
    );
};

export default UserWidget;
