import React, {useState} from 'react';
import axios from 'axios'
import './EditPackage.css'
import { Link, useLocation,Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function EditPackage ({token,setToken})
{
    const location = useLocation();
    const {data} = location.state;
    const preFormDate = new Date(data.timeslot);
    const formatedtime = `${preFormDate.getUTCHours()}:${preFormDate.getUTCMinutes()}`;
    const [location_name, setLocationName] = useState(data.location_name)
    const [destination_name, setDestinationName] = useState(data.destination_name);
    const [distance, setDistance] = useState(data.distance);
    const [timeslot, setTimeslot] = useState(formatedtime);
    const [date, setDate] = useState(data.timeslot);
    const [reference, setReference] = useState(data.reference);
    const [redirect, setRedirect] = useState(false);

    const locationChanged = (location_name) =>{
        setLocationName(location_name);
    }

    const destinationChanged = (destination_name)=>{
        setDestinationName(destination_name);
    }

    const distanceChanged = (distance) =>{
        setDistance(distance);
    }

    const timeChanged = (timeslot) =>
    {
        setTimeslot(timeslot);
    }

    const dateChanged = (date) =>
    {
        setDate(date);
    }

    const referenceChanged = (reference) =>
    {
        setReference(reference);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        editUserPackage();
    }

    const editUserPackage = async()=> {

        console.log(data.id);
        await axios.put(
            `http://localhost:3000/api/v1/packages/${data.id}`,
            {
                location_name,
                destination_name,
                distance,
                timeslot,
                date,
                reference
            },
            {
                headers: {
                  'Authorization': `${token}` 
                }
            }
        )
        .then(response => {
            //console.log(response);
            setRedirect(true);
            if(response.data.hasOwnProperty("loginRequired"))
            {
                sessionStorage.clear()
                setToken("undefined");
            }

        })
        .catch(error =>{
            console.log("error editing package");
        })
    }

    if(redirect)
    {
        return(
            <Redirect to = {'./home'}/>
        )
    }

    return(
      <Container className = 'edit-package-container'>
        <h2 className = "edit-package-header">Edit Package</h2>
        <Form onSubmit = {handleSubmit}>
            <Form.Group className = "edit-package-form-group">
                <Form.Label className = "edit-package-form-label">Location Name</Form.Label>
                <Form.Control 
                    className = "edit-package-form-control"
                    type="text" 
                    onChange = {e=>locationChanged(e.target.value)}
                    placeholder = {"Enter location"}
                    value = {location_name}
                />
            </Form.Group>
            <Form.Group className = "edit-package-form-group">
                <Form.Label className = "edit-package-form-label">Destination Name</Form.Label>
                <Form.Control 
                    className = "edit-package-form-control"
                    type="text"
                    onChange = {e=>destinationChanged(e.target.value)} 
                    placeholder = {"Enter destination"}
                    value = {destination_name}
                />
            </Form.Group>

            {   
                /*<Form.Group className = "edit-package-form-group">
                    <Form.Label className = "edit-package-form-label">Distance</Form.Label>
                    <Form.Control 
                        className = "edit-package-form-control"
                        type="number"
                        onChange = {e=>distanceChanged(e.target.value)} 
                        placeholder = {"Enter distance"}
                        value = {distance}
                    />
                </Form.Group>*/
            }


            <Form.Group className = "edit-package-form-group">
                <Form.Label className = "edit-package-form-label">Timeslot</Form.Label>
                <Form.Control 
                    className = "edit-package-form-control"
                    type="time"
                    onChange = {e=>timeChanged(e.target.value)} 
                    //placeholder = {"Enter time"}
                    value = {timeslot}
                />
            </Form.Group>

            <Form.Group className = "edit-package-form-group">
                <Form.Label className = "edit-package-form-label">Date</Form.Label>
                <Form.Control 
                    className = "edit-package-form-control"
                    type="date"
                    onChange = {e=>dateChanged(e.target.value)} 
                    placeholder = {"Enter date"}
                    value = {date}
                />
            </Form.Group>

            <Form.Group className = "edit-package-form-group">
                <Form.Label className = "edit-package-form-label">Reference Number</Form.Label>
                <Form.Control 
                    className = "edit-package-form-control"
                    type="number"
                    onChange = {e=>referenceChanged(e.target.value)} 
                    placeholder = {"Enter Reference"}
                    value = {reference}
                />
            </Form.Group>
            <div>
                <Button 
                    className = "form-button-save"
                    type="submit"
                >Save Package</Button>
            </div>
            <div>
                <Link to = "./home">
                    <Button 
                        className = "form-button-cancel"
                        variant = "secondary"
                    >Cancel</Button>
                </Link>
            </div>
        </Form>
      </Container>
    );
}