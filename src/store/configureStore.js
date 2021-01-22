import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'// this tool allows for store to talk to redux dev tools & dispatch async actions
import reducer from './reducer';
import logger from '../middleware/logger'
import toast from '../middleware/toast'
//getDefaultMiddleware imports redux-func
export default function (){
                                                //here we are setting the logger to log to the console
                                                
    return configureStore({reducer, middleware: [
        ...getDefaultMiddleware(),
        logger('console'), toast]});
}

