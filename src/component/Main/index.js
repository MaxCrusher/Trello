import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Column from './Column'

import  './Column'
import './index.css'

let maxId = 0
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: this.props.columns,
            CardsForCol: [],
            cards: [],
            maxId: 0
        }
    }
    componentWillMount(){
        if(this.props.cards !== 'null') {
            let CardsForCol = []
            CardsForCol.push(this.sort(1, this.props.cards))
            CardsForCol.push(this.sort(2, this.props.cards))
            CardsForCol.push(this.sort(3, this.props.cards))
            CardsForCol.push(this.sort(4, this.props.cards))
            this.setState({
                CardsForCol: CardsForCol,
                cards: this.props.cards,
            }, this.maxId(maxId))
        }
    }

    sort(id, cards){
        return(
            cards.filter((elem)=>{
                maxId < elem.id ? maxId = elem.id : maxId = maxId
                return elem.colId === id
            })
        )
    }

    updateCardsAll = (card) => {
        let { cards } = this.state
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
        this.setStateWithoutId(cards, true)
    }

    maxId = (max) => {
        this.setState({maxId: max})
    }

    editCard = (id, name, description) => {
        let { cards } = this.state 
        cards.map((elem) => {
            if(elem.id === id) {
                elem.nameCard = name
                elem.descriptionCard = description
            }
        })
        localStorage.setItem('cards', JSON.stringify(cards))
        this.setState({
            cards: cards
        })
    }

    editNameCol = (id, name) => {
        let { columns } = this.state
        columns.map((elem) => {
            if(elem.id === id) {
                elem.name = name
            }
        })
        localStorage.setItem('columns', JSON.stringify(columns))
        this.setState({
            columns: columns
        })
    }
    deleteCard = (id) => {
        let { cards } = this.state
        let numDeleteCard = null
        cards.map((elem, i) => {
            if(elem.id === id) {
                numDeleteCard = i
            }
        })
        cards.splice(numDeleteCard, 1)
        localStorage.setItem('cards', JSON.stringify(cards))
        this.setStateWithoutId(cards, true)
    }

    deleteComment = (id, idCard) => {
        let { cards } = this.state 
        let numDeleteComment = null
        let numCard = null
        cards.map((elem, i)=>{
            if(elem.id === idCard) {
                numCard = i
                elem.comments.map((elem, i)=>{
                    if(elem.id === id) {
                        numDeleteComment = i
                    }
                })
            }
        })
        cards[numCard].comments.splice(numDeleteComment, 1)
        localStorage.setItem('cards', JSON.stringify(cards))
        this.setStateWithoutId(cards)
    }

    editComment = (id, text, idCard) => {
        let { cards } = this.state 
        cards.map((elem)=>{
            if(elem.id === idCard) {
                elem.comments.map((elem)=>{
                    if(elem.id === id) {
                        elem.text = text
                    }
                })
            }
        })
        localStorage.setItem('cards', JSON.stringify(cards))
        this.setStateWithoutId(cards)
    }

    setStateWithoutId = (cards, max=false) => {
        let CardsForCol = []
        this.setState({ cards: cards }, () => {

            CardsForCol.push(this.sort(1, this.props.cards))
            CardsForCol.push(this.sort(2, this.props.cards))
            CardsForCol.push(this.sort(3, this.props.cards))
            CardsForCol.push(this.sort(4, this.props.cards))

            this.setState({
                CardsForCol: CardsForCol,
            }, ()=> { if(max) { this.maxId(maxId) } })
        }
            
        )
    }

    addComment = (text, autor, idCard) => {
        let { cards } = this.state 
        cards.map((elem)=>{
            if(elem.id === idCard) {
                console.log(elem.comments)
                if (elem.comments.length === 0) { 
                    elem.comments.push({id:1, autor: autor, text: text})
                } else {
                    elem.comments.push({id: elem.comments[elem.comments.length-1].id+1, autor: autor, text: text})
                }
            }
        })
        localStorage.setItem('cards', JSON.stringify(cards))
        this.setStateWithoutId(cards)
    }
    
    render(){
        let column = this.state.CardsForCol.map((elem, i)=>{
            return (
            <Col xs={12} sm={6} md={6} lg={3} className='col_margin' key = {i}>
                <Column name={this.state.columns[i]} cards={elem} editNameCol = {this.editNameCol} deleteCard = {this.deleteCard}
                        actualUser = {this.props.actualUser} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId} editCard = {this.editCard} 
                        addComment = {this.addComment} editComment = {this.editComment} deleteComment = {this.deleteComment}/>
            </Col>
            )
        })
        return(
            <div className='mainBlock'>
            <Container>
                <Row>
                    { column }
                </Row>
            </Container>
            </div>
        )
    }
}
export default Main