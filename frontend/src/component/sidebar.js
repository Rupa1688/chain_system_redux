import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { Link } from "react-router-dom"
const SidebarPage = () => {
  //   const { collapseSidebar } = useProSidebar()
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar()

  //   return (
  //     <div style={{ display: "flex", height: "100%" }}>
  //       <Sidebar className="sidebar_container">
  //         <Menu className="menu">
  //           {/* <SubMenu label="Charts">
  //           <MenuItem> Pie charts </MenuItem>
  //           <MenuItem> Line charts </MenuItem>
  //         </SubMenu>
  //         <MenuItem> Documentation </MenuItem>
  //         <MenuItem> Calendar </MenuItem> */}
  //         </Menu>
  //       </Sidebar>
  //       <main>
  //         {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
  //         <button onClick={() => toggled()}>Collapse</button>
  //       </main>
  //     </div>
  //   )

  return (
    <div
      id="app"
      style={({ height: "100vh" }, { display: "flex", flexDirection: "row" })}
    >
      <Sidebar
        // backgroundColor="rgb(0, 249, 249, 0.7)"
        style={{ height: "100vh" }}
        rtl={false}
        className="sidebar_container"
        breakPoint="sm"
        transitionDuration={800}
      >
        <Menu className="menu">
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar()
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />} component={<Link to="/" />}>
            Add
          </MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            component={<Link to="/biding" />}
          >
            Biding
          </MenuItem>
          <MenuItem
            icon={<ContactsOutlinedIcon />}
            component={<Link to="/shareMarket" />}
          >
            ShareMarket
          </MenuItem>
          <MenuItem
            icon={<ReceiptOutlinedIcon />}
            component={<Link to="/profile" />}
          >
            Profile
          </MenuItem>
          {/* <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  )
}
export default SidebarPage
