import React from 'react';
import axios from 'axios'
import './CreatePackage.css'
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <Container className = "create-package-container">
        <h2 className = "create-package-header">Create Package</h2>
        <Form onSubmit = {this.handleSubmit}>
            <Form.Group className = "create-package-form-group">
                <Form.Label className = "create-package-form-label">Location Name: </Form.Label>
                <Form.Control 
                    className = "create-package-form-control"
                    type="text" 
                    onChange = {e=>this.locationChanged(e.target.value)}
                    placeholder = {"Enter location"}
                    value = {this.state.location_name}
                />
            </Form.Group>
            <Form.Group className = "create-package-form-group">
                <Form.Label className = "create-package-form-label">Destination Name:</Form.Label>
                <Form.Control 
                    className = "create-package-form-control"
                    type="text"
                    onChange = {e=>this.destinationChanged(e.target.value)} 
                    placeholder = {"Enter destination"}
                    value = {this.state.destination_name}
                />
            </Form.Group>

            {
               /* <Form.Group className = "create-package-form-group">
                    <Form.Label className = "create-package-form-label">Distance</Form.Label>
                    <Form.Control
                        className = "create-package-form-control" 
                        type="number"
                        onChange = {e=>this.distanceChanged(e.target.value)} 
                        placeholder = {"Enter distance"}
                        value = {this.state.distance}
                    />
                </Form.Group>*/
            }

            <Form.Group className = "create-package-form-group">
                <Form.Label className = "create-package-form-label">Timeslot:</Form.Label>
                <Form.Control
                    className = "create-package-form-control"
                    type="time"
                    onChange = {e=>this.timeChanged(e.target.value)} 
                    //placeholder = {"Enter time"}
                    value = {this.state.timeslot}
                />
            </Form.Group>

            <Form.Group className = "create-package-form-group">
                <Form.Label className = "create-package-form-label">Date:</Form.Label>
                <Form.Control 
                    className = "create-package-form-control"
                    type="date"
                    onChange = {e=>this.dateChanged(e.target.value)} 
                    placeholder = {"Enter date"}
                    value = {this.state.date}
                />
            </Form.Group>

            <Form.Group className = "create-package-form-group">
                <Form.Label className = "create-package-form-label">Reference Number:</Form.Label>
                <Form.Control 
                    className = "create-package-form-control"
                    type="number"
                    onChange = {e=>this.referenceChanged(e.target.value)} 
                    placeholder = {"Enter Reference"}
                    value = {this.state.reference}
                />
            </Form.Group>
            
            <div className = "form-button-save">
                <Button type="submit">Save Package</Button>
            </div>
            <div >
                <Link to = {"./home"}> 
                    <Button 
                        className = "form-button-cancel"
                        variant  = "secondary"
                    >Cancel</Button>
                </Link>
            </div>
        </Form>
      </Container>
    );
  }
}