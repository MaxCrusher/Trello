import React, { Component } from 'react';
import { Button, Input , Label , Media } from 'reactstrap';
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
        console.log(this.props.id, this.state.textValue, "comment")
        this.props.editComment(this.props.id, this.state.textValue)
    }
    deleteComment = () => {
        this.props.deleteComment(this.props.id)
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