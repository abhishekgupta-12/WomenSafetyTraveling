import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, TextField, Button, Typography } from '@mui/material';

const TableComponent = ({ data }) => {
    const [dataCadre, setDataCadre] = useState(data.cadre);

    const changeCadre = async () => {
        try {
            const response = await fetch(`https://walk-safe-server.onrender.com/api/police/updateCadre/${data._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cadre: dataCadre })
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error updating cadre:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" align="center" gutterBottom>
                F.I.R. DETAILS
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>State</TableCell>
                        <TableCell>District</TableCell>
                        <TableCell>Police Station</TableCell>
                        <TableCell>FIRno</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Acts</TableCell>
                        <TableCell>OccurenceDay</TableCell>
                        <TableCell>OccurenceDate</TableCell>
                        <TableCell>OccurenceTime</TableCell>
                        <TableCell>InformationReceivedDate</TableCell>
                        <TableCell>InformationReceivedDay</TableCell>
                        <TableCell>InformationReceivedTime</TableCell>
                        <TableCell>DiaryReferenceEntryNo</TableCell>
                        <TableCell>DiaryReferenceTime</TableCell>
                        <TableCell>DirectionAndDistancefromPS</TableCell>
                        <TableCell>BeatNo</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>ComplainantName</TableCell>
                        <TableCell>ComplainantFatherorHusbandName</TableCell>
                        <TableCell>ComplainantDateOfBirth</TableCell>
                        <TableCell>ComplainantNationality</TableCell>
                        <TableCell>ComplainantOccupation</TableCell>
                        <TableCell>ComplainantPassportNo</TableCell>
                        <TableCell>ComplainantDateofIssue</TableCell>
                        <TableCell>ComplainantPlaceOfIssue</TableCell>
                        <TableCell>ComplainantAddress</TableCell>
                        <TableCell>DetailsOfSuspected</TableCell>
                        <TableCell>Cadre</TableCell>
                        <TableCell>ReasonsforDelay</TableCell>
                        <TableCell>ParticularsOfPropertiesStolenInvolved</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
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
                        <TableCell>
                            <TextField
                                value={dataCadre}
                                onChange={(e) => setDataCadre(e.target.value)}
                                variant="outlined"
                                size="small"
                                sx={{ width: '100px' }}
                            />
                            <Button
                                onClick={changeCadre}
                                variant="contained"
                                color="primary"
                                sx={{ mt: 1 }}
                            >
                                Update
                            </Button>
                        </TableCell>
                        <TableCell>{data.ReasonsforDelay}</TableCell>
                        <TableCell>{data.ParticularsOfPropertiesStolenInvolved}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableComponent;
