import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Package from './Package/Package';

export default class Home extends React.Component{

  constructor()
  {
    super();
    this.state = {
      packages:[]
    }
  }

  componentDidMount()
  {
    // get all user's packages
    this.getPackages();

    console.log("user id is" + this.props.userData);

  }

  getPackages = async()=> {
    await axios.post('http://localhost:3000/api/v1/packages/userpackages',{
      user_id: 1
    })
    .then(response =>{
        console.log(response.data);
        const packages = response.data
        this.setState({packages});

    })
    .catch(error =>{
        console.log("error getting packages");
        console.log(error.message);
    })


  }

  goToCreatePackages()
  {

  }

  onDelete = async (id,index) =>
  {
    console.log(index);
    await axios.delete(`http://localhost:3000/api/v1/packages/${id}`)
    .then(response =>{
      this.state.packages.splice(index,1);
      this.setState({packages: this.state.packages});
    })
    .catch(error =>{
        console.log("error deleting package");
        console.log(error.message);
    })

  }

  render()
  {
    return(
      <>
        <h2>Packages</h2>
        <Link to = "/createPackage">
            <button type="button">
                Create Package
            </button>
        </Link>
        <div>
            <ul>
                {
                    this.state.packages.map((item, index)=>{
                        return(
                        <Package
                            key = {index}
                            index = {index}
                            id = {item.id}
                            location_name = {item.location || ""}
                            destination_name = {item.destination || ""}
                            distance = {item.distance || ""}
                            timeslot = {item.timeslot || ""}
                            date = {item.date || ""}
                            reference = {item.reference_number || ""}
                            onDelete = {this.onDelete}
                        />
                        )
                    })
                }
            </ul>
        </div>
      </>
    );
  }
}