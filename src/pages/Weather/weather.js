import React from "react";

class weather extends React.Component{

  render(){
    return (
      <div>
      {this.props.city &&
        <div>
          <p>Країна: {this.props.country}</p>
          <p>Місто: {this.props.city}</p>
        </div>
      }

      {this.props.error &&
        <div>
          <p>Помилка: {this.props.error}</p>
        </div>
      }
      </div>

    );
  }
}

export default weather;
