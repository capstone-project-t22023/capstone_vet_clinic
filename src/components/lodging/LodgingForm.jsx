import React, { useEffect, useState, useContext } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, Checkbox,
    DialogTitle, Slide, TextField, Grid, Chip, Select, MenuItem, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {PetsContext} from "../../contexts/PetsProvider";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const cage_stat = [
    { value: "AVAILABLE", label: "AVAILABLE"},
    { value: "OCCUPIED", label: "OCCUPIED"},
    { value: "MAINTENANCE", label: "MAINTENANCE"}
];

export default function LodgingForm(props) {
    const {petList, allDoctors} = useContext(PetsContext);
    const [openForm, setOpenForm] = useState(props.openForm);
    const [cageId, setCageId] = useState(0);
    const [cageStatus, setCageStatus] = useState("AVAILABLE");
    const [petId, setPetId] = useState(0);
    const [assignedDoctor, setAssignedDoctor] = useState(0);
    const [confinementDate, setConfinementDate] = useState(dayjs());
    const [comments, setComments] = useState("");
    const [errors, setErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(true);
    const [mode, setMode] = useState("add");
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        
        if (props.mode === 'edit') {
            setMode(props.mode);
            setCageId(props.defaultValues.cage_id);
            setCageStatus(props.defaultValues.cage_status ? props.defaultValues.cage_status : "AVAILABLE");
            setPetId(props.defaultValues.pet_id ? props.defaultValues.pet_id : 0);
            setAssignedDoctor(props.defaultValues.doctor_id ? props.defaultValues.doctor_id : 0);
            setConfinementDate(props.defaultValues.confinement_date ? dayjs(props.defaultValues.confinement_date, "DD-MM-YYYY") : dayjs());
            setComments(props.defaultValues.comments);
        }
    }, [props.defaultValues, props.mode])

    const handleAdd = (event) => {
        event.preventDefault();
        let tmp_err = {};
        let allow = true;
        setErrors({});

        if (!cageStatus) {
            tmp_err.cage_status = "Required field";
            allow = false;
        } else if (!/^[ A-Za-z]*$/.test(cageStatus)) {
            tmp_err.cage_status = "Only accepts letters";
            allow = false;
        }

        if (!/^[0-9]+$/.test(petId)) {
            tmp_err.pet_id = "Please select a valid value";
            allow = false;
        }

        if (!/^[0-9]+$/.test(assignedDoctor)) {
            tmp_err.assigned_doctor = "Please select a valid value";
            allow = false;
        }

        if (!/^[ A-Za-z0-9_./()&+-]*$/.test(comments)) {
            tmp_err.comments = "Only accepts letters, numbers, and special characters (_./()&+-)";
            allow = false;
        }

        if (!(dayjs(confinementDate, 'DD-MM-YYYY', true).isValid())) {
            tmp_err.confine_date = "Only accepts valid dates";
            allow = false;
        }

        if (allow) {
            let data = {};

            if(!available){
                data.cage_status = cageStatus;
                data.pet_id = petId;
                data.assigned_doctor = assignedDoctor;
                data.comments = comments;
                data.confinement_date = dayjs(confinementDate).format('DD-MM-YYYY');
            } else {
                data.cage_status = cageStatus;
                data.comments = comments;
            }

            console.log("data", data);
            fetch("http://localhost/capstone_vet_clinic/api.php/add_lodging", {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    if (data.add_lodging) {
                        setCageId(data.add_lodging);
                        props.setRefreshLodging(true);
                        props.setAlertAdd(true);
                        props.setOpenForm(false);
                    }
                })
                .catch(error => {
                    console.error('Error adding lodging item:', error);
                });
        } else {
            setErrors(tmp_err)
            setCanSubmit(allow);
        };
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        let tmp_err = {};
        let allow = true;
        setErrors({});

        if (!cageStatus) {
            tmp_err.cage_status = "Required field";
            allow = false;
        } else if (!/^[ A-Za-z]*$/.test(cageStatus)) {
            tmp_err.cage_status = "Only accepts letters";
            allow = false;
        }

        if(!available){
            if (!/^[0-9]+$/.test(petId)) {
                tmp_err.pet_id = "Please select a valid value";
                allow = false;
            }

            if (!/^[0-9]+$/.test(assignedDoctor)) {
                tmp_err.assigned_doctor = "Please select a valid value";
                allow = false;
            }

            if (!(dayjs(confinementDate, 'DD-MM-YYYY', true).isValid())) {
                tmp_err.confine_date = "Only accepts valid dates";
                allow = false;
            }
        }

        if (!/^[ A-Za-z0-9_./()&+-]*$/.test(comments)) {
            tmp_err.comments = "Only accepts letters, numbers, and special characters (_./()&+-)";
            allow = false;
        }

        if (allow) {
            let data = {};

            if(!available){
                data.cage_status = cageStatus;
                data.pet_id = petId;
                data.assigned_doctor = assignedDoctor;
                data.comments = comments;
                data.confinement_date = dayjs(confinementDate).format('DD-MM-YYYY');
            } else {
                data.cage_status = cageStatus;
                data.comments = comments;
            }

            fetch("http://localhost/capstone_vet_clinic/api.php/update_lodging/" + cageId, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    if (data.update_lodging) {
                        props.setRefreshLodging(true);
                        props.setAlertUpdate(true);
                        props.setOpenForm(false);
                    }

                })
                .catch(error => {
                    console.error('Error adding lodging item:', error);
                });

        } else {
            setErrors(tmp_err)
            setCanSubmit(allow);
        };


    };

    const handleDischarge = (event) => {
        event.preventDefault();
            fetch("http://localhost/capstone_vet_clinic/api.php/discharge/" + cageId, {
                method: 'POST',
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
                    if (data.discharge) {
                        props.setRefreshLodging(true);
                        props.setAlertUpdate(true);
                        props.setOpenForm(false);
                    }

                })
                .catch(error => {
                    console.error('Error adding lodging item:', error);
                });
    };

    const handleChange = (event) => {
        setErrors({});
        setCanSubmit(true);

        if (event.target.id === "comments") {
            setComments(event.target.value);
        }

    };

    const handleCloseForm = () => {
        setOpenForm(false);
        props.setOpenForm(false);
    };

    return (
        <>
            <Dialog
                open={openForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseForm}
                aria-describedby="inventory-form-dialog"
            >
                <DialogTitle>{mode === 'edit' ? "Update Cage Information: " : "Add Cage Information"}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DialogContentText component={'span'} id="inventory-form-dialog">
                            <Grid container component={'span'} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid component={'span'} item xs={12}></Grid>
                                <Grid component={'span'} item xs={12}>
                                    <Checkbox 
                                        onChange={(newValue) => {
                                            setAvailable(newValue.target.checked)
                                        }}
                                    />
                                    <Typography component={'span'} variant="subtitle2" sx={{ color: 'black'}}>
                                        Submit with status only
                                    </Typography>
                                </Grid>
                                <Grid component={'span'} item xs={12}>
                                    <Select
                                        labelId="select-cage-status"
                                        id="cage_status"
                                        name="cage_status"
                                        value={cageStatus}
                                        label="Cage Status"
                                        onChange={(newValue) => {
                                            if(newValue.target.value === "OCCUPIED"){
                                                setCageStatus(newValue.target.value);
                                                setAvailable(false);
                                            } else {
                                                setCageStatus(newValue.target.value);
                                                setAvailable(true);
                                            }
                                        }}
                                        fullWidth
                                        error={Boolean(errors.cage_status)}
                                        helperText={errors.cage_status}
                                    >
                                        {cage_stat.map( (stat, idx ) => {
                                            return <MenuItem key={"stat_opt_" + idx} value={stat.value}>{stat.label}</MenuItem>
                                        } )}
                                    </Select>
                                </Grid>
                                <Grid component={'span'} item xs={6}>
                                    <Select native
                                            labelId="select-pet"
                                            id="pet_id"
                                            name="pet_id"
                                            value={petId}
                                            onChange={(newValue) => {
                                                setPetId(newValue.target.value);
                                                setCageStatus("OCCUPIED");
                                            }}
                                            label="Pet"
                                            fullWidth
                                            disabled={available}
                                            error={Boolean(errors.pet_id)}
                                        >
                                        <option value={0}>None</option>
                                        {petList.map( pet_owner => {
                                            return <optgroup label={pet_owner.firstname + " " + pet_owner.lastname}>
                                                { pet_owner.pets.map( pet => {
                                                     return <option value={pet.pet_id}>{pet.petname}</option>
                                                    })
                                                }
                                            </optgroup>
                                        } )}
                                    </Select>
                                </Grid>
                                <Grid component={'span'} item xs={6}>
                                    <Select
                                            labelId="select-doctor"
                                            id="assigned_doctor"
                                            name="assigned_doctor"
                                            value={assignedDoctor}
                                            label="Assigned Doctor"
                                            onChange={(newValue) => {
                                                setAssignedDoctor(newValue.target.value);
                                            }}
                                            fullWidth
                                            disabled={available}
                                            error={Boolean(errors.assigned_doctor)}
                                        >
                                            <MenuItem  value={0}>None</MenuItem>
                                        {allDoctors.map( (doctor, idx ) => {
                                            return <MenuItem key={"doc_opt_" + idx} value={doctor.id}>{doctor.firstname + " " + doctor.lastname}</MenuItem>
                                        } )}
                                    </Select>
                                </Grid>
                                <Grid component={'span'} item xs={6}>
                                    <DatePicker
                                        label="Confinement Date (DD-MM-YYYY)"
                                        id="confine_date"
                                        name="confine_date"
                                        value={confinementDate}
                                        onChange={(newValue) => {
                                            setConfinementDate(dayjs(newValue));
                                        }}
                                        fullWidth
                                        disabled={available}
                                        isInvalid={Boolean(errors.confine_date)}
                                    />
                                </Grid>
                                <Grid component={'span'} item xs={12}>
                                    <TextField
                                        label="comments"
                                        id="comments"
                                        name="comments"
                                        value={comments}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        error={Boolean(errors.comments)}
                                        helperText={errors.comments}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Chip
                        label="CANCEL"
                        color="secondary"
                        onClick={handleCloseForm}
                    />
                    {mode === 'edit' ?
                        <>
                        <Chip
                            label="UPDATE CAGE"
                            color="primary"
                            onClick={handleUpdate}
                            disabled={!Boolean(canSubmit)}
                        /> 
                        {cageStatus === 'OCCUPIED' ?
                        <Chip
                            label="DISCHARGE PET"
                            color="info"
                            onClick={handleDischarge}
                            disabled={!Boolean(canSubmit)}
                        /> : ""}
                        </>
                        :
                        <Chip
                            label="ADD CAGE"
                            color="primary"
                            onClick={handleAdd}
                            disabled={!Boolean(canSubmit)}
                        />
                    }
                </DialogActions>
            </Dialog>

        </>
    );
}

