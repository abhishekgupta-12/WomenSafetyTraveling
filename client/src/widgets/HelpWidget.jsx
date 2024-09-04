import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Paper } from "@material-ui/core";
import axios from 'axios'; // Import axios to make HTTP requests

const HelpWidget = () => {
    const EMERGENCY_NUMBER = "9142946180"; // Replace with the emergency number

    const handleHelpClick = () => {
        // Send live location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                // Send the location to the backend
                axios.post('http://localhost:5000/message/send-location-sms', { 
                    to: EMERGENCY_NUMBER, 
                    latitude, 
                    longitude 
                })
                .then(response => {
                    alert('Location sent successfully!');

                    // Initiate a phone call after location is sent
                    window.location.href = `tel:${EMERGENCY_NUMBER}`;
                })
                .catch(error => {
                    console.error('Error sending location:', error);
                    alert('Failed to send location. Initiating call without location.');

                    // Make the call even if location sending fails
                    window.location.href = `tel:${EMERGENCY_NUMBER}`;
                });

            }, () => {
                alert("Unable to retrieve your location. Initiating call without location.");

                // Make the call even if location retrieval fails
                window.location.href = `tel:${EMERGENCY_NUMBER}`;
            });
        } else {
            alert("Geolocation is not supported by your browser. Initiating call without location.");

            // Make the call if geolocation is not supported
            window.location.href = `tel:${EMERGENCY_NUMBER}`;
        }
    };

    return (
        <Paper style={{ position: 'absolute', top: '60px', right: '200px', width: '250px', zIndex: 10 }}>
            <Card sx={{ maxWidth: 345, padding: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Emergency Assistance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Press the button below to call for help and send your live location to
                        the emergency contact.
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleHelpClick}
                        sx={{ marginTop: 2 }}
                    >
                        Help
                    </Button>
                </CardContent>
            </Card>
        </Paper>
    );
};

export default HelpWidget;
