import { Alert } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { Navigate } from "react-router-dom"
import {
  getAvlPurchaseTime,
  purchaseBid,
  removeBiding,
  winnerAnounced,
} from "../action/requestAction"

const PurchaseTiming = () => {
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [second, setSecond] = useState("")
  const [datacount1, datacountArray1] = useState([])
  const navigate = useNavigate()
  // const winer = useSelector((state) => state?.usersData?.winer?.data)
  // console.log("winnerererer>>>>>>>", winer)
  // winer[0]?.userdata[0]?._id
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(winnerAnounced())
    dispatch(getAvlPurchaseTime())
  }, [dispatch])

  const data = useSelector((state) => state?.usersData?.avlTimeToPuchase?.data)
  const PuchaseBidMessage = useSelector(
    (state) => state?.usersData?.PuchaseBidMessage
  )

  let loginUser = JSON.parse(localStorage.getItem("data"))
  console.log("loginUser>>>>>>>>>>", loginUser)
  let time
  if (data && data !== undefined && data.length > 0) {
    console.log("data11111", data[0])
    time = data[0].time
  }

  function convertMilisecond(date, intervalData) {
    const currentDate = new Date().getTime()
    const purchaseDate = new Date(date).getTime()
    const avlTime = purchaseDate - currentDate
    setSecond(Math.floor((avlTime / 1000) % 60))
    setMinute(Math.floor((avlTime / 1000 / 60) % 60))
    setHour(Math.floor((avlTime / 1000 / 60 / 60) % 24))
    let j = 0
    if (avlTime <= 0) {
      if (datacount1.length < 1) {
        datacount1.push(j)
      }
      j++
      if (datacount1.length === 1) {
        datacount1.push(1)
        clearInterval()
        if (data && data !== undefined && data.length > 0) {
          dispatch(removeBiding({ bid_id: data[0].bid_id }))
        }
      }
    }
  }

  function setTime(datetime) {
    const interval = setInterval(() => {
      convertMilisecond(datetime, interval)
    }, 1000)
  }
  const currentDate = new Date().getTime()
  const purchaseDate = new Date(time).getTime()
  if (currentDate < purchaseDate) {
    setTime(time)
  }
  console.log("PuchaseBidMessage", PuchaseBidMessage)
  if (PuchaseBidMessage?.status === 200 && PuchaseBidMessage.message) {
    setTimeout(() => {
      navigate("/profile")
      window.location.reload()
    }, "2000")
  }

  return (
    <>
      {PuchaseBidMessage?.status === 200 && PuchaseBidMessage.message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{PuchaseBidMessage.message}</Alert>
        </Stack>
      )}

      {(() => {
        if (data && data !== undefined && data.length > 0) {
          if (data[0].user_id === loginUser._id) {
            if (second > 0) {
              return (
                <div>
                  <h5>
                    {hour}:{minute}:{second}
                  </h5>
                  <button
                    type="submit"
                    onClick={(e) => {
                      dispatch(purchaseBid({ bid_id: data[0].bid_id }))
                    }}
                  >
                    purchase
                  </button>
                </div>
              )
            }
          }
        }
      })()}
      {/* {second > 0 && (
         <div>
           <h5>
             {hour}:{minute}:{second}
           </h5>
            {data && data !== undefined && data.length > 0 && (
             <button
               type="submit"
               onClick={(e) => {
                 dispatch(purchaseBid({ bid_id: data[0].bid_id }))
               }}
             >
               purchase
             </button>
           )} 
         </div>
       )} */}
    </>
  )
}
export default PurchaseTiming
