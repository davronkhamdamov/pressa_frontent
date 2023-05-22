import { combineReducers } from "redux";
import { dataReduser } from './reduser'

const joinedRedusers = combineReducers({
    dataReduser
})


export { joinedRedusers }