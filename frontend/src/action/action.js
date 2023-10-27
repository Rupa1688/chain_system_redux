import {
  ADD_USER,
  EDIT_USER,
  LOGIN_DATA,
  LOGOUT,
  UPDATE_USER,
  USERS_DATA,
  USER_PROFILE,
  VIEW_USERS,
} from "../constants/constants"

export const addUser = (data) => {
  // e.preventDefault()
  console.log("dataa", data)

  return {
    type: ADD_USER,
    data,
  }
}
export const userDetail = () => {
  return {
    type: VIEW_USERS,
  }
}

export const login = (data) => {
  // e.preventDefault()
  console.log("dataaction", data)
  return {
    type: LOGIN_DATA,
    data,
  }
}
export const allUsers = (pageSize, pageNo, search, order) => {
  console.log("dddd", pageSize, pageNo, search)
  return {
    type: USERS_DATA,
    data: { pageSize, pageNo, search, order },
  }
}
export const userProfile = () => {
  return {
    type: USER_PROFILE,
  }
}
export const deleteUser = (id) => {
  return {
    type: USER_PROFILE,
  }
}
export const editUser = (id) => {
  return {
    type: EDIT_USER,
    data: id,
  }
}
export const updateUser = (userData, id) => {
  console.log("updated", userData, id)
  // e.preventDefault()
  return {
    type: UPDATE_USER,
    data: { userData, id },
  }
}

// export const userLogout = () => {
//   // e.preventDefault()
//   return {
//     type: LOGOUT,
//     // data: { userData, id },
//   }
// }
