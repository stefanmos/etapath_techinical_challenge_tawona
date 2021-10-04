import React from 'react';
import axios from 'axios'
import './CreatePackage.css'
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';

export default class CreatePackage extends React.Component{

    constructor()
    {
        super();
        this.state = {
        location_name: "",
        destination_name: "",
        distance: 0,
        timeslot: "",
        date: "",
        reference: 0,
        redirect: false,
        userId:""
        }
    }

    componentDidMount = async () =>
    {
        const jwtDecoded = jwtDecode(this.props.token); 
        const {id} = jwtDecoded;
        await this.setState({userId:id});
    }


    locationChanged = (location_name) =>{
        this.setState({location_name});
    }

    destinationChanged = (destination_name)=>{
        this.setState({destination_name});
    }

    distanceChanged = (distance) =>{
        this.setState({distance});
    }

    timeChanged = (timeslot) =>
    {
        this.setState({timeslot});
    }

    dateChanged = (date) =>
    {
        this.setState({date});
    }

    referenceChanged = (reference) =>
    {
        this.setState({reference});
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.createUserPackage();
    }

    createUserPackage = async()=> {

        await axios.post(
            'http://localhost:3000/api/v1/packages',
            {
                location: this.state.location_name,
                destination: this.state.destination_name,
                distance: this.state.distance,
                timeslot:this.state.timeslot,
                date: this.state.date,
                reference_number: this.state.reference,
                user_id: this.state.userId
            },
            {
                headers: {
                  'Authorization': `${this.props.token}` 
                }
            }
        )
        .then(response => {
            this.setState({redirect: true});
        })
        .catch(error =>{
            console.log("error creating package");
            alert(" could not create package try again");
        })
    }



  render()
  {
    if(this.state.redirect)
    {
        return(
            <Redirect to = {"/home"}></Redirect>
        )
    }
    return(
      <div className = 'create-package-wrapper'>
        <h2>Create Package</h2>
        <form onSubmit = {this.handleSubmit}>
            <label>
                <p>Location Name</p>
                <input 
                    type="text" 
                    onChange = {e=>this.locationChanged(e.target.value)}
                    placeholder = {"Enter location"}
                    value = {this.state.location_name}
                />
            </label>
            <label>
                <p>Destination Name</p>
                <input 
                    type="text"
                    onChange = {e=>this.destinationChanged(e.target.value)} 
                    placeholder = {"Enter destination"}
                    value = {this.state.destination_name}
                />
            </label>

            <label>
                <p>Distance</p>
                <input 
                    type="number"
                    onChange = {e=>this.distanceChanged(e.target.value)} 
                    placeholder = {"Enter distance"}
                    value = {this.state.distance}
                />
            </label>

            <label>
                <p>Timeslot</p>
                <input 
                    type="time"
                    onChange = {e=>this.timeChanged(e.target.value)} 
                    //placeholder = {"Enter time"}
                    value = {this.state.timeslot}
                />
            </label>

            <label>
                <p>Date</p>
                <input 
                    type="date"
                    onChange = {e=>this.dateChanged(e.target.value)} 
                    placeholder = {"Enter date"}
                    value = {this.state.date}
                />
            </label>

            <label>
                <p>Reference Number</p>
                <input 
                    type="number"
                    onChange = {e=>this.referenceChanged(e.target.value)} 
                    placeholder = {"Enter Reference"}
                    value = {this.state.reference}
                />
            </label>
            <div>
                <button 
                    type="submit"
                >Save Package</button>
            </div>
            <div>
                <button 
                    type="submit"
                >Cancel</button>
            </div>
        </form>
      </div>
    );
  }
}