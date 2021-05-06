import React, {useState} from 'react';
import{Grid,TextField,Button} from '@material-ui/core';
import AuthService from "./../services/auth.service.js";
import { useHistory} from "react-router-dom";


const Login = () => {

    const [newItemData,setnewItemData] = useState({
        "name":"",
        "pass":"",
        "error":false,
        "errorText":""
        });

        let history = useHistory();

        function login(){
            AuthService.login(newItemData.name, newItemData.pass).then(() => {
                history.push('/table');
            }).catch((wtf)=>{
                console.log(wtf);
                setnewItemData(prevState=>({
                    ...prevState,
                    error: true
                    }))
                    setnewItemData(prevState=>({
                        ...prevState,
                        errorText: "Wrong Password"
                        }))
                }
              )
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
            <Grid 
                item
                align="center"
                > 
                Usuario:
            <br/>
            <TextField
                id="Name"
                required
                variant="outlined"
                name="name" onChange={handleChange}
            />
            </Grid>
            <Grid 
                item
                align="center"
                >
            Contraseña:
            <br/>
            <TextField
                id="Pass"
                error={newItemData.error}
                helperText={newItemData.errorText}
                required 
                variant="outlined"
                type = "password"
                name="pass" onChange={handleChange}/>
            </Grid>
            <Grid 
                item
                align="center"
                >
                <Button  onClick= {login} variant="outlined" color="primary">Login</Button>
            </Grid>
        </div>
    </Grid>
    );
}
export default Login;
