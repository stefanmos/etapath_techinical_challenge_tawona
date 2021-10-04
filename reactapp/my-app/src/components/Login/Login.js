import React from "react";
import axios from 'axios'

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
            <div className = "login-wrapper">
                <h1> Login to your account </h1>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        <p>Email</p>
                        <input 
                            type="text" 
                            onChange = {e=>this.emailChanged(e.target.value)}
                            placeholder = {"Enter email"}
                            value = {this.state.email}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input 
                            type="password"
                            onChange = {e=>this.passwordChanged(e.target.value)} 
                            placeholder = {"Enter password"}
                            value = {this.state.password}
                        />
                    </label>
                    <div>
                        <button 
                            type="submit"
                        >Submit</button>
                    </div>
                </form>
            </div>
           
        )
    }
   
}