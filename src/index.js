import React from 'react'
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { render } from 'react-dom'

import rootReducer from './reducers'
import { postJob, getJobs, updateJob, getHistory } from './actions'
import App from './components/App'

let store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

let unsubscribe = store.subscribe(() => 
  console.log(store.getState())
)
/*
let job1 = {
  id: 2,
  name:"cloudflare",
  city:"sf",
  post:"ASDASDASDASDASDAS",
  status:3
}

store.dispatch(updateJob(job1))
//store.dispatch(postJob(job1))
*/

store.dispatch(getJobs())
store.dispatch(getHistory())

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

