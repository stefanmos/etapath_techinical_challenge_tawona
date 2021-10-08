import React from "react";
import axios from 'axios'
import { Button,Container,Form} from "react-bootstrap";


import './Login.css'

export default class Login extends React.Component{

    constructor()
    {
        super()
        this.state = {
            email: "",
            password: "",
        }
    }

    emailChanged =(email)=>
    {
        this.setState({email});
    }

    passwordChanged =(password)=>
    {
        this.setState({password});
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.loginUser()
        .then(res=>{
            console.log(res);
            const token = res.data.jwt;
            this.props.setToken({token});
        })
        .catch(err => console.log(err));    
    }

    loginUser = async () =>
    {
        return new Promise((resolve,reject) =>{

            axios.post('http://localhost:3000/api/v1/sessions',
            {
                email: this.state.email,
                password: this.state.password
            })
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                alert("wrong user name and password");
                reject(err);
            })
        })
    }

    render()
    {
        return (
            <Container className = "login-container">
                <h1 className = "login-header"> Login to your account </h1>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Group className = "login-form-group">
                        <Form.Label className = "login-form-label">Email:</Form.Label>
                        <Form.Control 
                            className = "login-form-control"
                            type="email" 
                            onChange = {e=>this.emailChanged(e.target.value)}
                            placeholder = {"Enter email"}
                            value = {this.state.email}
                        />
                    </Form.Group>
                    
                    <Form.Group className = "login-form-group">
                        <Form.Label className = "login-form-label">Password:</Form.Label>
                        <Form.Control 
                            className = "login-form-control"
                            type="password"
                            onChange = {e=>this.passwordChanged(e.target.value)} 
                            placeholder = {"Enter password"}
                            value = {this.state.password}
                        />
                    </Form.Group>
                        <Button className = "mt-3"
                            type="submit"
                        >Login</Button>
                </Form>
            </Container>
           
        )
    }
   
}