import React, { useEffect, useState } from "react"
import { useRef } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"

import InputLabel from "@mui/material/InputLabel"

import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser, editUser, updateUser } from "../action/action"
import { NativeSelect } from "@mui/material"

const EditUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const history = useHistory()
  const cancelButton = () => {
    // navigate("/users")
    navigate(-1)
    // history.goBack()
    // window.location.reload()
  }
  const userData = useParams()
  const id = userData.id
  useEffect(() => {
    dispatch(editUser(id))
  }, [dispatch, id])
  const data = useSelector((state) => state?.usersData?.view?.data)
  const response = useSelector((state) => state?.usersData?.view)

  console.log("data message", data)

  const inputNameRef = useRef(null)
  const inputEmailRef = useRef(null)

  const handleUpdateUser = (e) => {
    e.preventDefault()
    const name = inputNameRef.current.value
    const email = inputEmailRef.current.value
    const updateData = {
      name,
      email,
    }
    dispatch(updateUser(updateData, id))
    console.log("name", name, email)
  }
  setTimeout(() => {
    if (
      response?.status === 200 &&
      response.message === "data updated successfully"
    ) {
      navigate("/users")
      window.location.reload()
    }
  }, "2000")
  return (
    <>
      {response?.status === 200 && response.message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{response.message}</Alert>
        </Stack>
      )}
      {response?.status === 403 &&
        response?.message === "A token is required for authentication" && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{response.message}</Alert>
          </Stack>
        )}

      {data && (
        <form>
          {/* <input type="text" id="name" name="name" ref={inputNameRef}></input>
          <input type="text" id="name" name="name" ref={inputEmailRef}></input> */}
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            autoComplete="off"
          >
            <div>
              <TextField
                label="name"
                id="name"
                name="name"
                variant="filled"
                inputRef={inputNameRef}
                defaultValue={data.name}
                key={`${Math.floor(Math.random() * 1000)}-min`}
                // onChange={(e) => nameChange(e.target.value)}
              />
            </div>

            <div>
              <TextField
                name="email"
                label="email"
                id="email"
                variant="filled"
                inputRef={inputEmailRef}
                defaultValue={data.email}
                key={`${Math.floor(Math.random() * 1000)}-min`}
                // onChange={(e) => emailChange(e.target.value)}
              />
            </div>
            {/* {user &&
                  user.organization_data.map((org) => {
                    return (
                      <div>
                        <TextField
                          name="organization"
                          label="organization"
                          variant="filled"
                          value={org.organizationName}
                          // onChange={(e) => organizationChange(e.target.value)}
                        />
                        <TextField
                          name="amount"
                          label="amount"
                          variant="filled"
                          value={org.amount}
                          // onChange={(e) => organizationChange(e.target.value)}
                        />
                      </div>
                    )
                  })} */}
            {/* {user.length > 0 &&
                  user.commision_data.map((commisionData) => {
                    return (
                      <div>
                        <TextField
                          name="organization"
                          label="organization"
                          variant="filled"
                          value={commisionData.commision}
                          // onChange={(e) => organizationChange(e.target.value)}
                        />
                      </div>
                    )
                  })} */}
          </Box>

          <div>
            <button onClick={handleUpdateUser}>update</button>
            {/* <button>submit</button> */}
          </div>
        </form>
      )}
      {/* <button onClick={() => navigate(-1)}>go back</button> */}
      <button onClick={cancelButton}>cancel</button>
    </>
  )
}
export default EditUser
