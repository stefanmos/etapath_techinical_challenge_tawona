import React from 'react';
import { Link } from 'react-router-dom';
import './Package.css'

export default class Package extends React.Component{

  render()
  {
    const preFormDate = new Date(this.props.timeslot);
    const formatedtime = `${preFormDate.getUTCHours()}:${preFormDate.getUTCMinutes()}`;

    return(
      <>
        <div className = "package-container">
          <div className = "package-entry">
            <label className = "package-label">Location Name:    </label>
            <input type = "text" disabled = {true} value = {this.props.location_name}/>
          </div>
          <div className = "package-entry">
            <label>Destination Name:    </label>
            <input type = "text" disabled = {true} value = {this.props.destination_name}/>
          </div>
          <div className = "package-entry">
            <label> Distance:    </label>
            <input type = "text" disabled = {true} value = {this.props.distance}/>
          </div>
          <div className = "package-entry">
            <label>Timeslot:   </label>
            <input type = "time" disabled = {true} value = {formatedtime}/>
          </div>
          <div className = "package-entry">
            <label> Date:    </label>
            <input type = "date" disabled = {true} value = {this.props.date}/>
          </div>
          <div className = "package-entry">
            <label>Reference Number:    </label>
            <input type = "text" disabled = {true} value = {this.props.reference}/>
          </div>
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
              <button>Edit</button>
            </Link>
            <button onClick = {()=>this.props.onDelete(this.props.id, this.props.index)}>Delete</button>
          </div>
        </div>
      </>
    );
  }
}