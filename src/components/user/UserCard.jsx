import React, {useState} from 'react';
import {Box, Button, Dialog} from '@mui/material';
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

    return (
        <>
            <Box className={"text-center"}>
                {user && (
                    Object.entries(user).map(([key, value]) => <p key={key}>{key}: {value}</p>)
                )}
            </Box>

            <Button onClick={() => setOpenEdit(true)}>Edit Details</Button>

            <Dialog open={openEdit} onClose={handleCancel}>
                <Box sx={{p:2}}>
                    <EditUserForm user={user} onUpdateUser={handleEditProfile} />
                </Box>
            </Dialog>
        </>
    )
}
