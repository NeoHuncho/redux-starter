import reducer from './reducer'

function customStore(reducer){
    let state;
    let listeners = [];

    function subscribe (listener){
        listeners.push(listener)
    }

    function dispatch(action){
       state= reducer(state, action);

       for(let i=0 ; i< listeners.length; i++){
        	listeners[i]();// everytime the store gets changed, the listener will get triggered
       }
    }

    function getState(){
    return state
    }
    return {subscribe, dispatch,getState}// as you can see we never expose the state that we have just create as we return a function

}

export default customStore(reducer);