import{combineReducers } from 'redux';
import authReducer from "./authReducer";
import {reducer as reduxForm} from 'redux-form';

export default combineReducers({
    auth1: authReducer,
    form: reduxForm
})