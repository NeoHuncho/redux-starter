
// next parameter is or a ref to the next middleware function or the reducer if only middleware function
//we are using currying technique here
//param allows to paremetise the store. here we are telling the middleware to log to console
const logger= param => store => next => action  =>{
    console.log('param ',param);
    next(action);
}
export default logger;