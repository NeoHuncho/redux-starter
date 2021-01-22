//this file is where all the bugs state changing happens

import { createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect'

let lastId =0;

//* slice is the only function you need to create action and reducers

const slice =createSlice({
    name: 'bugs',
    initialState: [],
    reducers:{
        //automaticaly creates action types
                 //*bugs here is the state 
        bugAdded: (bugs,action) =>{
                bugs.push( {//we can write mutable code here (like push) as this package contains the immer package(converts mutable code into immutable )
                    id: ++lastId,
                    description: action.payload.description,
                    resolved:false,
                    assigned:false
                })},
        
        bugResolved: (bugs,action) => {
            const index= bugs.findIndex(bug => bug.id ===action.payload.id);
            bugs[index].resolved = true;
        },

        bugAssignedToUser: (bugs, action) => {
            const {bugId,userId}= action.payload;
            const index= bugs.findIndex(bug => bug.id ===bugId);
            bugs[index].userId= userId;//property only appears on bugs that have been assigned 
        }

        }
    }
)

export const{ bugAdded, bugResolved, bugAssignedToUser} = slice.actions;
export default slice.reducer;

//this uses memoisation(look at imports). this allows for filter method to not be recalculated each time it is called
//if state is the same it will give awnswer that it has already calculated and stored in cash

export const getUnresolvedBugs =createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)