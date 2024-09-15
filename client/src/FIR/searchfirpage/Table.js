import React from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Table = ({ data }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: '2rem', padding: '1rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                F.I.R. DETAILS
            </Typography>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        <TableCell>State</TableCell>
                        <TableCell>District</TableCell>
                        <TableCell>Police Station</TableCell>
                        <TableCell>FIRno</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Acts</TableCell>
                        <TableCell>Occurrence Day</TableCell>
                        <TableCell>Occurrence Date</TableCell>
                        <TableCell>Occurrence Time</TableCell>
                        <TableCell>Information Received Date</TableCell>
                        <TableCell>Information Received Day</TableCell>
                        <TableCell>Information Received Time</TableCell>
                        <TableCell>Diary Reference Entry No</TableCell>
                        <TableCell>Diary Reference Time</TableCell>
                        <TableCell>Direction and Distance from PS</TableCell>
                        <TableCell>Beat No</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Complainant Name</TableCell>
                        <TableCell>Complainant Father or Husband Name</TableCell>
                        <TableCell>Complainant Date of Birth</TableCell>
                        <TableCell>Complainant Nationality</TableCell>
                        <TableCell>Complainant Occupation</TableCell>
                        <TableCell>Complainant Passport No</TableCell>
                        <TableCell>Complainant Date of Issue</TableCell>
                        <TableCell>Complainant Place of Issue</TableCell>
                        <TableCell>Complainant Address</TableCell>
                        <TableCell>Details of Suspected</TableCell>
                        <TableCell>Cadre</TableCell>
                        <TableCell>Reasons for Delay</TableCell>
                        <TableCell>Particulars of Properties Stolen/Involved</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && (
                        <TableRow key={data.id}>
                            <TableCell>{data.State}</TableCell>
                            <TableCell>{data.District}</TableCell>
                            <TableCell>{data.PoliceStation}</TableCell>
                            <TableCell>{data.FIRno}</TableCell>
                            <TableCell>{data.Date}</TableCell>
                            <TableCell>{data.Acts}</TableCell>
                            <TableCell>{data.OccurenceDay}</TableCell>
                            <TableCell>{data.OccurenceDate}</TableCell>
                            <TableCell>{data.OccurenceTime}</TableCell>
                            <TableCell>{data.InformationReceivedDate}</TableCell>
                            <TableCell>{data.InformationReceivedDay}</TableCell>
                            <TableCell>{data.InformationReceivedTime}</TableCell>
                            <TableCell>{data.DiaryReferenceEntryNo}</TableCell>
                            <TableCell>{data.DiaryReferenceTime}</TableCell>
                            <TableCell>{data.DirectionAndDistancefromPS}</TableCell>
                            <TableCell>{data.BeatNo}</TableCell>
                            <TableCell>{data.Address}</TableCell>
                            <TableCell>{data.ComplainantName}</TableCell>
                            <TableCell>{data.ComplainantFatherorHusbandName}</TableCell>
                            <TableCell>{data.ComplainantDateOfBirth}</TableCell>
                            <TableCell>{data.ComplainantNationality}</TableCell>
                            <TableCell>{data.ComplainantOccupation}</TableCell>
                            <TableCell>{data.ComplainantPassportNo}</TableCell>
                            <TableCell>{data.ComplainantDateofIssue}</TableCell>
                            <TableCell>{data.ComplainantPlaceOfIssue}</TableCell>
                            <TableCell>{data.ComplainantAddress}</TableCell>
                            <TableCell>{data.DetailsOfSuspected}</TableCell>
                            <TableCell>{data.cadre}</TableCell>
                            <TableCell>{data.ReasonsforDelay}</TableCell>
                            <TableCell>{data.ParticularsOfPropertiesStolenInvolved}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
