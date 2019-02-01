import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../../actions';
import maxId from '../maxId';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  addUser = () => {
    const regNum = RegExp(/\d/);
    const regSpace = RegExp(/\s/);
    if (!regNum.test(this.state.name) && !regSpace.test(this.state.name)) {
      let newUser = true;
      if (this.props.users !== null) {
        newUser = !!this.props.users.find(elem => elem.name === this.state.name);
      }
      if (!newUser) {
        // addUser and updateActualUser
        const user = {
          id: maxId(this.props.users) + 1,
          name: this.state.name,
        };
        this.props.dispatch(action.updateActualUser(user));
        this.props.dispatch(action.addUser(user));
      } else {
        const user = this.props.users.filter(elem => elem.name === this.state.name);
        this.props.dispatch(action.updateActualUser(user[0]));
      }
      this.toggle();
    } else {
      alert('Writing name');
    }
  };

  toggle = () => {
    this.setState({ name: '' });
    this.props.closeModal();
  };

  downEnter = event => {
    if (event.keyCode === 13) {
      this.addUser();
    }
  };

  inputChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div onKeyDown={this.downEnter}>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Username</ModalHeader>
          <ModalBody>
            <Input placeholder="Check it out" onChange={this.inputChange} value={this.state.name} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser}>
              OK
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users.users,
});
export default connect(mapStateToProps)(NewUser);
NewUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,

  users: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
