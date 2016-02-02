import { postJob } from './actions'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk
  )
)

let unsubscribe = store.subscribe(() => 
  console.log(store.getState())
)

let job1 = {
  name:"cloudflare",
  city:"sf",
  post:"ASDASDASDASDASDAS",
  status:3
}

store.dispatch(postJob(job1))



