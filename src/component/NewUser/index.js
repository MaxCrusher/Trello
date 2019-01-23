import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
//import './index.css'


class NewUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            modal: true,
            name: '',
            users: [],
        };
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
        localStorage.setItem('actualUser', this.state.name)
        this.props.updateActualUser()
        this.addUserToLocalStorage()
    }

    addUserToLocalStorage = () => {
        let check = true
        if(localStorage.getItem('users') !== null) {
            let users = JSON.parse(localStorage.getItem('users'))
            users.map((el) => {
                if(el.name === this.state.name) {
                    check = false
                }
            })
            if(check) {
                users.push({id: users[users.length-1].id + 1, name: this.state.name})
                localStorage.setItem('users', JSON.stringify(users))
                this.props.updateUsers(users)
            }
        } else {
            let { users } = this.state
            users.push({id: 1, name: this.state.name})
            localStorage.setItem('users', JSON.stringify(users) )
        }
    }

    inputChange = (event) => {
        this.setState({name: event.target.value});
    }
    render(){
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Username</ModalHeader>
                    <ModalBody>
                        <Input placeholder="Check it out" onChange={this.inputChange} value={this.state.name}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
                    </ModalFooter>
            </Modal>
        )
    }
}
export default NewUser