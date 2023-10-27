import * as React from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  bidSubmit,
  getDataForBidings,
  higestBiding,
} from "../action/requestAction"
import { Stack } from "@mui/system"
import { Alert } from "@mui/material"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))
const session_data = JSON.parse(localStorage.getItem("data"))
console.log("session_data", session_data)
const URL = "ws://127.0.0.1:4002"
const Biding = () => {
  const dispatch = useDispatch()

  const [highestBid, setBid] = React.useState([])
  const [bid, setMinimumBid] = React.useState()
  const [user, setUser] = React.useState("John")
  const [message, setMessage] = React.useState([])
  const [messages, setMessages] = React.useState("")
  const [ws, setWs] = React.useState(new WebSocket(URL))
  const navigate = useNavigate()

  const allBidingData = useSelector(
    (state) => state?.usersData?.allBidingData?.data
  )
  const highest_bid_data = useSelector((state) => state?.usersData?.highest_bid)
  const highest_value = useSelector(
    (state) => state?.usersData?.highest_value?.data
  )
  console.log("highest_value", highest_value)

  const submitMessage = (data) => {
    // console.log("user", usr, msg)
    const message = { data: data.bid }
    console.log("message", message)
    ws.send(JSON.stringify(message))
    dispatch(bidSubmit(data))
    // setMessages([message, ...messages])
    setMessages(message)
  }
  React.useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket Connected")
    }

    ws.onmessage = (e) => {
      console.log("EEEEEEE", e.data)
      const message = JSON.parse(e.data)

      // setMessages([message, ...messages])
      setMessages(message)
    }

    //   ws.onclose = () => {
    //     console.log("WebSocket Disconnected")
    //     setWs(new WebSocket(URL))
    //   }
  }, [ws.onmessage, ws.onopen, ws.onclose])

  React.useEffect(() => {
    dispatch(getDataForBidings())
    dispatch(higestBiding())
  }, [dispatch])

  let orgId = []
  let userBiding = []
  const userBid = (value, index) => {
    console.log("value", value, index)
    // if(value>)
    userBiding[index] = value
    setBid(userBiding)
  }
  let msg = document.getElementById("alrtmsg")
  if (
    highest_bid_data?.status === 200 &&
    highest_bid_data.message &&
    msg.style.display === "none"
  ) {
    msg.style.display = "block"
    console.log("msg", msg)
    setTimeout(() => {
      msg.style.display = "none"
      window.location.reload()
    }, "1000")
  }

  // if (msg.style.display === "block") {
  //   setTimeout(() => {
  //     // window.location.reload()

  //     msg.style.display = "none"
  //   }, "4000")
  // }

  return (
    <>
      {/* {highest_bid_data?.status === 200 && highest_bid_data.message && ( */}
      <Stack
        sx={{ width: "100%" }}
        spacing={2}
        // style={{ display: "block" }}
      >
        <Alert severity="success" id="alrtmsg" style={{ display: "none" }}>
          {highest_bid_data.message}
        </Alert>
      </Stack>
      {/* )} */}
      <br />
      <br />

      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={10}
          columnSpacing={{ xs: 5, sm: 10, md: 15 }}
        >
          {allBidingData &&
            allBidingData.length > 0 &&
            allBidingData.map((row, index) => {
              orgId[index] = row

              let hValue = []
              const onePercentAmount = row ? (row.amount * 1) / 100 : 0
              const bid = onePercentAmount * row.shares
              // hValue[index] =
              //   highest_value && highest_value.length > 0
              //     ? highest_value[0]?.max
              //     : 0
              // setMinimumBid(onePercentAmount * row.shares)
              return (
                <>
                  <Grid item xs={6} key={row._id}>
                    <Item>
                      <>
                        <div>Org Name:{row.orgData[0].organizationName}</div>
                        <div>Holder Name:{row.usersData[0].name}</div>
                        <div> Total share:{row.shares}</div>
                        <div> price:{onePercentAmount}</div>
                        <div> Minimum bid:{Math.round(bid)}</div>
                      </>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item>
                      highest bid:
                      {/* {highest_value ? highest_value[0]?.max : bid[index]} */}
                      {/* {bid[index]} */}
                      {/* {highest_value && highest_value.length > 0
                        ? highest_value[index]?.max
                          ? highest_value[index]?.max
                          : Math.round(bid)
                        : Math.round(bid)                                                      
                        } */}
                      {(() => {
                        if (messages && messages !== undefined) {
                          return messages.data
                        } else if (highest_value && highest_value.length > 0) {
                          if (highest_value[index]?.max) {
                            return highest_value[index]?.max
                          } else {
                            return Math.round(bid)
                          }
                        } else {
                          return Math.round(bid)
                        }
                      })()}
                      {/* {(() => {
                        if (
                          highest_bid_data?.status === 200 &&
                          highest_bid_data?.data
                        ) {
                          return highest_bid_data?.data?.bid
                        } else if (highest_value && highest_value.length > 0) {
                          if (highest_value[index]?.max) {
                            return highest_value[index]?.max
                          } else {
                            return Math.round(bid)
                          }
                        } else {
                          return Math.round(bid)
                        }
                      })()} */}
                      <br /> <br />
                      {session_data &&
                      session_data._id === row.usersData[0]._id ? (
                        ""
                      ) : (
                        <>
                          your bid is:
                          <input
                            type="text"
                            name="bid_value"
                            value={highestBid[index]}
                            onChange={(e) => userBid(e.target.value, index)}
                          />
                          {highestBid[index] < bid && (
                            <span className="text-danger">
                              enter the highest bid to minimum bid
                            </span>
                          )}
                          <br /> <br />
                          submit bid:
                          <button
                            type="submit"
                            onClick={
                              (e) => {
                                submitMessage({
                                  org_id: orgId[index].org_id,
                                  holder_id: orgId[index].user_id,
                                  buyshare: orgId[index].shares,
                                  amount: orgId[index].amount,
                                  bid: highestBid[index],
                                  user_id: session_data._id,
                                })
                              }
                              // dispatch(
                              //   bidSubmit({
                              //     org_id: orgId[index].org_id,
                              //     holder_id: orgId[index].user_id,
                              //     buyshare: orgId[index].shares,
                              //     amount: orgId[index].amount,
                              //     bid: highestBid[index],
                              //     user_id: session_data._id,
                              //   })
                              // )
                            }
                          >
                            submit
                          </button>
                          <button
                            onClick={(e) => navigate("/remainTime")}
                            type="submit"
                          >
                            remain timing
                          </button>
                        </>
                      )}
                    </Item>
                  </Grid>
                </>
              )
            })}
        </Grid>
      </Box>

      {/* <div>
        <label htmlFor="user">
          Name :
          <input
            type="text"
            id="user"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>

        <ul>
          {messages.reverse().map((message, index) => (
            <li key={index}>
              <b>{message.user}</b>: <em>{message.message}</em>
            </li>
          ))}
        </ul>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault()
            submitMessage(user, message)
            setMessage([])
          }}
        >
          <input
            type="text"
            placeholder={"Type a message ..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" value={"Send"} />
        </form>
      </div> */}
    </>
  )
}

export default Biding
