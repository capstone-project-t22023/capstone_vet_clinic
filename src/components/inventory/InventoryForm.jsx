import React, { useEffect,useState } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Slide, TextField, Grid, Chip
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InventoryForm(props) {
    const [openForm, setOpenForm] = useState(props.openForm);
    const [itemId, setItemId] = useState(0); 
    const [itemName, setItemName] = useState(""); 
    const [inUseQty, setInUseQty] = useState(0);
    const [inStockQty, setInStockQty] = useState(0);  
    const [thresholdQty, setThresholdQty] = useState(0); 
    const [weightVolume, setWeightVolume] = useState(0.00);
    const [itemUnit, setItemUnit] = useState("");  
    const [productionDate, setProductionDate] = useState(dayjs().subtract(14, 'day')) ; 
    const [expirationDate, setExpirationDate] = useState(dayjs().add(14, 'day')) ; 
    const [unitPrice, setUnitPrice] = useState(0.00); 
    const [errors, setErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(true);
    const [mode, setMode] = useState("add");

    useEffect(() => {
        if (props.mode === 'edit'){
            setMode(props.mode);
            setItemId(props.defaultValues.item_id); 
            setItemName(props.defaultValues.item_name); 
            setInUseQty(props.defaultValues.in_use_qty);
            setInStockQty(props.defaultValues.in_stock_qty);
            setThresholdQty(props.defaultValues.threshold_qty); 
            setWeightVolume(parseFloat(props.defaultValues.weight_volume));
            setItemUnit(props.defaultValues.item_unit);
            setProductionDate(dayjs(props.defaultValues.production_date));
            setExpirationDate(dayjs(props.defaultValues.expiration_date));
            setUnitPrice(parseFloat(props.defaultValues.unit_price));
        }
    }, [props.defaultValues, props.mode])


    const handleAdd = (event) => {
        event.preventDefault();
        let tmp_err = {};
        let allow = true;
        setErrors({});
        if(!itemName ){
            tmp_err.itemname = "Required field";
            allow = false;
        } else if(!/^[ A-Za-z0-9_./()&+-]*$/.test(itemName)){
            tmp_err.itemname = "Only accepts letter, numbers, and special characters (_./()&+-)";
            allow = false;
        }

        if(!unitPrice){
            tmp_err.price = "Required field";
            allow = false;
        } else if(unitPrice === 0){
            tmp_err.price = "Required field";
            allow = false;
        } else if(!/^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/.test(unitPrice)){
            tmp_err.price = "Only accepts numbers with two decimal points";
            allow = false;
        }

        if(!weightVolume){
            tmp_err.wtvol = "Required field";
            allow = false;
        } else if(!/^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/.test(weightVolume)){
            tmp_err.wtvol = "Only accepts numbers with two decimal points";
            allow = false;
        }

        if(!thresholdQty){
            tmp_err.thresholdqty = "Required field";
            allow = false;
        } else if(!/^[0-9]+$/.test(thresholdQty)){
            tmp_err.thresholdqty = "Only accepts numbers";
            allow = false;
        }

        if(!inUseQty){
            tmp_err.inuseqty = "Required field";
            allow = false;
        } else if(!/^[0-9]+$/.test(inUseQty)){
            tmp_err.inuseqty = "Only accepts numbers";
            allow = false;
        }

        if(!inStockQty){
            tmp_err.instockqty = "Required field";
            allow = false;
        } else if(!/^[0-9]+$/.test(inStockQty)){
            tmp_err.instockqty = "Only accepts numbers";
            allow = false;
        }
        
        if(!productionDate){
            tmp_err.proddate = "Required field";
            allow = false;
        } else if(!(dayjs(productionDate, 'DD-MM-YYYY', true).isValid())){
            tmp_err.proddate = "Only accepts valid dates";
            allow = false;
        } else if(!dayjs().isAfter(dayjs(productionDate, 'DD-MM-YYYY'))){
            tmp_err.proddate = "Only accepts past dates";
            allow = false;
        }

        if(!expirationDate){
            tmp_err.expdate = "Required field";
            allow = false;
        } else if(!(dayjs(expirationDate, 'DD-MM-YYYY', true).isValid())){
            tmp_err.expdate = "Only accepts valid dates";
            allow = false;
        }  else if(!dayjs().isBefore(dayjs(expirationDate, 'DD-MM-YYYY'))){
            tmp_err.expdate = "Only accepts future dates";
            allow = false;
        }
        
       
        if(!itemUnit){
            tmp_err.unit = "Required field";
            allow = false;
        } else if(!/^[ A-Za-z0-9_./()&+-]*$/.test(itemUnit)){
            tmp_err.unit = "Only accepts letter, numbers, and special characters (_./()&+-)";
            allow = false;
        }

        if(allow){
            let data = {};

            data.inventory_item_category_id = props.catId;
            data.item_name = itemName;
            data.in_use_qty = inUseQty;
            data.in_stock_qty = inStockQty;
            data.threshold_qty = thresholdQty;
            data.weight_volume = weightVolume;
            data.item_unit = itemUnit;
            data.production_date = dayjs(productionDate).format('DD-MM-YYYY');
            data.expiration_date = dayjs(expirationDate).format('DD-MM-YYYY');
            data.unit_price = unitPrice;

            console.log("data", data);
            fetch("http://localhost/capstone_vet_clinic/api.php/add_inventory_item", {
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
                if(data.add_inventory_item){
                    setItemId(data.add_inventory_item);
                    props.setRefreshInventory(true);
                    props.setAlertAdd(true);
                    props.setOpenForm(false);
                }
            })
            .catch(error => {
                console.error('Error adding inventory item:', error);
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
        if(!itemName ){
            tmp_err.itemname = "Required field";
            allow = false;
        } else if(!/^[ A-Za-z0-9_./()&+-]*$/.test(itemName)){
            tmp_err.itemname = "Only accepts letter, numbers, and special characters (_./()&+-)";
            allow = false;
        }

        if(!unitPrice){
            tmp_err.price = "Required field";
            allow = false;
        } else if(unitPrice === 0){
            tmp_err.price = "Required field";
            allow = false;
        } else if(!/^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/.test(unitPrice)){
            tmp_err.price = "Only accepts numbers with two decimal points";
            allow = false;
        }

        if(!weightVolume){
            tmp_err.wtvol = "Required field";
            allow = false;
        } else if(!/^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/.test(weightVolume)){
            tmp_err.wtvol = "Only accepts numbers with two decimal points";
            allow = false;
        }

        if(!thresholdQty){
            tmp_err.thresholdqty = "Required field";
            allow = false;
        } else if(!/^[0-9]+$/.test(thresholdQty)){
            tmp_err.thresholdqty = "Only accepts numbers";
            allow = false;
        }

        if(!inUseQty){
            tmp_err.inuseqty = "Required field";
            allow = false;
        } else if(!/^[0-9]+$/.test(inUseQty)){
            tmp_err.inuseqty = "Only accepts numbers";
            allow = false;
        }

        if(!inStockQty){
            tmp_err.instockqty = "Required field";
            allow = false;
        } else if(!/^[0-9]+$/.test(inStockQty)){
            tmp_err.instockqty = "Only accepts numbers";
            allow = false;
        }
        
        if(!productionDate){
            tmp_err.proddate = "Required field";
            allow = false;
        } else if(!(dayjs(productionDate, 'DD-MM-YYYY', true).isValid())){
            tmp_err.proddate = "Only accepts valid dates";
            allow = false;
        } else if(!dayjs().isAfter(dayjs(productionDate, 'DD-MM-YYYY'))){
            tmp_err.proddate = "Only accepts past dates";
            allow = false;
        }

        if(!expirationDate){
            tmp_err.expdate = "Required field";
            allow = false;
        } else if(!(dayjs(expirationDate, 'DD-MM-YYYY', true).isValid())){
            tmp_err.expdate = "Only accepts valid dates";
            allow = false;
        }  else if(!dayjs().isBefore(dayjs(expirationDate, 'DD-MM-YYYY'))){
            tmp_err.expdate = "Only accepts future dates";
            allow = false;
        }
        
        if(!itemUnit){
            tmp_err.unit = "Required field";
            allow = false;
        } else if(!/^[ A-Za-z0-9_./()&+-]*$/.test(itemUnit)){
            tmp_err.unit = "Only accepts letter, numbers, and special characters (_./()&+-)";
            allow = false;
        }
        
        if(allow){
            let data = {};

            data.inventory_item_category_id = props.catId;
            data.item_name = itemName;
            data.in_use_qty = inUseQty;
            data.in_stock_qty = inStockQty;
            data.threshold_qty = thresholdQty;
            data.weight_volume = weightVolume;
            data.item_unit = itemUnit;
            data.production_date = dayjs(productionDate).format('DD-MM-YYYY');
            data.expiration_date = dayjs(expirationDate).format('DD-MM-YYYY');
            data.unit_price = unitPrice;

            console.log("data", data);

            fetch("http://localhost/capstone_vet_clinic/api.php/update_inventory_item/"+itemId, {
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
                if(data.update_inventory_item){
                    props.setRefreshInventory(true);
                    props.setAlertUpdate(true);
                    props.setOpenForm(false);
                }

            })
            .catch(error => {
                console.error('Error adding inventory item:', error);
            });

        } else {
            setErrors(tmp_err)
        };


    };

    const handleChange = (event) => {
        setErrors({});
        setCanSubmit(true);

        if(event.target.id === "itemname"){
            setItemName(event.target.value);
        } else if (event.target.id === "price"){
            setUnitPrice(event.target.value);
        } else if (event.target.id === "inuseqty"){
            setInUseQty(event.target.value);
        } else if (event.target.id === "instockqty"){
            setInStockQty(event.target.value);
        } else if (event.target.id === "thresholdqty"){
            setThresholdQty(event.target.value);
        } else if (event.target.id === "wtvol"){
            setWeightVolume(event.target.value);
        } else if (event.target.id === "unit"){
            setItemUnit(event.target.value);
        } else if (event.target.id === "proddate"){
            setProductionDate(event.target.value);
        } else if (event.target.id === "expdate"){
            setExpirationDate(event.target.value);
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
        <DialogTitle>{ mode === 'edit' ? "Update Inventory Item ID: " + itemId : "Add Inventory Item" }</DialogTitle>
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DialogContentText component={'span'}  id="inventory-form-dialog">
            <Grid container component={'span'} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid component={'span'} item xs={12}></Grid>
                <Grid component={'span'} item xs={6}>
                        <TextField
                            label="Item Name"
                            id="itemname"
                            name="itemname"
                            value={itemName}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.itemname)}
                            helperText={errors.itemname}
                        />
                    
                </Grid>
                <Grid component={'span'} item xs={6}>
                    
                        <TextField
                            label="Unit Price ($AUD)"
                            id="price"
                            name="price"
                            value={unitPrice}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.price)}
                            helperText={errors.price}
                        />
                    
                </Grid>
                <Grid component={'span'} item xs={4}>
                    
                        <TextField
                            label="In Use Qty"
                            id="inuseqty"
                            name="inuseqty"
                            value={inUseQty}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.inuseqty)}
                            helperText={errors.inuseqty}
                        />
                    
                </Grid>
                <Grid component={'span'} item xs={4}>
                    
                        <TextField
                            label="In Stock Qty"
                            id="instockqty"
                            name="instockqty"
                            value={inStockQty}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.instockqty)}
                            helperText={errors.instockqty}
                        />
                    
                </Grid>
                <Grid component={'span'} item xs={4}>
                    
                        <TextField
                            label="Threshold Qty"
                            id="thresholdqty"
                            name="thresholdqty"
                            value={thresholdQty}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.thresholdqty)}
                            helperText={errors.thresholdqty}
                        />
                    
                </Grid>
                <Grid component={'span'} item xs={6}>
                    
                        <TextField
                            label="Weight/Volume"
                            id="wtvol"
                            name="wtvol"
                            value={weightVolume}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.wtvol)}
                            helperText={errors.wtvol}
                        />
                    
                </Grid>
                <Grid component={'span'} item xs={6}>
                    
                        <TextField
                            label="Item Unit"
                            id="unit"
                            name="unit"
                            value={itemUnit}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.unit)}
                            helperText={errors.unit}
                        />
                    
                </Grid>
                <Grid component={'span'} item xs={6}>
                    {   mode === 'edit' ?
                        <DatePicker
                            label="Production Date (DD-MM-YYYY)"
                            id="proddate"
                            name="proddate"
                            value={productionDate}
                            onChange={(newValue) => {
                                handleChange({
                                    target: {
                                        id: 'proddate',
                                        value: dayjs(newValue).format('DD-MM-YYYY')
                                    }
                                });
                            }}
                            fullWidth
                            required
                            error={Boolean(errors.proddate)}
                            helperText={errors.proddate}
                        />
                        :
                        <DatePicker
                            label="Production Date (DD-MM-YYYY)"
                            id="proddate"
                            name="proddate"
                            value={productionDate}
                            onChange={(newValue) => {
                                handleChange({
                                    target: {
                                        id: 'proddate',
                                        value: dayjs(newValue).format('DD-MM-YYYY')
                                    }
                                });
                            }}
                            fullWidth
                            required
                            error={Boolean(errors.proddate)}
                            helperText={errors.proddate}
                        />
                    }
                </Grid>
                <Grid component={'span'} item xs={6}>
                    { mode === 'edit' ?
                        <DatePicker 
                        label="Expiration Date (DD-MM-YYYY)"
                        id="expdate"
                        name="expdate"
                        value={expirationDate}
                        onChange={(newValue) => {
                            handleChange({
                                target: {
                                    id: 'expdate',
                                    value: dayjs(newValue).format('DD-MM-YYYY')
                                }
                            });
                        }}
                        fullWidth
                        required
                        error={Boolean(errors.expdate)}
                        helperText={errors.expdate}
                        />
                        :
                        <DatePicker 
                        label="Expiration Date (DD-MM-YYYY)"
                        id="expdate"
                        name="expdate"
                        value={expirationDate}
                        onChange={(newValue) => {
                            handleChange({
                                target: {
                                    id: 'expdate',
                                    value: dayjs(newValue).format('DD-MM-YYYY')
                                }
                            });
                        }}
                        fullWidth
                        required
                        error={Boolean(errors.expdate)}
                        helperText={errors.expdate}
                        />
                    }
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
            { mode === 'edit' ?
                <Chip
                    label="UPDATE ITEM"
                    color="primary"
                    onClick={handleUpdate}
                    disabled={!Boolean(canSubmit)}
                /> :
                <Chip
                label="ADD ITEM"
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

