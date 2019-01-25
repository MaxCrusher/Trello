import React, { Component } from 'react';
import { Button, Input , Label , Media } from 'reactstrap';
import './index.css'

class Comment extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Media>
                <Media body>
                    <Media heading>
                        {this.props.autor}
                    </Media>
                    {this.props.text}
                </Media>
            </Media>
        )
    }
}
export default Comment