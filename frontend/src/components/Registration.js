import React, { useState } from 'react';
import "./style.css";
import {Link} from 'react-router-dom';
import { Button , FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default function Registerform() {
    
    const url = "http://localhost:3001/sign_up";
    const[data,setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })
    const [message, setMessage] = useState('');

    function handleChange(e){
        const newdata = {...data}
        newdata[e.target.name] = e.target.value
        setData(newdata)
        console.log(newdata);
    }
    
    function onSubmit(e){
        e.preventDefault();
        axios.post(url,{
            name:data.name,
            email: data.email,
            password: data.password,
            phone:data.phone
        }).then(res => {
            setMessage(res.data.message);
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="col-md-6 main main-form">			
			<form onSubmit = {(e) => onSubmit(e)} method="POST">			
			    <h1> Signup form </h1>
                {message && <div>{message}</div>}
                <FormGroup>
                    <Label for="exampleName">Name</Label>
                    <Input onChange = {(e)=>handleChange(e)} value = {data.name} type="name" name="name" id="exampleName" placeholder="Enter full name" required/>
                </FormGroup>			
			    <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange = {(e)=>handleChange(e)} value = {data.email} type="email" name="email" id="exampleEmail" placeholder="Enter email address" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange = {(e)=>handleChange(e)} value = {data.password} type="password" name="password" id="examplePassword" placeholder="Enter password" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePhone">Phone</Label>
                    <Input onChange = {(e)=>handleChange(e)} value = {data.phone} type="phone" name="phone" id="examplePhone" placeholder="Enter phone number" required/>
                </FormGroup>		
                <Button color="secondary" size="lg" active>Register</Button>				
			</form>
            <div className = "login-link">
                <Link to='./'> Login </Link>
            </div>
		</div>
    );
}