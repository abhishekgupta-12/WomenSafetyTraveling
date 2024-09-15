import React from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Table = ({ data }) => {
    return (
        <div>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                MISSING PERSON DETAILS
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <MuiTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Place</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Aadhar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} sx={{ color: item.found ? 'green' : 'red' }}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.age}</TableCell>
                                <TableCell>{item.place}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.aadhar}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </div>
    );
};

export default Table;
