import React from "react";

class Form extends React.Component{

  render(){
    return (
      <form onSubmit={this.props.getingMethod}>
        <input disabled={this.props.dis} type="text" name="city" placeholder="Введіть місто"/>
        <button disabled={this.props.dis}>Отримати погоду</button>
      </form>
    );
  }
}

export default Form;
