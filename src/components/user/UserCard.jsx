import React, {useState} from 'react';
import {Box, Button, Dialog, Stack, Typography} from '@mui/material';
import EditUserForm from "./EditUserForm";

export default function UserCard({user}) {
    const [openEdit, setOpenEdit]= useState(false);
    const handleEditProfile = (updatedUser) => {
        console.log("User changed some profile infos: ",updatedUser)
        setOpenEdit(false);
    }
    const handleCancel = () => {
      setOpenEdit(false)
    }

    console.log(user)

    return (
        <>
            <Stack direction="column" spacing={1}>

                    <Typography variant="body2" color="textSecondary">
                        ID: {user.id}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        First Name: {user.firstname}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Last Name: {user.lastname}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Username: {user.username}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Address: {user.address}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        State: {user.state}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Phone: {user.phone}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Postcode: {user.postcode}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Role: {user.role}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Created Date: {user.created_date}
                    </Typography>
                    <Typography variant="body2" color="textBody">
                        Updated Date: {user.updated_date}
                    </Typography>
            </Stack>

            <Button onClick={() => setOpenEdit(true)}>Edit Details</Button>

            <Dialog open={openEdit} onClose={handleCancel}>
                <Box sx={{p:2}}>
                    <EditUserForm user={user} onUpdateUser={handleEditProfile} />
                </Box>
            </Dialog>
        </>
    )
}
