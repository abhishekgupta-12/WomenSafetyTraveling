import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import NavbarPolice from '../NavbarPolice';

export default function Firpage() {
    const navigate = useNavigate();

    const [logdata, setdata] = useState({
        State: "",
        District: "",
        PoliceStation: "",
        FIRno: "",
        Date: "",
        Acts: "",
        OccurenceDay: "",
        OccurenceDate: "",
        OccurenceTime: "",
        InformationReceivedDate: "",
        InformationReceivedDay: "",
        InformationReceivedTime: "",
        DiaryReferenceEntryNo: "",
        DiaryReferenceTime: "",
        DirectionAndDistancefromPS: "",
        BeatNo: "",
        Address: "",
        ComplainantName: "",
        ComplainantFatherorHusbandName: "",
        ComplainantDateOfBirth: "",
        ComplainantNationality: "",
        ComplainantOccupation: "",
        ComplainantPassportNo: "",
        ComplainantDateofIssue: "",
        ComplainantPlaceOfIssue: "",
        ComplainantAddress: "",
        DetailsOfSuspected: "",
        cadre: "",
        ReasonsforDelay: "",
        ParticularsOfPropertiesStolenInvolved: "",
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setdata({
            ...logdata,
            [name]: value
        });
    }

    const senddata = async (e) => {
        e.preventDefault();
        const { State, District, PoliceStation, FIRno, Date, Acts, OccurenceDay, OccurenceDate, OccurenceTime, InformationReceivedDate, InformationReceivedDay, InformationReceivedTime, DiaryReferenceEntryNo, DiaryReferenceTime, DirectionAndDistancefromPS, BeatNo, Address, ComplainantName, ComplainantFatherorHusbandName, ComplainantDateOfBirth, ComplainantNationality, ComplainantOccupation, ComplainantPassportNo, ComplainantDateofIssue, ComplainantPlaceOfIssue, ComplainantAddress, DetailsOfSuspected, cadre, ReasonsforDelay, ParticularsOfPropertiesStolenInvolved } = logdata;
        const res = await fetch("https://walk-safe-server.onrender.com/api/police/registerfir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                State, District, PoliceStation, FIRno, Date, Acts, OccurenceDay, OccurenceDate, OccurenceTime, InformationReceivedDate, InformationReceivedDay, InformationReceivedTime, DiaryReferenceEntryNo, DiaryReferenceTime, DirectionAndDistancefromPS, BeatNo, Address, ComplainantName, ComplainantFatherorHusbandName, ComplainantDateOfBirth, ComplainantNationality, ComplainantOccupation, ComplainantPassportNo, ComplainantDateofIssue, ComplainantPlaceOfIssue, ComplainantAddress, DetailsOfSuspected, cadre, ReasonsforDelay, ParticularsOfPropertiesStolenInvolved,
            })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            console.error("Invalid details");
        } else {
            console.log("Data valid");
            setdata({
                State: "",
                District: "",
                PoliceStation: "",
                FIRno: "",
                Date: "",
                Acts: "",
                OccurenceDay: "",
                OccurenceDate: "",
                OccurenceTime: "",
                InformationReceivedDate: "",
                InformationReceivedDay: "",
                InformationReceivedTime: "",
                DiaryReferenceEntryNo: "",
                DiaryReferenceTime: "",
                DirectionAndDistancefromPS: "",
                BeatNo: "",
                Address: "",
                ComplainantName: "",
                ComplainantFatherorHusbandName: "",
                ComplainantDateOfBirth: "",
                ComplainantNationality: "",
                ComplainantOccupation: "",
                ComplainantPassportNo: "",
                ComplainantDateofIssue: "",
                ComplainantPlaceOfIssue: "",
                ComplainantAddress: "",
                DetailsOfSuspected: "",
                cadre: "",
                ReasonsforDelay: "",
                ParticularsOfPropertiesStolenInvolved: "",
            });
            navigate("/");
        }
    }

    return (
        <div style={{ width: '100%', height: '100%', backdropFilter: 'blur(8px)' }}>
            <NavbarPolice />
            <Container component="main" maxWidth="md">
                <Paper elevation={3} style={{ padding: '24px', marginTop: '16px' }}>
                    <Typography variant="h4" align="center">F.I.R.</Typography>
                    <form noValidate onSubmit={senddata}>
                        <Grid container spacing={3} marginTop={2}>
                            {Object.keys(logdata).map((key) => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <TextField
                                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name={key}
                                        value={logdata[key]}
                                        onChange={adddata}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}
