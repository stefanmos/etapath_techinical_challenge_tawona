import React from 'react';
import axios from 'axios';
//import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Package from './Package/Package';

export default class Home extends React.Component{

  constructor()
  {
    super();
    this.state = {
      packages:[],
    }
  }

  componentDidMount = async () =>
  {
    // get all user's packages
    this.getPackages();
  }

  getPackages = async()=> {
    await axios.post('http://localhost:3000/api/v1/packages/userpackages',{},
    {
      headers: {
        'Authorization': `${this.props.token}` 
      }
  })
    .then(response =>{
        if(response.data.hasOwnProperty("loginRequired"))
        {
            sessionStorage.clear();
            this.props.setToken("undefined");
        }
        else
        {
          const packages = response.data
          this.setState({packages});
        }
        

    })
    .catch(error =>{
      alert("cannot get your packages at this point");
        console.log(error.message);
    })


  }

  onDelete = async (id,index) =>
  {
    await axios.delete(`http://localhost:3000/api/v1/packages/${id}`,{
      headers: {
        'Authorization': `${this.props.token}` 
      }
    })
    .then(response =>{
      if(response.data.hasOwnProperty("loginRequired"))
      {
        sessionStorage.clear()
        this.props.setToken("undefined");
      }
      else
      {
        this.state.packages.splice(index,1);
        this.setState({packages: this.state.packages});
      }
     
    })
    .catch(error =>{
      alert("error deleting package, try again");
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