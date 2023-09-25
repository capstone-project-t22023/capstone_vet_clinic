import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom'

import {
    Stack, Typography, Box, Paper, Grid, Select, IconButton, MenuItem, FormControl, Button, Tooltip, Zoom,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Alert
} from '@mui/material';
import Aside from '../../components/aside/Aside';
import Footer from '../Footer';
import PawsomeVetLogo from '../../media/Logo.jpg';
import { AddCircleRounded, EditRounded, DeleteForeverRounded, SaveRounded, Close, PaidRounded } from '@mui/icons-material';


const letterhead =
    <>
        <img src={PawsomeVetLogo} alt="" style={{ height: '80px', width: '80px', }} /><br />
        <Typography component="span" variant="h6"><b>PawsomeVet Veterinary Clinic</b></Typography><br />
        <Typography component="span" variant="caption">Address: 1 New Street, Sydney 2000 NSW, Australia</Typography><br />
        <Typography component="span" variant="caption">Ph: + (02) 9519 4111 / +(02)95194112</Typography><br />
        <Typography component="span" variant="caption">Fax: + (02) 9519 4111 / +(02)95194112</Typography><br />
        <Typography component="span" variant="caption">Email: info@pawsomevet.com.au</Typography><br />
        <Typography component="span" variant="caption">ABN: 865987656786</Typography>
    </>;

function createInvoiceItem(item_category, item_description, quantity, unit_amount, total_amount) {
    return { item_category, item_description, quantity, unit_amount, total_amount };
}

export default function GenerateInvoice() {

    const location = useLocation();
    const { appointment } = location.state;
    const [invoiceId, setInvoiceId] = useState(0);
    const [bookingInfo, setBookingInfo] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([{ label: "Select One", value: 0 }]);
    const [inventoryCategories, setInventoryCategories] = useState([{ label: "Select One", value: 0 }]);
    const [invoiceItemRows, setInvoiceItemRows] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedItem, setSelectedItem] = useState(0);
    const [selectedQty, setSelectedQty] = useState(0);
    const [selectedUnitAmount, setSelectedUnitAmount] = useState(0.00);
    const [selectedTotalAmount, setSelectedTotalAmount] = useState(0.00);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertAdd, setAlertAdd] = useState(false);
    const [alertGenerateInvoice, setAlertGenerateInvoice] = useState(false);
    const [alertErrorGenerateInvoice, setAlertErrorGenerateInvoice] = useState(false);

    useEffect(() => {
        setBookingInfo(appointment.appointment);

        Promise.all([
            fetch("http://localhost/capstone_vet_clinic/api.php/get_inventory_categories", {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_inventory_by_category/1", {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
        ])
            .then((responses) => {
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            })
            .then(data => {
                if (data[0].inventory_categories) {
                    let tmp_1 = data[0].inventory_categories.map(cat => {
                        let x = {};
                        x.label = cat.category;
                        x.value = cat.category_id;
                        return x;
                    })
                    tmp_1.push({ label: "Select One", value: 0 });
                    setInventoryCategories(tmp_1);
                }

                if (data[1].inventory_records) {
                    let tmp_inventory_items = data[1].inventory_records[0].inventory_items;
                    let item_desc = tmp_inventory_items.filter(x => x.item_name === appointment.appointment.booking_type);

                    if (item_desc[0]) {
                        let tmp_invoice_items = {};
                        tmp_invoice_items.item_category = 1;
                        tmp_invoice_items.item_category_label = "Booking";
                        tmp_invoice_items.item_description = item_desc[0].item_id;
                        tmp_invoice_items.item_description_label = item_desc[0].item_name;
                        tmp_invoice_items.item_id = item_desc[0].item_id;
                        tmp_invoice_items.quantity = 1;
                        tmp_invoice_items.unit_amount = parseFloat(item_desc[0].unit_price).toFixed(2);
                        tmp_invoice_items.total_amount = parseFloat(item_desc[0].unit_price).toFixed(2);

                        let tmp_arr = [];
                        tmp_arr.push(tmp_invoice_items);

                        setInvoiceItemRows(tmp_arr);
                        setTotalAmount(item_desc[0].unit_price);
                    }
                }

            })
            .catch(error => {
                console.error('Error getting inventory:', error);
            });

    }, [appointment]);

    const enableAdd = (event) => {
        event.preventDefault();
        setOpenForm(true);
    };

    const handleFilterItems = (event) => {
        event.preventDefault();
        setSelectedCategory(event.target.value);

        fetch("http://localhost/capstone_vet_clinic/api.php/get_inventory_by_category/" + event.target.value, {
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
            .then(data => {
                if (data.inventory_records) {
                    let tmp = data.inventory_records[0].inventory_items.map(item => {
                        let x = {};
                        x.label = item.item_name;
                        x.value = item.item_id;
                        x.unit_price = item.unit_price;
                        x.in_use_qty = item.in_use_qty;
                        return x;
                    })
                    tmp.push({ label: "Select One", value: 0 });
                    setInventoryItems(tmp);
                }

            })
            .catch(error => {
                console.error('Error getting inventory:', error);
            });
    }

    const handleItemSelect = (event) => {
        event.preventDefault();
        setSelectedQty(event.target.value);

        let inventory_item = inventoryItems.filter(x => x.value === selectedItem)[0];

        setSelectedUnitAmount(parseFloat(inventory_item.unit_price).toFixed(2));
        setSelectedTotalAmount(parseFloat((inventory_item.unit_price) * event.target.value).toFixed(2));

    }

    const handleSave = () => {
        let tmp_invoice_items = {};
        tmp_invoice_items.item_category = selectedCategory;
        tmp_invoice_items.item_category_label = inventoryCategories.filter(x => x.value === selectedCategory)[0].label;
        tmp_invoice_items.item_description = selectedItem;
        tmp_invoice_items.item_description_label = inventoryItems.filter(x => x.value === selectedItem)[0].label;
        tmp_invoice_items.item_id = selectedItem;
        tmp_invoice_items.quantity = selectedQty;
        tmp_invoice_items.unit_amount = selectedUnitAmount;
        tmp_invoice_items.total_amount = selectedTotalAmount;

        let tmp_arr = invoiceItemRows;
        tmp_arr.push(tmp_invoice_items);

        let total_amount = 0;

        for (let i = 0; i <= tmp_arr.length - 1; i++) {
            total_amount += parseFloat(tmp_arr[i].total_amount);
        }

        setInvoiceItemRows(tmp_arr);
        setTotalAmount(parseFloat(total_amount).toFixed(2));

        setSelectedCategory(0);
        setSelectedItem(0);
        setSelectedQty(0);
        setSelectedUnitAmount(0.00);
        setSelectedTotalAmount(0.00);
        setOpenForm(false);
        setAlertAdd(true);
    }

    const handleDelete = (idx) => (event) => {
        event.preventDefault();

        let new_arr = invoiceItemRows.filter((x, index) => { return index !== idx; });
        let total_amount = 0;

        for (let i = 0; i <= new_arr.length - 1; i++) {
            total_amount += parseFloat(new_arr[i].total_amount);
        }

        setInvoiceItemRows(new_arr);
        setTotalAmount(parseFloat(total_amount).toFixed(2));
        setAlertDelete(true);
    }

    const handleEdit = (idx) => (event) => {
        event.preventDefault();

        let line_item = invoiceItemRows.filter((x, index) => { return index === idx; });

        setSelectedCategory(line_item[0].item_category);
        setSelectedItem(line_item[0].item_id);
        setSelectedQty(line_item[0].quantity);
        setSelectedUnitAmount(line_item[0].unit_amount);
        setSelectedTotalAmount(line_item[0].total_amount);
        setOpenForm(true);

        let new_arr = invoiceItemRows.filter((x, index) => { return index !== idx; });
        let total_amount = 0;

        for (let i = 0; i <= new_arr.length - 1; i++) {
            total_amount += parseFloat(new_arr[i].total_amount);
        }

        setInvoiceItemRows(new_arr);
        setTotalAmount(parseFloat(total_amount).toFixed(2));
    }

    const generateInvoice = () => {
        let data = {};
        let invoice_items = invoiceItemRows.map( x => {
            return { item_id: x.item_id, quantity: parseInt(x.quantity) };
        })
        data.booking_id = bookingInfo.booking_id;
        data.invoice_items = invoice_items;

        console.log("data", data);

        fetch("http://localhost/capstone_vet_clinic/api.php/generate_invoice", {
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
                if(typeof data.generate_invoice == 'number'){
                    setInvoiceId(data.generate_invoice);
                    setAlertGenerateInvoice(true);
                } else {
                    setAlertErrorGenerateInvoice(true);
                }

            })
            .catch(error => {
                console.error('Error getting inventory:', error);
                setAlertErrorGenerateInvoice(true);
            });
    }

    const updateInvoice = () => {
        let data = {};
        let invoice_items = invoiceItemRows.map( x => {
            return { item_id: x.item_id, quantity: parseInt(x.quantity) };
        })
        data.booking_id = bookingInfo.booking_id;
        data.invoice_items = invoice_items;

        console.log("data", data);

        fetch("http://localhost/capstone_vet_clinic/api.php/update_invoice/"+invoiceId, {
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
                if(typeof data.update_invoice == 'number'){
                    setAlertGenerateInvoice(true);
                } else {
                    setAlertErrorGenerateInvoice(true);
                }
            })
            .catch(error => {
                console.error('Error getting inventory:', error);
                setAlertErrorGenerateInvoice(true);
            });
    }

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | Billing</title>
            </Helmet>
            <Stack direction="row" sx={{ height: '100vh', maxHeight: '100%', overflowY: 'hidden' }}>
                <Aside />
                <Stack
                    direction="column"
                    transition="width 0.9s ease-in-out"
                    justifyContent="space-between"
                    sx={{
                        borderLeft: '1px solid',
                        borderRight: '1px solid',
                        borderColor: '#eceef2',
                        overflowY: 'auto',
                        flex: 1,
                        p: 6
                    }}>

                    <Stack direction="column" justifyContent="space-between" spacing={3}>
                        <Stack direction="column" spacing={3}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
                                    Generate Invoice
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box flex={1}>
                                    <Paper sx={{ p: 3, borderRadius: 4 }} elevation={0}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 1,
                                                    width: 1,
                                                    paddingLeft: 3,
                                                    paddingRight: 3,
                                                    paddingTop: 2,
                                                    paddingBottom: 3
                                                },
                                            }}
                                        >
                                            <Paper elevation={4} >
                                                {letterhead}
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                                    sx={{ paddingTop: 3, paddingBottom: 3 }}
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2"><b>Invoice ID: </b>{invoiceId !== 0 ? invoiceId : ""}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking ID: </b>{bookingInfo.booking_id}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking Status: </b>{bookingInfo.booking_status}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking Date: </b>{bookingInfo.booking_date}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking Type: </b>{bookingInfo.booking_type}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Pet Owner: </b>{bookingInfo.pet_owner}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Pet: </b>{bookingInfo.petname}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                </Grid>
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
                                                                <Close fontSize="inherit" />
                                                            </IconButton>
                                                        }
                                                    >
                                                        Item has has been deleted successfully!
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
                                                                <Close fontSize="inherit" />
                                                            </IconButton>
                                                        }
                                                    >
                                                        Item has has been added/updated successfully!
                                                    </Alert>
                                                    : ""}
                                                <TableContainer component={Paper} sx={{ paddingRight: 2, paddingLeft: 2 }}>
                                                    <Table sx={{ minWidth: 650 }} aria-label="invoice table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center">Actions</TableCell>
                                                                <TableCell align="center">Item Category</TableCell>
                                                                <TableCell align="center">Item Description</TableCell>
                                                                <TableCell align="center">Qty</TableCell>
                                                                <TableCell align="center">Unit Amount</TableCell>
                                                                <TableCell align="center">Total Amount</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                {openForm ?
                                                                    <>
                                                                        <TableCell align="center">
                                                                            <IconButton color="primary"
                                                                                onClick={handleSave}
                                                                                disabled={selectedCategory === 0 || selectedItem === 0 || selectedQty === 0 ? true : false}>
                                                                                <SaveRounded />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            <FormControl size="small">
                                                                                <Select
                                                                                    labelId="inv-cat-select-label"
                                                                                    id="inv-cat-select"
                                                                                    value={selectedCategory}
                                                                                    onChange={handleFilterItems}
                                                                                    error={selectedCategory === 0 ? true : false}
                                                                                >
                                                                                    {inventoryCategories.map(x => {
                                                                                        return <MenuItem
                                                                                            key={"opt-cat-" + x.value}
                                                                                            value={x.value}
                                                                                            disabled={x.value === 1 ? true : false}
                                                                                        >
                                                                                            {x.label}
                                                                                        </MenuItem>
                                                                                    })}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            <FormControl size="small">
                                                                                <Select
                                                                                    labelId="inv-item-select-label"
                                                                                    id="inv-item-select"
                                                                                    value={selectedItem}
                                                                                    onChange={(newValue) => {
                                                                                        setSelectedItem(newValue.target.value);
                                                                                    }}
                                                                                    error={selectedItem === 0 ? true : false}
                                                                                >
                                                                                    {inventoryItems.map(x => {
                                                                                        return <MenuItem key={"opt-item-" + x.value} value={x.value}>{x.label}</MenuItem>
                                                                                    })}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            <TextField
                                                                                id="invoice_item_qty"
                                                                                value={selectedQty}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                type="number"
                                                                                error={selectedQty < 1 ? true : false}
                                                                                onChange={handleItemSelect}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            <Typography component="span" variant="subtitle2">{selectedUnitAmount}</Typography>
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            <Typography component="span" variant="subtitle2">{selectedTotalAmount}</Typography>
                                                                        </TableCell>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <TableCell align="center">
                                                                            <IconButton color="primary" onClick={enableAdd}>
                                                                                <AddCircleRounded />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                        <TableCell align="right"></TableCell>
                                                                        <TableCell align="right"></TableCell>
                                                                        <TableCell align="right"></TableCell>
                                                                        <TableCell align="right"></TableCell>
                                                                        <TableCell align="right"></TableCell>
                                                                    </>
                                                                }
                                                            </TableRow>
                                                            {invoiceItemRows.map((row, idx) => (
                                                                <TableRow
                                                                    key={"item-" + idx}
                                                                >
                                                                    <TableCell align="center">
                                                                        <IconButton color="primary" onClick={handleEdit(idx)} disabled={row.item_category_label === 'Booking' ? true : false}>
                                                                            <EditRounded />
                                                                        </IconButton>
                                                                        <IconButton color="error" onClick={handleDelete(idx)} disabled={row.item_category_label === 'Booking' ? true : false}>
                                                                            <DeleteForeverRounded />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                    <TableCell align="center">{row.item_category_label}</TableCell>
                                                                    <TableCell align="center">{row.item_description_label}</TableCell>
                                                                    <TableCell align="center">{row.quantity}</TableCell>
                                                                    <TableCell align="right">{row.unit_amount}</TableCell>
                                                                    <TableCell align="right">{row.total_amount}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                            <TableRow>
                                                                <TableCell align="right" colSpan={5}>
                                                                    Total Invoice Amount
                                                                </TableCell>
                                                                <TableCell align="right">$A {totalAmount}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>

                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                                    sx={{ paddingTop: 3, paddingBottom: 3, textAlign: 'center' }}
                                                >
                                                    <Grid item xs={12}>
                                                        { invoiceId ?
                                                            <Tooltip title="Update invoice" placement="right" TransitionComponent={Zoom} arrow>
                                                                <Button
                                                                    color="primary"
                                                                    variant="contained"
                                                                    startIcon={<PaidRounded />}
                                                                    onClick={updateInvoice}
                                                                >
                                                                    Update Invoice
                                                                </Button>
                                                            </Tooltip>
                                                            :
                                                            <Tooltip title="Generate invoice" placement="right" TransitionComponent={Zoom} arrow>
                                                                <Button
                                                                    color="primary"
                                                                    variant="contained"
                                                                    startIcon={<PaidRounded />}
                                                                    onClick={generateInvoice}
                                                                >
                                                                    Generate Invoice
                                                                </Button>
                                                            </Tooltip>
                                                        }
                                                        {alertGenerateInvoice ?
                                                        <Alert
                                                            variant="filled"
                                                            severity="success"
                                                            action={
                                                                <IconButton
                                                                    aria-label="close"
                                                                    color="inherit"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setAlertGenerateInvoice(false);
                                                                    }}
                                                                >
                                                                    <Close fontSize="inherit" />
                                                                </IconButton>
                                                            }
                                                        >
                                                            Invoice {invoiceId} has been generated/updated!
                                                        </Alert>
                                                        : ""}
                                                        {alertErrorGenerateInvoice ?
                                                        <Alert
                                                            variant="filled"
                                                            severity="error"
                                                            action={
                                                                <IconButton
                                                                    aria-label="close"
                                                                    color="inherit"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setAlertErrorGenerateInvoice(false);
                                                                    }}
                                                                >
                                                                    <Close fontSize="inherit" />
                                                                </IconButton>
                                                            }
                                                        >
                                                            Invoice transaction has failed. Please try again.
                                                        </Alert>
                                                        : ""}
                                                    </Grid>
                                                </Grid>

                                            </Paper>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Footer />
                </Stack>
            </Stack>

        </div>
    )
}
