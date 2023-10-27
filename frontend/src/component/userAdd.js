import React, { useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"

import InputLabel from "@mui/material/InputLabel"

import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../action/action"
import { NativeSelect } from "@mui/material"

const UserAdd = () => {
  const navigate = useNavigate()
  const cancelButton = () => {
    // navigate("/")
    // window.location.reload()
    navigate(-1)
  }

  const data = useSelector((state) => state?.usersData?.view)
  // const response = useSelector((state) => state?.usersData?.view)
  console.log("data message", data)
  // console.log("response message", response)
  setTimeout(() => {
    if (data?.status === 200 && data.message === "data register successfully") {
      navigate("/login")
      window.location.reload()
    }
  }, "2000")
  const [name, nameChange] = useState("")
  const [address, addressChange] = React.useState("")
  const [email, emailChange] = React.useState("")
  const [password, passwordChange] = React.useState("")

  const [referenceBy, setReferenced] = React.useState("")
  const [organization, organizationChange] = React.useState("")
  const [validation, validationChange] = useState(false)
  // const [userreferences, userReferencesChange] = React.useState([])

  const dispatch = useDispatch()
  const role = useParams()
  console.log("role", role.role)
  const userRole = role.role
  let adminData = []
  if (userRole === "2") {
    data?.map((user, k) => {
      console.log("users", user.role === "1")
      if (user.role === "1") {
        console.log("users11", user)

        adminData?.push(user)
      }

      return null
    })
  } else if (userRole === "3") {
    data?.map((user, k) => {
      if (user.role === "2") {
        adminData?.push(user)
      }

      return null
    })
  }
  console.log("adminData", adminData)

  console.log("{referenceBy}", { referenceBy })
  const empData = {
    name,
    email,
    password,
    userRole,
    referenceBy,
    organization,
  }

  console.log("empdata", empData)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("userRole", userRole)
    if (
      userRole === "1" &&
      name !== "" &&
      email !== "" &&
      password !== "" &&
      userRole !== "" &&
      organization !== ""
    ) {
      console.log("helllo")
      dispatch(addUser(empData))
    } else if (
      userRole === "2" ||
      (userRole === "3" &&
        name !== "" &&
        email !== "" &&
        password !== "" &&
        userRole !== "" &&
        referenceBy !== "")
    ) {
      dispatch(addUser(empData))
    } else {
      validationChange(true)
    }

    // if (userRole === 1) {
    //   if (
    //     name !== "" &&
    //     email !== "" &&
    //     password !== "" &&
    //     userRole !== "" &&
    //     organization !== ""
    //   ) {
    //     console.log("helllo")
    //     dispatch(addUser(empData))
    //   }
    // } else if (userRole === 2 || userRole === 3) {
    //   if (
    //     name !== "" &&
    //     email !== "" &&
    //     password !== "" &&
    //     userRole !== "" &&
    //     referenceBy !== ""
    //   ) {
    //     dispatch(addUser(empData))
    //   }
    // } else {
    //   validationChange(true)
    // }
  }
  return (
    <>
      {data?.status === 200 && data.message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{data.message}</Alert>
        </Stack>
      )}
      {data?.status === 500 && data.message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{data.message}</Alert>
        </Stack>
      )}
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <div>
          <TextField
            // onMouseDown={(e) => validationChange(true)}
            label="name"
            name="name"
            variant="filled"
            value={name}
            onChange={(e) => nameChange(e.target.value)}
            required
          />
          <br />

          {name === "" && validation && (
            <span className="text-danger">enter the name</span>
          )}
        </div>

        <div>
          <TextField
            name="email"
            label="email"
            variant="filled"
            value={email}
            onChange={(e) => emailChange(e.target.value)}
            required
          />
          <br />

          {email === "" && validation && (
            <span className="text-danger">enter the email</span>
          )}
        </div>

        <div>
          <TextField
            name="password"
            label="password"
            variant="filled"
            value={password}
            onChange={(e) => passwordChange(e.target.value)}
            required
          />
          <br />

          {password === "" && validation && (
            <span className="text-danger">enter the password</span>
          )}
        </div>

        {userRole === "1" ? (
          <div>
            <TextField
              name="organization"
              label="organization"
              variant="filled"
              value={organization}
              onChange={(e) => organizationChange(e.target.value)}
              required
            />
            <br />
            {organization === "" && validation && (
              <span className="text-danger">enter the organization</span>
            )}
          </div>
        ) : (
          ""
        )}
      </Box>
      {userRole === "1" ? (
        ""
      ) : (
        <div>
          {/* error={validation} required */}
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              choose your admin
            </InputLabel>

            <NativeSelect
              onChange={(e) => setReferenced(e.target.value)}
              value={referenceBy}
              inputProps={{
                name: "reference",
                id: "uncontrolled-native",
              }}
            >
              {adminData &&
                adminData?.map((user1, keys) => (
                  <option value={user1._id} key={user1._id}>
                    {user1.email}
                  </option>
                ))}

              <option value="">select admin</option>
            </NativeSelect>
          </FormControl>
          <br />
          {referenceBy === "" && validation && (
            <span className="text-danger">enter the reference</span>
          )}
        </div>
      )}
      <div>
        {/* <button onClick={(e) => dispatch(addUser(empData, e))}>submit</button> */}
        <button onClick={handleSubmit}>submit</button>
        <button onClick={cancelButton}>back</button>
      </div>
    </>
  )
}
export default UserAdd
