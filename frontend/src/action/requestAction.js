import {
  APPLY_BIDING,
  BUY_SHARE,
  CLIENT_BID,
  GET_ALL_DATA_BIDINGS,
  GET_BUYER,
  GET_WINNER,
  HIGHEST_VALUE,
  NEW_REQUEST,
  ORG_SHARE_MARKET,
  PURCHASE_AVL_TIME,
  PURCHASE_BID,
  REMOVE_BID,
  RE_NEW_REQUEST,
  SEND_REQUEST,
  SHARE_MARKET,
  WINER_COUNT_DOWN,
} from "../constants/constants"
export const sendRequest = (data, e) => {
  e.preventDefault()
  console.log("data", data)
  return {
    type: SEND_REQUEST,
    data,
  }
}
export const newRequest = (data, e) => {
  e.preventDefault()
  console.log("newRequest", data)
  return {
    type: NEW_REQUEST,
    data,
  }
}

export const renewRequest = (id, role, e) => {
  e.preventDefault()
  console.log("renewRequest", id)
  return {
    type: RE_NEW_REQUEST,
    data: {
      id,
      role,
    },
  }
}
export const shareMarket = (orgAmount, org, e) => {
  e.preventDefault()

  return {
    type: SHARE_MARKET,
    data: {
      orgAmount,
      org,
    },
  }
}

export const orgsShareMarket = () => {
  return {
    type: ORG_SHARE_MARKET,
  }
}
export const buyShares = (shares, org_id, admin_id, amount) => {
  console.log("sharessharesnn", shares, org_id, admin_id, amount)
  return {
    type: BUY_SHARE,
    data: {
      shares,
      org_id,
      admin_id,
      amount,
    },
  }
}
export const getBuyer = () => {
  return {
    type: GET_BUYER,
  }
}

export const cliendBid = (userId, share, org, amount) => {
  console.log("sharaaae", userId, share, org, amount)
  return {
    type: CLIENT_BID,
    data: {
      userId,
      share,
      org,
      amount,
    },
  }
}
export const getDataForBidings = () => {
  return {
    type: GET_ALL_DATA_BIDINGS,
  }
}
export const bidSubmit = (data) => {
  console.log("orgIdddddd", data)
  return {
    type: APPLY_BIDING,
    data: data,
  }
}
export const higestBiding = () => {
  return {
    type: HIGHEST_VALUE,
  }
}

export const winnerAnounced = () => {
  return {
    type: GET_WINNER,
  }
}
export const winnerCoundownStartTime = (data) => {
  console.log("datacount", data)
  return {
    type: WINER_COUNT_DOWN,
    data: data,
  }
}
export const getAvlPurchaseTime = () => {
  return {
    type: PURCHASE_AVL_TIME,
  }
}
export const purchaseBid = (bid) => {
  return {
    type: PURCHASE_BID,
    data: bid,
  }
}
export const removeBiding = (bidData) => {
  return {
    type: REMOVE_BID,
    data: bidData,
  }
}
