import React, {useState , useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import VendorService from "../services/vendor.service.js";
import { Autocomplete } from '@material-ui/lab';
import{TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));
  const EditItemComponent = () => {
  const bodyInsert = (
    <div className={styles.modal}>
      <h3>Edit Item</h3>
      <TextField className={styles.inputMaterial} label="Description" name="description" onChange={handleChange} />          
      <br />
      <br />
      <Autocomplete
        onChange={handleChangeState}
        options={["Active","Discontinued"]}
        renderInput={(params) =>
          <TextField {...params} label="State" name="state" variant="outlined" />}
      />
      <TextField className={styles.inputMaterial} label="Price" name="price" onChange={handleChange} />
      <br />
      <br />
      <Autocomplete
        onOpen ={getVendors}
        onChange={handleChangeVendor}
        options={options}
        getOptionLabel={(option) => (option ? option.name : "")}
        renderInput={(params) =>
          <TextField {...params} label="Vendor" name="vendor" variant="outlined" />}
      />
      <br />
      <div align="right">
        <Button onClick ={postData} color="primary" >Add</Button>
        <Button onClick={changeModalInsert}>Cancel</Button>
      </div>
    </div>
  )
        }

export default EditItemComponent ;