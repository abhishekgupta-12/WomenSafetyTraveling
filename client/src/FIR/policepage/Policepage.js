import React from 'react';
import { Box } from '@mui/material';
import NavbarPolice from '../NavbarPolice';

export default function Policepage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'rgba(128, 128, 128, 0.2)', // Light gray with opacity
                backdropFilter: 'blur(5px)', // Blurring effect
                backgroundImage: 'url("./firstpgimg1.png")',
                backgroundPosition: 'right',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <NavbarPolice />
        </Box>
    );
}
