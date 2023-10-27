import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  higestBiding,
  winnerAnounced,
  winnerCoundownStartTime,
} from "../action/requestAction"

const TimeRemain = () => {
  const dispatch = useDispatch()
  const [hour, setHour] = useState("")
  const [mint, setMinute] = useState("")
  const [second, setSecond] = useState("")
  const time = useSelector((state) => state?.usersData?.highest_value?.dateTime)
  const winer = useSelector((state) => state?.usersData?.winer?.data)
  const [artists, setArtists] = useState([])

  function createFunction(date, data) {
    // console.log("date11", date, data)
    const currentDate = new Date().getTime()
    const avlTime = new Date(date).getTime() - currentDate
    // console.log("avlTime", avlTime)
    // setHour(Math.floor((avlTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    // setMinute(Math.floor((avlTime % (1000 * 60 * 60)) / (1000 * 60)))
    // setSecond(Math.floor((avlTime % (1000 * 60)) / 1000))
    //convert miliseconds in to hour/minute/seconds
    setHour(Math.floor((avlTime / 1000 / 60 / 60) % 24))
    setMinute(Math.floor((avlTime / 1000 / 60) % 60))
    setSecond(Math.floor((avlTime / 1000) % 60))

    if (avlTime <= 0) {
      clearInterval(data)
      dispatch(winnerAnounced())
    }
  }

  function setTime(time) {
    // console.log("date", time)
    const countDown = setInterval(() => {
      createFunction(time, countDown)
    }, 1000)
  }

  const currentTime = new Date().getTime()
  if (currentTime < new Date(time).getTime()) {
    setTime(time)
  }

  function bidingAnouncingTime(winerName) {
    console.log("winer1111>>>>>", winerName)
    // setTimeout(() => {
    dispatch(
      winnerCoundownStartTime(
        winerName && winerName.length > 0 && winerName !== undefined
          ? {
              bid_id: winerName[0]?.name[0]?._id,
              user_id: winerName[0]?.name[0]?.userdata[0]?._id,
            }
          : 0
      )
    )
    // }, 10000)
  }
  // console.log("seconds11", second)
  let i = 0
  useEffect(() => {
    if (winer && winer?.length > 0 && winer !== undefined) {
      setArtists([...artists, { id: i++, name: winer }])
      let data = true
      if (artists.length === 1 && data) {
        data = false
        bidingAnouncingTime(artists)
      }
    }
  }, [winer])

  useEffect(() => {
    // dispatch(winnerAnounced())
    dispatch(higestBiding())
  }, [dispatch])

  console.log("winn >>>", winer)

  return (
    <>
      {second > 0 && (
        <div>
          <h5>
            {hour}:{mint}:{second}
          </h5>
        </div>
      )}
      {winer &&
        winer.length > 0 &&
        winer.map((data) => <>the winner is: {data.userdata[0].name}</>)}
    </>
  )
}
export default TimeRemain
