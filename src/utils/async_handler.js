import store from '../store/index'
import {} from '../store/action_types'

const asyncHandler = fn => (req, res, next) =>
    Promise
    .resolve(fn(req, res, next))
    .catch((error) => {
        if (!error) {
            store.dispatch(`Error! ${error}`)
        }
        next
    });

export default asyncHandler;