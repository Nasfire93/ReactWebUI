import React, {useState , useEffect } from 'react';
import MaterialTable from 'material-table'
import{Modal,TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import ItemsService from "../services/items.service.js";
import AuthService from "../services/auth.service.js";
import VendorService from "../services/vendor.service.js";
import PriceReductionService from "../services/priceReduction.service.js";
import { Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { useHistory} from "react-router-dom";
import DescriptionComponent from "../Components/DescriptionComponent.js";
import EditItemComponent from "../Components/EditItemComponent.js";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const columns = [
  { title: "Item", field: "itemsId" },
  { title: "Description" ,field: "description" },
  { title: "State", field: "state" },
  { title: "Price", field: "price"},
  { title: "Creation Date", field: "creationDate" },
  { title: "Creator", field: "creator"}
];

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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

const ItemsTable = () => {
  
  const history = useHistory();

  const styles = useStyles();
  
  const itemsService = ItemsService;
  const vendorService = VendorService;
  const authService = AuthService;
  const priceReductionService = PriceReductionService;

  const [data,setData] = useState([]);
  const [dataedit,setDataEdit] = useState([]);
  const [modalInsert,setModalInsert] = useState(false);
  const [modalEdit,setModalEdit] = useState(false);
  const [newItemData,setnewItemData] = useState({
  "creationDate": moment().format('YYYY-MM-DD'),
  "description":"",
  "state":"Active",
  "price":"", 
  "creator": authService.getCurrentUser().username,
  "vendor":"",
  "priceReductions":""
  })
  const [optionsVendor, setOptionsVendor] = useState([]);
  const [optionsPriceReduction, setOptionsPriceReduction] = useState([]);
  

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

    const handleChangePriceReduction=(event, value)=>{
      setnewItemData(prevState=>({
        ...prevState,
        "priceReductions": value
      }));
      };

    const handleChangeState=(event, value)=>{
      setnewItemData(prevState=>({
        ...prevState,
        "state": value
      }));
      };

  const GetData = async() =>{
    await itemsService.findAll().then(response => {
      setData(data.concat(response.data));
    })
  }

  const postData = async() =>{
    await  itemsService.addItem(newItemData).then(response => {
      setData(data.concat(response.data));
      console.log(data);
      changeModalInsert();
    })
  }
  const deleteData = async(idItem) =>{
    await itemsService.deleteItem(idItem).then(response => {
      setData(data.filter(i => i.itemsId !== response.data.itemsId));
    })
  }

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

    const logout = () =>{
      authService.logout();
      history.push('/');
    }

  const changeModalInsert = () =>{
    setModalInsert(!modalInsert);
  }

  const changeModalEdit = () =>{
    setModalEdit(!modalEdit);
  }

  useEffect(() =>{
    GetData();
  },[])

  const bodyInsert = (
    <div className={styles.modal}>
              <Grid 
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
            <IconButton aria-label="Close" onClick={changeModalInsert}>
            <CloseIcon />
            </IconButton>
        </Grid>
      <h3>Add new Item</h3>
      <TextField className={styles.inputMaterial} label="Description" name="description" onChange={handleChange} />          
      <br />
      <br />
      <Autocomplete
        onChange={handleChangeState}
        options={["Active","Inactive"]}
        defaultValue="Active"
        renderInput={(params) =>
          <TextField {...params} label="State" name="state" variant="outlined" />}
      />
      <TextField className={styles.inputMaterial} label="Price" name="price" onChange={handleChange} />
      <br />
      <br />
      <Autocomplete
        multiple
        onOpen ={getVendors}
        onChange={handleChangeVendor}
        options={optionsVendor}
        getOptionLabel={(option) => (option ? option.name : "")}
        renderInput={(params) =>
          <TextField {...params} label="Vendor" name="vendor" variant="outlined" />}
      />
      <br />
      <Autocomplete
        multiple
        onOpen ={getPriceReduction}
        onChange={handleChangePriceReduction}
        options={optionsPriceReduction}
        getOptionLabel={(option) => (option ? option.reducedprice.toString() : "")}
        renderInput={(params) =>
          <TextField {...params} label="Price Reduction" name="priceReductions" variant="outlined" />}
      />
      <br />
      <div align="right">
        <Button onClick ={postData} color="primary" >Add</Button>
        <Button onClick={changeModalInsert}>Close</Button>
      </div>
    </div>
  )

return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <br />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start">
        <Button size="large" variant="outlined" onClick={changeModalInsert}>Add new item</Button>
        <Button size="large" variant="outlined" onClick={logout}>Log out </Button>
      </Grid>
      <br /><br />
      <MaterialTable
        detailPanel={rowData => {
          return(<DescriptionComponent data={rowData}/>)
         }}
      columns = {columns}
      data = {data}
      title = "Items"
      actions = {[
        {
          icon: 'edit',
          tooltip: 'Edit Item',
          onClick: (event,rowData) => {
            changeModalEdit();
            setDataEdit(rowData);
          }
        },
        {
          icon: 'delete',
          tooltip: 'Delete Item',
          onClick: (event,rowData) => deleteData(rowData)
          }
      ]}
      options = {{
        actionsColumnIndex: -1
      }}
      localization ={{
        header:{
          actions: 'Actions'
        }
      }}
      />
      <Modal 
      open={modalInsert}
      onClose={changeModalInsert}>
        {bodyInsert}
      </Modal>

      <Modal 
      open={modalEdit}
      onClose={changeModalEdit}>
        <EditItemComponent data={dataedit} changeModalEdit={changeModalEdit} setData={setData} deleteData={deleteData} alldata={data}/>
      </Modal>


    </div>
    
  );
}

export default ItemsTable;
