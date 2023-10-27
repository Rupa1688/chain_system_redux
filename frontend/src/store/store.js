// import { createStore } from "redux"
import rootReducer from "../reducer/rootReducer"

import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import sagaUser from "../saga/saga"
const sagaMiddleware = createSagaMiddleware()
// const store = createStore(rootReducer)
export const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
  // applyMiddleware(sagaMiddleware)

  // other options e.g middleware, go here
})
sagaMiddleware.run(sagaUser)

export default store
