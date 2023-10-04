import React, { useEffect, useState } from 'react';
import {
    Tooltip, IconButton, Zoom, Paper, CircularProgress, Box, Typography, Badge,
    Table, TableBody, TableContainer, TableHead, TablePagination, TableRow,
    Chip, Alert, Button
} from '@mui/material';
import { EditRounded, DeleteForeverRounded, PriorityHighRounded, ThumbUpAltRounded, Close, AddCircleRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import UserForm from './UserForm';
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
    { id: 'user_id', label: 'User ID', minWidth: 80 },
    { id: 'firstname', label: 'First Name', minWidth: 100 },
    { id: 'lastname', label: 'Last Name', minWidth: 100 },
    { id: 'username', label: 'UserName', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'state', label: 'State', minWidth: 80 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'postcode', label: 'Postcode', minWidth: 80 }
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

export default function ManageUsers(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertUpdate, setAlertUpdate] = useState(false);
    const [alertAdd, setAlertAdd] = useState(false);
    const [mode, setMode] = useState("edit");

    useEffect(() => {
        setUsers(props.users);
    }, [props.users])

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

    const handleEditForm = (user_id) => (event) => {
        event.preventDefault();
        setOpenEditForm(true);
        setMode("edit");
        setDefaultValues(users.filter( x => x.id === user_id)[0]);
    };

    const handleDelete = (user_id) => (event) => {
        event.preventDefault();
        let user_record = users.filter(x => x.id === user_id)[0];

        if(user_record.role === 'admin'){
            fetch("http://localhost/capstone_vet_clinic/api.php/delete_admin/"+user_id, {
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
                if(data.delete_admin){
                    props.setRefreshUsers(true);
                    setAlertDelete(true);
                }

            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
        } else if (user_record.role === 'doctor'){
            fetch("http://localhost/capstone_vet_clinic/api.php/delete_doctor/"+user_id, {
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
                if(data.delete_doctor){
                    props.setRefreshUsers(true);
                    setAlertDelete(true);
                }

            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
        } else {
            fetch("http://localhost/capstone_vet_clinic/api.php/delete_pet_owner/"+user_id, {
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
                if(data.delete_pet_owner){
                    props.setRefreshUsers(true);
                    setAlertDelete(true);
                }

            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        } 
        
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
            User has has been deleted successfully!
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
                User has has been updated successfully!
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
                User has has been added successfully!
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
                                Add User
                            </Button> 
                        </StyledTableCell>
                        
                    </StyledTableRow>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, idx) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={"inv_items_" + row.id + "_" + idx}>

                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            if (column.id === 'actions') {
                                                return (
                                                    <StyledTableCell key={"inv_items_cell" + column.id + "_" + idx + index} >
                                                        <Tooltip title="Update user" placement="right" TransitionComponent={Zoom} arrow>
                                                            <IconButton variant="contained" color="primary" onClick={handleEditForm(row.id)}>
                                                                <EditRounded fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>                                                        
                                                        <Tooltip title="Delete user" placement="left" TransitionComponent={Zoom} arrow>
                                                            <IconButton variant="contained" color="error" onClick={handleDelete(row.id)}>
                                                                <DeleteForeverRounded fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </StyledTableCell>
                                                );
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            { openEditForm ? 
                <UserForm 
                    defaultValues={defaultValues} 
                    setOpenForm={setOpenEditForm} 
                    openForm={openEditForm}
                    setRefreshUsers={props.setRefreshUsers}
                    mode={mode}
                    setAlertUpdate={setAlertUpdate}
                /> : "" }

            { openAddForm ? 
                <UserForm 
                    defaultValues={defaultValues} 
                    setOpenForm={setOpenAddForm} 
                    openForm={openAddForm}
                    setRefreshUsers={props.setRefreshUsers}
                    mode={mode}
                    setAlertAdd={setAlertAdd}
                /> : "" }
        </Paper>
    </>
    );
}