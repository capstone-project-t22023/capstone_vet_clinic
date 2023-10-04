import React, {useContext, useEffect, useState,} from "react";
import {Link} from "react-router-dom";
import {Stack, Typography, Button, IconButton, Divider, Tooltip, Dialog, DialogContent} from "@mui/material";
import {
    AttachMoneyRounded,
    AutoDeleteRounded,
    FaceRounded, FitnessCenterRounded, HistoryEduRounded, LocalHospitalRounded,
    PaidRounded,
    PetsRounded,
    Receipt, RestaurantRounded, VaccinesRounded
} from "@mui/icons-material";
import programContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";
import BookingButton from "../booking/BookingButton";
import dayjs from "dayjs";
import Status from "./Status";
import Doctor from "./Doctor";
import BookingType from "./BookingType";
import ImmunizationForm from "../petRecords/ImmunizationForm";
import SurgeryForm from "../petRecords/SurgeryForm";

export default function AppointmentDetailSidebar({appointmentId}) {
    const {user} = useContext(programContext);
    const {
        changeSidebarContent,
        updateSelectedPet,
        updateSelectedAppointment,
        updateAppointmentStatus,
        appointmentList
    } = useContext(PetsContext);
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        if (appointmentList && Object.keys(appointmentList).length > 0) {
            const appointmentsArray = Object.values(appointmentList);
            const foundAppointment = appointmentsArray.find(item => item.booking_id === appointmentId);
            setAppointment(foundAppointment);
        }
    }, [appointmentList, appointmentId]);


    const handleStatusCancel = () => {
        updateAppointmentStatus(appointment, "cancel")
        changeSidebarContent('')
    }

    const handleOpenOwner = () => {
        // changeSidebarContent("owner");
        // updateSelectedOwner(petList.find(owner => owner.pet_owner_id === appointment.pet_owner_id))
        //     need to do the SELECTED USER TAB , what to display
    }
    const handleOpenPet = () => {
        updateSelectedAppointment("");
        updateSelectedPet(appointment.pet_id);
        changeSidebarContent("pet");
    }


    const [openImmunizationForm, setOpenImmunizationForm] = useState(false)
    const [openSurgeryForm, setOpenSurgeryForm] = useState(false)
    const [petRecordsDialog, setPetRecordsDialog] = useState(false)
    const [selectedForm, setSelectedForm] = useState('')


    const handleClose = () => {
        setPetRecordsDialog(false);
    };

    return (
        <Stack direction="column" p={6} spacing={5}>
            {appointment && Object.keys(appointment).length !== 0 && (
                <Stack direction="column" spacing={1}>
                    <Tooltip title={`ID: ${appointment.booking_id}`} placement="top" arrow>
                        <Typography variant="h6">Appointment Details</Typography>
                    </Tooltip>
                    <Status appointment={appointment}/>
                    {user.role !== "pet_owner" && appointment.booking_status === "FINISHED" && !appointment.invoice_id &&
                        <Link to="/generate_invoice" state={{appointment: {appointment}}}>
                            <Button variant="contained" color="primary" size="small" startIcon={<PaidRounded/>}>Generate
                                Invoice</Button>
                        </Link>
                    }
                    <Divider/>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography fontSize="0.75rem"><strong>Date:</strong></Typography>
                        <Typography>{dayjs(appointment.booking_date).format("DD MMMM YYYY")}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography fontSize="0.75rem"><strong>Time:</strong></Typography>
                        <Typography>{appointment.booking_time.join(', ')}</Typography>
                    </Stack>
                    {user.role !== "doctor" && appointment.booking_status !== "FINISHED" &&
                        <>
                            <BookingButton/>
                            <Button onClick={handleStatusCancel} variant="contained" size="small" color="error"
                                    endIcon={<AutoDeleteRounded/>}>Delete Booking</Button>
                        </>
                    }
                    <Divider/>
                    <BookingType type={appointment.booking_type}/>
                    <Doctor id={appointment.doctor_id}/>
                    <Divider/>

                    <Stack direction="row" spacing={1} alignItems="center">
                        {appointment.invoice_id !== null ?
                            <>
                                <Link to="/manage_invoice" state={{appointment: {appointment}}}>
                                    <IconButton color="primary" onClick={handleOpenPet}>
                                        <AttachMoneyRounded/>
                                    </IconButton>
                                </Link>
                                <Typography fontSize="0.75rem"><strong>Price:</strong></Typography>
                                <Typography>{appointment.invoice_amount}</Typography>
                            </>
                            :
                            <>
                                <IconButton disabled>
                                    <AttachMoneyRounded />
                                </IconButton>
                                <Typography fontSize="0.75rem" color="grey.400"><strong>Not
                                    Available</strong></Typography>
                            </>
                        }
                    </Stack>


                    <Stack direction="row" spacing={1} alignItems="center">
                        {appointment.invoice_id !== null && appointment.payment_status === "PAID" ?
                            <>
                                <Link to="/manage_invoice" state={{appointment: {appointment}}}>
                                    <IconButton color="primary" onClick={handleOpenPet}>
                                        <Receipt/>
                                    </IconButton>
                                </Link>
                                <Typography fontSize="0.75rem"><strong>Get Receipt</strong></Typography>
                            </>
                            :
                            <>
                                <IconButton color="primary" onClick={handleOpenPet}
                                            disabled="true">
                                    <Receipt/>
                                </IconButton>
                                <Typography fontSize="0.75rem" color="grey.400"><strong>No Receipt</strong></Typography>
                            </>
                        }
                    </Stack>


                    <Divider/>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton color="primary" disabled onClick={handleOpenOwner}>
                            <FaceRounded/>
                        </IconButton>
                        <Typography fontSize="0.75rem"><strong>Owner:</strong></Typography>
                        <Typography>{appointment.pet_owner}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton color="primary" onClick={handleOpenPet}>
                            <PetsRounded/>
                        </IconButton>
                        <Typography fontSize="0.75rem"><strong>Pet:</strong></Typography>
                        <Typography>{appointment.petname}</Typography>
                    </Stack>
                </Stack>
            )}


            {user.role === 'doctor' &&
                <Stack direction="column" spacing={2}>
                    <Button variant="outlined" color="primary" endIcon={<HistoryEduRounded/>}
                            onClick={() => setPetRecordsDialog(!petRecordsDialog)}>Add Pet Record</Button>
                </Stack>
            }


            {petRecordsDialog &&
                <Dialog open={petRecordsDialog} onClose={handleClose}>
                    <Stack direction='row' spacing={3} sx={{p: 3}}>
                        <Button disabled onClick={() => setSelectedForm('rehab')} variant="contained" color="secondary"
                                endIcon={<FitnessCenterRounded/>}>Rehab</Button>
                        <Button disabled onClick={() => setSelectedForm('diet')} variant="contained" color="success"
                                endIcon={<RestaurantRounded/>}>Diet</Button>
                        <Button onClick={() => setSelectedForm('surgery')} variant="contained" color="error"
                                endIcon={<LocalHospitalRounded/>}>Surgery</Button>
                        <Button onClick={() => setSelectedForm('immunization')} variant="contained" color="warning"
                                endIcon={<VaccinesRounded/>}>Immunization</Button>
                    </Stack>


                    <DialogContent>
                        {selectedForm === "immunization" &&
                            <ImmunizationForm
                                setOpenForm={setOpenImmunizationForm}
                                openForm={openImmunizationForm}
                                selectedAppointmentId={appointmentId}
                                onClose={setPetRecordsDialog}
                            />
                        }
                        {selectedForm === "surgery" &&
                            <SurgeryForm
                                setOpenForm={setOpenSurgeryForm}
                                openForm={openSurgeryForm}
                                selectedAppointmentId={appointmentId}
                                onClose={setPetRecordsDialog}
                            />
                        }
                    </DialogContent>
                </Dialog>

            }


        </Stack>
    )
}