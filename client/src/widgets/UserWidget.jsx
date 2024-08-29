import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Avatar, Box, TextField, Button, IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FlexBetween from '../components/FlexBetween';
import { jwtDecode } from 'jwt-decode';
import { updateUser } from '../api'; // Import the updateUser function
import { UPDATE_USER } from '../constants/actionTypes'; // Import the action type for user update

const UserWidget = ({ onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPicture, setNewPicture] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const modalRef = useRef(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const numberOfPosts = useSelector((state) => state.posts.length);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNameChange = (e) => setNewName(e.target.value);
    const handlePictureChange = (e) => setNewPicture(e.target.files[0]);
    const defaultAvatar = '/path/to/defaultAvatar.png';

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        if (newName) formData.append('name', newName);
        if (newPicture) formData.append('picture', newPicture);

        try {
            const response = await updateUser(user.result._id, formData);

            // Log the response data to check the structure
            console.log('Updated Profile:', response.data);

            // Update local storage and Redux store
            const updatedProfile = { ...user, result: { ...user.result, ...response.data } };
            localStorage.setItem('profile', JSON.stringify(updatedProfile));
            dispatch({ type: UPDATE_USER, data: response.data });

            // Update component state with the new user data
            setUser(updatedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [user?.token, navigate]);

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

    return (
        <Paper style={{ padding: '1rem', position: 'absolute', top: '60px', right: '20px', width: '250px', zIndex: 10, border: "black solid 0.1rem" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    src={user?.result?.picturePath ? `/images/${user.result.picturePath}` : defaultAvatar}
                    alt={user?.result?.name || 'User Avatar'}
                    style={{
                        marginRight: '1rem',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        transform: isClicked ? 'scale(1)' : 'scale(1)', // Scale is handled by modal
                    }}
                    onClick={handleAvatarClick}
                >
                    {!user?.result?.picturePath && user?.result?.name?.charAt(0)}
                </Avatar>
                {isClicked && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-content" ref={modalRef}>
                            <img
                                src={user?.result?.picturePath ? `/images/${user.result.picturePath}` : defaultAvatar}
                                alt={user?.result?.name || 'User Avatar'}
                                className="modal-image"
                            />
                        </div>
                    </div>
                )}
                <Typography variant="h6">{user?.result?.name || 'User'}</Typography>
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

            <Button onClick={logout} style={{ marginTop: '0.5rem', color: "red" }}>
                <LogoutIcon />
            </Button>
        </Paper>
    );
};

export default UserWidget;
