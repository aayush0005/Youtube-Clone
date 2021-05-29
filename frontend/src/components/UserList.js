import React from 'react';
import "./style.css";
import "./Login/Login";
import { Table } from 'reactstrap';

function Dashboard(props) {
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/');
    }
        <user {...this.props} details = {this.state.details}/>
           return (
           <div className = "table">
           <h2>Welcome {user}</h2>
           <div class ="Logout"><input type="button" onClick={handleLogout} value="Logout" /></div>
             <Table striped>
                 <thead>
                     <tr>
                         <tr>#</tr>
                         <tr>Name</tr>
                         <tr>Email</tr>
                         <tr>Phone</tr>
                     </tr>
                 </thead>
             </Table>
           </div>
           )
}

export default Dashboard