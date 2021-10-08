import React from 'react';
import { Container, Form, Row,Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Package.css'

export default class Package extends React.Component{

  render()
  {
    const preFormDate = new Date(this.props.timeslot);
    const formatedtime = `${preFormDate.getUTCHours()}:${preFormDate.getUTCMinutes()}`;

    return(
      <Container className = "package-container">
          <Form.Group>
              <Row>
               <Col>
                  <Form.Label className = "package-form-label" >Location:</Form.Label>
                </Col>
                <Col sm = {12} md = {9}  lg = {10} >
                  <Form.Control className = "package-form-control" size = "sm" type = "text" readOnly value = {this.props.location_name}/>
                </Col>
              </Row>
          </Form.Group>
          <Form.Group>
            <Row>
                <Col>
                  <Form.Label className = "package-form-label">Destination:</Form.Label>
                </Col>
                <Col sm = {12} md = {9}  lg = {10}>
                <Form.Control className = "package-form-control" size = "sm" type = "text" readOnly value = {this.props.destination_name}/>
              </Col>
            </Row>
          </Form.Group>
          {
            /*<Form.Group>
              <Row>
                <Col>
                  <Form.Label> Distance:</Form.Label>
                  </Col>
                <Col sm = {12} md = {9}  lg = {10}>
                  <Form.Control size = "sm" type = "text" readOnly value = {this.props.distance}/>
                </Col>
              </Row>
            </Form.Group>*/
          }
          <Form.Group >
            <Row>
              <Col>
                <Form.Label className = "package-form-label">Timeslot:</Form.Label>
              </Col>
              <Col sm = {12} md = {9}  lg = {10}>
                <Form.Control className = "package-form-control" size = "sm" type = "time" readOnly value = {formatedtime}/>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group >
            <Row>
              <Col>
                <Form.Label className = "package-form-label"> Date:</Form.Label>
              </Col>
              <Col sm = {12} md = {9}  lg = {10}>
                <Form.Control className = "package-form-control" size = "sm" type = "date" readOnly value = {this.props.date}/>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label className = "package-form-label">Reference No:</Form.Label>
              </Col>
              <Col sm = {12} md = {9}  lg = {10}>
                <Form.Control  className = "package-form-control" size = "sm" type = "text" readOnly value = {this.props.reference}/>
              </Col>
            </Row>
          </Form.Group>
          <div className = "package-button-container">
            <Link to = {{
                pathname:"/editPackage",
                state: {
                  data:{
                    location_name: this.props.location_name,
                    destination_name: this.props.destination_name,
                    distance: this.props.distance,
                    timeslot: this.props.timeslot,
                    date: this.props.date,
                    reference: this.props.reference,
                    id: this.props.id
                  }
                }
              }}>
              <Button 
                className = "package-button"
              >Edit</Button>
            </Link>
            <Button 
              onClick = {()=>this.props.onDelete(this.props.id, this.props.index)}
              variant = "danger"
            >Delete</Button>
          </div>
      </Container>
    );
  }
}