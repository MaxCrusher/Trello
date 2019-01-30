import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class AddCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueNameCard: '',
      valueDescCard: '',
    };
  }

  toggle = () => {
    this.props.toggle();
  };

  downEnter = event => {
    console.log(event.keyCode, this.props.modal);
    if (event.keyCode === 13 && this.props.modal) {
      this.addCard();
    }
  };

  addCard = () => {
    if (this.state.valueDescCard !== '' && this.state.valueNameCard !== '') {
      this.toggle();
      this.props.addCard(this.state.valueNameCard, this.state.valueDescCard, this.props.id);
      this.setState({ valueNameCard: '', valueDescCard: '' });
    } else alert('Checking forms');
  };

  inputChange = event => {
    if (event.target.id === 'nameCardCol') {
      this.setState({ valueNameCard: event.target.value });
    } else this.setState({ valueDescCard: event.target.value });
  };

  render() {
    return (
      <div onKeyDown={this.downEnter}>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader toggle={this.toggle}>New Card</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nameCardCol">Name Card</Label>
                <Input
                  type="text"
                  id="nameCardCol"
                  placeholder="Name Card"
                  onChange={this.inputChange}
                  value={this.state.valueNameCard}
                />
              </FormGroup>
              <FormGroup>
                <Label for="descriptionCardCol">Description Card</Label>
                <Input
                  type="text"
                  id="descriptionCardCol"
                  placeholder="Description Card"
                  onChange={this.inputChange}
                  value={this.state.valueDescCard}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addCard}>
              OK
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default AddCardModal;
AddCardModal.propTypes = {
  addCard: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,

  id: PropTypes.number.isRequired,

  modal: PropTypes.bool.isRequired,
};
