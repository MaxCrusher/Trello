import React, { Component } from 'react';
import { Button, Input , Media } from 'reactstrap';
import './index.css'

class Comment extends Component {

    constructor(props){
        super(props)
        this.state = {
            textValue: this.props.text,
        }
    }
    handeleChange = (event) => {
        this.setState({ textValue: event.target.value})
    }
    editComment = () => {
        if(this.props.actualUser === this.props.autor) {
            this.props.editComment(this.props.id, this.state.textValue)
        } else {
            alert('you cannot edit comment')
            this.setState({textValue: this.props.text})
        }
    }
    deleteComment = () => {
        if(this.props.actualUser === this.props.autor || this.props.actualUser === this.props.autorCard){
            this.props.deleteComment(this.props.id)
        } else alert('you cannot delete comment')
    }
    render(){
        return(
            <Media>
                <Media body>
                    <Media heading className = 'comment'>
                        {this.props.autor} <Button color={'danger'} onClick = {this.deleteComment}>Delete</Button>
                    </Media>
                    <Input plaintext onChange = {this.handeleChange} value = {this.state.textValue} onBlur = {this.editComment}/>
                </Media>
            </Media>
        )
    }
}
export default Comment