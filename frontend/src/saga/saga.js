import { call, put, takeEvery } from "redux-saga/effects"

import {
  ADD_USER,
  ALL_USER,
  APPLY_BIDING,
  AVL_TIME_For_PERCHASE,
  BIDINGS_ALL,
  BIDING_CLIENT,
  BUYER_OF_SHARE,
  BUY_SHARE,
  BUY_SHARES_OF_USER,
  CLIENT_BID,
  COUNT_DOWN_WINER,
  EDIT_USER,
  GET_ALL_DATA_BIDINGS,
  GET_BUYER,
  GET_ORG_SHARE_MARKET,
  GET_USER,
  GET_WINNER,
  HIGHEST_BID,
  HIGHEST_BIDING,
  HIGHEST_VALUE,
  LOGIN_DATA,
  LOGIN_USER,
  NEW_REQUEST,
  OPEN_REQUEST,
  ORG_ENTER_STOCK_MARKET,
  ORG_SHARE_MARKET,
  PERCHASE,
  PROFILE_USER,
  PURCHASE_AVL_TIME,
  PURCHASE_BID,
  REMOVE_ALL_BID,
  REMOVE_BID,
  REQUEST_RELEASED,
  REQUEST_SENDED,
  RE_NEW_REQUEST,
  SEND_REQUEST,
  SHARE_MARKET,
  UPDATE_USER,
  USERS_DATA,
  USER_ADD,
  USER_PROFILE,
  USER_UPDATED,
  VIEW_ALL_USER,
  VIEW_USERS,
  WINER_COUNT_DOWN,
  WINNER_ANNOUNCED,
} from "../constants/constants"

function* addUser(data) {
  try {
    let response = yield fetch("http://localhost:4002/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
    })
    response = yield response.json()
    console.log("response", response)
    yield put({
      type: USER_ADD,
      data: response,
    })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
function* fetchUser() {
  try {
    // const user = yield call(Api.fetchUser, action.payload.userId)
    let response = yield fetch("http://localhost:4002/user/getAll")
    response = yield response.json()

    yield put({ type: VIEW_ALL_USER, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
function* loginUser(data) {
  try {
    console.log("saga", data)
    // const user = yield call(Api.fetchUser, action.payload.userId)
    let response = yield fetch("http://localhost:4002/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
    })
    response = yield response.json()
    console.log("response login", response)
    yield put({ type: LOGIN_USER, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
function* allUser(pagingData) {
  try {
    console.log("pagingData", pagingData)
    const pageSize = pagingData?.data?.pageSize
    const pageNo = pagingData?.data?.pageNo
    const search = pagingData?.data?.search
    const order = pagingData?.data?.order

    console.log("pagesize", pageSize, pageNo)

    let id = JSON.parse(localStorage.getItem("data"))
    console.log("saga", id._id)
    id = id._id
    // const user = yield call(Api.fetchUser, action.payload.userId)
    let response = yield fetch(
      `http://localhost:4002/user/userAlldata/${id}?pageSize=${pageSize}&page=${pageNo}&asc=${order}&search=${search}`,
      {
        headers: {
          // authorization:JSON.parse(localStorage.getItem('token'))
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
    response = yield response.json()
    console.log("response", response)
    if (response.data) {
      let res =
        response.data &&
        response.data.map((allData) => {
          return Object.assign(allData, { action_id: allData._id })
        })
      console.log("response11222", res)
      const result = {
        data: res,
        page: response.page,
        pageSize: response.pageSize,
        profile: response.profile,
        status: response.status,
        total: response.total,
      }
      yield put({ type: ALL_USER, data: result })
    } else {
      yield put({ type: ALL_USER, data: response })
    }
  } catch (err) {
    yield put({ type: "USER_FETCH_FAILED", message: err.message })
  }
}
function* profile() {
  try {
    let data = JSON.parse(localStorage.getItem("data"))
    console.log("role", data)
    console.log("saga", data._id)
    let id = data._id
    const role = data.role
    let response = yield fetch(
      `http://localhost:4002/user/userProfile/${id}?role=${role}`,
      {
        headers: {
          // authorization:JSON.parse(localStorage.getItem('token'))
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
    response = yield response.json()
    console.log("response login", response)
    yield put({ type: PROFILE_USER, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
function* user(id) {
  try {
    console.log("saga", id)
    id = id.data

    let response = yield fetch(`http://localhost:4002/user/userEdit/${id}`, {
      headers: {
        // authorization:JSON.parse(localStorage.getItem('token'))
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    response = yield response.json()
    console.log("response login", response)
    yield put({ type: GET_USER, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
function* updateUser(userData) {
  try {
    const id = userData.data.id
    const data = userData.data.userData
    console.log("userData", id, data)
    let response = yield fetch(`http://localhost:4002/user/userEdit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
    response = yield response.json()

    yield put({ type: USER_UPDATED, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
function* sendRequest(requestData) {
  try {
    console.log("requestData", requestData.data)
    let response = yield fetch(`http://localhost:4002/user/request/release`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(requestData.data),
    })
    response = yield response.json()
    console.log("response login", response)
    yield put({ type: REQUEST_SENDED, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}

function* realeseRequest(releaseData) {
  try {
    console.log("releaseData", releaseData.data)
    let response = yield fetch(`http://localhost:4002/user/realeasesUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(releaseData.data),
    })
    response = yield response.json()
    console.log("response login", response)
    yield put({ type: REQUEST_RELEASED, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
//generator function
function* sendForRenewRequest(renewData) {
  try {
    console.log("releaseData", renewData)
    const id = renewData.data.id
    const role = renewData.data.role

    let response = yield fetch(
      `http://localhost:4002/user/delete/realeasesUser/${id}?role=${role}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
    response = yield response.json()
    console.log("response login", response)
    yield put({ type: OPEN_REQUEST, data: response })
    // open renew request successfully
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}

function* shareOrgMarket(shareOrg) {
  try {
    console.log("shareOrg", shareOrg)
    let response = yield fetch(`http://localhost:4002/user/shareMarketOrg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(shareOrg.data),
    })
    response = yield response.json()
    console.log("response login", response)
    yield put({ type: ORG_ENTER_STOCK_MARKET, data: response })
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message })
  }
}
function* getShareOrgMarket() {
  let response = yield fetch(`http://localhost:4002/user/shareMarketOrg`, {
    headers: {
      // authorization:JSON.parse(localStorage.getItem('token'))
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
  response = yield response.json()
  console.log("response  getShareOrgMarket login", response)
  yield put({ type: GET_ORG_SHARE_MARKET, data: response })
}
function* buyShareByPeople({ data }) {
  console.log("data buyShareByPeople", data)
  let loginUser = JSON.parse(localStorage.getItem("data"))

  // const user = { login_id: loginUser._id }
  const userData = { ...data, ...{ login_id: loginUser._id } }
  console.log("data loginUser", userData)
  let response = yield fetch(`http://localhost:4002/user/buySharesByUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // authorization:JSON.parse(localStorage.getItem('token'))
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    body: JSON.stringify(userData),
  })
  response = yield response.json()
  console.log("response  getShareOrgMarket login", response)
  yield put({ type: BUY_SHARES_OF_USER, data: response })
}

function* getBuyerofshare() {
  let loginUser = yield JSON.parse(localStorage.getItem("data"))
  // ?id=${loginUser._id}
  let response = yield fetch(
    `http://localhost:4002/user/buySharesByUser?id=${loginUser._id}`,
    {
      headers: {
        // authorization:JSON.parse(localStorage.getItem('token'))
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  )
  response = yield response.json()
  console.log("response  BUYER_OF_SHARE", response)
  yield put({ type: BUYER_OF_SHARE, data: response })
}

function* applyForBiding({ data }) {
  yield console.log("data biding", data)

  let response = yield fetch(`http://localhost:4002/user/sharebiding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    body: JSON.stringify(data),
    // body: data,
  })
  response = yield response.json()
  console.log("response  bidingg ", response)
  yield put({ type: BIDING_CLIENT, data: response })
}

function* getAllBidings() {
  let response = yield fetch(`http://localhost:4002/user/sharebiding`, {
    headers: {
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
  response = yield response.json()
  console.log("response  bid", response)
  yield put({ type: BIDINGS_ALL, data: response })
}

function* addHighestBiding({ data }) {
  console.log("daya", data)
  let response = yield fetch(`http://localhost:4002/user/addHighestBiding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    body: JSON.stringify(data),
  })
  response = yield response.json()
  console.log("response  bid", response)
  yield put({ type: HIGHEST_BIDING, data: response })
}

function* getHighestBiding() {
  let response = yield fetch(`http://localhost:4002/user/getHighestBiding`, {
    headers: {
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
  response = yield response.json()
  console.log("response  bid", response)
  yield put({ type: HIGHEST_BID, data: response })
}

function* getWinnerAnounced() {
  let response = yield fetch(`http://localhost:4002/user/getWinner`, {
    headers: {
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
  response = yield response.json()
  console.log("winner  bid", response)
  yield put({ type: WINNER_ANNOUNCED, data: response })
}
function* winerCountDown({ data }) {
  console.log("daya", data)
  let response = yield fetch(`http://localhost:4002/user/winerCountDown`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    body: JSON.stringify(data),
  })
  response = yield response.json()
  console.log("response  bid", response)
  yield put({ type: COUNT_DOWN_WINER, data: response })
}

function* purchaseAvlTime() {
  let response = yield fetch(`http://localhost:4002/user/purchaseAvlTime`, {
    headers: {
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
  response = yield response.json()
  console.log("avlTime", response)
  yield put({ type: AVL_TIME_For_PERCHASE, data: response })
}
function* purchaseBidByUser({ data }) {
  yield console.log("data999999999999999999999999999", data)
  let response = yield fetch(`http://localhost:4002/user/purchaseBid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    body: JSON.stringify(data),
  })
  response = yield response.json()
  console.log("purchase", response)
  yield put({ type: PERCHASE, data: response })
}

function* removeBidData({ data }) {
  yield console.log("data1111111111111111111111111111", data)
  let response = yield fetch(`http://localhost:4002/user/removeAllBids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    body: JSON.stringify(data),
  })
  response = yield response.json()
  console.log("purchase", response)
  yield put({ type: REMOVE_ALL_BID, data: response })
}

function* sagaUser() {
  yield takeEvery(VIEW_USERS, fetchUser)
  yield takeEvery(ADD_USER, addUser)
  yield takeEvery(LOGIN_DATA, loginUser)
  yield takeEvery(USERS_DATA, allUser)
  yield takeEvery(USER_PROFILE, profile)
  yield takeEvery(EDIT_USER, user)
  yield takeEvery(UPDATE_USER, updateUser)
  yield takeEvery(SEND_REQUEST, sendRequest)
  yield takeEvery(NEW_REQUEST, realeseRequest)
  yield takeEvery(RE_NEW_REQUEST, sendForRenewRequest)
  yield takeEvery(SHARE_MARKET, shareOrgMarket)
  yield takeEvery(ORG_SHARE_MARKET, getShareOrgMarket)
  yield takeEvery(BUY_SHARE, buyShareByPeople)
  yield takeEvery(GET_BUYER, getBuyerofshare)
  yield takeEvery(CLIENT_BID, applyForBiding)
  yield takeEvery(GET_ALL_DATA_BIDINGS, getAllBidings)
  yield takeEvery(APPLY_BIDING, addHighestBiding)
  yield takeEvery(HIGHEST_VALUE, getHighestBiding)
  yield takeEvery(GET_WINNER, getWinnerAnounced)
  yield takeEvery(WINER_COUNT_DOWN, winerCountDown)
  yield takeEvery(PURCHASE_AVL_TIME, purchaseAvlTime)
  yield takeEvery(PURCHASE_BID, purchaseBidByUser)
  yield takeEvery(REMOVE_BID, removeBidData)
}
export default sagaUser
