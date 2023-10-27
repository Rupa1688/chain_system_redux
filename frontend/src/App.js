import "./App.css"
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { useParams } from "react-router-dom"

import UserRoles from "./component/roles"
import UserAdd from "./component/userAdd"
import PageNotFound from "./component/pageNotFound"
import Login from "./component/login"
import UsersAll from "./component/usersAllData"
import UserProfile from "./component/userProfile"
import EditUser from "./component/editUser"
import Test from "./component/test"
import Layout from "./component/layout"
import OrgShareMarket from "./component/orgMarket"
import Biding from "./component/biding"
import TimeRemain from "./component/remainTime"
import PurchaseTiming from "./component/purchaseTiming"

const App = () => {
  const { role } = useParams()
  const pathname = useLocation()
  console.log("pathname", pathname)

  // const userRole = role
  console.log("userRole11", role)
  const session = JSON.parse(localStorage.getItem("token"))
  console.log("session", session)
  return (
    <div className="App">
      {pathname.pathname === "/login" ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<UserRoles />} />
            <Route path="/add/:role" element={<UserAdd />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/users" element={<UsersAll />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/test" element={<Test />} />
            <Route path="/shareMarket" element={<OrgShareMarket />} />
            <Route path="/biding" element={<Biding />} />
            <Route path="/remainTime" element={<TimeRemain />} />
            <Route path="/purchase" element={<PurchaseTiming />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      )}

      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<UserRoles />} />
          <Route path="/add/:role" element={<UserAdd />} />
          
          <Route path="/users" element={<UsersAll />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/test" element={<Test />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes> */}
    </div>
  )
}

export default App
