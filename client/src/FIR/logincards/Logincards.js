import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

function Logincards() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       
        justifyContent: 'start', // Center vertically
        minHeight: '80vh', // Full height
        bgcolor: 'background.paper',
        padding: 2,
        backgroundImage: 'url("http://wallpapercave.com/wp/pRixWbg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          paddingTop:"7rem",
          flexWrap: 'wrap',
          justifyContent: 'start', // Center horizontally
          mt: 2,
        }}
      >
        {/* User Card */}
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 3,
           
            backdropFilter: 'blur(5px)',
            transition: 'transform 0.3s ease-in-out, top 0.3s ease-in-out', // Add smooth transition
            position: 'relative', // To allow top movement
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background for card
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image="https://tse1.mm.bing.net/th?id=OIP.xLgSfiPI8kldpAdWxFL3NwHaGU&pid=Api&P=0&h=220"
            alt="User"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              USER
            </Typography>
            <NavLink to="users/login/">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  transition: 'background-color 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'green', // Change button color to green on hover
                  },
                }}
              >
                User Login
              </Button>
            </NavLink>
          </CardContent>
        </Card>

        {/* Police Card */}
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 3,
            backdropFilter: 'blur(5px)',
            transition: 'transform 0.3s ease-in-out, top 0.3s ease-in-out', // Add smooth transition
            position: 'relative', // To allow top movement
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background for card
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image="https://tse2.mm.bing.net/th?id=OIP.rCizXZY15dns8yqK3ILgwwHaHt&pid=Api&P=0&h=220"
            alt="Police"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              POLICE
            </Typography>
            <NavLink to="police/login/">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  transition: 'background-color 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'green', // Change button color to green on hover
                  },
                }}
              >
                Police Login
              </Button>
            </NavLink>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Logincards;