import React, { Component } from 'react';
import { Button , Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,} from 'reactstrap';

import NameCol from './NameCol';
import MyCard from '../MyCard'

import './index.css'

class Column extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: this.props.cards,
            modal: false,
            valueNameCard: '',
            valueDescCard: '',
        }
        
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    newCard = () => {
        let card  = {
            id: this.props.maxIdCard + 1,
            autor: JSON.parse(localStorage.getItem('actualUser')),
            nameCard: this.state.valueNameCard,
            descriptionCard: this.state.valueDescCard,
            comments: [],
            colId: this.props.name.id,
            colName: this.props.name.name
        }
        this.props.updateCards(card)
        this.setState({
            cards: this.props.cards,
            modal: !this.state.modal,
            valueNameCard: '',
            valueDescCard: '',
        });
    }
    editCard = (id, name, description) => {
        this.props.editCard(id, name, description)
    }
    editNameCol = (id, name) => {
        this.props.editNameCol(id, name)
    }
    inputChange = (event) => {
        event.target.id === "nameCardCol" ? this.setState({valueNameCard: event.target.value}) : this.setState({valueDescCard: event.target.value}) 
    }
    deleteCard = (id) => {
        this.props.deleteCard(id)
    }
    addComment = (text, autor, idCard) => {
        this.props.addComment(text, autor, idCard)
    }
    render(){
        let cards = this.props.cards.map((elem) => {
            return(
                <MyCard key = {elem.id + elem.nameCard}
                        id = {elem.id}
                        name = {elem.nameCard}
                        autor = {elem.autor}
                        description = {elem.descriptionCard}
                        colId = {elem.colId}
                        colName = {elem.colName}
                        comments = {elem.comments}
                        editCard = {this.editCard}
                        deleteCard = {this.deleteCard}
                        actualUser = {this.props.actualUser}
                        addComment = { this.addComment}/>
            )
        })
        return(
            <div className='blockForTask'>
                <NameCol name={this.props.name.name} id = {this.props.name.id} editNameCol = {this.editNameCol}/>
                {cards}
                <Button size='sm' color="success" onClick = {this.toggle} block> Add Card</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New Card</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="nameCardCol">Name Card</Label>
                                <Input type="text" id="nameCardCol" placeholder="Name Card" onChange={this.inputChange} value={this.state.valueNameCard}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="descriptionCardCol">Description Card</Label>
                                <Input type="text" id="descriptionCardCol" placeholder="Description Card" onChange={this.inputChange} value={this.state.valueDescCard}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.newCard}>OK</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default Column