import configureStore from './store/configureStore'; //we are renaming the customStore function to store
import {bugAdded,bugResolved,bugAssignedToUser,getUnresolvedBugs,getAssignedBugs,getBugsByUser}  from './store/bugs';
import {projectAdded} from './store/projects';
import {userAdded} from './store/users'

const store =configureStore();

store.dispatch((dispatch,getState) =>{
    dispatch({type:'bugsReceived', bugs:[1,2,3]});
    console.log(getState())
  
});

// store.subscribe(() => {
//     console.log('store changed!')
// })

// store.dispatch(userAdded({name: 'User 1'}))
// // store.dispatch(projectAdded({name:'Project 1'}))
// // store.dispatch(bugAdded({description: 'Bug 1 '}));
// // store.dispatch(bugAdded({description: 'Bug 2 '}));
// // store.dispatch(bugAdded({description: 'Bug 3 '}));
// // store.dispatch(bugResolved({id:1}));
// //     store.dispatch(bugAssignedToUser({bugId:2, userId:1}))

// const x= getUnresolvedBugs(store.getState());
// const y= getUnresolvedBugs(store.getState());

// //if you look at the function it is a recursive function. 1 is the argument for the first argument and getState is for the second function
// const c =getBugsByUser(1)(s  tore.getState());



// // console.log(c)

// // console.log(store.getState())

