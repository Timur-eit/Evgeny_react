
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'

import { routerMiddleware } from 'connected-react-router'
import history from '../history'

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger)
const store = createStore(reducer, enhancer)
window.store = store.getState()

export default store