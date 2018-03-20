import React, { Component } from 'react';
import './styles/App.css';
import './styles/wealthman.css';
import './styles/proportions.css';

class Manager extends Component {
  render() {
    return (
      <div className="container">
        <div className="user-content">
        Manager: {this.props.user.name} {this.props.user.surname}
        </div>
        <div className="user-menu">
          bbb
        </div>
      </div>
    );
  }
}

export default Manager;
