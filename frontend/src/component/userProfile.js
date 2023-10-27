import "../App.css"
import * as React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, userProfile } from "../action/action"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"

import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { Link, useNavigate } from "react-router-dom"
import Header from "./header"
import {
  getAvlPurchaseTime,
  getBuyer,
  newRequest,
  renewRequest,
  sendRequest,
  shareMarket,
} from "../action/requestAction"
import { Alert, Stack } from "@mui/material"
import Test from "./test"
import BuyShares from "./buyShares"
import PurchaseTiming from "./purchaseTiming"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))
const UserProfile = () => {
  //const [expanded, setExpanded] = React.useState(false)

  // const handleExpandClick = () => {
  //   setExpanded(!expanded)
  // }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const dispatch = useDispatch()

  const requestResponse = useSelector(
    (state) => state?.usersData?.view?.message
  )
  const requestData = useSelector(
    (state) => state?.usersData?.view?.requestData
  )
  console.log("profileee", requestData, requestResponse)
  const commisionData = useSelector(
    (state) => state?.usersData?.profile?.commisionData
  )
  const profile = useSelector((state) => {
    return state?.usersData?.profile?.data
  })

  const organizationName = useSelector(
    (state) => state?.usersData?.profile?.organizationName
  )
  const orgShareMarketData = useSelector(
    (state) => state?.usersData?.profile?.orgShareMarketData
  )
  console.log("orgShareMarketData11", orgShareMarketData)
  const organization = useSelector(
    (state) => state?.usersData?.profile?.organization
  )
  const releaseAgent = useSelector(
    (state) => state?.usersData?.profile?.releaseAgent
  )
  const releaseAgentData = useSelector(
    (state) => state?.usersData?.profile?.releaseAgentData
  )
  const releaseUser = useSelector(
    (state) => state?.usersData?.profile?.releaseUser ?? []
  )
  const releaseUserData = useSelector(
    (state) => state?.usersData?.profile?.releaseUserData
  )
  console.log("requestUser", requestData)
  const requestUserData = useSelector(
    (state) => state?.usersData?.profile?.requestUserData
  )

  const relesedMessage = useSelector(
    (state) => state?.usersData?.releaseMessage?.message
  )
  const openRequestMessage = useSelector(
    (state) => state?.usersData?.openRequestMessage?.message
  )
  const orgEnterShareMarket = useSelector(
    (state) => state?.usersData?.orgEnterShareMarket?.message
  )
  const orgEnterShareMarketData = useSelector(
    (state) => state?.usersData?.orgEnterShareMarket?.data
  )
  const getBuyerOfShare = useSelector(
    (state) => state?.usersData?.getBuyerOfShare?.data
  )
  const bidingData = useSelector((state) => state?.usersData?.bidingData)

  console.log("bidingData", bidingData)

  console.log(
    "orgEnterShareMarket"
    // orgEnterShareMarket,
    // orgEnterShareMarketData
    //getBuyerOfShare
  )

  useEffect(() => {
    dispatch(userProfile())
    dispatch(getBuyer())
  }, [dispatch])

  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate("/login")
    window.location.reload()
  }
  const users = () => {
    navigate("/users")
    window.location.reload()
  }
  const options = [
    <button onClick={logout}>logout</button>,
    profile && profile.role === "3" ? (
      ""
    ) : (
      <button onClick={users}>userList</button>
    ),
  ]
  const ref = React.useRef(null)
  const released = React.useRef(null)
  const openref = React.useRef(null)
  setTimeout(() => {
    // console.log("ref", (ref.current.style.display = "none"))
    if (
      requestResponse === "request send successfully" ||
      relesedMessage === "request released successfully" ||
      openRequestMessage === "open renew request successfully"
    ) {
      //  window.location.reload()
    }

    // }
  }, "1000")

  const ITEM_HEIGHT = 48
  let role = ""

  if (profile && profile.role === "0") {
    role = "SuperAdmin"
  } else if (profile && profile.role === "1") {
    role = "Admin"
  } else if (profile && profile.role === "2") {
    role = "Agent"
  } else if (profile && profile.role === "3") {
    role = "User"
  }
  // console.log("releaseAgent", releaseAgent[0].myCount)

  return (
    <>
      {/* <Header /> */}
      {/* <p ref={ref}>hello</p> */}
      {bidingData?.status === 200 && bidingData.message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{bidingData.message}</Alert>
        </Stack>
      )}
      {bidingData?.status === 201 && bidingData.message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{bidingData.message}</Alert>
        </Stack>
      )}
      {orgEnterShareMarket && (
        <div id="requestResponse" ref={ref}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{orgEnterShareMarket}</Alert>
          </Stack>
        </div>
      )}
      {requestResponse === "request send successfully" && (
        <div id="requestResponse" ref={ref}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{requestResponse}</Alert>
          </Stack>
        </div>
      )}

      {relesedMessage === "request released successfully" && (
        <div id="requestResponse" ref={released}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{relesedMessage}</Alert>
          </Stack>
        </div>
      )}
      {openRequestMessage === "open renew request successfully" && (
        <div id="requestResponse" ref={openref}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{openRequestMessage}</Alert>
          </Stack>
        </div>
      )}

      {profile && (
        <div className="container">
          <Card className="card" sx={{ maxWidth: 350 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {profile && profile.name}
                  {/* {profile ? profile.name.charAt(0).toUpperCase() : ""} */}
                </Avatar>
              }
              action={
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem
                        key={option}
                        selected={option === "Pyxis"}
                        onClick={handleClose}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              }
              title={profile.name}
            />

            <CardContent className="CardContent">
              <Typography
                variant="body2"
                color="text.secondary"
                className="Typography"
              >
                name:{profile.name}
                <br />
                email:{profile.email}
                <br />
                role:{role}
                <br />
                {commisionData !== 0 && (
                  <>
                    <div> Commision Data:{commisionData}</div>
                    <br />
                  </>
                )}
                {organizationName && (
                  <>
                    <div> Organization Name:{organizationName}</div> <br />
                  </>
                )}
                {organization && (
                  <>
                    <div> Organization:{organization}</div> <br />
                  </>
                )}
                {(() => {
                  if (profile.role === "3") {
                    if (releaseUser < 3) {
                      if (requestUserData.length > 0) {
                        return (
                          <>
                            <button disabled={true}>Send Request</button>
                            <br />
                            <button
                              onClick={(e) =>
                                dispatch(
                                  renewRequest(profile._id, profile.role, e)
                                )
                              }
                            >
                              create Renew Request
                            </button>
                          </>
                        )
                      } else {
                        return (
                          <button
                            onClick={(e) => dispatch(sendRequest(profile, e))}
                          >
                            Send Requests
                          </button>
                        )
                      }
                    } else {
                      return (
                        <button
                          onClick={(e) => dispatch(sendRequest(profile, e))}
                          disabled={true}
                        >
                          Send Request
                        </button>
                      )
                    }
                  }
                  if (profile.role === "2") {
                    if (releaseAgent < 3) {
                      if (requestUserData.length > 0) {
                        return (
                          <>
                            <button
                              onClick={(e) => dispatch(sendRequest(profile, e))}
                              disabled={true}
                            >
                              Send Request
                            </button>
                            <br />
                            <button
                              onClick={(e) =>
                                dispatch(
                                  renewRequest(profile._id, profile.role, e)
                                )
                              }
                            >
                              create Renew Request
                            </button>
                          </>
                        )
                      } else {
                        return (
                          <button
                            onClick={(e) => dispatch(sendRequest(profile, e))}
                          >
                            Send Requests
                          </button>
                        )
                      }
                    } else {
                      return (
                        <button
                          onClick={(e) => dispatch(sendRequest(profile, e))}
                          disabled={true}
                        >
                          Send Request
                        </button>
                      )
                    }
                  }
                })()}
                {(() => {
                  if (profile.role === "1") {
                    if (releaseAgent === 3) {
                      const filterData = releaseAgentData.map(
                        (data) => data?.req_status
                      )
                      console.warn("filterData", filterData)
                      const data = {
                        role: releaseAgentData[0]?.role,
                        org_id: releaseAgentData[0]?.org_id,
                      }
                      if (filterData?.includes(true)) {
                        return <button disabled="true">Request Release</button>
                      } else {
                        return (
                          <div>
                            <button
                              onClick={(e) => dispatch(newRequest(data, e))}
                            >
                              Request Release
                            </button>
                            <br />
                          </div>
                        )
                      }
                    } else if (releaseUser === 3) {
                      const filterData = releaseUserData.map(
                        (data) => data?.req_status
                      )

                      const data = {
                        role: releaseUserData[0]?.role,
                        org_id: releaseUserData[0]?.org_id,
                      }
                      if (filterData?.includes(true)) {
                        return <button disabled={true}>Request Release</button>
                      } else {
                        return (
                          <div>
                            <button
                              onClick={(e) => dispatch(newRequest(data, e))}
                            >
                              Request Release
                            </button>
                            <br />
                          </div>
                        )
                      }
                    } else {
                      return (
                        <>
                          <button disabled={true}>Request Release</button>
                          <br />
                        </>
                      )
                    }
                  }
                })()}
                {/* {profile.role === "1" && releaseAgent[0].myCount === 3?

(  <button onClick={(e) => dispatch(newRequest(releaseAgent,e))}>
Request Release
</button>
) :               
                (releaseAgent[0].myCount === 3 ? (
                  <button onClick={(e) => dispatch(newRequest(releaseAgent,e))}>
                    Request Release
                  </button>
                ) : (
                  <button disabled="true">Request Release</button>
                )} */}
                {(() => {
                  if (profile.role === "1") {
                    // return (
                    //   <div>
                    //     {JSON.stringify(orgEnterShareMarketData.status)}
                    //   </div>
                    // )

                    // if (
                    //   (orgEnterShareMarketData &&
                    //     orgEnterShareMarketData.status === false) ||
                    //   (orgShareMarketData &&
                    //     orgShareMarketData.status === false)
                    // ) {
                    //   return (
                    //     <button disabled={true}>share 10% in market</button>
                    //   )
                    // } else {
                    //   return (
                    //     <button
                    //       onClick={(e) =>
                    //         dispatch(
                    //           shareMarket(organization, organizationName, e)
                    //         )
                    //       }
                    //     >
                    //       share 10% in market
                    //     </button>
                    //   )
                    // }

                    return (orgEnterShareMarketData &&
                      orgEnterShareMarketData.status === false) ||
                      (orgShareMarketData &&
                        orgShareMarketData.status === false) ? (
                      <button disabled={true}>share 10% in market</button>
                    ) : (
                      <button
                        onClick={(e) =>
                          dispatch(
                            shareMarket(organization, organizationName, e)
                          )
                        }
                      >
                        share 10% in market
                      </button>
                    )

                    // return (
                    //   <button
                    //     onClick={(e) =>
                    //       dispatch(
                    //         shareMarket(organization, organizationName, e)
                    //       )
                    //     }
                    //   >
                    //     share 10% in market
                    //   </button>
                    // )
                  }
                })()}
              </Typography>
            </CardContent>
            <CardActions className="actions">
              <Link to={`/edit/${profile._id}`}>Edit</Link>
              <button onClick={(e) => dispatch(deleteUser(profile._id, e))}>
                Delete
              </button>
            </CardActions>
          </Card>
          {/* <Test data={profile}></Test> */}
          <BuyShares data={getBuyerOfShare} />
          <button onClick={(e) => navigate("/purchase")}>my Bid</button>
        </div>
      )}
    </>
  )
}
export default UserProfile
