import React, {useState , useEffect } from 'react';
import MaterialTable from 'material-table'
import axios from 'axios';
import{Modal,TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import ItemsService from "../services/items.service.js";
import AuthService from "../services/auth.service.js";
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

const ItemsTable = () => {

  const styles = useStyles();
  
  const itemsService = ItemsService;
  const authService = AuthService;

  const [data,setData] = useState([]);
  const [modalInsert,setModalInsert] = useState(false);
  const [newItemData,setnewItemData] = useState({
  "creationDate": moment().format('YYYY-MM-DD'),
  "description":"",
  "state":"",
  "price":"", 
  "creator": authService.getCurrentUser().username
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setnewItemData(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  const GetData = async() =>{
    await itemsService.findAll().then(response => {
      setData(data.concat(response.data));
    })
  }

  const postData = async() =>{
    await  itemsService.addItem(newItemData).then(response => {
      setData(data.concat(newItemData));
      changeModalInsert();
    })
  }
  const deleteData = async(idItem) =>{
    await itemsService.deleteItem(idItem).then(response => {
    
    })
  }

  const changeModalInsert =() =>{
    setModalInsert(!modalInsert);
  }

  useEffect(() =>{
    GetData();
  },[])

  const bodyInsert = (
    <div className={styles.modal}>
      <h3>Add new Item</h3>
      <TextField className={styles.inputMaterial} label="Description" name="description" onChange={handleChange} />          
      <br />
      <TextField className={styles.inputMaterial} label="State" name="state" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Price" name="price" onChange={handleChange} />
      <br />
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
      <Button onClick={changeModalInsert}>Add new item</Button>
      <br /><br />
      <MaterialTable
      columns = {columns}
      data = {data}
      title = "Items"
      actions = {[
        {
        icon: 'edit',
        tooltip: 'Edit Item',
        onClick: (event,rowData) => deleteData(rowData)
        },
        {
          icon: 'delete',
          tooltip: 'Delete Item',
          onClick: (event,rowData) => console.log(rowData)
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
    </div>
  );
}

export default ItemsTable;
