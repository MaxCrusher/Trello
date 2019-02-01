import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../../../actions';
import maxId from '../../../maxId';

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
    if (event.keyCode === 13 && this.props.modal) {
      this.addCard();
    }
  };

  addCard = () => {
    if (this.state.valueDescCard !== '' && this.state.valueNameCard !== '') {
      this.toggle();
      const card = {
        id: maxId(this.props.cards) + 1,
        name: this.state.valueNameCard,
        description: this.state.valueDescCard,
        idCol: this.props.id,
        autor: this.props.actualUser,
      };
      this.props.dispatch(action.addCard(card));
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
const mapStateToProps = state => ({
  actualUser: state.actualUser.actualUser,
  cards: state.cards.cards,
});
export default connect(mapStateToProps)(AddCardModal);
AddCardModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,

  actualUser: PropTypes.object.isRequired,

  id: PropTypes.number.isRequired,

  cards: PropTypes.array.isRequired,

  modal: PropTypes.bool.isRequired,
};
