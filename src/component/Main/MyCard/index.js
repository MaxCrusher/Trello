import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter, CardBody , Input , Label } from 'reactstrap';
import Comment from './Comment'
import './index.css'

//let comments = null

class MyCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            nameValue: this.props.name,
            descriptionValue: this.props.description,
            comment: '',
            actualUser: this.props.actualUser.name,
            comments: this.props.comments
            
        };
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }
    Edit = () => {
        if(this.props.autor.id === this.props.actualUser.id)  {
            this.props.editCard(this.props.id, this.state.nameValue, this.state.descriptionValue)
            this.toggle()
        } else { 
            alert('you cannot edit card')
            this.setState({nameValue: this.props.name, descriptionValue: this.props.description})
        }
    }
    handeleChange = (event) => {
            event.target.id === "nameCard" ?
                this.setState({ nameValue: event.target.value}) : 
                event.target.id === "descriptionCard" ? 
                    this.setState({ descriptionValue: event.target.value }) : 
                    this.setState({ comment: event.target.value })
    }
    Delete = () => {
        if(this.props.autor.id === this.props.actualUser.id) {
            this.props.deleteCard(this.props.id)
            this.toggle()
        } else alert('you cannot delete card')
    }
    editComment = (id, text) => {
        this.props.editComment(id, text, this.props.id)
    }
    addComment = () => {
        this.props.addComment(this.state.comment, this.props.actualUser.name, this.props.id)
        this.setState({ comment: '' })
    }
    deleteComment = (id) => {
        this.props.deleteComment(id, this.props.id)
    }
    render(){
        let propertyInput = true
        this.props.actualUser.name === this.props.autor.name ? propertyInput = false : propertyInput = true
        let comments = this.state.comments.map((elem)=>{
            return (
                <Comment key = {elem.id + elem.autor} text = {elem.text} autor = {elem.autor} autorCard={this.props.autor.name} actualUser={this.props.actualUser.name} id = {elem.id} editComment = {this.editComment} deleteComment = {this.deleteComment}/>
            )
        })
        return(
            <div className='MyCard'>
                <Card className='MyCard'>
                    <CardBody>
                        <CardTitle>{this.props.name}</CardTitle>
                        <CardText> {this.props.colName} </CardText>
                        <CardText> Autor: {this.props.autor.name} </CardText>
                        <CardText> {this.props.description} </CardText>
                        <Button color="danger" onClick={this.toggle}>Open</Button>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal}  className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        <Input plaintext={true} readOnly={propertyInput} id='nameCard' onChange = {this.handeleChange} value = {this.state.nameValue}/>
                    </ModalHeader>
                    <ModalBody>
                        <Label>Type: {this.props.colName}</Label>                    
                        <br/>
                        <Label>Description: </Label><Input plaintext={true} readOnly={propertyInput} id='descriptionCard' onChange = {this.handeleChange} value = {this.state.descriptionValue}/>
                        <br/>                        
                        <Label>Autor: {this.props.autor.name}</Label>
                        <br/>
                        <div className = 'buttons_left'>
                            <Button className = 'button' color="primary" onClick={this.Edit}>Edit</Button>
                            <Button color="secondary" onClick={this.Delete}>Delete</Button>
                        </div>
                    </ModalBody>

                    <ModalFooter className = 'footModal'>
                        <Label>Comments: </Label>
                        <div className = 'newCommentBlock'>
                            <Label className = 'autorComment'>{this.props.actualUser.name}</Label>
                            <Input type='text' placeholder ='comment' id='comment' onChange={this.handeleChange} value = {this.state.comment}/>
                        </div>
                        <Button color='success' onClick = {this.addComment}>Add Comment</Button>
                    </ModalFooter>
                    <ModalFooter className = 'footModal'>
                        {comments}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default MyCard