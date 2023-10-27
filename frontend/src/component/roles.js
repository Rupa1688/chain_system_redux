import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { userDetail } from "../action/action"
const UserRoles = () => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state?.usersData?.view)
  console.log("data55", data)
  useEffect(() => {
    dispatch(userDetail())
  }, [dispatch])
  return (
    <>
      {/* {data && data.map((user) => <div className="user">{user.name}</div>)} */}
      <Link to="/add/1">Admin</Link>
      <Link to="/add/2">Agent</Link>
      <Link to="/add/3">User</Link>
    </>
  )
}
export default UserRoles
