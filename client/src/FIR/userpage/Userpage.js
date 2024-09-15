import React from 'react';
import { Container, Box } from '@mui/material';
import NavbarUser from '../NavbarUser';

export default function Userpage() {
    return (
        <Container
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#9E9E9E', // Gray color to replace Tailwind's bg-gray-400
                backdropFilter: 'blur(5px)', // Equivalent to backdrop-blur-sm
                backgroundImage: 'url(/path/to/your/image.png)', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
            }}
        >
            <NavbarUser />
            {/* Add additional content or components here */}
        </Container>
    );
}
