import { Alert, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../action/action"

const Login = () => {
  const dispatch = useDispatch()
  const [email, emailChange] = React.useState("")
  const [password, passwordChange] = React.useState("")
  const [validation, validationChange] = useState(false)
  const navigate = useNavigate()
  const cancelButton = () => {
    navigate("/")
    window.location.reload()
  }
  const empData = {
    email,
    password,
  }
  const data = useSelector((state) => state?.usersData?.view)
  console.log("data login1", data)
  if (data.token && data.status === 200) {
    localStorage.setItem("token", JSON.stringify(data.token))
    localStorage.setItem("data", JSON.stringify(data.data))
    const timer = setTimeout(() => {
      if (data?.data?.role === "3") {
        navigate("/profile")
        window.location.reload()
      } else {
        navigate("/users")
        window.location.reload()
      }
      // navigate("/users")
      // window.location.reload()
    }, 1000)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (email !== "" && password !== "") {
      dispatch(login(empData))
    } else {
      validationChange(true)
    }
  }
  return (
    <>
      {data?.status === 500 && data.messege && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{data.messege}</Alert>
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
            name="email"
            label="email"
            variant="filled"
            value={email}
            onChange={(e) => emailChange(e.target.value)}
          />
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
          />
          {password === "" && validation && (
            <span className="text-danger">enter the password</span>
          )}
        </div>
        <div>
          {/* <button onClick={(e) => dispatch(login(empData, e))}>submit</button> */}
          <button onClick={handleLogin}>submit</button>
          <button onClick={cancelButton}>cancel</button>
        </div>
      </Box>
      <br />
      <button onClick={() => navigate("/")}>Register</button>
    </>
  )
}
export default Login
