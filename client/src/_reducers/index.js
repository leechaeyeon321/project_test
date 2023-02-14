import {combineReducers} from 'redux';
import user from './user_reducer';
// import comment from './comment_reducer';
console.log( user );

const rootReducer = combineReducers({
    user
})
export default rootReducer;