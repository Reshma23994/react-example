import { createStore, combineReducers } from 'redux';
import contactReducer from '../reducer/contactReducer'
export const rootReducer=combineReducers({
    contactReducer,
});

export const configureStore = () => createStore(rootReducer);


