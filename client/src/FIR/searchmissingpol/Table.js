import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const CustomTable = ({ data }) => {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '2rem', color: '#000' }}>
        MISSING PERSON DETAILS
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        <Table>
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
              <TableRow key={item.id} style={{ color: item.found ? 'green' : 'red' }}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.place}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.aadhar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
