import React, {useState , useEffect } from 'react';
import{Grid,TextField,Button} from '@material-ui/core';
import AuthService from "./../services/auth.service.js";
import { useHistory} from "react-router-dom";


const Login = () => {

    const [newItemData,setnewItemData] = useState({
        "name":"",
        "pass":""
        });

        let history = useHistory();

        function login(){
            AuthService.login(newItemData.name, newItemData.pass).then(() => {
                history.push('/table');
            });
    }

    const handleChange=e=>{
        const {name, value}=e.target;
        setnewItemData(prevState=>({
        ...prevState,
        [name]: value
        }));
    }

    return (
    <Grid
    container
    alignItems="center"
    justify="center"
    style={{ minHeight: "100vh" }}
    >
        <div>
        Usuario:
        <br/>
        <TextField
        required
        variant="outlined"
        label="Name" name="name" onChange={handleChange}
        />
        <br/>
        Contraseña:
        <br/>
        <TextField
        required 
        variant="outlined"
        type = "password"
        label="Pass" name="pass" onChange={handleChange}/>
        <br/>
        <Grid 
        container 
        justify="center">
        <Button  onClick= {login} variant="outlined" color="primary">Login</Button>
        </Grid>
        </div>
        </Grid>
    );
}
export default Login;
