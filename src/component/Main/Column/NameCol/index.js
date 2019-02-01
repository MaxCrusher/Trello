import React, { Component } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../../../actions';

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
    const column = {
      id: this.props.id,
      name: this.state.nameColValue,
    };
    this.props.dispatch(action.editColumnName(column));
  };

  render() {
    console.log(this.props);
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
export default connect()(NameCol);
NameCol.propTypes = {
  name: PropTypes.string.isRequired,

  id: PropTypes.number.isRequired,

  dispatch: PropTypes.func.isRequired,
};
