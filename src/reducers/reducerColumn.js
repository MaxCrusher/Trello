import * as actionType from '../action-type';

const columnsDefault = {
  columns: [
    { id: 1, name: 'TODO' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Testing' },
    { id: 4, name: 'Done' },
  ],
};

export default (state = columnsDefault, action) => {
  switch (action.type) {
    case actionType.EDIT_NAME_COLUMN: {
      const newColumn = state.columns.map(elem => {
        if (elem.id === action.column.id) {
          return { ...elem, name: action.column.name };
        }
        return elem;
      });
      const newState = { ...state, columns: newColumn };
      return newState;
    }
    default:
      return state;
  }
};
