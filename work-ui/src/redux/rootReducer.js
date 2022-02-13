import { combineReducers } from "redux";
import workReducer from "./reducers/work/workReducer";

const rootReducer = combineReducers({
    workReducer: workReducer
})

export default rootReducer;