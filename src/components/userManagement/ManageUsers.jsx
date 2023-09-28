import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {
    Typography, Box, Tabs, Tab, TextField, Chip, Stack, Alert, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import UsersTable from './UsersTable';
import {AddCircleRounded, EditRounded, DeleteForeverRounded, Close} from '@mui/icons-material';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`inventory-tabpanel-${index}`}
            aria-labelledby={`inventory-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `inventory-tab-${index}`,
        'aria-controls': `inventory-tabpanel-${index}`,
    };
}

export default function ManageUsers(props) {

    const [value, setValue] = useState(0);
    const [openCategory, setOpenCategory] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryRecord, setCategoryRecord] = useState({});
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertUpdate, setAlertUpdate] = useState(false);
    const [alertAdd, setAlertAdd] = useState(false);
    const [mode, setMode] = useState("");

    const [refreshList, setRefreshList] = useState(false);



    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRefreshList(true);
    };

    const handleOpenAddCategory = () => {
        setOpenCategory(true);
        setMode("add");
    };

    const handleOpenEditCategory = (category_id) => (event) => {
        event.preventDefault();
        let cat = props.usersList.filter(x => x.category_id === category_id)[0];
        setCategory(cat.category);
        setCategoryRecord(cat);
        setOpenCategory(true);
        setMode("edit");
    };

    const handleCloseAddCategory = () => {
        setOpenCategory(false);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleAddCategory = () => {
        fetch("http://localhost/capstone_vet_clinic/api.php/add_inventory_category", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "item_category": category
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.add_inventory_category) {
                    props.setRefreshList(true);
                    setOpenCategory(false);
                    setAlertAdd(true);
                }
            })
            .catch(error => {
                console.error(error);
            });

    };

    const handleUpdateCategory = (event) => {
        event.preventDefault();
        fetch("http://localhost/capstone_vet_clinic/api.php/update_inventory_category/" + categoryRecord.category_id, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "item_category": category
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.update_inventory_category) {
                    props.setRefreshList(true);
                    setOpenCategory(false);
                    setAlertUpdate(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteCategory = (category_id) => (event) => {
        event.preventDefault();
        fetch("http://localhost/capstone_vet_clinic/api.php/delete_inventory_category/" + category_id, {
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
                if (data.delete_inventory_category) {
                    props.setRefreshList(true);
                    setValue(0);
                    setAlertDelete(true);
                }

            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    return (

            <Box
                sx={{borderBottom: 1, borderColor: 'divider', height: 1100}}
            >
                <Tabs
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Pawsome List"
                >
                    <Tab key="tab_category_doctors" label="Doctors"/>
                    <Tab key="tab_category_pet-owners" label="Pet Owners"/>

                </Tabs>


                <TabPanel value={value} index={value}>
                    <UsersTable
                        usersListType={value}
                        // catName={items.category}
                        // catId={items.category_id}
                        refreshList={refreshList}
                        setRefreshList={setRefreshList}
                    />
                </TabPanel>


            </Box>

    )
}