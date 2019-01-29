import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      name: '',
      users: [],
    };
  }

  toggle = () => {
    if (this.state.name !== '') {
      this.setState({ modal: !this.state.modal });
      this.props.addUser(this.state.name);
    } else {
      alert('Writing name');
    }
  };

  inputChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Username</ModalHeader>
        <ModalBody>
          <Input placeholder="Check it out" onChange={this.inputChange} value={this.state.name} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            OK
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
export default NewUser;
NewUser.propTypes = {
  addUser: PropTypes.func.isRequired,
};
