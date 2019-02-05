import { combineReducers } from 'redux';
import reducersCard from './reducerCard';
import reducersUser from './reducerUser';
import reducersComments from './reducerComment';
import reducersColumns from './reducerColumn';
import reducersActualUser from './reducerActualUser';

const rootReducer = combineReducers({
  users: reducersUser,
  comments: reducersComments,
  cards: reducersCard,
  columns: reducersColumns,
  actualUser: reducersActualUser,
});
export default rootReducer;
