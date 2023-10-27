import { combineReducers } from "redux"
import { usersData } from "./userReducer"
// import OrderStatusReducer from ‘./orderStatusReducer’;
// import GetWishlistDataReducer from ‘./getWishlistDataReducer’;

const rootReducer = combineReducers({
  usersData,
})
export default rootReducer
