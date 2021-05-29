import React, { useState } from 'react';
import "./style.css";
import "./Login";
import { Button , FormGroup, Label, Input } from 'reactstrap';

function Forgotpassword(props){
    const [email,setEmail] = useState('');

return(
    <div className = "col-md-6 main main-form">
         <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange = {e => setEmail(e.target.value)} value = {email} type="email" name="email" id="exampleEmail" placeholder="Enter email address" required/>
                    <Button color="secondary" size="lg">Reset Password</Button>
          </FormGroup>
    </div>
)
}

export default Forgotpassword