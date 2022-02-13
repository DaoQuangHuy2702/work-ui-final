import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./redux/rootReducer";
import rootSaga from "./redux/rootSaga";

const sagaMiddleWare = createSagaMiddleware();
const middleWare = [sagaMiddleWare];

middleWare.push(logger)

const store = createStore(rootReducer, applyMiddleware(...middleWare));

sagaMiddleWare.run(rootSaga);

export default store;