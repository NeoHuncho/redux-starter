//this file is where all the bugs state changing happens

import { createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import{apiCallBegan} from './api';
import moment from 'moment';



//* slice is the only function you need to create action and reducers

const slice =createSlice({
    name: 'bugs',
    initialState: {//this way of setting up the state is optional. A simple array is fine.
                   //this way allows for a loading animations on ui
        list:[],
        loading:false,
        lastFetch:null//this is useful for caching
    },
    reducers:{
        //the following reducers have the notion of events
        //This reducer is to have to loading icon while it is processing 
        bugsRequested:(bugs,action)=>{
            bugs.loading=true;
        },

        bugsRequestFailed:(bugs,action) =>{
            bugs.loading=false;
        },
        
        //adds to state the bugs that we got from the db
        bugsReceived:(bugs,action)=>{
            bugs.list=action.payload
            bugs.loading=false;
            bugs.lastFetch=Date.now();
        },

        //automaticaly creates action types
                 //*bugs here is the state 
        bugAdded: (bugs,action) =>{
                bugs.list.push( action.payload)},
        
        bugResolved: (bugs,action) => {
            const index= bugs.list.findIndex(bug => bug.id ===action.payload.id);
            bugs.list[index].resolved = true;
        },

        bugAssignedToUser: (bugs, action) => {
            const {id,userId}= action.payload;
            const index= bugs.list.findIndex(bug => bug.id ===id);
            bugs.list[index].userId= userId;//property only appears on bugs that have been assigned 
        }

        }
    }
)

 const {bugAdded, bugResolved, bugAssignedToUser,bugsReceived,bugsRequested,bugsRequestFailed} = slice.actions;
export default slice.reducer;

const url= "/bugs"//in a real file you should save this is a config file

//the reason why loadbugs isnt in the reducers is that it becomes a function that can be called in the UI
//loadBugs calls reducers from on top in the dispatch function

//actions Creators
export const loadBugs= () => (dispatch,getState)=>{

    const {lastFetch} = getState().entities.bugs;
    const diffInMinutes= moment().diff(moment(lastFetch), 'minutes')
    if(diffInMinutes<10) return;


    return dispatch(
        apiCallBegan(
        {
            url,
            onStart:bugsRequested.type,//when starting the apicallbegan, bugRequested action should dispatched(from on top)
            onSuccess:bugsReceived.type,//if api call is successful, bugReceived action should be dispatched(from on top)
            onError:bugsRequestFailed.type//if api call is unsuccessful, bugRequestFailed action should be dispatched(from on top)
        }))
    
}

//the following functions have the notion of commands



export const addBug= bug => apiCallBegan({
    url,
    method:"post",
    data:bug,//this is the body of the request
    onSuccess:bugAdded.type


})

export const resolveBug= id => apiCallBegan({
    url: url+'/'+id,
    method:"patch",//like put but is used only to change one property while put is a whole object
    data:{resolved:true},
    onSuccess:bugResolved.type


})

export const assignBug = (bugId,userId) =>apiCallBegan({
    url: url+'/'+bugId,
    method:"patch",//like put but is used only to change one property while put is a whole object
    data:{userId},
    onSuccess:bugAssignedToUser.type
})




//this uses memoisation(look at imports). this allows for filter method to not be recalculated each time it is called
//if state is the same it will give awnswer that it has already calculated and stored in cash


//* create Selector function is the same as this:  state=>unresolvedBugs
export const getUnresolvedBugs =createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.list.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)