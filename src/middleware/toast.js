const toast = store => next => action => {
    if(action.type === 'error')
        console.log('Toastify', action.payloa.meesage)
    else next(action)
}

export default toast;