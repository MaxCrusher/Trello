import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter,
    CardSubtitle, CardBody } from 'reactstrap';
import './index.css'

class MyCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
          };
      
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }
    render(){
        return(
            <div className='MyCard'>
                <Card className='MyCard'>
                    <CardBody>
                        <CardTitle>{this.props.testPropsForCard}</CardTitle>
                        <CardText> {this.props.testPropsForCard} Autor Card</CardText>
                        <CardText> {this.props.testPropsForCard} Small Description</CardText>
                        <Button color="danger" onClick={this.toggle}>Open</Button>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody> {this.props.testPropsForCard}</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default MyCard