import * as action from '../action-type';
/* 
  action creator
*/

export function addUser(user) {
  return { type: action.ADD_USER, user };
}

export function updateActualUser(user) {
  return { type: action.UPDATE_ACTUAL_USER, user };
}

export function addComment(id, text, idCard) {
  return { type: action.ADD_COMMENT, id, text, idCard };
}

export function editComment(id, text) {
  return { type: action.EDIT_COMMENT, id, text };
}

export function deleteComment(id) {
  return { type: action.DELETE_COMMENT, id };
}

export function addCard(id, nameCard, descriptionCard, idColumn) {
  return { type: action.ADD_CARD, id, nameCard, descriptionCard, idColumn };
}

export function editCard(id, nameCard, descriptionCard) {
  return { type: action.EDIT_CARD, id, nameCard, descriptionCard };
}

export function deleteCard(id) {
  return { type: action.DELETE_CARD, id };
}

export function editColumnName(column) {
  return { type: action.EDIT_NAME_COLUMN, column };
}
