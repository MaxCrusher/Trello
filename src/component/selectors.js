import { createSelector } from 'reselect';

export const getColumns = state => state.columns.columns;
export const getComments = state => state.comments.comments;
export const getCards = state => state.cards.cards;

export const getColumnsData = createSelector(
  getColumns,
  getCards,
  getComments,
  (columns, cards, comments) => {
    console.log('object');
    return columns.map(c => ({
      ...c,
      cards: cards
        .filter(card => card.idCol === c.id)
        .map(card => ({ ...card, comments: comments.filter(com => com.idCard === card.id) })),
    }));
  },
);
