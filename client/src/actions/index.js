//use axios for ajax request
import axios from 'axios'
import {FETCH_USER} from "./types";

// export const fetchUser = () =>{
//     return function(dispatch) {
//         axios.get('/api/current_user')
//             .then(res => dispatch({type:FETCH_USER, payload: res}));
//     };
// };

//this is an action dispatcher(this function dispatches action)
export const fetchUser = () =>{
    return async function(dispatch) {
        const res =  await axios.get('/api/current_user');
        //console.log(res.data);
        dispatch({type: FETCH_USER, payload:res.data});
    };
};

export const handleToken = (token) => {
    return async function(dispatch){
        const res = await axios.post('/api/stripe', token);
        dispatch({type:FETCH_USER, payload: res.data});
    };
};
export const submitSurvey = (values, history) =>{
  return async function(dispatch) {
      const res = await axios.post('/api/surveys', values);
      history.push('/surveys');
      dispatch({type: FETCH_USER, payload: res.data});
  };
};