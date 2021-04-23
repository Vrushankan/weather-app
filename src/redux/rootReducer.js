import { combineReducers } from "redux"
import calenderReducer from "./calendar/"

const rootReducer = combineReducers({
  calendar: calenderReducer,
})

export default rootReducer
