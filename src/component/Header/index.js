import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './index.css';

class Header extends Component {
  blur = () => {
    document.getElementById('butExit').blur();
  };

  render() {
    return (
      <div className="header">
        <h1>TRELLO!!!</h1>
        <label>{this.props.name}</label>
        <Button
          id="butExit"
          onClick={() => {
            this.props.exitUser();
            this.blur();
          }}
        >
          Exit
        </Button>
      </div>
    );
  }
}

export default Header;
Header.propTypes = {
  name: PropTypes.string.isRequired,
  exitUser: PropTypes.func.isRequired,
};
