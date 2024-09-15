import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import axios from 'axios'; // Import axios to make HTTP requests

const HelpWidget = () => {
    const EMERGENCY_NUMBER = "9142946180"; // Replace with the emergency number

    const handleHelpClick = () => {
        // Send live location and help message
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                // Send the location and message to the backend
                axios.post('http://localhost:5000/message/send-location-sms', { 
                    to: EMERGENCY_NUMBER, 
                    latitude, 
                    longitude,
                    message: "I need help" // Include help message
                })
                .then(response => {
                    alert('Location and message sent successfully!');

                    // Initiate a phone call after location and message are sent
                    window.location.href = `tel:${EMERGENCY_NUMBER}`;
                })
                .catch(error => {
                    console.error('Error sending location and message:', error);
                    alert('Failed to send location and message. Initiating call without them.');

                    // Make the call even if sending location and message fails
                    window.location.href = `tel:${EMERGENCY_NUMBER}`;
                });

            }, () => {
                alert("Unable to retrieve your location. Initiating call without location and message.");

                // Make the call even if location retrieval fails
                window.location.href = `tel:${EMERGENCY_NUMBER}`;
            });
        } else {
            alert("Geolocation is not supported by your browser. Initiating call without location and message.");

            // Make the call if geolocation is not supported
            window.location.href = `tel:${EMERGENCY_NUMBER}`;
        }
    };

    return (
        <Paper
            sx={{
                position: 'fixed',
                top: '120px', // Reduced height from the top
                right: 220,
                right:{ xs: 20, sm: 30 },
                width: { xs: '90%', sm: '250px' }, // Responsive width   
                maxWidth: '350px', // Max width to prevent it from being too wide
                zIndex: 10,   
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    boxShadow: 3,
                    height:'180%',
                }}
            >
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        Emergency Assistance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Press the button below to call for help, send your live location, and a message to the emergency contact.
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleHelpClick}
                        sx={{ marginTop: 2, width: '100%' }} // Full width button
                    >
                        Help
                    </Button>
                </CardContent>
            </Card>
        </Paper>
    );
};

export default HelpWidget;
