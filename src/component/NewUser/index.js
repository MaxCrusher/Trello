import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  /* componentDidUpdate = () => {
    this.setState({ modal: this.props.isOpen });
  }; */

  toggle = () => {
    const regNum = RegExp(/\d/);
    const regSpace = RegExp(/\s/);
    if (!regNum.test(this.state.name) && !regSpace.test(this.state.name)) {
      this.setState({ name: '' });
      this.props.addUser(this.state.name);
    } else {
      alert('Writing name');
    }
  };

  downEnter = event => {
    if (event.keyCode === 13) {
      this.toggle();
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
            <Button color="primary" onClick={this.toggle}>
              OK
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default NewUser;
NewUser.propTypes = {
  addUser: PropTypes.func.isRequired,

  isOpen: PropTypes.bool.isRequired,
};
