import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter, CardBody , Input , Label } from 'reactstrap';
import './index.css'

class MyCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            nameValue: this.props.name,
            descriptionValue: this.props.description,
        };
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }
    Edit = () => {
        this.props.editCard(this.props.id, this.state.nameValue, this.state.descriptionValue)
        this.toggle()
    }
    handeleChange = (event) => {
            event.target.id === "nameCard" ?
                this.setState({ nameValue: event.target.value}) : 
                this.setState({ descriptionValue: event.target.value })
    }
    Delete = () => {
        this.props.deleteCard(this.props.id)
        this.toggle()
    }
    render(){
        return(
            <div className='MyCard'>
                <Card className='MyCard'>
                    <CardBody>
                        <CardTitle>{this.state.nameValue}</CardTitle>
                        <CardText> {this.props.colName} </CardText>
                        <CardText> Autor: {this.props.autor.name} </CardText>
                        <CardText> {this.state.descriptionValue} </CardText>
                        <Button color="danger" onClick={this.toggle}>Open</Button>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        <Input plaintext id='nameCard' onChange = {this.handeleChange} value = {this.state.nameValue}/>
                    </ModalHeader>
                    <ModalBody>
                        <Label>Type: {this.props.colName}</Label>                    
                        <br/>
                        <Label>Description: </Label><Input plaintext id='descriptionCard' onChange = {this.handeleChange} value = {this.state.descriptionValue}/>
                        <br/>                        
                        <Label>Autor: {this.props.autor.name}</Label>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.Edit}>Edit</Button>{' '}
                        <Button color="secondary" onClick={this.Delete}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default MyCard