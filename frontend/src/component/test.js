import { useEffect } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { userProfile } from "../action/action"

const Test = (props) => {
  const store = useStore()
  let states = store.getState()
  console.log("states", states)
  // const profile = useSelector((state) => {
  //   return state?.usersData?.profile?.data
  // })
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(userProfile())
  // }, [dispatch])
  // console.log("props======================================== ", props.data)
  // //   console.log("testprops", profile)

  return <div>hello</div>
}
export default Test
