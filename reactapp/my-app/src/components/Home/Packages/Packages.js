import React from 'react';
import axios from 'axios'

export default class Packages extends React.Component{

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

  }

  getPackages = async()=> {
    const response = await axios.get('http://localhost:3000/api/v1/packages');
    const packages = (await response).data

    this.setState({packages});
  }

  render()
  {
    return(
      <>
        <h2>Packages</h2>
        <div>
          <ul>
            
          </ul>
        </div>
      </>
    );
  }
}