import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter, CardBody , Input , Label , Media } from 'reactstrap';
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
        this.props.editCard(this.props.id, this.state.nameValue, this.state.descriptionValue)
        this.toggle()
    }
    handeleChange = (event) => {
            event.target.id === "nameCard" ?
                this.setState({ nameValue: event.target.value}) : 
                event.target.id === "descriptionCard" ? 
                    this.setState({ descriptionValue: event.target.value }) : 
                    this.setState({ comment: event.target.value })
    }
    Delete = () => {
        this.props.deleteCard(this.props.id)
        this.toggle()
    }
    editComment = (id, text) => {
        this.props.editComment(id, text, this.props.id)
    }
    addComment = () => {
        this.props.addComment(this.state.comment, this.props.actualUser.name, this.props.id)
        //comments = <Comment text = {this.state.comment} autor = {this.state.actualUser} /*editComment = {} deleteComment = {}*//>
        this.setState({ comment: '' })
    }
    deleteComment = (id) => {
        this.props.deleteComment(id, this.props.id)
    }
    render(){
        let comments = this.state.comments.map((elem)=>{
            return (
                <Comment text = {elem.text} autor = {elem.autor} id = {elem.id} editComment = {this.editComment} deleteComment = {this.deleteComment}/>
            )
        })
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