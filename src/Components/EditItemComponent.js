import React, {useState , useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import FormLabel from '@material-ui/core/FormLabel';
import { DataGrid } from '@material-ui/data-grid';
import{TextField,Button} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';


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
  
  const EditItemComponent = (itemdata) => {
    const data = itemdata.data;
    const classes = useStyles();
    const columns = [
      { title: "ID", field: "priceReductionId" ,flex: 3},
      { title: "Creator", field: "creator", flex: 1},
      { title: "Reduced Price" ,field: "reducedprice" , flex: 1},
      { title: "Date Start", field: "datestart"  ,flex: 1},
      { title: "Date End", field: "dateend", flex: 1}
    ];
  
    return (
      <div className={classes.modal}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <Grid 
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start" >
          <Grid item xs={12} sm={6} md={3}>
          <FormControl component="fieldset">
                <FormLabel>ID</FormLabel>
                <TextField value={data.itemsId} ></TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
            <FormControl component="fieldset">
                <FormLabel >State</FormLabel>
                <TextField >{data.state}</TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <FormControl component="fieldset">
                <FormLabel>Creation Date</FormLabel>
                <TextField>{data.creationDate}</TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
            <FormControl component="fieldset">
                <FormLabel >Vendor</FormLabel>
                <TextField >{data.vendor.name}</TextField>
                </FormControl>
            </Grid>
          <Grid item xs={12} sm={12} ><FormLabel className={classes.paper}>Reduced Price List</FormLabel></Grid>
        </Grid>
        <div style={{ height: '220px', width: '100%' }}>
        { <DataGrid 
        getRowId={(row) => row.priceReductionId}
         rows={data.priceReductions} 
         columns={columns} 
         pageSize={2} /> }
        </div>
      </div>
    )
        }

export default EditItemComponent ;