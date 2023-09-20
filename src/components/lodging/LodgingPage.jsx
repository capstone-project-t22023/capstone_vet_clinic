import React, { useState } from 'react'
import {
    Button, Box, Paper, Grid, Tooltip, Zoom, Stack, Alert, IconButton, Typography
} from '@mui/material';

import { Close, CheckCircle, Engineering, AirlineSeatIndividualSuite, DeleteForeverRounded, AddCircleRounded } from '@mui/icons-material';
import LodgingForm from './LodgingForm';

export default function LodgingPage(props) {

    const [defaultValues, setDefaultValues] = useState({});
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertUpdate, setAlertUpdate] = useState(false);
    const [alertAdd, setAlertAdd] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [mode, setMode] = useState("edit");

    const handleAddForm = (event) => {
        event.preventDefault();
        setOpenAddForm(true);
        setMode("add");
        setDefaultValues({});
    };

    const handleEditForm = (cage_id) => (event) => {
        event.preventDefault();
        setOpenEditForm(true);
        setMode("edit");
        setDefaultValues(props.lodgingCages.filter( x => x.cage_id === cage_id)[0]);
    };

    const handleDeleteCage = (cage_id) => (event) => {
        event.preventDefault();
        fetch("http://localhost/capstone_vet_clinic/api.php/delete_lodging/"+cage_id, {
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
                if(data.delete_lodging){
                    props.setRefreshLodging(true);
                    setAlertDelete(true);
                }

            })
            .catch(error => {
                console.error('Error deleting cage:', error);
            });
    }

    return (
        <div>
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
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={2}>
                        <Tooltip title="Add cage" placement="right" TransitionComponent={Zoom} arrow>
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<AddCircleRounded />}
                                onClick={handleAddForm}
                            >
                                Add Lodging
                            </Button>
                        </Tooltip>
                    </Stack>
                    <Stack justifyContent="space-between"
                        alignItems="center"
                        spacing={5}
                        paddingRight={2}>
                        <Grid container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            justifyContent='center'>

                            {props.lodgingCages.map((cage, index) => (
                                <Grid item sm={1} md={3} key={index}>
                                    <Paper sx={{ textAlign: 'center', padding: 2, border: 1 }} key={"cage_" + index}>
                                        <Box sx={{ width: '100%' }}>
                                            <Stack spacing={2}>
                                                <Typography component={'span'} sx={{ textAlign: 'left' }} variant='subtitle2'><b>Cage ID:</b>&nbsp;{cage.cage_id}</Typography>
                                                <Typography component={'span'} sx={{ textAlign: 'left' }} variant='subtitle2'><b>Pet Name:</b>&nbsp;{cage.petname}</Typography>
                                                <Typography component={'span'} sx={{ textAlign: 'left' }} variant='subtitle2'><b>Doctor:</b>&nbsp;{cage.doctor_name}</Typography>
                                                <Typography component={'span'} sx={{ textAlign: 'left' }} variant='subtitle2'><b>Confinement Date:</b>&nbsp;{cage.confinement_date}</Typography>
                                                <Typography component={'span'} sx={{ textAlign: 'left' }} variant='subtitle2'><b>Comments:</b>&nbsp;{cage.comments}</Typography>
                                            </Stack>
                                        </Box>
                                        <br />
                                        {cage.cage_status === 'AVAILABLE' ?
                                            <Tooltip title="Update cage" placement="right" TransitionComponent={Zoom} arrow>
                                                <Button
                                                    variant="outlined"
                                                    color="success"
                                                    startIcon={<CheckCircle />}
                                                    size="medium"
                                                    onClick={handleEditForm(cage.cage_id)}
                                                    >
                                                    {cage.cage_status}
                                                </Button></Tooltip>
                                            : (cage.cage_status === 'OCCUPIED' ?
                                                <Tooltip title="Update cage" placement="right" TransitionComponent={Zoom} arrow>
                                                    <Button
                                                        variant="outlined"
                                                        color="warning"
                                                        startIcon={<AirlineSeatIndividualSuite />}
                                                        size="medium"
                                                        onClick={handleEditForm(cage.cage_id)}
                                                        >
                                                        {cage.cage_status}
                                                    </Button></Tooltip>
                                                :
                                                <Tooltip title="Update cage" placement="right" TransitionComponent={Zoom} arrow>
                                                    <Button
                                                        variant="outlined"
                                                        color="info"
                                                        startIcon={<Engineering />}
                                                        size="medium"
                                                        onClick={handleEditForm(cage.cage_id)}
                                                        >
                                                        {cage.cage_status}
                                                    </Button></Tooltip>
                                            )}
                                            <Tooltip title="Delete cage" placement="right" TransitionComponent={Zoom} arrow>
                                                <IconButton variant="contained" color="error" onClick={handleDeleteCage(cage.cage_id)}>
                                                    <DeleteForeverRounded fontSize="large" />
                                                </IconButton>
                                            </Tooltip>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Box>
            </Box>
            { openEditForm ? 
                <LodgingForm 
                    defaultValues={defaultValues} 
                    setOpenForm={setOpenEditForm} 
                    openForm={openEditForm}
                    setRefreshLodging={props.setRefreshLodging}
                    mode={mode}
                    setAlertUpdate={setAlertUpdate}
                /> : "" }

            { openAddForm ? 
                <LodgingForm 
                    defaultValues={defaultValues} 
                    setOpenForm={setOpenAddForm} 
                    openForm={openAddForm}
                    setRefreshLodging={props.setRefreshLodging}
                    mode={mode}
                    setAlertAdd={setAlertAdd}
                /> : "" }
        </div>
    )
}
