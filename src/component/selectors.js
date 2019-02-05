import { createSelector } from 'reselect';

export const getColumns = state => state.columns.columns;
export const allUsers = state => state.users.users;
export const getComments = state => state.comments.comments;
export const getCards = state => state.cards.cards;

export const getColumnsToProps = createSelector(
  getColumns,
  getCards,
  (columns, cards) => columns.map(elem => ({ ...elem, cards: cards.filter(card => elem.id === card.idCol) })),
);
export const getCommentsToProps = createSelector(
  getCards,
  getComments,
  (cards, comments) => comments.filter(elem => cards.filter(card => card.id === elem.idCard)[0].id === elem.idCard),
);
export const getUsers = createSelector(
  allUsers,
  users => users.map(elem => elem),
);
