import React, {useContext, useEffect, useState} from 'react';
import {
    Tooltip, IconButton, Zoom, Paper, CircularProgress, Box, Typography, Badge,
    Table, TableBody, TableContainer, TableHead, TablePagination, TableRow,
    Chip, Alert, Dialog
} from '@mui/material';
import {
    EditRounded,
    DeleteForeverRounded,
    PriorityHighRounded,
    ThumbUpAltRounded,
    Close,
    AddCircleRounded
} from '@mui/icons-material';
import EditUserForm from "../user/EditUserForm";
import SignupForm from "../authorization/SignupForm";
import ProgramContext from "../../contexts/ProgramContext";
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import NewUserForm from './NewUserForm';

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

    {id: 'actions', label: 'Actions', minWidth: 110},
    {id: 'id', label: 'ID', minWidth: 80},
    {id: 'firstname', label: 'First Name', minWidth: 100},
    {id: 'lastname', label: 'Last Name', minWidth: 100},
    {id: 'username', label: 'User Name', minWidth: 100},
    {id: 'address', label: 'Address', minWidth: 100},
    {id: 'state', label: 'State', minWidth: 100},
    {id: 'email', label: 'Email', minWidth: 100},
    {id: 'phone', label: 'Phone', minWidth: 100},
    {id: 'postcode', label: 'PostCode', minWidth: 100},
    {id: 'updated_date', label: 'Updated', minWidth: 100},
];

function ListLevel(props) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
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
                        <ThumbUpAltRounded fontSize="small"/>
                        :
                        (props.value < 70 && props.value >= 50 ?
                                <PriorityHighRounded fontSize="small"/> :
                                (
                                    props.value < 50 && props.value >= 20 ?
                                        <PriorityHighRounded fontSize="small"/> :
                                        <PriorityHighRounded fontSize="small"/>
                                )
                        )
                    }
                </Typography>
            </Box>
        </Box>
    );
}

export default function UsersTable(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertUpdate, setAlertUpdate] = useState(false);
    const [alertAdd, setAlertAdd] = useState(false);
    const [mode, setMode] = useState("edit");
    const [refreshList, setRefreshList] = useState(false);


    const [usersList, setUsersList] = useState([])
    const {user} = useContext(ProgramContext)


    const fetchUsers = (users) => {

        let url = '';

        users === 0 ? url = 'http://localhost/capstone_vet_clinic/api.php/get_all_doctors' :
            users === 1 ? url = 'http://localhost/capstone_vet_clinic/api.php/get_all_pet_owners' :
                console.error("Invalid users value", users);


        if (users === 0 || users === 1) {

            fetch(url, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then((data) => {
                    let userList;

                    if (users === 0) {   // doctors
                        userList = data.doctors;
                    } else if (users === 1) {  // pet_owners
                        userList = data.pet_owners;
                    }

                    if (userList) {
                        setUsersList(userList);
                    }
                })
                .catch(error => {
                    console.error('Error getting in inventory:', error);
                });
        }


    }

    useEffect(() => {
        console.log("REFRESHHH")
        fetchUsers(props.usersListType);
        setRefreshList(false);
    }, [refreshList])


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

    const handleEditForm = (id) => (event) => {
        event.preventDefault();
        setOpenEditForm(true);
        setMode("edit");
        setDefaultValues(usersList.filter(x => x.id === id)[0]);
    };

    const handleDelete = (id) => (event) => {
        event.preventDefault();

        let url = '';

        props.usersListType === 0 ? url = `http://localhost/capstone_vet_clinic/api.php/delete_doctor/${id}}` :
            props.usersListType === 1 ? url = `http://localhost/capstone_vet_clinic/api.php/delete_pet_owner/${id}` :
                console.error("Invalid users value", props.usersListType);

        console.log(url, JSON.stringify({
            username: user.username,
        }));

        if (props.usersListType === 0 || props.usersListType === 1) {

            fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    username: user.username,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    if (data.delete_pet_owner || data.delete_doctor) {
                        props.setRefreshList(true);
                        setAlertDelete(true);
                    }

                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        }
    }

    const handleCancel = () => {
        setDefaultValues({})
        setOpenAddForm(false);
        setOpenEditForm(false);
    }

    const handleUpdatedUser = (data) => {
        console.log(data);
        setAlertUpdate(true);
    }


    return (
        <>
            {alertDelete ?
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
                            <Close fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    Item has has been deleted successfully!
                </Alert>
                : ""}
            {alertUpdate ?
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
                            <Close fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    Item has has been updated successfully!
                </Alert>
                : ""}
            {alertAdd ?
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
                            <Close fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    User has has been added successfully!
                </Alert>
                : ""}
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 900}}>
                    <Table stickyHeader aria-label="inventory table">
                        <TableHead>
                            <StyledTableRow>
                                {columns.map((column, idx) => (
                                    <StyledTableCell
                                        key={"inv_" + column.id + "_" + idx}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        <b>{column.label}</b>
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow hover role="checkbox" tabIndex={-1}>
                                <StyledTableCell align="center" colSpan={12}>
                                    <Chip
                                        label="New User"
                                        color="primary"
                                        icon={<AddCircleRounded sx={{fontSize: '25px'}}/>}
                                        onClick={handleAddForm}
                                    />
                                </StyledTableCell>

                            </StyledTableRow>
                            {usersList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, idx) => {
                                    return (
                                        <StyledTableRow hover role="checkbox" tabIndex={-1}
                                                  key={"inv_items_" + row.id + "_" + idx}>

                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                if (column.id === 'actions') {
                                                    return (
                                                        <StyledTableCell
                                                            key={"inv_items_cell" + column.id + "_" + idx + index}>
                                                            <Tooltip title="Update user" placement="right"
                                                                     TransitionComponent={Zoom} arrow>
                                                                <IconButton variant="contained" color="primary"
                                                                            onClick={handleEditForm(row.id)}>
                                                                    <EditRounded fontSize="small"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete user" placement="left"
                                                                     TransitionComponent={Zoom} arrow>
                                                                <IconButton variant="contained" color="error"
                                                                            onClick={handleDelete(row.id)}>
                                                                    <DeleteForeverRounded fontSize="small"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </StyledTableCell>
                                                    );
                                                } else {
                                                    return (
                                                        <StyledTableCell
                                                            key={"inv_items_cell" + column.id + "_" + idx + index}>
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
                    count={usersList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                {openEditForm ?
                    <Dialog open={openEditForm} onClose={handleCancel}>
                        <Box sx={{p: 2}}>
                            <EditUserForm user={defaultValues} onUpdateUser={handleUpdatedUser} userRole={props.usersListType === 0 ? "doctor" : props.usersListType === 1 ? "pet_owner" : "" }/>
                        </Box>
                    </Dialog>

                    : ""}

                {openAddForm ?
                    <Dialog open={openAddForm} onClose={handleCancel}>
                        <Box sx={{p: 2}}>
                            <NewUserForm setRefreshList={setRefreshList} setOpenAddForm={setOpenAddForm} setAlertAdd={setAlertAdd}/>
                        </Box>
                    </Dialog> : ""}
            </Paper>
        </>
    );
}