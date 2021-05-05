import React, {useState , useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import VendorService from "../services/vendor.service.js";
import { Autocomplete } from '@material-ui/lab';
import{TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

const DescriptionComponent = ({data}) => {
  const classes = useStyles();
  const vendorService = VendorService;


  const bodyInsert = (
    <div>
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
          {/* <Paper className={classes.paper}>Price Reduction</Paper> */}
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>{data.itemsId}</Paper>
          <Paper className={classes.paper}>{data.state}</Paper>
          <Paper className={classes.paper}>{data.creationDate}</Paper>
          <Paper className={classes.paper}>{data.vendor.name}</Paper>
          {/* <Autocomplete
          className={classes.auto}
        options={data.priceReductions}
        renderInput={(params) =>
          <TextField {...params} label="Price reductions" name="vendor" variant="outlined" />
          }
      /> */}
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
      </Grid>
    </div>
  )
  return bodyInsert;
  
}

export default DescriptionComponent;