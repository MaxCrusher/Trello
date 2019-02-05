import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import NewUser from '../NewUser';
import './index.css';
import * as action from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount = () => {
    if (Object.keys(this.props.actualUser).length === 0) {
      this.setState({ isOpen: true });
    } else {
      this.setState({ isOpen: false });
    }
  };

  blur = () => {
    document.getElementById('butExit').blur();
  };

  exitUser = () => {
    this.props.updateActualUser({});
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div className="header">
        <h1>TRELLO!!!</h1>
        <label>{this.props.actualUser.name}</label>
        <Button
          id="butExit"
          onClick={() => {
            this.exitUser();
            this.blur();
          }}
        >
          Exit
        </Button>
        <NewUser isOpen={this.state.isOpen} closeModal={this.closeModal} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  actualUser: state.actualUser.actualUser,
});

const mapDispatchToProps = {
  updateActualUser: action.updateActualUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

Header.propTypes = {
  actualUser: PropTypes.object.isRequired,
  updateActualUser: PropTypes.func.isRequired,
};
