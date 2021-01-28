import axios from 'axios'
import * as actions from '../store/api';


          //from store
const api=({dispatch}) => next=>  async action => {
    
    if(action.type !==actions.apiCallBegan.type){return next(action)};
    
    
    const {url,method,data,onStart,onSuccess, onError}=action.payload;
    
    onStart?dispatch({type:onStart}):null;
    
    next(action);//this is to stop action disapearing as we dont dispatch the original action
   
    try {
        const response= await axios.request({
            baseURL:'http://localhost:9001/api', 
            url,//this is the url of the endPoint which would be /bugs
            method,
            data
        });
        //general success
        dispatch(actions.apiCallSuccess(response.data));
        //specific success
        onSuccess? dispatch({type:onSuccess,payload:response.data}):null;

    } catch (error) {
        //general error
        dispatch(actions.apiCallFailed(error.message))
        //specific error
        onError? dispatch({type:onError, payload:error.message}): null;
     
        
    }
   
};
export default api;