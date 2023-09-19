

import React from 'react';
import {
    Tooltip, IconButton, Zoom, Paper, CircularProgress, Box, Typography, Badge,
    Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material';
import { EditRounded, DeleteForeverRounded, PriorityHighRounded, ThumbUpAltRounded } from '@mui/icons-material';
import dayjs from 'dayjs';

const columns = [
    { id: 'actions', label: 'Actions', minWidth: 110 },
    { id: 'item_id', label: 'Item ID', minWidth: 80 },
    { id: 'item_name', label: 'Item Name', minWidth: 100 },
    {
        id: 'in_use_qty',
        label: 'In Use Quantity',
        minWidth: 60,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'in_stock_qty',
        label: 'In Stock Quantity',
        minWidth: 60,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'threshold_qty',
        label: 'Threshold Quantity',
        minWidth: 60,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'level',
        label: 'Inventory Level',
        minWidth: 50
    },
    {
        id: 'weight_volume',
        label: 'Weight/Volume',
        minWidth: 60,
        format: (value) => value.toFixed(2),
    },
    { id: 'item_unit', label: 'Item Unit', minWidth: 100 },
    { id: 'production_date', label: 'Production Date', minWidth: 100 },
    { id: 'expiration_date', label: 'Expiration Date', minWidth: 110 },
    {
        id: 'unit_price',
        label: 'Unit Price ($AUD)',
        minWidth: 60,
        format: (value) => value.toFixed(2),
    },
];

function InventoryLevel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {props.value >= 100 ?
                        <ThumbUpAltRounded fontSize="small" />
                        :
                        (props.value < 70 && props.value >= 50 ?
                            <PriorityHighRounded fontSize="small" /> :
                            (
                                props.value < 50 && props.value >= 20 ?
                                <PriorityHighRounded fontSize="small" /> :
                                    <PriorityHighRounded fontSize="small" />
                            )
                        )
                    }
                </Typography>
            </Box>
        </Box>
    );
}
export default function InventoryTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [inventoryItems, setInventoryItems] = React.useState(props.inventoryItems);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 900 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <b>{column.label}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventoryItems
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, idx) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.item_id}>

                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'actions') {
                                                return (
                                                    <TableCell key={column.id} >
                                                        <Tooltip title="Update details" placement="right" TransitionComponent={Zoom} arrow>
                                                            <IconButton variant="contained" color="primary" >
                                                                <EditRounded fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>                                                        
                                                        <Tooltip title="Delete forever" placement="left" TransitionComponent={Zoom} arrow>
                                                            <IconButton color="error" >
                                                                <DeleteForeverRounded fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                );
                                            } else if (column.id === 'level') {
                                                let stock_level = (row['in_stock_qty'] / row['threshold_qty']) * 100;
                                                return (
                                                    <TableCell key={column.id} >
                                                        {stock_level >= 100 ?
                                                            <InventoryLevel color="success" value={100} />
                                                            :
                                                            (stock_level < 70 && stock_level >= 50 ?
                                                                <InventoryLevel color="warning" value={stock_level} /> :
                                                                (
                                                                    stock_level < 50 && stock_level >= 20 ?
                                                                        <InventoryLevel color="warning" value={stock_level} /> :
                                                                        <InventoryLevel color="error" value={stock_level} />
                                                                )
                                                            )
                                                        }
                                                    </TableCell>
                                                );
                                            } else if (column.id === 'expiration_date') {
                                                if(dayjs(value) <= dayjs()){
                                                    return (
                                                        <TableCell key={column.id} >
                                                            <Badge color="error" badgeContent=" " variant="dot">
                                                                {value}
                                                            </Badge>
                                                        </TableCell>
                                                    );
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} >
                                                            {value}
                                                        </TableCell>
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <TableCell key={column.id} >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={inventoryItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    );
}

