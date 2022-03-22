import { startSession, gpsData} from './action'
import store from './store';

// Log the initial state
//console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  //console.log(store.getState())
)

// Dispatch some actions
store.dispatch(startSession('1234','43124','41234','Andres','htpp//algo.com'))
store.dispatch(startSession('8465','6789','57689','Claudia','htpp//algo2.com'))
store.dispatch(gpsData(3,2))
store.dispatch(gpsData(1,1))

// Stop listening to state updates
unsubscribe()