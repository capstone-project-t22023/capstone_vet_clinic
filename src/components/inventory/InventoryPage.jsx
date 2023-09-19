import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Typography, Box, Tabs, Tab, Button, TextField, Chip,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import InventoryTable from './InventoryTable';
import { AddCircleRounded } from '@mui/icons-material';

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
                    <Typography>{children}</Typography>
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

export default function Inventory(props) {

    const [value, setValue] = React.useState(0);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [category, setCategory] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenAddCategory = () => {
        setOpenCategory(true);
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
            if(data.add_inventory_category){
                props.setRefreshInventory(true);
                setOpenCategory(false);
            }
          })
          .catch(error => {
            console.error(error);
          });  
        
    };

    return (
        <div>

            <Box
                sx={{ borderBottom: 1, borderColor: 'divider', height: 1000 }}
            >
                <Tabs
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Pawsome Inventory"
                >
                    {
                        props.inventoryItems.map((categories, idx) => {
                            return <Tab key={"category_" + idx} label={categories.category} {...a11yProps(idx)} />
                        })
                    }
                    <Chip
                        label="Add Category"
                        color="primary"
                        icon={<AddCircleRounded sx={{ fontSize: '25px' }} />}
                        onClick={handleOpenAddCategory}
                    />
                </Tabs>
                {
                    props.inventoryItems.map((items, idx) => {
                        return (
                            <TabPanel key={"inv_panel_" + idx} value={value} index={idx}>
                                <InventoryTable inventoryItems={items.inventory_items} />
                            </TabPanel>
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
                    Add Inventory Category
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="add-category-dialog-description">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="add_category"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeCategory}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Chip
                        label="CANCEL"
                        color="secondary"
                        onClick={handleCloseAddCategory}
                />
                <Chip
                        label="ADD CATEGORY"
                        color="primary"
                        onClick={handleAddCategory}
                />
                </DialogActions>
            </Dialog>

        </div>
    )
}
