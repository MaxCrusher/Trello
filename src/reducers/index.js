import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import SetTransform from './transform';
import reducersCard from './reducerCard';
import reducersUser from './reducerUser';
// import reducersComments from './reducerComment';
import reducersColumns from './reducerColumn';
import reducersActualUser from './reducerActualUser';

const users = {
  key: 'users',
  storage,
  backlist: ['root'],
  transforms: [SetTransform],
};

/* const comments = {
  key: 'comments',
  storage,
  backlist: ['root'],
  transforms: [SetTransform],
}; */
const card = {
  key: 'cards',
  storage,
  backlist: ['root'],
  transforms: [SetTransform],
};
const columns = {
  key: 'columns',
  storage,
  backlist: ['root'],
  transforms: [SetTransform],
};
const actualUser = {
  key: 'actualUser',
  storage,
  backlist: ['root'],
  transforms: [SetTransform],
};
const rootReducer = combineReducers({
  users: persistReducer(users, reducersUser),
  /* comments: persistReducer(comments, reducersComments), */
  cards: persistReducer(card, reducersCard),
  columns: persistReducer(columns, reducersColumns),
  actualUser: persistReducer(actualUser, reducersActualUser),
});
export default rootReducer;
