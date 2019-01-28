import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './index.css';

class Header extends Component {
  Exit = () => {
    localStorage.removeItem('actualUser');
    this.props.exitUser();
  };

  render() {
    return (
      <div className="header">
        <h1>TRELLO!!!</h1>
        <label>{this.props.name}</label>
        <Button onClick={this.Exit}> Exit </Button>
      </div>
    );
  }
}

export default Header;
Header.propTypes = {
  name: PropTypes.string.isRequired,
  exitUser: PropTypes.func.isRequired,
};
