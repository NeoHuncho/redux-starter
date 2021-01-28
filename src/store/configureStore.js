import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'// this tool allows for store to talk to redux dev tools & dispatch async actions
import reducer from './reducer';
import logger from '../middleware/logger'
import toast from '../middleware/toast';
import api from '../middleware/api'
//getDefaultMiddleware imports redux-func
export default function (){
                                                
                                                
    return configureStore({reducer, middleware: 
        [
        ...getDefaultMiddleware(), 
        //logger('console'),
        toast,
        api
        ]
    });
}

