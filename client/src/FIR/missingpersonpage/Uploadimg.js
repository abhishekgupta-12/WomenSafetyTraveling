import React, { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function Uploadimg() {
    const [file, setFile] = useState();

    function handleChange(e) {
        if (e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Add Image
            </Typography>
            <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={handleChange}
            />
            <label htmlFor="file-input">
                <IconButton component="span" color="primary">
                    <PhotoCameraIcon />
                </IconButton>
            </label>
            {file && (
                <Box sx={{ mt: 2 }}>
                    <img src={file} alt="Uploaded preview" width="250px" />
                </Box>
            )}
        </Box>
    );
}

export default Uploadimg;
