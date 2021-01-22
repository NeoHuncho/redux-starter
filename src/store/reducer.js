// here is the parent reducer. the reducers then are arranged by use so for example ui reducers, entity reducers ect...

import {combineReducers} from 'redux';

import entitiesReducer from './entities';

export default combineReducers({
    entities:entitiesReducer
})