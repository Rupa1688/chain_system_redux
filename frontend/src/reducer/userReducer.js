import {
  ADD_USER,
  ALL_USER,
  BUY_SHARES_OF_USER,
  GET_ORG_SHARE_MARKET,
  GET_USER,
  LOGIN_USER,
  LOGOUT,
  OPEN_REQUEST,
  ORG_ENTER_STOCK_MARKET,
  PROFILE_USER,
  REQUEST_RELEASED,
  REQUEST_SENDED,
  USER_ADD,
  USER_UPDATED,
  VIEW_ALL_USER,
  VIEW_USERS,
  BUYER_OF_SHARE,
  BIDING_CLIENT,
  BIDINGS_ALL,
  HIGHEST_BIDING,
  HIGHEST_BID,
  WINNER_ANNOUNCED,
  COUNT_DOWN_WINER,
  AVL_TIME_For_PERCHASE,
  PERCHASE,
} from "../constants/constants"
let InitialData = {
  view: [],
  profile: [],
  releaseMessage: [],
  openRequestMessage: [],
  orgEnterShareMarket: [],
  getOrgEnterShareMarket: [],
  buyshareMsg: [],
  getBuyerOfShare: [],
  bidingData: [],
  allBidingData: [],
  highest_bid: [],
  highest_value: [],
  winer: [],
  countDownWiner: [],
  avlTimeToPuchase: [],
  PuchaseBidMessage: [],
}

export const usersData = (state = InitialData, action) => {
  if (action.type === USER_ADD) {
    console.log("dataaa", action.data)
    return { ...state, view: action.data }
  }
  if (action.type === VIEW_ALL_USER) {
    console.log("dataaa", action.data)
    return { ...state, view: action?.data?.data }
  }
  if (action.type === LOGIN_USER) {
    console.log("dataaa", action.data)
    return { ...state, view: action?.data }
  }
  if (action.type === ALL_USER) {
    return { ...state, view: action?.data }
  }
  if (action.type === PROFILE_USER) {
    return { ...state, profile: action?.data }
  }
  if (action.type === GET_USER) {
    console.log("aluser", action.data)
    return { ...state, view: action?.data }
  }
  if (action.type === USER_UPDATED) {
    console.log("aluser", action.data)
    return { ...state, view: action?.data }
  }
  if (action.type === REQUEST_SENDED) {
    console.log("aluser", action.data)
    return { ...state, view: action?.data }
  }
  if (action.type === REQUEST_RELEASED) {
    console.log("aluser", action.data)
    return { ...state, releaseMessage: action?.data }
  }
  if (action.type === OPEN_REQUEST) {
    console.log("aluser", action.data)
  }
  if (action.type === ORG_ENTER_STOCK_MARKET) {
    return { ...state, orgEnterShareMarket: action?.data }
  }
  if (action.type === GET_ORG_SHARE_MARKET) {
    return { ...state, getOrgEnterShareMarket: action?.data }
  }
  if (action.type === BUY_SHARES_OF_USER) {
    return { ...state, buyshareMsg: action?.data }
  }
  if (action.type === BUYER_OF_SHARE) {
    return { ...state, getBuyerOfShare: action?.data }
  }
  if (action.type === BIDING_CLIENT) {
    return { ...state, bidingData: action?.data }
  }
  if (action.type === BIDINGS_ALL) {
    return { ...state, allBidingData: action?.data }
  }
  if (action.type === HIGHEST_BIDING) {
    return { ...state, highest_bid: action?.data }
  }
  if (action.type === HIGHEST_BID) {
    return { ...state, highest_value: action?.data }
  }
  if (action.type === WINNER_ANNOUNCED) {
    return { ...state, winer: action?.data }
  }
  if (action.type === COUNT_DOWN_WINER) {
    return { ...state, countDownWiner: action?.data }
  }
  if (action.type === AVL_TIME_For_PERCHASE) {
    return { ...state, avlTimeToPuchase: action?.data }
  }
  if (action.type === PERCHASE) {
    return { ...state, PuchaseBidMessage: action?.data }
  }

  // if (action.type === LOGOUT) {
  //   console.log("InitialData", InitialData)
  //   return (state = InitialData)
  // }
  //   } else if (action.type === "REMOVE_TODO") {
  //     return tasks.filter((task) => task !== action.task)
  //   }
  return state
}
