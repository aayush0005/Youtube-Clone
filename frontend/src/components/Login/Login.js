import React, { useState, setUserSession, props } from 'react';
import "./style.css";
import {Link} from 'react-router-dom';
import { Button , FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default function Loginform() {
    
   const[email,setEmail] = useState('');
   const[password,setPassword] = useState('');
   const[error,setError] = useState();
   const[loading,setLoading] = useState(false);

   const handleLogin = () =>{
     setError();
     setLoading(true);

     axios.post('http:/localhost:3001/login',{
       email:email,
       password:password
     })
     .then(response => {
       setLoading(false);
       setUserSession(response.data.token, response.data.user)
       props.history.push("/userlist");
     })
     .catch(error =>{
       setLoading(false);

       if(error.response.status === 401 || error.response.status === 400){
         setError(error.response.data.message);
       }
       else{
        setError("Please try again");
        //  console.Error("Please try again")
       }
     })
   }   


    return (
        <div className="col-md-6 main main-form">			
			<form action = "/login" method="POST">			
			    <h1> Login </h1>	
			    <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange = {e => setEmail(e.target.value)} value = {email} type="email" name="email" id="exampleEmail" placeholder="Enter email address" required/>
          </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange = {e => setPassword(e.target.value)} value = {password} type="password" name="password" id="examplePassword" placeholder="Enter password" required/>
                </FormGroup>

                 {error && <div class = "error">{error}</div>}

                <Button color="secondary" onClick ={handleLogin} size="lg" active value={loading? "loding...":false}>Submit</Button>				
			</form>
            <div className = "register-link">
                <Link to='./Register' > Get register</Link>
            </div>

            <div className = "forgot-link">
                <Link to='./Forgotpassword' > Forgot password ? </Link>
            </div>
		</div>
    );
}
