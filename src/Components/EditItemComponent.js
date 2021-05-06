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
    const [options, setOptions] = useState([]);
    const data = props.data;
    const classes = useStyles();
    const columns = [
      { title: "ID", field: "priceReductionId" ,flex: 1},
      { title: "Creator", field: "creator", flex: 1},
      { title: "Reduced Price" ,field: "reducedprice" , flex: 1},
      { title: "Date Start", field: "datestart"  ,flex: 1},
      { title: "Date End", field: "dateend", flex: 1}
    ];

    const [newItemData,setnewItemData] = useState({
        "itemsId" : data.itemsId,
        "creationDate": data.creationDate,
        "description": data.description,
        "state": data.state,
        "price":data.price, 
        "creator": data.creator,
        "vendor":data.vendor,
        "priceReductions":data.priceReductions ? data.priceReductions : []
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

              const getVendors = async() =>{
                await vendorService.findAll().then(response => {
                  setOptions(response.data);
                  })
              }

              const postData = async() =>{
                
                await props.setData(props.alldata.filter(i => i.itemsId !== newItemData.itemsId));
                let toadd = await itemsService.addItem(newItemData);
                await props.setData(props.alldata.concat(toadd));
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
            <Grid item xs={12} sm={6} md={4} >
            <Autocomplete
                onOpen ={getVendors}
                onChange={handleChangeVendor}
                defaultValue={data.vendor}
                options={options}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderInput={(params) =>
                    <TextField {...params} label="Vendor" name="vendor" variant="outlined" />
                }
            />
            </Grid>
        
        <div style={{ height: '220px', width: '100%' }}>
            { 
            <DataGrid 
                getRowId={(row) => row.priceReductionId}
                rows={data.priceReductions ? data.priceReductions : []} 
                columns={columns} 
                pageSize={2} />
            }
        </div>
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