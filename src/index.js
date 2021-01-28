
//* DONT FORGET TO ADD BUGS-BACKEND TO THE WORKPLACE

import configureStore from './store/configureStore'; //we are renaming the customStore function to store
import {bugAdded,bugResolved,bugAssignedToUser,getUnresolvedBugs,getAssignedBugs,getBugsByUser}  from './store/bugs';
import {projectAdded} from './store/projects';
import {userAdded} from './store/users';
import{loadBugs,addBug,resolveBug,assignBug} from './store/bugs';

import * as actions from './store/api';

const store =configureStore();


store.dispatch(loadBugs());

setTimeout(() => {
    store.dispatch(resolveBug(1));
}, 2000);


setTimeout(() => {
    store.dispatch(addBug({description:'bug5'}))
}, 4000);


setTimeout(() => {
    store.dispatch(assignBug(2,5))
}, 6000);



//store.dispatch(assignedBug({bugId:2, userId:1}));
//store.dispatch(bugResolved({id:1}));



// store.subscribe(() => {
//     console.log('store changed!')
// })

//*examples of simple dispatches withou the API
/*
store.dispatch((dispatch,getState) =>{
    dispatch({type:'bugsReceived', bugs:[1,2,3]});
    //console.log(getState())
  
});
store.dispatch(userAdded({name: 'User 1'}))
store.dispatch(projectAdded({name:'Project 1'}))
store.dispatch(bugAdded({description: 'Bug 1 '}));
store.dispatch(bugAdded({description: 'Bug 2 '}));
store.dispatch(bugAdded({description: 'Bug 3 '}));




// //if you look at the function it is a recursive function. 1 is the argument for the first argument and getState is for the second function
 const c =getBugsByUser(1)(store.getState());
 console.log(c)
*/

