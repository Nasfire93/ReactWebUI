import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import{TextField,Button} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Autocomplete } from '@material-ui/lab';
import VendorService from "../services/vendor.service.js";
import ItemsService from "../services/items.service.js";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PriceReductionService from "../services/priceReduction.service.js";




const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: 'linear-gradient(0deg, #F8F8F8 0%, #FFFFFF 100%)'
    },
    auto:{
      background: 'linear-gradient(0deg, #F8F8F8 0%, #FFFFFF 100%)'
    }
  }));
  
  const EditItemComponent = (props) => {
    const itemsService = ItemsService;
    const vendorService = VendorService;
    const priceReductionService = PriceReductionService;
    const [optionsVendor, setOptionsVendor] = useState([]);
    const [optionsPriceReduction, setOptionsPriceReduction] = useState([]);
    const data = props.data;
    console.log(data);
    const classes = useStyles();

    const [newItemData,setnewItemData] = useState({
        "itemsId" : data.itemsId,
        "creationDate": data.creationDate,
        "description": data.description,
        "state": data.state,
        "price":data.price, 
        "creator": data.creator,
        "vendor":data.vendor,
        "priceReductions": data.priceReductions ? data.priceReductions : []
        })

        const handleChange=e=>{
            const {name, value}=e.target;
            setnewItemData(prevState=>({
              ...prevState,
              [name]: value
            }));
          }

        const handleChangeVendor=(event, value)=>{
            setnewItemData(prevState=>({
              ...prevState,
              "vendor": value
            }));
            };
        
            const handleChangeState=(event, value)=>{
              setnewItemData(prevState=>({
                ...prevState,
                "state": value
              }));
              };

              const handleChangePriceReduction=(event, value)=>{
                setnewItemData(prevState=>({
                  ...prevState,
                  "priceReductions": value
                }));
                };

              const getVendors = async() =>{
                await vendorService.findAll().then(response => {
                  setOptionsVendor(response.data);
                  })
              }

              const getPriceReduction= async() =>{
                await priceReductionService.findAll().then(response => {
                  setOptionsPriceReduction(response.data);
                  })
              }

              const postData = async() =>{
                await props.setData(
                    props.alldata.filter(i => i.itemsId !== newItemData.itemsId)
                    .concat(newItemData));
                props.changeModalEdit();
              }
    return (
      <div className={classes.modal}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <Grid 
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
            <IconButton aria-label="Close" onClick={props.changeModalEdit}>
            <CloseIcon />
            </IconButton>
        </Grid>
        <Grid 
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2} >

          <Grid item xs={12} sm={6} md={4}>
          <FormControl component="fieldset">
                <TextField value={data.itemsId} label="iD" name="id" ></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormControl component="fieldset">
                    <TextField defaultValue={data.description} label="Description" name="description" onChange={handleChange} ></TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} >
                <Autocomplete
                    onChange={handleChangeState}
                    options={["Active","Inactive","Discontinued"]}
                    defaultValue={data.state}
                    renderInput={(params) =>
                        <TextField {...params} label="State" name="state" variant="outlined" />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <FormControl component="fieldset">
                <TextField defaultValue={data.price} label="Price" name="price" onChange={handleChange}></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <FormControl component="fieldset">
                <TextField defaultValue={data.creationDate} label="Date Creation" name="creationDate" onChange={handleChange}></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
          <FormControl component="fieldset">
                <TextField defaultValue={data.creator}  label="Creator" name="creator" onChange={handleChange}></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} >
            <Autocomplete
                multiple
                onOpen ={getVendors}
                onChange={handleChangeVendor}
                defaultValue={data.vendor}
                options={optionsVendor}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderInput={(params) =>
                    <TextField {...params} label="Vendor" name="vendor" variant="outlined" />
                }
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6} >
            <Autocomplete
                multiple
                onOpen ={getPriceReduction}
                onChange={handleChangePriceReduction}
                defaultValue={data.priceReductions}
                options={optionsPriceReduction}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderInput={(params) =>
                    <TextField {...params} label="Price Reduction" name="priceReduction" variant="outlined" />
                }
            />
            </Grid>
        </Grid>
        <br />
        <div align="right">
            <Button onClick ={postData} color="primary" >Edit</Button>
            <Button onClick ={props.changeModalEdit} color="primary" >Close</Button>
        </div>
    </div>
    )
        }

export default EditItemComponent ;