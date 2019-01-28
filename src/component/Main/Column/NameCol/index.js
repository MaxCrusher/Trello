import React, { Component } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

import './index.css';

class NameCol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameColValue: this.props.name,
    };
  }

  handeleChange = event => {
    this.setState({ nameColValue: event.target.value });
  };

  editNameCol = () => {
    this.props.editNameCol(this.props.id, this.state.nameColValue);
  };

  render() {
    return (
      <div className="blockForNameCol">
        <Input
          className="inputColumn"
          plaintext
          onChange={this.handeleChange}
          value={this.state.nameColValue}
          onBlur={this.editNameCol}
        />
      </div>
    );
  }
}
export default NameCol;
NameCol.propTypes = {
  name: PropTypes.string.isRequired,

  id: PropTypes.number.isRequired,

  editNameCol: PropTypes.func.isRequired,
};
