//this file is where all the projects state changing happens
import { createSlice} from '@reduxjs/toolkit';

let lastId =0;

//* slice is the only function you need to create action and reducers

const slice =createSlice({
    name: 'projects',
    initialState: [],
    reducers:{
        //automaticaly creates action types
                 //*bugs here is the state 
        projectAdded: (projects,action) =>{
                projects.push( {//we can write mutable code here (like push) as this package contains the immer package(converts mutable code into immutable )
                    id: ++lastId,
                    name: action.payload.name,
                   
                })}
        }
    }
)

export const{projectAdded} = slice.actions;
export default slice.reducer;
