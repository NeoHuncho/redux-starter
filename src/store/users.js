//this file is where all the projects state changing happens
import { createSlice} from '@reduxjs/toolkit';

let lastId =0;

//* slice is the only function you need to create action and reducers

const slice =createSlice({
    name: 'users',
    initialState: [],
    reducers:{
        //automaticaly creates action types
                 //*bugs here is the state 
        userAdded: (users,action) =>{
                users.push( {//we can write mutable code here (like push) as this package contains the immer package(converts mutable code into immutable )
                    id: ++lastId,
                    name: action.payload.name,
                   
                })}
        }
    }
)

export const{userAdded} = slice.actions;
export default slice.reducer;
