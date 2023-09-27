import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Typography, Box, Tabs, Tab, TextField, Chip, Stack, Alert, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import InventoryTable from './InventoryTable';
import { AddCircleRounded, EditRounded, DeleteForeverRounded, Close  } from '@mui/icons-material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`inventory-tabpanel-${index}`}
            aria-labelledby={`inventory-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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

export default function InventoryPage(props) {

    const [value, setValue] = useState(0);
    const [openCategory, setOpenCategory] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryRecord, setCategoryRecord] = useState({});
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertUpdate, setAlertUpdate] = useState(false);
    const [alertAdd, setAlertAdd] = useState(false);
    const [mode, setMode] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenAddCategory = () => {
        setOpenCategory(true);
        setMode("add");
    };

    const handleOpenEditCategory = (category_id) => (event) =>  {
        event.preventDefault();
        let cat = props.inventoryItems.filter( x => x.category_id === category_id)[0];
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
                    props.setRefreshInventory(true);
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
        fetch("http://localhost/capstone_vet_clinic/api.php/update_inventory_category/"+categoryRecord.category_id, {
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
                        props.setRefreshInventory(true);
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
        fetch("http://localhost/capstone_vet_clinic/api.php/delete_inventory_category/"+category_id, {
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
                if(data.delete_inventory_category){
                    props.setRefreshInventory(true);
                    setValue(0);
                    setAlertDelete(true);
                }

            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

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
                    Category has has been deleted successfully!
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
                        Category has has been updated successfully!
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
                        Category has has been added successfully!
                    </Alert>
                : ""}
            <Box
                sx={{ borderBottom: 1, borderColor: 'divider', height: 1100 }}
            >
                <Tabs
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Pawsome Inventory"
                >
                    {
                        props.inventoryItems.map((categories, idx) => {
                            return <Tab key={"tab_category_" + idx} label={categories.category} {...a11yProps(idx)} />
                        })
                    }

                </Tabs>
                {
                    props.inventoryItems.map((items, idx) => {
                        return (
                            <div key={"div_inv_panel_" + idx}>
                            <TabPanel  value={value} index={idx}>
                                <Stack  direction="row" spacing={2}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        startIcon={<AddCircleRounded />}
                                        onClick={handleOpenAddCategory}
                                    >
                                        Add Category
                                    </Button>
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        startIcon={<EditRounded />}
                                        onClick={handleOpenEditCategory(items.category_id)}
                                    >
                                        Update Category
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        startIcon={<DeleteForeverRounded />}
                                        onClick={handleDeleteCategory(items.category_id)}
                                    >
                                        Delete Category
                                    </Button>
                                </Stack>
                                <br />
                                <InventoryTable
                                    inventoryItems={items.inventory_items}
                                    catName={items.category}
                                    catId={items.category_id}
                                    setRefreshInventory={props.setRefreshInventory}
                                />
                            </TabPanel>
                            </div>
                        )
                    })
                }
            </Box>
            <Dialog
                open={openCategory}
                onClose={handleCloseAddCategory}
                aria-labelledby="add-category-dialog-title"
                aria-describedby="add-category-dialog-description"
            >
                <DialogTitle id="add-category-dialog-title">
                    { mode === 'add' ? "Add Inventory Category" : "Update Inventory Category"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText component={'span'}  id="add-category-dialog-description">
                        { mode === 'add' ? 
                            <TextField
                                autoFocus
                                margin="dense"
                                id="add_category"
                                variant="standard"
                                onChange={handleChangeCategory}
                            /> :
                            <TextField
                                autoFocus
                                margin="dense"
                                id="add_category"
                                variant="standard"
                                value={category}
                                onChange={handleChangeCategory}
                            />
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Chip
                        label="CANCEL"
                        color="secondary"
                        onClick={handleCloseAddCategory}
                    />
                    { mode === 'add' ?
                        <Chip
                            label="ADD CATEGORY"
                            color="primary"
                            onClick={handleAddCategory}
                        /> :
                        <Chip
                            label="UPDATE CATEGORY"
                            color="primary"
                            onClick={handleUpdateCategory}
                        />
                    }
                </DialogActions>
            </Dialog>

        </div>
    )
}