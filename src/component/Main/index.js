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
            CardsForCol1:[],
            CardsForCol2:[],
            CardsForCol3:[],
            CardsForCol4:[],
            cards: [],
            maxId: 0
        }
    }
    componentWillMount(){
        if(this.props.cards !== 'null') {
            this.setState({
                cards: this.props.cards,
                // сортируем по коллоннам
                
                CardsForCol1: this.sort(1, this.props.cards),
                CardsForCol2: this.sort(2, this.props.cards),
                CardsForCol3: this.sort(3, this.props.cards),
                CardsForCol4: this.sort(4, this.props.cards),

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
        console.log(id, name)
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
        let { cards } = this.state // localstorage
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
        let { cards } = this.state // localstorage
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
        this.setState({ cards: cards }, 
            this.setState({
                CardsForCol1: this.sort(1, this.state.cards),
                CardsForCol2: this.sort(2, this.state.cards),
                CardsForCol3: this.sort(3, this.state.cards),
                CardsForCol4: this.sort(4, this.state.cards),
            }, ()=> { if(max) { this.maxId(maxId) } })
        )
    }

    addComment = (text, autor, idCard) => {
        let { cards } = this.state // localstorage
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
        return(
            <div className='mainBlock'>
            <Container>
                <Row>
                    <Col>
                        <Column name={this.state.columns[0]} cards={this.state.CardsForCol1} editNameCol = {this.editNameCol} deleteCard = {this.deleteCard}
                                actualUser = {this.props.actualUser} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId} editCard = {this.editCard} 
                                addComment = {this.addComment} editComment = {this.editComment} deleteComment = {this.deleteComment}/>
                    </Col>
                    <Col>
                        <Column name={this.state.columns[1]} cards={this.state.CardsForCol2} editNameCol = {this.editNameCol} deleteCard = {this.deleteCard} 
                                actualUser = {this.props.actualUser} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId} editCard = {this.editCard}
                                addComment = {this.addComment} editComment = {this.editComment} deleteComment = {this.deleteComment}/>
                    </Col>
                    <Col>
                        <Column name={this.state.columns[2]} cards={this.state.CardsForCol3} editNameCol = {this.editNameCol} deleteCard = {this.deleteCard}
                                actualUser = {this.props.actualUser}updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId} editCard = {this.editCard}
                                addComment = {this.addComment} editComment = {this.editComment} deleteComment = {this.deleteComment}/>
                    </Col>
                    <Col>
                        <Column name={this.state.columns[3]} cards={this.state.CardsForCol4} editNameCol = {this.editNameCol} deleteCard = {this.deleteCard}
                                actualUser = {this.props.actualUser} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId} editCard = {this.editCard}
                                addComment = {this.addComment} editComment = {this.editComment} deleteComment = {this.deleteComment}/>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}
export default Main