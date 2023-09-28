import React, { useEffect, useState } from 'react';
import {
    Tooltip, IconButton, Zoom, Paper, CircularProgress, Box, Typography, Badge,
    Table, TableBody, TableContainer, TableHead, TablePagination, TableRow,
    Chip, Alert, Button
} from '@mui/material';
import { EditRounded, DeleteForeverRounded, PriorityHighRounded, ThumbUpAltRounded, Close, AddCircleRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import InventoryForm from './InventoryForm';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        // borderBottom: "1px solid",
        // borderColor:  theme.palette.primary[100],
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary[50],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


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
                <Typography component={'span'} variant="caption" color="text.secondary">
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertUpdate, setAlertUpdate] = useState(false);
    const [alertAdd, setAlertAdd] = useState(false);
    const [mode, setMode] = useState("edit");

    useEffect(() => {
        setInventoryItems(props.inventoryItems);
    }, [props.inventoryItems])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAddForm = (event) => {
        event.preventDefault();
        setOpenAddForm(true);
        setMode("add");
        setDefaultValues({});
    };

    const handleEditForm = (item_id) => (event) => {
        event.preventDefault();
        setOpenEditForm(true);
        setMode("edit");
        setDefaultValues(inventoryItems.filter( x => x.item_id === item_id)[0]);
    };

    const handleDelete = (item_id) => (event) => {
        event.preventDefault();
        fetch("http://localhost/capstone_vet_clinic/api.php/delete_inventory_item/"+item_id, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if(data.delete_inventory_item){
                    props.setRefreshInventory(true);
                    setAlertDelete(true);
                }

            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    return (
        <>
        { alertDelete ? 
        <Alert 
            variant="filled" 
            severity="success"
            action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertDelete(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
            Item has has been deleted successfully!
        </Alert>
      : ""}
      { alertUpdate ? 
            <Alert 
                variant="filled" 
                severity="success"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setAlertUpdate(false);
                    }}
                    >
                    <Close fontSize="inherit" />
                    </IconButton>
                }
                >
                Item has has been updated successfully!
            </Alert>
        : ""}
        { alertAdd ? 
            <Alert 
                variant="filled" 
                severity="success"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setAlertAdd(false);
                    }}
                    >
                    <Close fontSize="inherit" />
                    </IconButton>
                }
                >
                Item has has been added successfully!
            </Alert>
        : ""}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 900 }}>
                <Table stickyHeader aria-label="inventory table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column, idx) => (
                                <StyledTableCell
                                    key={"inv_" + column.id + "_" + idx}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <b>{column.label}</b>
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    <StyledTableRow hover role="checkbox" tabIndex={-1} >
                        <StyledTableCell align="center" colSpan={12} >
                           <Button
                                color="primary"
                                variant='contained'
                                startIcon={<AddCircleRounded />}
                                onClick={handleAddForm}
                            >
                                Add Inventory Item
                            </Button> 
                        </StyledTableCell>
                        
                    </StyledTableRow>
                        {inventoryItems
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, idx) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={"inv_items_" + row.item_id + "_" + idx}>

                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            if (column.id === 'actions') {
                                                return (
                                                    <StyledTableCell key={"inv_items_cell" + column.id + "_" + idx + index} >
                                                        <Tooltip title="Update item" placement="right" TransitionComponent={Zoom} arrow>
                                                            <IconButton variant="contained" color="primary" onClick={handleEditForm(row.item_id)}>
                                                                <EditRounded fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>                                                        
                                                        <Tooltip title="Delete item" placement="left" TransitionComponent={Zoom} arrow>
                                                            <IconButton variant="contained" color="error" onClick={handleDelete(row.item_id)}>
                                                                <DeleteForeverRounded fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </StyledTableCell>
                                                );
                                            } else if (column.id === 'level') {
                                                let stock_level = (row['in_stock_qty'] / row['threshold_qty']) * 100;
                                                return (
                                                    <StyledTableCell key={"inv_items_cell" + column.id + "_" + idx  + index} >
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
                                                    </StyledTableCell>
                                                );
                                            } else if (column.id === 'expiration_date') {
                                                if(dayjs(value) <= dayjs()){
                                                    return (
                                                        <StyledTableCell key={"inv_items_cell" + column.id + "_" + idx  + index} >
                                                            <Badge color="error" badgeContent=" " variant="dot">
                                                                {value}
                                                            </Badge>
                                                        </StyledTableCell>
                                                    );
                                                } else {
                                                    return (
                                                        <StyledTableCell key={"inv_items_cell" + column.id + "_" + idx  + index} >
                                                            {value}
                                                        </StyledTableCell>
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <StyledTableCell key={"inv_items_cell" + column.id + "_" + idx  + index} >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </StyledTableCell>
                                                );
                                            }
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={inventoryItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            { openEditForm ? 
                <InventoryForm 
                    defaultValues={defaultValues} 
                    setOpenForm={setOpenEditForm} 
                    openForm={openEditForm}
                    catName={props.catName}
                    catId={props.catId}
                    setRefreshInventory={props.setRefreshInventory}
                    mode={mode}
                    setAlertUpdate={setAlertUpdate}
                /> : "" }

            { openAddForm ? 
                <InventoryForm 
                    defaultValues={defaultValues} 
                    setOpenForm={setOpenAddForm} 
                    openForm={openAddForm}
                    catName={props.catName}
                    catId={props.catId}
                    setRefreshInventory={props.setRefreshInventory}
                    mode={mode}
                    setAlertAdd={setAlertAdd}
                /> : "" }
        </Paper>
    </>
    );
}