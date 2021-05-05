import React, {useState , useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';


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
        justify="center"
        alignItems="stretch" >
          <Grid item xs={6} sm={3} >
            <Paper className={classes.paper}>ID</Paper>
            <Paper className={classes.paper}>State</Paper>
            <Paper className={classes.paper}>Creation Date</Paper>
            <Paper className={classes.paper}>Vendor</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>{data.itemsId}</Paper>
            <Paper className={classes.paper}>{data.state}</Paper>
            <Paper className={classes.paper}>{data.creationDate}</Paper>
            <Paper className={classes.paper}>{data.vendor.name}</Paper>
  
          </Grid>
          <Grid item xs={6} sm={3} >
            <Paper className={classes.paper}>Description</Paper>
            <Paper className={classes.paper}>Price</Paper>
            <Paper className={classes.paper}>Creator</Paper>
            <Paper className={classes.paper}>CountryVendor</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>{data.description}</Paper>
            <Paper className={classes.paper}>{data.price}</Paper>
            <Paper className={classes.paper}>{data.creator}</Paper>
            <Paper className={classes.paper}>{data.vendor.country}</Paper>
          </Grid>
          <Grid item xs={12} sm={12} ><Paper className={classes.paper}>Reduced Price List</Paper></Grid>
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