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
            colId: this.props.name.id,
            colName: this.props.name.name
        }
        this.props.updateCards(card)
        this.setState({
            cards: this.props.cards,
            modal: !this.state.modal
        });
    }
    inputChange = (event) => {
        event.target.id === "nameCard" ? this.setState({valueNameCard: event.target.value}) : this.setState({valueDescCard: event.target.value}) 
    }
    render(){
        //console.log(this.state.cards)
        //console.log('render column')
        let cards = this.props.cards.map((elem) => {
            return(
                <MyCard id = {elem.id} name = {elem.nameCard} autor = {elem.autor} description = {elem.descriptionCard} colId = {elem.colId} colName = {elem.colName}/>
            )
        })
        return(
            <div className='blockForTask'>
                <NameCol name={this.props.name.name}/>
                {cards}
                <Button size='sm' color="success" onClick = {this.toggle} block> Add Card</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New Card</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="nameCard">Name Card</Label>
                                <Input type="text" id="nameCard" placeholder="Name Card" onChange={this.inputChange} value={this.state.valueNameCard}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="descriptionCard">Description Card</Label>
                                <Input type="text" id="descriptionCard" placeholder="Description Card" onChange={this.inputChange} value={this.state.valueDescCard}/>
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