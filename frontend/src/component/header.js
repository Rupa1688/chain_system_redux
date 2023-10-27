import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"

import AccountCircle from "@mui/icons-material/AccountCircle"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import { useNavigate } from "react-router-dom"
// import { userLogout } from "../action/action"
// import { useDispatch } from "react-redux"

export default function Header() {
  //   const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)

  let auth = JSON.parse(localStorage.getItem("token"))
  //   const handleChange = (event) => {
  //     setAuth(event.target.checked)
  //   }
  let data = JSON.parse(localStorage.getItem("data"))
  console.log("rollesss", data)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const logout = () => {
    localStorage.clear()
    // dispatch(userLogout())
    navigate("/login")

    window.location.reload()
  }
  const users = () => {
    navigate("/users")
    window.location.reload()
  }
  const handleProfile = () => {
    navigate("/profile")
    window.location.reload()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          {auth ? (
            <div>
              <Typography
                className="userList"
                variant="h6"
                component="div"
                sx={{ flexGrow: 2 }}
              >
                {data && data.role !== "3" && (
                  <button onClick={users}>userList</button>
                )}

                <button
                  onClick={() => {
                    navigate("/shareMarket")
                  }}
                >
                  shareMarket
                </button>
              </Typography>
              <IconButton
                className="profile"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                className="profile_menu"
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={logout}>logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              <button onClick={() => navigate("/login")}>Login</button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
