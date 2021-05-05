import React, {useState , useEffect } from 'react';
import MaterialTable from 'material-table'
import{Modal,TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import ItemsService from "../services/items.service.js";
import AuthService from "../services/auth.service.js";
import VendorService from "../services/vendor.service.js";
import { Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { useHistory} from "react-router-dom";
import DescriptionComponent from "../Components/DescriptionComponent.js";
import EditItemComponent from "../Components/EditItemComponent.js";

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

  const [data,setData] = useState([]);
  const [dataedit,setDataEdit] = useState([]);
  const [modalInsert,setModalInsert] = useState(false);
  const [modalEdit,setModalEdit] = useState(false);
  const [newItemData,setnewItemData] = useState({
  "creationDate": moment().format('YYYY-MM-DD'),
  "description":"",
  "state":"",
  "price":"", 
  "creator": authService.getCurrentUser().username,
  "vendor":""
  })
  const [options, setOptions] = useState([]);

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

  const GetData = async() =>{
    await itemsService.findAll().then(response => {
      setData(data.concat(response.data));
    })
  }

  const postData = async() =>{
    await  itemsService.addItem(newItemData).then(response => {
      setData(data.concat(response.data));
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
        setOptions(response.data);
        })
    }
    const logout = () =>{
      authService.logout();
      history.push('/');
    }

  const changeModalInsert = () =>{
    setModalInsert(!modalInsert);
  }

  const changeModalEdit = (data) =>{
    setDataEdit(data);
    setModalEdit(!modalEdit);
  }

  useEffect(() =>{
    GetData();
  },[])

  const bodyInsert = (
    <div className={styles.modal}>
      <h3>Add new Item</h3>
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

return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <br />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start">
        <Button onClick={changeModalInsert}>Add new item</Button>
        <Button onClick={changeModalInsert}>Add user</Button>
        <Button onClick={logout}>Log out </Button>
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
          onClick: (event,rowData) => changeModalEdit(rowData)
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
        <EditItemComponent data={dataedit}/>
      </Modal>


    </div>
    
  );
}

export default ItemsTable;
